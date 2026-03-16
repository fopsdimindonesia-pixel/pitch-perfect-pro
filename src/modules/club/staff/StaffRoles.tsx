import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Shield, Trash2 } from "lucide-react";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ConfirmDialog";

interface StaffRole {
  id: string;
  name: string;
  category: string;
  description: string;
  staffCount: number;
  permissions: string[];
  accessLevel: "Admin" | "Manager" | "Staff" | "View-Only";
}

export default function StaffRoles() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    roleToDelete: null as StaffRole | null,
    isLoading: false,
  });

  const roles: StaffRole[] = [
    {
      id: "1",
      name: "Head Coach",
      category: "Coaching",
      description: "Overall team training and match preparation",
      staffCount: 1,
      accessLevel: "Admin",
      permissions: [
        "View player profiles",
        "Manage training sessions",
        "Create match strategies",
        "Edit player positions",
        "Access medical reports",
        "Manage assistant coaches",
        "Submit reports",
      ],
    },
    {
      id: "2",
      name: "Assistant Coach",
      category: "Coaching",
      description: "Support head coach in team management",
      staffCount: 2,
      accessLevel: "Manager",
      permissions: [
        "View player profiles",
        "Manage training sessions",
        "View match strategies",
        "View player positions",
        "Access medical reports",
        "Submit observations",
      ],
    },
    {
      id: "3",
      name: "Team Manager",
      category: "Management",
      description: "Overall team coordination and liaison",
      staffCount: 1,
      accessLevel: "Manager",
      permissions: [
        "Schedule management",
        "Player availability tracking",
        "Communication coordination",
        "Welfare oversight",
        "Conflict resolution",
        "Report generation",
      ],
    },
    {
      id: "4",
      name: "Club Doctor",
      category: "Medical",
      description: "Medical oversight and player health",
      staffCount: 1,
      accessLevel: "Manager",
      permissions: [
        "View player medical records",
        "Create medical reports",
        "Manage injury records",
        "Approve player participation",
        "Contact medical team",
      ],
    },
    {
      id: "5",
      name: "Physiotherapist",
      category: "Medical",
      description: "Injury prevention and rehabilitation",
      staffCount: 2,
      accessLevel: "Staff",
      permissions: [
        "View player profiles",
        "Create physiotherapy reports",
        "Update injury status",
        "Manage rehabilitation plans",
      ],
    },
    {
      id: "6",
      name: "Nutritionist",
      category: "Support",
      description: "Player nutrition and diet management",
      staffCount: 1,
      accessLevel: "Staff",
      permissions: [
        "View player profiles",
        "Create nutrition plans",
        "Track dietary compliance",
        "Generate nutrition reports",
      ],
    },
  ];

  const accessLevelColors: Record<string, string> = {
    Admin: "bg-red-100 text-red-800",
    Manager: "bg-blue-100 text-blue-800",
    Staff: "bg-green-100 text-green-800",
    "View-Only": "bg-gray-100 text-gray-800",
  };

  const selectedRoleData = roles.find(r => r.id === selectedRole);

  const handleDeleteRole = (role: StaffRole) => {
    setConfirmDialog({
      open: true,
      roleToDelete: role,
      isLoading: false,
    });
  };

  const handleConfirmDelete = async () => {
    setConfirmDialog(prev => ({ ...prev, isLoading: true }));
    // Simulate async deletion
    await new Promise(resolve => setTimeout(resolve, 500));
    setConfirmDialog({
      open: false,
      roleToDelete: null,
      isLoading: false,
    });
    // In real app, would delete the role
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Staff Roles & Permissions</h1>
          <p className="text-muted-foreground mt-1">Manage role definitions and access levels</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Role
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold">{roles.length}</p>
            <p className="text-sm text-muted-foreground mt-2">Total Roles</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold">{roles.reduce((sum, r) => sum + r.staffCount, 0)}</p>
            <p className="text-sm text-muted-foreground mt-2">Staff Members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold text-primary">3</p>
            <p className="text-sm text-muted-foreground mt-2">Access Levels</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Roles</CardTitle>
              <CardDescription>Select a role to view permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedRole === role.id
                      ? "border-primary bg-primary/5"
                      : "border-transparent hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{role.name}</p>
                      <p className="text-xs text-muted-foreground">{role.category}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {role.staffCount}
                    </Badge>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div>
          {selectedRoleData ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{selectedRoleData.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {selectedRoleData.description}
                    </CardDescription>
                  </div>
                  <Shield className="w-5 h-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm font-semibold mb-2">Access Level</p>
                  <Badge className={accessLevelColors[selectedRoleData.accessLevel]}>
                    {selectedRoleData.accessLevel}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-3">Staff in this role: {selectedRoleData.staffCount}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-3">Permissions</p>
                  <div className="space-y-2">
                    {selectedRoleData.permissions.map((permission, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Checkbox defaultChecked disabled />
                        <span className="text-sm">{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full">Edit Role</Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Select a role to view details</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Role Hierarchy</CardTitle>
          <CardDescription>Access levels and delegation structure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Role</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Staff Count</TableHead>
                  <TableHead>Access Level</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{role.category}</Badge>
                    </TableCell>
                    <TableCell>{role.staffCount}</TableCell>
                    <TableCell>
                      <Badge className={accessLevelColors[role.accessLevel]}>
                        {role.accessLevel}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {role.permissions.length} permissions
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedRole(role.id)}
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteRole(role)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-lg">Access Level Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="font-semibold text-sm text-blue-900">Admin</p>
            <p className="text-sm text-blue-800 mt-1">Full system access, can manage other users and settings</p>
          </div>
          <div>
            <p className="font-semibold text-sm text-blue-900">Manager</p>
            <p className="text-sm text-blue-800 mt-1">Can manage staff and data in their area of responsibility</p>
          </div>
          <div>
            <p className="font-semibold text-sm text-blue-900">Staff</p>
            <p className="text-sm text-blue-800 mt-1">Can create and edit own data and assignments</p>
          </div>
          <div>
            <p className="font-semibold text-sm text-blue-900">View-Only</p>
            <p className="text-sm text-blue-800 mt-1">Can read data but cannot create or modify</p>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={confirmDialog.open}
        title="Delete Role"
        description={`Are you sure you want to delete the "${confirmDialog.roleToDelete?.name}" role? This action cannot be undone.`}
        actionLabel="Delete Role"
        cancelLabel="Cancel"
        isDangerous={true}
        isLoading={confirmDialog.isLoading}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDialog({ open: false, roleToDelete: null, isLoading: false })}
      />
    </div>
  );
}
