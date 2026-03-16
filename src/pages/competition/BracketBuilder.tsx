import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function BracketBuilder() {
  return (
    <div className="space-y-6" role="main" aria-label="Tournament bracket builder">
      <div>
        <h1 id="page-title" className="text-3xl font-bold">Bracket Builder</h1>
        <p className="text-muted-foreground mt-1">Design knockout tournament bracket</p>
      </div>

      <Card className="p-6">
        <div className="bg-gray-50 p-8 rounded-lg border-2 border-dashed border-gray-300 min-h-96">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Visual Bracket Layout</p>
            <div className="flex justify-between items-center gap-4 text-sm">
              <div className="flex'd-flex-col gap-2">
                <div className="border rounded p-2 w-20 text-center text-xs">Team A</div>
                <div className="border rounded p-2 w-20 text-center text-xs">Team B</div>
              </div>
              <span className="text-2xl">→</span>
              <div className="border rounded p-2 w-20 text-center text-xs bg-blue-50">SF1</div>
              <span className="text-2xl">→</span>
              <div className="border rounded p-2 w-20 text-center text-xs bg-green-50">Final</div>
            </div>
          </div>
        </div>
      </Card>

      <p className="text-sm text-muted-foreground">Interactive bracket builder with drag-and-drop team assignment</p>
    </div>
  );
}
