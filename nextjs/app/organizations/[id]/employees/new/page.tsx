"use client";

import { useParams } from "next/navigation";
import { NavHeader } from "@/components/nav-header";
import { EmployeeForm } from "@/components/employee-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NewEmployeePage() {
  const params = useParams();

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Add Employee</CardTitle>
              <CardDescription>
                Add a new employee to this organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmployeeForm organizationId={params.id as string} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
