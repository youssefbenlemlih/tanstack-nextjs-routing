import { EmployeeForm } from "@/components/employee-form";
import { NavHeader } from "@/components/nav-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/organizations/$id/employees/new/")({
  component: NewEmployeePage,
});
export default function NewEmployeePage() {
  const params = Route.useParams();

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
