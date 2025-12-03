import { NavHeader } from "@/components/nav-header";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getOrganizations, getStats } from "@/lib/data";
import type { Organization } from "@/lib/types";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Plus,
  UserCheck,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

function DashboardPage() {
  const [stats, setStats] = useState({
    totalOrganizations: 0,
    totalEmployees: 0,
    activeEmployees: 0,
    industries: 0,
  });
  const [recentOrgs, setRecentOrgs] = useState<Organization[]>([]);

  useEffect(() => {
    setStats(getStats());
    setRecentOrgs(getOrganizations().slice(-5).reverse());
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your organizations and employees
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="Total Organizations"
            value={stats.totalOrganizations}
            icon={Building2}
          />
          <StatCard
            title="Total Employees"
            value={stats.totalEmployees}
            icon={Users}
          />
          <StatCard
            title="Active Employees"
            value={stats.activeEmployees}
            icon={UserCheck}
          />
          <StatCard
            title="Industries"
            value={stats.industries}
            icon={Briefcase}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Organizations</CardTitle>
                <CardDescription>Latest organizations added</CardDescription>
              </div>
              <Button asChild size="sm">
                <Link to="/organizations/new">
                  <Plus className="h-4 w-4 mr-1" />
                  Add New
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {recentOrgs.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-6">
                  No organizations yet. Create your first one!
                </p>
              ) : (
                <div className="space-y-3">
                  {recentOrgs.map((org) => (
                    <Link
                      key={org.id}
                      to={"/organizations/$id"}
                      params={{ id: org.id }}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <div>
                        <p className="font-medium">{org.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {org.industry}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {org.employeeCount}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                to="/organizations/new"
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Create Organization</p>
                    <p className="text-sm text-muted-foreground">
                      Add a new organization
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link
                to="/employees/new"
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Add Employee</p>
                    <p className="text-sm text-muted-foreground">
                      Add a new team member
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link
                to="/organizations"
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">View All Organizations</p>
                    <p className="text-sm text-muted-foreground">
                      Browse and manage
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
