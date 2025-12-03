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
import { deleteEmployee, getEmployees, getOrganization } from "@/lib/data";
import type { Employee, Organization } from "@/lib/types";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  Building2,
  Calendar,
  ExternalLink,
  Pencil,
  Plus,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/organizations/$id/")({
  component: OrganizationDetailPage,
});

export default function OrganizationDetailPage() {
  const params = Route.useParams();
  const router = useRouter();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const org = getOrganization(params.id as string);
    if (org) {
      setOrganization(org);
      setEmployees(getEmployees(org.id));
    }
  }, [params.id]);

  const handleDeleteEmployee = (id: string) => {
    deleteEmployee(id);
    setEmployees(getEmployees(params.id as string));
  };

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
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => router.history.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <Link
                      to={`/organizations/$id/edit`}
                      params={{ id: organization.id }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <CardTitle>{organization.name}</CardTitle>
                <CardDescription>
                  <Badge variant="secondary">{organization.industry}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {organization.description && (
                  <p className="text-sm text-muted-foreground">
                    {organization.description}
                  </p>
                )}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{organization.employeeCount} employees</span>
                  </div>
                  {organization.website && (
                    <a
                      href={organization.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {organization.website}
                    </a>
                  )}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Created{" "}
                      {new Date(organization.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Employees</CardTitle>
                  <CardDescription>
                    {employees.length} team members
                  </CardDescription>
                </div>
                <Button asChild size="sm">
                  <Link
                    to={`/organizations/$id/employees/new`}
                    params={{ id: organization.id }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Employee
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {employees.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No employees yet</p>
                    <Button asChild className="mt-3" size="sm">
                      <Link
                        to={`/organizations/$id/employees/new`}
                        params={{ id: organization.id }}
                      >
                        {" "}
                        <Plus className="h-4 w-4 mr-1" />
                        Add First Employee
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {employees.map((employee) => (
                      <div
                        key={employee.id}
                        className="flex items-center justify-between p-3 rounded-lg border"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-medium">
                            {employee.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{employee.role}</span>
                              <span>•</span>
                              <span>{employee.department}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              employee.status === "active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {employee.status}
                          </Badge>
                          <Button variant="ghost" size="icon" asChild>
                            <Link
                              to={`/employees/$id/edit`}
                              params={{ id: employee.id }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <DeleteDialog
                            title="Delete Employee"
                            description={`Are you sure you want to delete "${employee.name}"?`}
                            onConfirm={() => handleDeleteEmployee(employee.id)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
