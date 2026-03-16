import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockCertifications } from "@/lib/mockData";
import { Award } from "lucide-react";

export default function OrganizationCertification() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organization Certifications</h1>
        <p className="text-muted-foreground mt-1">Display certifications and achievements</p>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockCertifications.map((cert) => (
          <Card key={cert.id} className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <Award className="w-12 h-12 text-amber-500 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{cert.name}</h3>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              </div>
              <Badge className={cert.status === "Valid" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                {cert.status}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Issued</p>
                <p className="font-medium">{cert.issueDate}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Expires</p>
                <p className="font-medium">{cert.expiryDate}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
