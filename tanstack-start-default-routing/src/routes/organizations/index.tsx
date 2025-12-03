"use client";

import { DeleteDialog } from "@/components/delete-dialog";
import { NavHeader } from "@/components/nav-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteOrganization, getOrganizations } from "@/lib/data";
import type { Organization } from "@/lib/types";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, ExternalLink, Pencil, Plus, Users } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/organizations/")({
  component: OrganizationsPage,
});

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    setOrganizations(getOrganizations());
  }, []);

  const handleDelete = (id: string) => {
    deleteOrganization(id);
    setOrganizations(getOrganizations());
  };

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Organizations</h1>
            <p className="text-muted-foreground mt-1">
              Manage your organizations
            </p>
          </div>
          <Button asChild>
            <Link to="/organizations/new">
              <Plus className="h-4 w-4 mr-2" />
              New Organization
            </Link>
          </Button>
        </div>

        {organizations.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No organizations yet
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Get started by creating your first organization
              </p>
              <Button asChild>
                <Link to="/organizations/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Organization
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {organizations.map((org) => (
              <Card key={org.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="truncate">
                        <Link
                          to={`/organizations/${org.id}`}
                          className="hover:underline"
                        >
                          {org.name}
                        </Link>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        <Badge variant="secondary">{org.industry}</Badge>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/organizations/${org.id}/edit`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <DeleteDialog
                        title="Delete Organization"
                        description={`Are you sure you want to delete "${org.name}"? This will also delete all employees associated with this organization.`}
                        onConfirm={() => handleDelete(org.id)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {org.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {org.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{org.employeeCount} employees</span>
                    </div>
                    {org.website && (
                      <a
                        href={org.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Website
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
