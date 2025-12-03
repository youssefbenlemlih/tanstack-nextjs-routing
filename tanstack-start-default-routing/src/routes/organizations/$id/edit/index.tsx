import { NavHeader } from "@/components/nav-header";
import { OrganizationForm } from "@/components/organization-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getOrganization } from "@/lib/data";
import type { Organization } from "@/lib/types";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/organizations/$id/edit/")({
  component: EditOrganizationPage,
});

function EditOrganizationPage() {
  const params = Route.useParams();
  const [organization, setOrganization] = useState<Organization | null>(null);

  useEffect(() => {
    const org = getOrganization(params.id as string);
    if (org) setOrganization(org);
  }, [params.id]);

  if (!organization) {
    return (
      <div className="min-h-screen bg-background">
        <NavHeader />
        <main className="container mx-auto px-4 py-8">
          <p>Organization not found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Edit Organization</CardTitle>
              <CardDescription>Update organization details</CardDescription>
            </CardHeader>
            <CardContent>
              <OrganizationForm organization={organization} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
