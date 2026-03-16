/**
 * Additional hooks for the competition registration module
 */

import { useState, useCallback } from "react";
import type { UploadedDocument } from "../lib/types";
import { validateFile, getFileSizeInMB } from "../lib/utils/validation";
import { ACCEPTED_FILE_FORMATS, MAX_FILE_SIZE_BYTES } from "../lib/constants";

/**
 * Hook for handling document uploads
 */
export function useDocumentUpload() {
  const [uploads, setUploads] = useState<Map<string, { progress: number; status: "pending" | "completed" | "error" }>>(new Map());

  const uploadFile = useCallback(
    async (file: File, documentType: string, acceptedFormats?: string[]): Promise<UploadedDocument | null> => {
      const documentId = `doc-${Date.now()}-${Math.random()}`;
      
      // Validate file
      const validation = validateFile(file, acceptedFormats || ACCEPTED_FILE_FORMATS.all, MAX_FILE_SIZE_BYTES);
      if (!validation.isValid) {
        setUploads((prev) => new Map(prev).set(documentId, { progress: 0, status: "error" }));
        return null;
      }

      // Simulate upload progress
      setUploads((prev) => new Map(prev).set(documentId, { progress: 0, status: "pending" }));

      // Simulate file upload with progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        setUploads((prev) => new Map(prev).set(documentId, { progress: i, status: "pending" }));
      }

      // Create uploaded document record (in real app, file would be stored on server)
      const uploadedDoc: UploadedDocument = {
        id: documentId,
        type: documentType as any,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        uploadedAt: new Date().toISOString(),
        status: "Pending",
        url: URL.createObjectURL(file), // Temporary URL for preview
        storagePath: `/uploads/${documentId}/${file.name}`,
      };

      setUploads((prev) => new Map(prev).set(documentId, { progress: 100, status: "completed" }));
      return uploadedDoc;
    },
    []
  );

  return {
    uploads: Object.fromEntries(uploads),
    uploadFile,
  };
}

/**
 * Hook for managing registration steps state
 */
export function useRegistrationStep(initialStep: 1 | 2 | 3 | 4 = 1) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(initialStep);
  const [completedSteps, setCompletedSteps] = useState<Set<1 | 2 | 3 | 4>>(new Set());

  const markStepComplete = useCallback((step: 1 | 2 | 3 | 4): void => {
    setCompletedSteps((prev) => new Set([...prev, step]));
  }, []);

  const goToStep = useCallback((step: 1 | 2 | 3 | 4): void => {
    setCurrentStep(step);
  }, []);

  const nextStep = useCallback((): void => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
      markStepComplete(currentStep);
    }
  }, [currentStep, markStepComplete]);

  const previousStep = useCallback((): void => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    }
  }, [currentStep]);

  const isStepCompleted = (step: 1 | 2 | 3 | 4): boolean => completedSteps.has(step);
  const progress = Math.round(((completedSteps.size + (completedSteps.has(currentStep) ? 0 : 1)) / 4) * 100);

  return {
    currentStep,
    completedSteps,
    markStepComplete,
    goToStep,
    nextStep,
    previousStep,
    isStepCompleted,
    progress,
  };
}

/**
 * Hook for managing squad selection state
 */
export function useSquadSelection(maxPlayers: number = 23, minPlayers: number = 18) {
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<Set<string>>(new Set());
  const [shirtNumbers, setShirtNumbers] = useState<Record<string, number>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addPlayer = useCallback(
    (playerId: string, shirtNumber?: number): boolean => {
      if (selectedPlayerIds.size >= maxPlayers) {
        setErrors((prev) => ({
          ...prev,
          squad: `Maksimal ${maxPlayers} pemain sudah tercapai`,
        }));
        return false;
      }

      if (shirtNumber !== undefined && Object.values(shirtNumbers).includes(shirtNumber)) {
        setErrors((prev) => ({
          ...prev,
          shirtNumber: `Nomor punggung ${shirtNumber} sudah digunakan`,
        }));
        return false;
      }

      setSelectedPlayerIds((prev) => new Set([...prev, playerId]));
      if (shirtNumber !== undefined) {
        setShirtNumbers((prev) => ({
          ...prev,
          [playerId]: shirtNumber,
        }));
      }

      setErrors((prev) => ({ ...prev, squad: "", shirtNumber: "" }));
      return true;
    },
    [selectedPlayerIds, shirtNumbers, maxPlayers]
  );

  const removePlayer = useCallback((playerId: string): void => {
    setSelectedPlayerIds((prev) => {
      const updated = new Set(prev);
      updated.delete(playerId);
      return updated;
    });
    setShirtNumbers((prev) => {
      const updated = { ...prev };
      delete updated[playerId];
      return updated;
    });
  }, []);

  const togglePlayer = useCallback(
    (playerId: string, shirtNumber?: number): boolean => {
      if (selectedPlayerIds.has(playerId)) {
        removePlayer(playerId);
        return true;
      } else {
        return addPlayer(playerId, shirtNumber);
      }
    },
    [selectedPlayerIds, addPlayer, removePlayer]
  );

  const updateShirtNumber = useCallback((playerId: string, shirtNumber: number): boolean => {
    if (Object.values(shirtNumbers).includes(shirtNumber)) {
      setErrors((prev) => ({
        ...prev,
        shirtNumber: `Nomor punggung ${shirtNumber} sudah digunakan`,
      }));
      return false;
    }

    setShirtNumbers((prev) => ({
      ...prev,
      [playerId]: shirtNumber,
    }));

    setErrors((prev) => ({ ...prev, shirtNumber: "" }));
    return true;
  }, [shirtNumbers]);

  const isValid = (): boolean => {
    const count = selectedPlayerIds.size;
    return count >= minPlayers && count <= maxPlayers;
  };

  const getValidationError = (): string => {
    const count = selectedPlayerIds.size;
    if (count < minPlayers) return `Minimal ${minPlayers} pemain harus dipilih`;
    if (count > maxPlayers) return `Maksimal ${maxPlayers} pemain boleh dipilih`;
    return "";
  };

  return {
    selectedPlayerIds,
    shirtNumbers,
    errors,
    addPlayer,
    removePlayer,
    togglePlayer,
    updateShirtNumber,
    isValid,
    getValidationError,
    selectedCount: selectedPlayerIds.size,
  };
}

/**
 * Hooks barrel export
 */
export { useCompetitionRegistration } from "./useCompetitionRegistration";
