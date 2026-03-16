/**
 * Main hook untuk Competition Registration - Orchestrates registration workflow
 */

import { useState, useCallback, useRef } from "react";
import type {
  CompetitionRegistration,
  Competition,
  RegistrationPlayer,
  UploadedDocument,
  RegistrationStep1Data,
  RegistrationStep2Data,
  RegistrationStep3Data,
  RegistrationStep4Data,
  ValidationResult,
} from "../lib/types";
import {
  validateStep1,
  validateStep2,
  validateStep3,
  validateCompleteRegistration,
} from "../lib/utils/validation";

/**
 * Hook state interface
 */
interface UseCompetitionRegistrationState {
  // Current step
  currentStep: 1 | 2 | 3 | 4;
  
  // Loaded data
  competition: Competition | null;
  clubPlayers: RegistrationPlayer[];
  existingRegistration: CompetitionRegistration | null;
  
  // Form data per step
  step1Data: Partial<RegistrationStep1Data>;
  step2Data: Partial<RegistrationStep2Data>;
  step3Data: Partial<RegistrationStep3Data>;
  step4Data: Partial<RegistrationStep4Data>;
  
  // UI states
  isLoading: boolean;
  isSubmitting: boolean;
  errors: Record<string, string>;
  success: boolean;
  successMessage: string;
}

/**
 * Main hook untuk competiti registration
 */
export function useCompetitionRegistration(competitionId?: string, clubId?: string) {
  const [state, setState] = useState<UseCompetitionRegistrationState>({
    currentStep: 1,
    competition: null,
    clubPlayers: [],
    existingRegistration: null,
    step1Data: {},
    step2Data: { selectedPlayerIds: new Set() },
    step3Data: { documents: [], uploadProgress: {} },
    step4Data: { agreedToTerms: false, agreedToRules: false },
    isLoading: false,
    isSubmitting: false,
    errors: {},
    success: false,
    successMessage: "",
  });

  /**
   * Update step with validation
   */
  const goToStep = useCallback(async (step: 1 | 2 | 3 | 4, skipValidation = false): Promise<boolean> => {
    if (!skipValidation && state.currentStep < step) {
      // Validate current step before moving forward
      const isValid = await validateCurrentStep();
      if (!isValid) return false;
    }

    setState((prev) => ({ ...prev, currentStep: step }));
    return true;
  }, [state.currentStep]);

  /**
   * Next step
   */
  const nextStep = useCallback(async (): Promise<boolean> => {
    if (state.currentStep === 4) return true; // Already at last step
    return goToStep((state.currentStep + 1) as any);
  }, [state.currentStep, goToStep]);

  /**
   * Previous step
   */
  const previousStep = useCallback((): void => {
    if (state.currentStep === 1) return;
    setState((prev) => ({ ...prev, currentStep: (prev.currentStep - 1) as 1 | 2 | 3 | 4 }));
  }, [state.currentStep]);

  /**
   * Update form data for specific step
   */
  const updateStepData = useCallback((step: 1 | 2 | 3 | 4, data: any): void => {
    setState((prev) => {
      const key = `step${step}Data` as const;
      return {
        ...prev,
        [key]: { ...prev[key], ...data },
        errors: { ...prev.errors }, // Clear errors when updating
      };
    });
  }, []);

  /**
   * Validate current step
   */
  const validateCurrentStep = useCallback(async (): Promise<boolean> => {
    const errors: Record<string, string> = {};

    if (state.currentStep === 1) {
      const result = validateStep1(state.step1Data);
      if (!result.isValid) {
        result.errors.forEach((err) => {
          errors[err.field] = err.message;
        });
      }
      return result.isValid;
    }

    if (state.currentStep === 2) {
      const result = validateStep2(
        state.step2Data,
        state.clubPlayers,
        state.competition?.regulations.minPlayerAge || 12,
        state.competition?.regulations.maxPlayerAge || 13
      );
      if (!result.isValid) {
        result.errors.forEach((err) => {
          errors[err.field] = err.message;
        });
      }
      return result.isValid;
    }

    if (state.currentStep === 3) {
      const requiredDocs = state.competition?.documents
        ?.filter((d) => d.required)
        .map((d) => d.type) || [];
      const result = validateStep3(state.step3Data, requiredDocs);
      if (!result.isValid) {
        result.errors.forEach((err) => {
          errors[err.field] = err.message;
        });
      }
      return result.isValid;
    }

    if (state.currentStep === 4) {
      if (!state.step4Data.agreedToTerms && !state.step4Data.agreedToRules) {
        errors.terms = "Anda harus menyetujui terms and conditions";
        setState((prev) => ({ ...prev, errors }));
        return false;
      }
    }

    setState((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  }, [state.currentStep, state.step1Data, state.step2Data, state.step3Data, state.step4Data, state.clubPlayers, state.competition]);

  /**
   * Submit registration
   */
  const submitRegistration = useCallback(async (): Promise<boolean> => {
    // Final validation
    if (!state.competition || !state.clubPlayers) {
      setState((prev) => ({
        ...prev,
        errors: { submit: "Data tidak lengkap" },
      }));
      return false;
    }

    setState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In real implementation, this would be:
      // const response = await submitRegistrationAPI({
      //   competitionId: state.competition.id,
      //   step1Data: state.step1Data,
      //   step2Data: state.step2Data,
      //   step3Data: state.step3Data,
      //   step4Data: state.step4Data,
      // });

      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        success: true,
        successMessage: "Registrasi berhasil diajukan! Menunggu approval dari EO.",
      }));

      return true;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        errors: { submit: "Gagal submit registrasi. Silakan coba lagi." },
      }));
      return false;
    }
  }, [state.competition, state.clubPlayers]);

  /**
   * Add selected player
   */
  const addSelectedPlayer = useCallback((playerId: string): void => {
    setState((prev) => ({
      ...prev,
      step2Data: {
        ...prev.step2Data,
        selectedPlayerIds: new Set([...(prev.step2Data.selectedPlayerIds || []), playerId]),
      },
    }));
  }, []);

  /**
   * Remove selected player
   */
  const removeSelectedPlayer = useCallback((playerId: string): void => {
    setState((prev) => {
      const newSet = new Set(prev.step2Data.selectedPlayerIds || []);
      newSet.delete(playerId);
      return {
        ...prev,
        step2Data: {
          ...prev.step2Data,
          selectedPlayerIds: newSet,
        },
      };
    });
  }, []);

  /**
   * Toggle player selection
   */
  const togglePlayerSelection = useCallback((playerId: string): void => {
    setState((prev) => {
      const newSet = new Set(prev.step2Data.selectedPlayerIds || []);
      if (newSet.has(playerId)) {
        newSet.delete(playerId);
      } else {
        newSet.add(playerId);
      }
      return {
        ...prev,
        step2Data: {
          ...prev.step2Data,
          selectedPlayerIds: newSet,
        },
      };
    });
  }, []);

  /**
   * Add uploaded document
   */
  const addDocument = useCallback((document: UploadedDocument): void => {
    setState((prev) => ({
      ...prev,
      step3Data: {
        ...prev.step3Data,
        documents: [...(prev.step3Data.documents || []), document],
      },
    }));
  }, []);

  /**
   * Remove document
   */
  const removeDocument = useCallback((documentId: string): void => {
    setState((prev) => ({
      ...prev,
      step3Data: {
        ...prev.step3Data,
        documents: (prev.step3Data.documents || []).filter((d) => d.id !== documentId),
      },
    }));
  }, []);

  /**
   * Update document upload progress
   */
  const updateUploadProgress = useCallback((documentId: string, progress: number): void => {
    setState((prev) => ({
      ...prev,
      step3Data: {
        ...prev.step3Data,
        uploadProgress: {
          ...prev.step3Data.uploadProgress,
          [documentId]: progress,
        },
      },
    }));
  }, []);

  /**
   * Load competition data
   */
  const loadCompetition = useCallback((competition: Competition, players: RegistrationPlayer[]): void => {
    setState((prev) => ({
      ...prev,
      competition,
      clubPlayers: players,
    }));
  }, []);

  /**
   * Load existing registration to continue
   */
  const loadExistingRegistration = useCallback((registration: CompetitionRegistration): void => {
    setState((prev) => ({
      ...prev,
      existingRegistration: registration,
      currentStep: (registration.stepCompleted + 1) as any,
      step1Data: {
        contactPerson: registration.club.contactPerson,
        contactPhone: registration.club.contactPhone,
        contactEmail: registration.club.contactEmail,
      },
      step2Data: {
        selectedPlayerIds: new Set(registration.squad.map((p) => p.id)),
      },
      step3Data: {
        documents: registration.documents,
        uploadProgress: {},
      },
    }));
  }, []);

  /**
   * Reset form
   */
  const resetForm = useCallback((): void => {
    setState({
      currentStep: 1,
      competition: null,
      clubPlayers: [],
      existingRegistration: null,
      step1Data: {},
      step2Data: { selectedPlayerIds: new Set() },
      step3Data: { documents: [], uploadProgress: {} },
      step4Data: { agreedToTerms: false, agreedToRules: false },
      isLoading: false,
      isSubmitting: false,
      errors: {},
      success: false,
      successMessage: "",
    });
  }, []);

  return {
    // State
    ...state,
    
    // Step navigation
    goToStep,
    nextStep,
    previousStep,
    
    // Form management
    updateStepData,
    validateCurrentStep,
    
    // Submission
    submitRegistration,
    
    // Player management
    addSelectedPlayer,
    removeSelectedPlayer,
    togglePlayerSelection,
    selectedPlayersCount: state.step2Data.selectedPlayerIds?.size || 0,
    
    // Document management
    addDocument,
    removeDocument,
    updateUploadProgress,
    
    // Data loading
    loadCompetition,
    loadExistingRegistration,
    resetForm,
  };
}
