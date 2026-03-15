import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Save, X } from "lucide-react";
import { useState } from "react";
import { mockClubData } from "@/lib/mockClubData";

export default function ClubProfile() {
  const club = mockClubData.club;
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: club.name,
    founded: club.founded.toString(),
    city: club.city,
    address: club.address,
    phone: club.phone,
    email: club.email,
    website: club.website,
    stadium: club.stadium,
  });

  const handleSave = () => {
    setIsEditing(false);
    // API call would go here
  };

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Club profile">
      <div className="flex items-center justify-between">
        <div>
          <h1 id="page-title" className="text-3xl font-bold">Club Profile</h1>
          <p className="text-muted-foreground mt-1">Manage club information</p>
        </div>
        <Button
          variant={isEditing ? "outline" : "default"}
          onClick={() => setIsEditing(!isEditing)}
          className="gap-2"
        >
          {isEditing ? (
            <>
              <X className="w-4 h-4" />
              Cancel
            </>
          ) : (
            <>
              <Edit className="w-4 h-4" />
              Edit
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Club Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label>Founded Year</Label>
              <Input
                type="number"
                value={form.founded}
                onChange={(e) => setForm({ ...form, founded: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label>City</Label>
              <Input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label>Stadium</Label>
              <Input
                value={form.stadium}
                onChange={(e) => setForm({ ...form, stadium: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Address</Label>
            <Textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              disabled={!isEditing}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Website</Label>
            <Input
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          {isEditing && (
            <Button onClick={handleSave} className="w-full gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Club Colors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              {club.colors.map((color, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className="w-16 h-16 rounded border"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm font-mono">{color}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Club Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Current Status</p>
              <p className="text-lg font-semibold text-green-600">{club.status}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
