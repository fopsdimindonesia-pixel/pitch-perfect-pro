import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, AlertCircle } from "lucide-react";

export default function RegistrationDeadline() {
  const daysRemaining = 12;
  const hoursRemaining = 5;

  return (
    <div className="space-y-6" role="main" aria-label="Registration deadline">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Registration Deadline</h1>
        <p className="text-muted-foreground mt-1">Configure and monitor registration deadlines</p>
      </div>

      {/* Countdown */}
      <Card className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Time Remaining</p>
          <div className="grid grid-cols-3 gap-4 justify-center mb-6">
            <div className="bg-white rounded-lg p-4">
              <p className="text-3xl font-bold text-blue-600">{daysRemaining}</p>
              <p className="text-xs text-muted-foreground">Days</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-3xl font-bold text-blue-600">{hoursRemaining}</p>
              <p className="text-xs text-muted-foreground">Hours</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-3xl font-bold text-blue-600">45</p>
              <p className="text-xs text-muted-foreground">Minutes</p>
            </div>
          </div>
          <Badge className="bg-orange-100 text-orange-800 flex items-center gap-2 w-fit mx-auto">
            <Clock className="w-4 h-4" />
            Deadline: April 30, 2024 23:59
          </Badge>
        </div>
      </Card>

      {/* Configuration */}
      <Card className="p-6">
        <h2 className="font-semibold mb-4">Deadline Configuration</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Deadline Date & Time</label>
            <div className="flex gap-2 mt-2">
              <Input type="date" defaultValue="2024-04-30" />
              <Input type="time" defaultValue="23:59" />
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
            <p className="text-sm text-orange-700">
              Send reminder email to clubs 7 days before deadline
            </p>
          </div>

          <Button>Update Deadline</Button>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Total Expected</p>
          <p className="text-2xl font-bold mt-2">32</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Registered So Far</p>
          <p className="text-2xl font-bold text-green-600 mt-2">24</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Remaining</p>
          <p className="text-2xl font-bold text-orange-600 mt-2">8</p>
        </Card>
      </div>
    </div>
  );
}
