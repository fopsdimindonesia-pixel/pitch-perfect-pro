import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Award, Shield, Edit2, Save, X } from "lucide-react";
import { mockClubData } from "@/lib/mockClubData";
import { useState, useMemo } from "react";

export default function CoachManagement() {
  const { coaches: initialCoaches } = mockClubData;
  const [coaches, setCoaches] = useState(initialCoaches);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [searchText, setSearchText] = useState("");

  const filteredCoaches = useMemo(() => {
    return coaches.filter(coach => 
      coach.name.toLowerCase().includes(searchText.toLowerCase()) ||
      coach.specialty.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [coaches, searchText]);

  const stats = useMemo(() => ({
    total: coaches.length,
    pro: coaches.filter(c => c.license === "UEFA_PRO").length,
    experience: coaches.reduce((sum, c) => sum + c.yearsExperience, 0),
  }), [coaches]);

  const handleEdit = (coach: any) => {
    setIsEditing(coach.id);
    setFormData(coach);
  };

  const handleSave = () => {
    if (isEditing) {
      setCoaches(coaches.map(c => c.id === isEditing ? formData : c));
      setIsEditing(null);
      setFormData({});
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setFormData({});
  };

  const licenseColors: Record<string, string> = {
    UEFA_PRO: "bg-gold text-navy",
    UEFA_A: "bg-primary text-white",
    UEFA_B: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Coach management">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold\">Coach Management</h1>
          <p className="text-muted-foreground mt-1">Manage coaching staff and licenses</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Coach
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search by name or specialty..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="max-w-xs"
        />
        {searchText && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchText("")}
            className="h-9 w-9 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold">{stats.total}</p>
            <p className="text-sm text-muted-foreground mt-2">Total Coaches</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold">{stats.pro}</p>
            <p className="text-sm text-muted-foreground mt-2">UEFA Pro Licensed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold text-gold">{stats.experience}</p>
            <p className="text-sm text-muted-foreground mt-2">Years Combined Experience</p>
          </CardContent>
        </Card>
      </div>

      {filteredCoaches.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No coaches found. Try adjusting your search.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCoaches.map((coach) => (
          isEditing === coach.id ? (
            <Card key={coach.id} className="border-primary">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Edit Coach</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Coach name"
                  />
                </div>

                <div>
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select value={formData.specialty} onValueChange={(value) => setFormData({ ...formData, specialty: value })}>
                    <SelectTrigger id="specialty">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Tactical">Tactical</SelectItem>
                      <SelectItem value="Physical">Physical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="license">License</Label>
                  <Select value={formData.license} onValueChange={(value) => setFormData({ ...formData, license: value })}>
                    <SelectTrigger id="license">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UEFA_PRO">UEFA PRO</SelectItem>
                      <SelectItem value="UEFA_A">UEFA A</SelectItem>
                      <SelectItem value="UEFA_B">UEFA B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="experience">Years Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={formData.yearsExperience}
                    onChange={(e) => setFormData({ ...formData, yearsExperience: parseInt(e.target.value) })}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="coach@email.com"
                  />
                </div>

                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSave} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel} className="flex-1">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card key={coach.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{coach.name}</CardTitle>
                    <CardDescription>{coach.specialty}</CardDescription>
                  </div>
                  <Badge className={licenseColors[coach.license]}>
                    {coach.license.replace("_", " ")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Experience</p>
                    <p className="font-semibold mt-1">{coach.yearsExperience} years</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Nationality</p>
                    <p className="font-semibold mt-1">{coach.nationality}</p>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground text-xs mb-2">Specialties & Skills</p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">
                      {coach.specialty === "Technical" && "Ball Control"}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {coach.specialty === "Tactical" && "Formation"}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {coach.specialty === "Physical" && "Fitness"}
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground text-xs mb-2">Contact</p>
                  <p className="text-sm">{coach.email}</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Profile
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(coach)}
                    className="flex-1"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>License Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Badge className="bg-gold text-navy w-20">UEFA PRO</Badge>
              <div>
                <p className="font-medium text-sm">Pro License (UEFA A License)</p>
                <p className="text-xs text-muted-foreground">Highest coaching qualification</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-primary text-white w-20">UEFA A</Badge>
              <div>
                <p className="font-medium text-sm">A License</p>
                <p className="text-xs text-muted-foreground">Advanced coaching certification</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-100 text-blue-800 w-20">UEFA B</Badge>
              <div>
                <p className="font-medium text-sm">B License</p>
                <p className="text-xs text-muted-foreground">Intermediate coaching certification</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
