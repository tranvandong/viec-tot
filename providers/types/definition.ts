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
};
