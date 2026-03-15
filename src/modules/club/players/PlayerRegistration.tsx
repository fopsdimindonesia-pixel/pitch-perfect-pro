import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { Plus, AlertCircle } from "lucide-react";

export default function PlayerRegistration() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    nationality: "Indonesia",
    nIK: "",
    position: "Midfielder",
    height: "",
    weight: "",
    shirtNumber: "",
    preferredFoot: "Right",
    internationalClub: "",
    medicalClearance: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const positions = ["Goalkeeper", "Defender", "Midfielder", "Forward", "Winger"];
  const nationalities = ["Indonesia", "Malaysia", "Singapore", "Thailand", "Vietnam", "Philippines", "Other"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name required";
    if (!formData.birthDate) newErrors.birthDate = "Birth date required";
    if (!formData.nIK.trim()) newErrors.nIK = "NIK required";
    if (!formData.height) newErrors.height = "Height required";
    if (!formData.weight) newErrors.weight = "Weight required";
    if (!formData.shirtNumber) newErrors.shirtNumber = "Shirt number required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Player registration">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Player Registration</h1>
          <p className="text-muted-foreground mt-1">Register a new player to the club</p>
        </div>
      </div>

      {submitted && (
        <Alert className="border-green-200 bg-green-50">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Player registration submitted successfully. Documentation pending verification.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Player personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="e.g., Rizky"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="e.g., Pratama"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="birthDate">Date of Birth *</Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className={errors.birthDate ? "border-red-500" : ""}
                />
                {errors.birthDate && <p className="text-xs text-red-500 mt-1">{errors.birthDate}</p>}
              </div>
              <div>
                <Label htmlFor="nationality">Nationality *</Label>
                <Select value={formData.nationality} onValueChange={(v) => handleSelectChange("nationality", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {nationalities.map(n => (
                      <SelectItem key={n} value={n}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="nIK">National ID (NIK) *</Label>
              <Input
                id="nIK"
                name="nIK"
                placeholder="16-digit ID number"
                value={formData.nIK}
                onChange={handleInputChange}
                maxLength={16}
                className={errors.nIK ? "border-red-500" : ""}
              />
              {errors.nIK && <p className="text-xs text-red-500 mt-1">{errors.nIK}</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Physical Information</CardTitle>
            <CardDescription>Player measurements and specs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">Height (cm) *</Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  placeholder="e.g., 180"
                  value={formData.height}
                  onChange={handleInputChange}
                  className={errors.height ? "border-red-500" : ""}
                />
                {errors.height && <p className="text-xs text-red-500 mt-1">{errors.height}</p>}
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg) *</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  placeholder="e.g., 75"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className={errors.weight ? "border-red-500" : ""}
                />
                {errors.weight && <p className="text-xs text-red-500 mt-1">{errors.weight}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preferredFoot">Preferred Foot *</Label>
                <Select value={formData.preferredFoot} onValueChange={(v) => handleSelectChange("preferredFoot", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Left">Left</SelectItem>
                    <SelectItem value="Right">Right</SelectItem>
                    <SelectItem value="Both">Ambidextrous</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="blood">Blood Type</Label>
                <Select defaultValue="O">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="AB">AB</SelectItem>
                    <SelectItem value="O">O</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Assignment</CardTitle>
            <CardDescription>Player role and number</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="position">Position *</Label>
                <Select value={formData.position} onValueChange={(v) => handleSelectChange("position", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map(p => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="shirtNumber">Shirt Number *</Label>
                <Input
                  id="shirtNumber"
                  name="shirtNumber"
                  type="number"
                  placeholder="e.g., 7"
                  min="1"
                  max="99"
                  value={formData.shirtNumber}
                  onChange={handleInputChange}
                  className={errors.shirtNumber ? "border-red-500" : ""}
                />
                {errors.shirtNumber && <p className="text-xs text-red-500 mt-1">{errors.shirtNumber}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="internationalClub">Current/Previous Club</Label>
              <Input
                id="internationalClub"
                name="internationalClub"
                placeholder="e.g., FC Jakarta"
                value={formData.internationalClub}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="medical"
                checked={formData.medicalClearance}
                onChange={(e) => setFormData(prev => ({ ...prev, medicalClearance: e.target.checked }))}
              />
              <Label htmlFor="medical" className="text-sm">Medical clearance provided by club doctor</Label>
            </div>
            <p className="text-xs text-muted-foreground">All documents will be verified by the club management before final approval.</p>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" className="gap-2">
            <Plus className="w-4 h-4" />
            Register Player
          </Button>
          <Button type="button" variant="outline">Cancel</Button>
        </div>
      </form>
    </div>
  );
}
