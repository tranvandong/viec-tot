import type React from "react";

import Image from "next/image";
import { Clock } from "lucide-react";
import { SearchBox } from "@/components/search-box";
import { Select as RadixSelect } from "@radix-ui/themes";
import { useList } from "@/hooks/useDataProvider";
import JobFilter from "@/components/job-filter";
import { cookies, headers } from "next/headers";
import { dataProvider } from "@/providers/dataProvider";
import { CrudFilters } from "@/providers/types/IDataContext";
import { JobPost } from "@/providers/types/definition";
import dayjs from "@/lib/dayjs";
import Link from "next/link";
import JobResult from "@/components/job-results";

export async function getJobs({
  params,
  searchParams,
}: {
  params: {
    slug: string[];
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const { slug } = params;
  const sp = searchParams;
  console.log("slug", slug, "sp", sp);
  const filters: CrudFilters = [];
  if (sp.job) {
    filters.push({
      field: "title",
      operator: "contains",
      value: sp.job,
    });
  }
  if (sp.district) {
    filters.push({
      field: "dmHuyenCode",
      operator: "eq",
      value: sp.district,
    });
  }
  if (sp.province) {
    filters.push({
      field: "dmTinhCode",
      operator: "eq",
      value: sp.province,
    });
  }
  if (sp.salary_from) {
    filters.push({
      field: "fromSalary",
      operator: "gte",
      value: +sp.salary_from * 1000000,
    });
  }
  if (sp.salary_to) {
    filters.push({
      field: "toSalary",
      operator: "lte",
      value: +sp.salary_to * 1000000,
    });
  }
  // const results = await dataProvider.getList<JobPost>({
  //   resource: "Jobs",
  //   meta: {
  //     config: { mode: "server" },
  //     join: ["Organization"],
  //   },
  //   filters,
  // });
  return [];
}

export default async function SearchResults({
  params,
  searchParams,
}: {
  params: Promise<{
    slug: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const p = await params;
  const sp = await searchParams;
  // const jobss = await getJobs({ params: p, searchParams: sp });
  // console.log("jobss", jobss?.data[0]?.organization);

  // const jobs = jobss.data || [];
  // const searchParams = useSearchParams();
  // const pathName = usePathname();
  // const router = useRouter();
  // const jobQuery = searchParams.get("job") || "UI/UX Designer";
  // const locationQuery = searchParams.get("location") || "Indonesia";

  // const [savedJobs, setSavedJobs] = useState<string[]>([]);
  // const [linhVuc, setLinhVuc] = useState("");

  // const locationParam = searchParams.get("location");
  // const provinceCode = locationParam?.includes(",")
  //   ? locationParam.split(",")[1]
  //   : locationParam;

  // const { data: provinceData, refetch } = useList({
  //   resource: "DMTinhs",
  //   filters: provinceCode
  //     ? [{ field: "code", operator: "eq", value: provinceCode }]
  //     : [],
  //   meta: { join: ["DMHuyens"] },
  //   queryOptions: { enabled: false },
  // });
  // const provinces = provinceData?.data || [];

  const toggleSaveJob = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // if (savedJobs.includes(id)) {
    //   setSavedJobs(savedJobs.filter((jobId) => jobId !== id));
    // } else {
    //   setSavedJobs([...savedJobs, id]);
    // }
  };

  // Find similar jobs based on job title and experience
  // const getSimilarJobs = (job: any) => {
  //   return jobs.filter(
  //     (j) =>
  //       j.id !== job.id &&
  //       (j.title.includes(job.title.split(" ")[0]) ||
  //         j.experience === job.experience)
  //   );
  // };

  // Find other jobs from the same company
  // const getOtherJobsFromCompany = (job: any) => {
  //   return jobs.filter((j) => j.id !== job.id && j.company === job.company);
  // };

  // const jobs = [
  //   {
  //     id: "1",
  //     title: "UI/UX Designer",
  //     company: "Pixelz Studio",
  //     location: "Yogyakarta, Indonesia",
  //     logo: "/placeholder.svg?height=60&width=60&text=P&bg=black",
  //     jobType: "Fulltime",
  //     workType: "Remote",
  //     experience: "2-4 Years",
  //     postedTime: "2 days ago",
  //     applicants: 140,
  //     salary: "$1000/month",
  //     match: true,
  //     description: `As an UI/UX Designer on Pixelz Studio, you'll focus on design user-friendly on several platform (web, mobile, dashboard, etc) to our users needs. Your innovative solution will enhance the user experience on several platforms. Join us and let's making impact on user engagement at Pixelz Studio.`,
  //     benefits: [
  //       "Competitive salary and benefits package",
  //       "Flexible working hours",
  //       "Remote work options",
  //       "Professional development opportunities",
  //     ],
  //   },
  //   {
  //     id: "2",
  //     title: "Product Designer",
  //     company: "Traveloka",
  //     location: "Jakarta, Indonesia",
  //     logo: "/placeholder.svg?height=60&width=60&text=T&bg=blue",
  //     jobType: "Fulltime",
  //     workType: "Onsite",
  //     experience: "2-4 Years",
  //     postedTime: "an hour ago",
  //     applicants: 140,
  //     salary: "$1500/month",
  //     match: true,
  //     description: `We are looking for a talented Product Designer to join our team and help us create amazing user experiences for our travel platform. The ideal candidate will have a strong portfolio demonstrating their ability to solve complex design problems and create intuitive, user-friendly interfaces.`,
  //     benefits: [
  //       "Competitive salary and benefits package",
  //       "Opportunity to work on a product used by millions",
  //       "Career growth and development opportunities",
  //       "Collaborative and innovative work environment",
  //     ],
  //   },
  //   {
  //     id: "3",
  //     title: "UX Designer",
  //     company: "Tokopedia",
  //     location: "Jakarta, Indonesia",
  //     logo: "/placeholder.svg?height=60&width=60&text=T&bg=green",
  //     jobType: "Fulltime",
  //     workType: "Remote",
  //     experience: "2-4 Years",
  //     postedTime: "2 days ago",
  //     applicants: 140,
  //     salary: "$1000/month",
  //     match: true,
  //     description: `Tokopedia is looking for a UX Designer to join our growing team. You will be responsible for creating user-centered designs that meet business requirements and enhance customer experience. As a UX Designer, you will work closely with product managers, developers, and other designers to deliver high-quality designs.`,
  //     benefits: [
  //       "Flexible working hours",
  //       "Remote work options",
  //       "Health insurance",
  //       "Professional development budget",
  //     ],
  //   },
  //   {
  //     id: "4",
  //     title: "Interaction Designer",
  //     company: "GoPay",
  //     location: "Jakarta, Indonesia",
  //     logo: "/placeholder.svg?height=60&width=60&text=G&bg=blue",
  //     jobType: "Fulltime",
  //     workType: "Onsite",
  //     experience: "2-4 Years",
  //     postedTime: "2 days ago",
  //     applicants: 140,
  //     salary: "$1000/month",
  //     match: true,
  //     description: `GoPay is looking for an Interaction Designer to join our team. You will be responsible for creating engaging and intuitive user experiences for our payment platform. The ideal candidate will have experience in designing for mobile applications and a strong understanding of user-centered design principles.`,
  //     benefits: [
  //       "Competitive salary and benefits",
  //       "Professional development opportunities",
  //       "Flexible working arrangements",
  //       "Modern office with great amenities",
  //     ],
  //   },
  //   {
  //     id: "5",
  //     title: "UI Designer",
  //     company: "Gojek",
  //     location: "Jakarta, Indonesia",
  //     logo: "/placeholder.svg?height=60&width=60&text=G&bg=green",
  //     jobType: "Fulltime",
  //     workType: "Onsite",
  //     experience: "0-2 Years",
  //     postedTime: "2 days ago",
  //     applicants: 521,
  //     salary: "$900/month",
  //     match: true,
  //     description: `Gojek is seeking a talented UI Designer to join our growing design team. You will be responsible for creating visually appealing and user-friendly interfaces for our super app. The ideal candidate will have a strong portfolio showcasing their UI design skills and a passion for creating beautiful, functional designs.`,
  //     benefits: [
  //       "Competitive salary",
  //       "Health insurance",
  //       "Professional development budget",
  //       "Flexible working hours",
  //     ],
  //   },
  //   {
  //     id: "6",
  //     title: "Sr. UI/UX Designer",
  //     company: "Shopee",
  //     location: "Jakarta, Indonesia",
  //     logo: "/placeholder.svg?height=60&width=60&text=S&bg=orange",
  //     jobType: "Fulltime",
  //     workType: "Hybrid",
  //     experience: "3-5 Years",
  //     postedTime: "2 days ago",
  //     applicants: 140,
  //     salary: "$2000/month",
  //     match: true,
  //     description: `Shopee is looking for a Senior UI/UX Designer to join our team. You will be responsible for leading design projects and mentoring junior designers. The ideal candidate will have extensive experience in UI/UX design, a strong portfolio, and excellent leadership skills.`,
  //     benefits: [
  //       "Competitive salary and benefits package",
  //       "Leadership opportunities",
  //       "Professional development budget",
  //       "Flexible working arrangements",
  //     ],
  //   },
  // ];

  // useEffect(() => {
  //   const locationParam = searchParams.get("location") || "";
  //   if (locationParam) {
  //     refetch();
  //   }
  // }, [searchParams]);

  // let location = "";
  // if (locationParam) {
  //   const [province] = provinces;
  //   if (province) {
  //     if (locationParam.includes(",")) {
  //       const [districtCode, provinceCode] = locationParam.split(",");

  //       const dmHuyens = province.dmHuyens;

  //       if (dmHuyens) {
  //         const huyen = (dmHuyens as any[]).find(
  //           (h) => h.code === districtCode
  //         );
  //         location = `${huyen.name}, ${province.name}`;
  //       } else {
  //         location = province.name;
  //       }
  //     } else {
  //       location = province.name;
  //     }
  //   }
  // } else {
  //   location = "";
  // }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero Search */}
      <div className="bg-blue-950 text-white pt-8 pb-24">
        <div className="container text-center max-w-3xl mx-auto px-4 md:px-8">
          <div className="inline-block bg-blue-900/50 text-xs px-4 py-2 rounded-full mb-8">
            Nền tảng tìm việc số 1
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Tìm người tài năng
            <br />
            cho công việc của bạn
          </h1>
          <p className="text-blue-200 mb-8">
            Hơn 5 triệu việc làm để bạn khám phá. Hãy tìm kiếm ngay để tìm công
            việc tiếp theo của bạn
          </p>

          <SearchBox />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8" id="search-results">
        {/* <h1 className="text-gray-600 dark:text-gray-300 ">
          Tuyển dụng <span className="font-semibold">{jobss.total}</span> việc
          làm <span className="font-semibold">{sp.job || sp.categoryName}</span>{" "}
          {sp.locationName ? "tại " : ""}
          <span className="font-semibold">{sp.locationName}</span>
        </h1> */}
        <JobResult />
      </div>
    </div>
  );
}
