import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, X } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { mockClubData } from "@/lib/mockClubData";
import { useState, useMemo } from "react";

export default function StaffRegistry() {
  const { staff } = mockClubData;
  const [searchText, setSearchText] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredStaff = useMemo(() => {
    return staff.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchText.toLowerCase()) || 
                          member.email.toLowerCase().includes(searchText.toLowerCase());
      const matchesDept = !departmentFilter || member.department === departmentFilter;
      const matchesStatus = !statusFilter || member.status === statusFilter;
      
      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [searchText, departmentFilter, statusFilter]);

  const departments = [...new Set(staff.map(s => s.department))];
  const statuses = [...new Set(staff.map(s => s.status))];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Staff Registry</h1>
          <p className="text-muted-foreground mt-1">Manage all club staff members</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Staff
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              className="pl-10"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && (
              <button
                onClick={() => setSearchText("")}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-semibold mb-2">Department</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!departmentFilter ? "default" : "outline"}
              size="sm"
              onClick={() => setDepartmentFilter(null)}
            >
              All
            </Button>
            {departments.map(dept => (
              <Button
                key={dept}
                variant={departmentFilter === dept ? "default" : "outline"}
                size="sm"
                onClick={() => setDepartmentFilter(departmentFilter === dept ? null : dept)}
              >
                {dept}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">Status</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!statusFilter ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(null)}
            >
              All
            </Button>
            {statuses.map(status => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(statusFilter === status ? null : status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      {filteredStaff.length > 0 ? (
        <div className="bg-white rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((s) => (
                <TableRow key={s.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.role}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{s.department}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{s.email}</TableCell>
                  <TableCell className="text-sm">{s.phone}</TableCell>
                  <TableCell>
                    <StatusBadge status={s.status.toLowerCase() as any} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{s.joinedAt}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <p className="text-muted-foreground text-sm">No staff found matching your filters</p>
            {(searchText || departmentFilter || statusFilter) && (
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setSearchText("");
                  setDepartmentFilter(null);
                  setStatusFilter(null);
                }}
              >
                Clear Filters
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-3xl font-bold">{filteredStaff.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Total Staff</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{filteredStaff.filter(s => s.status === "Active").length}</p>
              <p className="text-sm text-muted-foreground mt-1">Active</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{filteredStaff.filter(s => s.department === "Coaching").length}</p>
              <p className="text-sm text-muted-foreground mt-1">Coaching</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{filteredStaff.filter(s => s.department === "Medical").length}</p>
              <p className="text-sm text-muted-foreground mt-1">Medical</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
