"use client";

import { useEffect, useState } from "react";
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
import { getEmployee } from "@/lib/data";
import type { Employee } from "@/lib/types";

export default function EditEmployeePage() {
  const params = useParams();
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
