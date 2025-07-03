import { dataProvider } from "@/providers/dataProvider";
import { JobPost } from "@/providers/types/definition";
import { Join } from "@/providers/types/IDataContext";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth222";
import JobDetailClient from "./job-detail-client";

async function getJob(slug: string) {
  const session = await getServerSession(authOptions);
  const applicant = session?.user?.id;
  console.log("session-----hkj:", applicant);

  const jobExpand: Join[] = ["Organization"];
  if (applicant) {
    jobExpand.push({
      name: "favorites",
      filters: [
        {
          field: "ApplicantId",
          operator: "eq",
          value: applicant,
          isUuid: true,
        },
      ],
    });
  }

  try {
    const { data } = await dataProvider.getOne<JobPost>({
      resource: "Jobs",
      id: slug,
      meta: {
        join: jobExpand,
        config: { mode: "server" },
      },
    });
    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
}

export default async function JobDetail({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const { slug } = await params;
  console.log("slug:", slug);
  const job = await getJob(slug);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Job not found
          </h2>
          <p className="text-gray-600 mb-6">
            The job you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return <JobDetailClient job={job} />;
}
