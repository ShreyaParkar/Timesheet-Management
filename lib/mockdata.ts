// lib/mockdata.ts

export type Timesheet = {
  id: string;
  weekLabel: string;
  totalHours: number;
  status: 'Complete' | 'Incomplete' | 'Missing'; // Updated status types as per your desired output
  targetHours: number;
};

export type Task = {
  id?: string; // <-- Make id optional
  date: string;
  project: string;
  type: string;
  description: string;
  hours: number;
  status?: string; // Optional status for a task entry
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Shrey Parker",
    email: "shrey@example.com",
    password: "1234567890",
  },
];

export const mockTimesheets: Timesheet[] = [
  {
    id: 'week-27',
    weekLabel: 'Week 27 (Jul 1 - Jul 5)',
    totalHours: 41, // Sum of hours for week-27 entries is 41
    status: 'Complete', // Status as per your desired output
    targetHours: 40,
  },
  {
    id: 'week-28',
    weekLabel: 'Week 28 (Jul 8 - Jul 12)',
    totalHours: 32, // Sum of hours for week-28 entries is 32
    status: 'Incomplete', // Status as per your desired output
    targetHours: 40,
  },
  {
    id: 'week-29',
    weekLabel: 'Week 29 (Jul 15 - Jul 19)',
    totalHours: 0,
    status: 'Missing', // Status as per your desired output
    targetHours: 40,
  },
];

export const mockEntries: Record<string, Task[]> = {
  "week-27": [
    // Monday - July 1st
    {
      id: "1",
      date: "2025-07-01",
      project: "Internal Tool",
      type: "Development",
      description: "Login page setup",
      hours: 4,
    },
    {
      id: "2",
      date: "2025-07-01",
      project: "Internal Tool",
      type: "Testing",
      description: "UI polish and testing",
      hours: 4,
    },
    // Tuesday - July 2nd
    {
      id: "3",
      date: "2025-07-02",
      project: "API Service",
      type: "Bug Fixing",
      description: "Fix endpoint issues",
      hours: 5,
    },
    {
      id: "4",
      date: "2025-07-02",
      project: "API Service",
      type: "Testing",
      description: "Unit tests",
      hours: 3,
    },
    // Wednesday - July 3rd
    {
      id: "5",
      date: "2025-07-03",
      project: "Landing Page",
      type: "Design",
      description: "Homepage design",
      hours: 6,
    },
    {
      id: "6",
      date: "2025-07-03",
      project: "Landing Page",
      type: "Development",
      description: "Navbar implementation",
      hours: 2,
    },
    // Thursday - July 4th
    {
      id: "7",
      date: "2025-07-04",
      project: "Client Report",
      type: "Documentation",
      description: "Monthly report writing",
      hours: 8,
    },
    // Friday - July 5th
    {
      id: "8",
      date: "2025-07-05",
      project: "Cleanup",
      type: "Refactor",
      description: "Code cleanup",
      hours: 5,
    },
    {
      id: "9",
      date: "2025-07-05",
      project: "Meeting",
      type: "Planning",
      description: "Sprint planning",
      hours: 4,
    },
  ],
  "week-28": [
    // Monday - July 8th
    {
      id: "10",
      date: "2025-07-08",
      project: "CRM UI",
      type: "Development",
      description: "Component refactoring",
      hours: 6,
    },
    {
      id: "11",
      date: "2025-07-08",
      project: "CRM UI",
      type: "Review",
      description: "Code review",
      hours: 2,
    },
    // Tuesday - July 9th
    {
      id: "12",
      date: "2025-07-09",
      project: "CRM API",
      type: "Development",
      description: "Token refresh implementation",
      hours: 7,
    },
    // Wednesday - July 10th
    {
      id: "13",
      date: "2025-07-10",
      project: "Design System",
      type: "Design",
      description: "UI library creation",
      hours: 8,
    },
    // Thursday - July 11th
    {
      id: "14",
      date: "2025-07-11",
      project: "Client Meeting",
      type: "Meeting",
      description: "Demo presentation",
      hours: 3,
    },
    {
      id: "15",
      date: "2025-07-11",
      project: "Documentation",
      type: "Documentation",
      description: "Feature documentation",
      hours: 4,
    },
    // Friday - July 12th - Missing entries (only 2 hours)
    {
      id: "16",
      date: "2025-07-12",
      project: "Testing",
      type: "QA",
      description: "Basic testing",
      hours: 2,
    },
  ],
};