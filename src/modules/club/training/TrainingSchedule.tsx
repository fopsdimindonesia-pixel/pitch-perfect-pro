import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Users, Clock, MapPin, Edit2, Save, X } from "lucide-react";
import { useState, useMemo } from "react";

export default function TrainingSchedule() {
  const initialSessions = [
    { id: 1, date: "2024-03-20", time: "09:00", venue: "Main Pitch", team: "Senior", level: "Tactical", players: 25 },
    { id: 2, date: "2024-03-20", time: "14:00", venue: "Practice Pitch", team: "U18", level: "Conditioning", players: 18 },
    { id: 3, date: "2024-03-21", time: "10:00", venue: "Main Pitch", team: "U14", level: "Skills", players: 22 },
    { id: 4, date: "2024-03-22", time: "08:00", venue: "Training Complex", team: "U20", level: "Technical", players: 19 },
    { id: 5, date: "2024-03-22", time: "15:30", venue: "Main Pitch", team: "Senior", level: "Match Prep", players: 24 },
  ];

  const [sessions, setSessions] = useState(initialSessions);
  const [searchText, setSearchText] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [formData, setFormData] = useState<any>({});

  const levels = useMemo(() => 
    [...new Set(sessions.map(s => s.level))].sort(),
    [sessions]
  );

  const filteredSessions = useMemo(() => {
    return sessions.filter(session =>
      (session.venue.toLowerCase().includes(searchText.toLowerCase()) ||
       session.team.toLowerCase().includes(searchText.toLowerCase())) &&
      (!levelFilter || session.level === levelFilter)
    );
  }, [sessions, searchText, levelFilter]);

  const handleEdit = (session: any) => {
    setIsEditing(session.id);
    setFormData(session);
  };

  const handleSave = () => {
    if (isEditing) {
      setSessions(sessions.map(s => s.id === isEditing ? formData : s));
      setIsEditing(null);
      setFormData({});
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setFormData({});
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Training Schedule</h1>
          <p className="text-muted-foreground mt-1">Weekly training sessions</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Schedule Session
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search by venue or team..."
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

      <div>
        <Label className="text-xs mb-2 block">Filter by Level</Label>
        <div className="flex flex-wrap gap-1">
          <Button
            variant={!levelFilter ? "default" : "outline"}
            size="sm"
            onClick={() => setLevelFilter("")}
          >
            All Levels
          </Button>
          {levels.map(level => (
            <Button
              key={level}
              variant={levelFilter === level ? "default" : "outline"}
              size="sm"
              onClick={() => setLevelFilter(level)}
            >
              {level}
            </Button>
          ))}
        </div>
      </div>

      {filteredSessions.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No training sessions found. Try adjusting your search or filters.
            {(searchText || levelFilter) && (
              <Button
                variant="link"
                size="sm"
                onClick={() => { setSearchText(""); setLevelFilter(""); }}
                className="mt-2"
              >
                Clear Filters
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredSessions.map(session => (
            isEditing === session.id ? (
              <Card key={session.id} className="border-primary">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`date-${session.id}`}>Date</Label>
                      <Input
                        id={`date-${session.id}`}
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`time-${session.id}`}>Time</Label>
                      <Input
                        id={`time-${session.id}`}
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`venue-${session.id}`}>Venue</Label>
                      <Input
                        id={`venue-${session.id}`}
                        value={formData.venue}
                        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                        placeholder="Training location"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`team-${session.id}`}>Team</Label>
                      <Input
                        id={`team-${session.id}`}
                        value={formData.team}
                        onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                        placeholder="Senior, U18, U14, etc."
                      />
                    </div>
                    <div>
                      <Label htmlFor={`level-${session.id}`}>Level</Label>
                      <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                        <SelectTrigger id={`level-${session.id}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {levels.map(level => (
                            <SelectItem key={level} value={level}>{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor={`players-${session.id}`}>Players</Label>
                      <Input
                        id={`players-${session.id}`}
                        type="number"
                        value={formData.players}
                        onChange={(e) => setFormData({ ...formData, players: parseInt(e.target.value) })}
                        min="1"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
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
              <Card key={session.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6 items-center">
                    <div>
                      <p className="text-sm font-semibold">{session.date}</p>
                      <p className="text-lg font-bold text-primary">{session.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-semibold">{session.venue}</p>
                        <p className="text-xs text-muted-foreground">{session.team}</p>
                      </div>
                    </div>
                    <div>
                      <Badge variant="outline">{session.level}</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-semibold">{session.players}</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEdit(session)}
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
    </div>
  );
}
