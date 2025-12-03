import { EmployeeForm } from "@/components/employee-form";
import { NavHeader } from "@/components/nav-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getEmployee } from "@/lib/data";
import type { Employee } from "@/lib/types";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/employees/$id/edit/")({
  component: EditEmployeePage,
});

function EditEmployeePage() {
  const params = Route.useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const emp = getEmployee(params.id as string);
    if (emp) setEmployee(emp);
  }, [params.id]);

  if (!employee) {
    return (
      <div className="min-h-screen bg-background">
        <NavHeader />
        <main className="container mx-auto px-4 py-8">
          <p>Employee not found</p>
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
              <CardTitle>Edit Employee</CardTitle>
              <CardDescription>Update employee details</CardDescription>
            </CardHeader>
            <CardContent>
              <EmployeeForm employee={employee} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
