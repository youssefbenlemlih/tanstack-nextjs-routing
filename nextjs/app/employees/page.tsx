"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Users, Pencil, Building2, Mail } from "lucide-react";
import { NavHeader } from "@/components/nav-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DeleteDialog } from "@/components/delete-dialog";
import { getEmployees, getOrganization, deleteEmployee } from "@/lib/data";
import type { Employee } from "@/lib/types";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    setEmployees(getEmployees());
  }, []);

  const handleDelete = (id: string) => {
    deleteEmployee(id);
    setEmployees(getEmployees());
  };

  const getOrgName = (orgId: string) => {
    const org = getOrganization(orgId);
    return org?.name ?? "Unknown";
  };

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
            <p className="text-muted-foreground mt-1">
              Manage all employees across organizations
            </p>
          </div>
          <Button asChild>
            <Link href="/employees/new">
              <Plus className="h-4 w-4 mr-2" />
              New Employee
            </Link>
          </Button>
        </div>

        {employees.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No employees yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Get started by adding your first employee
              </p>
              <Button asChild>
                <Link href="/employees/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Employee
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {employees.map((employee) => (
              <Card key={employee.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-lg font-medium">
                      {employee.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {employee.email}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{employee.role}</Badge>
                        <Badge variant="outline">{employee.department}</Badge>
                        <Link
                          href={`/organizations/${employee.organizationId}`}
                          className="flex items-center gap-1 text-xs text-primary hover:underline"
                        >
                          <Building2 className="h-3 w-3" />
                          {getOrgName(employee.organizationId)}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        employee.status === "active" ? "default" : "secondary"
                      }
                    >
                      {employee.status}
                    </Badge>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/employees/${employee.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DeleteDialog
                      title="Delete Employee"
                      description={`Are you sure you want to delete "${employee.name}"?`}
                      onConfirm={() => handleDelete(employee.id)}
                    />
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
