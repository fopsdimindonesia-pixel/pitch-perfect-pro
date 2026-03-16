import { Card } from "@/components/ui/card";
import { mockHierarchy } from "@/lib/mockData";
import { ChevronRight } from "lucide-react";

const renderHierarchyTree = (node: any, level = 0) => {
  return (
    <div key={node.name} className="ml-4">
      <div className="flex items-center py-2">
        {node.children?.length > 0 && <ChevronRight className="w-4 h-4 mr-2" />}
        <span className={level === 0 ? "font-bold text-lg" : "font-medium"}>{node.name}</span>
      </div>
      {node.children?.map((child: any) => renderHierarchyTree(child, level + 1))}
    </div>
  );
};

export default function OrganizationHierarchy() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organization Hierarchy</h1>
        <p className="text-muted-foreground mt-1">View organizational structure</p>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Organizational Chart</h2>
        <div className="border-l-2 border-blue-300 pl-4">
          {renderHierarchyTree(mockHierarchy)}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Summary</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Levels</p>
            <p className="text-3xl font-bold">3</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Regional Units</p>
            <p className="text-3xl font-bold">2</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Organizations</p>
            <p className="text-3xl font-bold">5</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
