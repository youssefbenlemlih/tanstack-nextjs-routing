export interface Employee {
  id: string;
  organizationId: string;
  name: string;
  email: string;
  role: string;
  department: string;
  startDate: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  industry: string;
  website: string;
  description: string;
  employeeCount: number;
  createdAt: string;
}
