"use client";

import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Building2, LayoutDashboard, Users } from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/organizations", label: "Organizations", icon: Building2 },
  { href: "/employees", label: "Employees", icon: Users },
];

export function NavHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">OrgManager</span>
        </Link>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            return (
              <Link
                key={item.href}
                to={item.href}
                activeProps={{
                  className: cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    "bg-primary text-primary-foreground",
                  ),
                }}
                inactiveProps={{
                  className: cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    "text-muted-foreground hover:bg-muted hover:text-foreground",
                  ),
                }}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
