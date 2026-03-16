import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, AlertCircle, Edit2, Save, X } from "lucide-react";
import { mockClubData } from "@/lib/mockClubData";
import { useState, useMemo } from "react";

export default function MedicalStaff() {
  const { medicalStaff: initialStaff } = mockClubData;
  const [medicalStaff, setMedicalStaff] = useState(initialStaff);
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  const filteredStaff = useMemo(() => {
    return medicalStaff.filter(member =>
      (member.name.toLowerCase().includes(searchText.toLowerCase()) ||
       member.email.toLowerCase().includes(searchText.toLowerCase())) &&
      (!roleFilter || member.role === roleFilter)
    );
  }, [medicalStaff, searchText, roleFilter]);

  const roles = useMemo(() => {
    return [...new Set(medicalStaff.map(m => m.role))].sort();
  }, [medicalStaff]);

  const stats = useMemo(() => ({
    total: filteredStaff.length,
    physicians: filteredStaff.filter(m => m.role === "Chief Physician").length,
    physiotherapists: filteredStaff.filter(m => m.role === "Team Physiotherapist").length,
  }), [filteredStaff]);

  const handleEdit = (member: any) => {
    setIsEditing(member.id);
    setFormData(member);
  };

  const handleSave = () => {
    if (isEditing) {
      setMedicalStaff(medicalStaff.map(m => m.id === isEditing ? formData : m));
      setIsEditing(null);
      setFormData({});
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setFormData({});
  };

  const roleColors: Record<string, string> = {
    "Chief Physician": "bg-red-100 text-red-800",
    "Team Physiotherapist": "bg-blue-100 text-blue-800",
    "Club Doctor": "bg-purple-100 text-purple-800",
    "Nutritionist": "bg-green-100 text-green-800",
    "Sports Psychologist": "bg-orange-100 text-orange-800",
  };

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Medical staff management">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Medical Staff</h1>
          <p className="text-muted-foreground mt-1">Health and wellness personnel</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Staff
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search by name or email..."
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
        <div>
          <Label className="text-xs mb-2 block">Filter by Role</Label>
          <div className="flex flex-wrap gap-1">
            <Button
              variant={!roleFilter ? "default" : "outline"}
              size="sm"
              onClick={() => setRoleFilter("")}
            >
              All Roles
            </Button>
            {roles.map(role => (
              <Button
                key={role}
                variant={roleFilter === role ? "default" : "outline"}
                size="sm"
                onClick={() => setRoleFilter(role)}
                className="text-xs"
              >
                {role.split(" ")[0]}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold">{stats.total}</p>
            <p className="text-sm text-muted-foreground mt-2">Total Medical Staff</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold text-gold">{stats.physicians}</p>
            <p className="text-sm text-muted-foreground mt-2">Chief Physicians</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold text-primary">{stats.physiotherapists}</p>
            <p className="text-sm text-muted-foreground mt-2">Physiotherapists</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold text-green-600">0</p>
            <p className="text-sm text-muted-foreground mt-2">Active Consultations</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Medical Personnel</CardTitle>
          <CardDescription>Complete medical team registry</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredStaff.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No medical staff found. Try adjusting your filters.
              {(searchText || roleFilter) && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => { setSearchText(""); setRoleFilter(""); }}
                  className="mt-2"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>License/Degree</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.map((member) => (
                    <TableRow key={member.id} className="hover:bg-muted/50">
                      {isEditing === member.id ? (
                        <>
                          <TableCell>
                            <Input
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              size={1}
                              className="h-8"
                            />
                          </TableCell>
                          <TableCell>
                            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                              <SelectTrigger className="h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {roles.map(role => (
                                  <SelectItem key={role} value={role}>{role}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Input
                              value={formData.certification}
                              onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
                              size={1}
                              className="h-8"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              size={1}
                              className="h-8"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              size={1}
                              className="h-8"
                            />
                          </TableCell>
                          <TableCell colSpan={2}>
                            <div className="flex gap-1">
              <Button size="sm" onClick={handleSave}>
                <Save className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X className="w-3 h-3" />
              </Button>
                            </div>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell className="font-medium">{member.name}</TableCell>
                          <TableCell>
                            <Badge className={roleColors[member.role] || "bg-gray-100 text-gray-800"}>
                              {member.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">{member.certification}</TableCell>
                          <TableCell className="text-sm">{member.email}</TableCell>
                          <TableCell className="text-sm">{member.phone}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(member)}
                            >
                              <Edit2 className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Available Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full mt-2 bg-green-600" />
              <div>
                <p className="font-medium text-sm">Medical Consultations</p>
                <p className="text-xs text-muted-foreground">Doctor appointments and check-ups</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full mt-2 bg-blue-600" />
              <div>
                <p className="font-medium text-sm">Physiotherapy</p>
                <p className="text-xs text-muted-foreground">Injury prevention and rehabilitation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full mt-2 bg-orange-600" />
              <div>
                <p className="font-medium text-sm">Nutritional Guidance</p>
                <p className="text-xs text-muted-foreground">Meal planning and diet optimization</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full mt-2 bg-purple-600" />
              <div>
                <p className="font-medium text-sm">Mental Health Support</p>
                <p className="text-xs text-muted-foreground">Psychology and stress management</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              Important Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>All medical staff must maintain current certifications and licenses.</p>
            <p>Player consultations require proper documentation and follow FIFA anti-doping protocols.</p>
            <p>Medical records are confidential and protected under health data regulations.</p>
            <p>Emergency contact information must be updated quarterly.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
