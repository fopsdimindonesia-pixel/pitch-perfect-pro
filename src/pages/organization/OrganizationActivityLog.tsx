import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockActivityLog } from "@/lib/mockData";

export default function OrganizationActivityLog() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organization Activity Log</h1>
        <p className="text-muted-foreground mt-1">Timeline of all organization activities</p>
      </div>

      {/* Filters */}
      <Card className="p-4 flex gap-4 flex-wrap">
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by user" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="ahmad">Ahmad Riyadi</SelectItem>
            <SelectItem value="budi">Budi Santoso</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="created">Created</SelectItem>
            <SelectItem value="updated">Updated</SelectItem>
            <SelectItem value="deleted">Deleted</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {/* Activity Timeline */}
      <div className="space-y-4">
        {mockActivityLog.map((log) => (
          <Card key={log.id} className="p-4">
            <div className="flex gap-4">
              <div className="w-2 h-12 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
              <div className="flex-1">
                <p className="font-semibold">{log.user}</p>
                <p className="text-sm text-muted-foreground">{log.action}</p>
                <p className="text-xs text-muted-foreground mt-1">{log.details}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(log.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
