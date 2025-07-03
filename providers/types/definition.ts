export type JobPost = {
  createdDate: string;
  createdName: string | null;
  description: string;
  dmHuyenCode: string;
  dmTinhCode: string;
  dmXaCode: string;
  experience: string;
  effectiveDate: string;
  expiredDate: string;
  fileId: string | null;
  fromSalary: number;
  id: string;
  industry: string | null;
  isPublished: boolean;
  location: string;
  organizationId: string;
  organization: Organization | null;
  shift: string | null;
  status: string;
  title: string;
  toSalary: number | null;
  views: number;
  favorites?: Array<{ jobId: string }>;
};

export type Organization = {
  filePaths: string[];
  code: string;
  name: string;
  address: string;
  email: string;
  telephone: string;
  fax: string | null;
  website: string | null;
  status: "Approved" | "Pending" | "Rejected"; // nếu có nhiều trạng thái, bạn có thể mở rộng
  activated: boolean;
  isAuth: boolean;
  fileId: string;
  employeeCount: number | null;
  workingTime: string | null;
  description: string | null;
  dmXaCode: string;
  dmHuyenCode: string;
  dmTinhCode: string;
  id: string;
  createdDate: string; // hoặc `Date` nếu bạn parse sang Date object
  jobs?: JobPost[];
};

export interface Applicant {
  name: any;
  status: "On" | "Off"; // hoặc string nếu có nhiều giá trị khác
  userId: string;
  dienThoai: string;
  email: string;
  fileId: string | null;
  id: string;
  createdDate: string;
  resume: Resume | null;
  applications?: Application[];
}

export interface Resume {
  applicantId: string;
  title: string;
  education: string;
  experience: string;
  skills: string;
  certifications: string;
  summary: string;
  hrViewCount: number;
  name?: string;
  gioiTinh?: string;
}
export interface Application {
  id: string;
  applicantId: string;
  jobId: string;
  status: "Submitted" | "Approved" | "Rejected" | string;
  appliedAt: string; // ISO date string
  scheduledAt: string | null;
  scheduledLocaltion: string | null;
  isView: boolean;
  isEligible: boolean | null;
  title: string;
  education: string;
  experience: string;
  skills: string;
  certifications: string;
  summary: string;
  createdDate: string; // ISO date string
  job?: JobPost[];
  applicant?: Applicant;
}

export interface UserInfo {
  displayName: string;
  role: "HR" | "MEMBER";
  // Add other properties as needed
}
