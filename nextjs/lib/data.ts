import type { Organization, Employee } from "./types";

const ORGS_KEY = "organizations";
const EMPLOYEES_KEY = "employees";
const SEEDED_KEY = "data_seeded";

// Seed data
const SEED_ORGANIZATIONS: Organization[] = [
  {
    id: "org-1",
    name: "Acme Corporation",
    industry: "Technology",
    website: "https://acme.example.com",
    description:
      "A leading technology company specializing in innovative software solutions.",
    employeeCount: 3,
    createdAt: "2024-01-15T10:00:00.000Z",
  },
  {
    id: "org-2",
    name: "Global Finance Ltd",
    industry: "Finance",
    website: "https://globalfinance.example.com",
    description:
      "International financial services and investment management firm.",
    employeeCount: 2,
    createdAt: "2024-02-20T14:30:00.000Z",
  },
  {
    id: "org-3",
    name: "HealthCare Plus",
    industry: "Healthcare",
    website: "https://healthcareplus.example.com",
    description: "Providing quality healthcare services and medical solutions.",
    employeeCount: 2,
    createdAt: "2024-03-10T09:15:00.000Z",
  },
];

const SEED_EMPLOYEES: Employee[] = [
  {
    id: "emp-1",
    name: "Sarah Johnson",
    email: "sarah.johnson@acme.example.com",
    position: "Software Engineer",
    department: "Engineering",
    status: "active",
    organizationId: "org-1",
    createdAt: "2024-01-20T10:00:00.000Z",
  },
  {
    id: "emp-2",
    name: "Michael Chen",
    email: "michael.chen@acme.example.com",
    position: "Product Manager",
    department: "Product",
    status: "active",
    organizationId: "org-1",
    createdAt: "2024-02-01T11:30:00.000Z",
  },
  {
    id: "emp-3",
    name: "Emily Davis",
    email: "emily.davis@acme.example.com",
    position: "UX Designer",
    department: "Design",
    status: "on-leave",
    organizationId: "org-1",
    createdAt: "2024-02-15T09:00:00.000Z",
  },
  {
    id: "emp-4",
    name: "James Wilson",
    email: "james.wilson@globalfinance.example.com",
    position: "Financial Analyst",
    department: "Finance",
    status: "active",
    organizationId: "org-2",
    createdAt: "2024-02-25T14:00:00.000Z",
  },
  {
    id: "emp-5",
    name: "Lisa Thompson",
    email: "lisa.thompson@globalfinance.example.com",
    position: "Account Manager",
    department: "Sales",
    status: "active",
    organizationId: "org-2",
    createdAt: "2024-03-01T10:30:00.000Z",
  },
  {
    id: "emp-6",
    name: "Dr. Robert Martinez",
    email: "robert.martinez@healthcareplus.example.com",
    position: "Medical Director",
    department: "Medical",
    status: "active",
    organizationId: "org-3",
    createdAt: "2024-03-15T08:00:00.000Z",
  },
  {
    id: "emp-7",
    name: "Amanda Lee",
    email: "amanda.lee@healthcareplus.example.com",
    position: "Nurse Practitioner",
    department: "Clinical",
    status: "inactive",
    organizationId: "org-3",
    createdAt: "2024-03-20T09:45:00.000Z",
  },
];

function seedDataIfNeeded() {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(SEEDED_KEY)) return;

  localStorage.setItem(ORGS_KEY, JSON.stringify(SEED_ORGANIZATIONS));
  localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(SEED_EMPLOYEES));
  localStorage.setItem(SEEDED_KEY, "true");
}

// Organizations
export function getOrganizations(): Organization[] {
  if (typeof window === "undefined") return [];
  seedDataIfNeeded(); // Seed data on first access
  const data = localStorage.getItem(ORGS_KEY);
  return data ? JSON.parse(data) : [];
}

export function getOrganization(id: string): Organization | undefined {
  return getOrganizations().find((org) => org.id === id);
}

export function createOrganization(
  org: Omit<Organization, "id" | "createdAt" | "employeeCount">,
): Organization {
  const organizations = getOrganizations();
  const newOrg: Organization = {
    ...org,
    id: crypto.randomUUID(),
    employeeCount: 0,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(ORGS_KEY, JSON.stringify([...organizations, newOrg]));
  return newOrg;
}

export function updateOrganization(
  id: string,
  data: Partial<Organization>,
): Organization | undefined {
  const organizations = getOrganizations();
  const index = organizations.findIndex((org) => org.id === id);
  if (index === -1) return undefined;
  organizations[index] = { ...organizations[index], ...data };
  localStorage.setItem(ORGS_KEY, JSON.stringify(organizations));
  return organizations[index];
}

export function deleteOrganization(id: string): boolean {
  const organizations = getOrganizations().filter((org) => org.id !== id);
  localStorage.setItem(ORGS_KEY, JSON.stringify(organizations));
  // Also delete all employees of this organization
  const employees = getEmployees().filter((emp) => emp.organizationId !== id);
  localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
  return true;
}

// Employees
export function getEmployees(organizationId?: string): Employee[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(EMPLOYEES_KEY);
  const employees: Employee[] = data ? JSON.parse(data) : [];
  return organizationId
    ? employees.filter((emp) => emp.organizationId === organizationId)
    : employees;
}

export function getEmployee(id: string): Employee | undefined {
  return getEmployees().find((emp) => emp.id === id);
}

export function createEmployee(
  emp: Omit<Employee, "id" | "createdAt">,
): Employee {
  const employees = getEmployees();
  const newEmp: Employee = {
    ...emp,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(EMPLOYEES_KEY, JSON.stringify([...employees, newEmp]));
  // Update organization employee count
  updateOrganizationEmployeeCount(emp.organizationId);
  return newEmp;
}

export function updateEmployee(
  id: string,
  data: Partial<Employee>,
): Employee | undefined {
  const employees = getEmployees();
  const index = employees.findIndex((emp) => emp.id === id);
  if (index === -1) return undefined;
  employees[index] = { ...employees[index], ...data };
  localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
  return employees[index];
}

export function deleteEmployee(id: string): boolean {
  const employee = getEmployee(id);
  if (!employee) return false;
  const employees = getEmployees().filter((emp) => emp.id !== id);
  localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
  updateOrganizationEmployeeCount(employee.organizationId);
  return true;
}

function updateOrganizationEmployeeCount(organizationId: string) {
  const count = getEmployees(organizationId).length;
  updateOrganization(organizationId, { employeeCount: count });
}

// Stats
export function getStats() {
  const orgs = getOrganizations();
  const employees = getEmployees();
  return {
    totalOrganizations: orgs.length,
    totalEmployees: employees.length,
    activeEmployees: employees.filter((e) => e.status === "active").length,
    industries: [...new Set(orgs.map((o) => o.industry))].length,
  };
}
