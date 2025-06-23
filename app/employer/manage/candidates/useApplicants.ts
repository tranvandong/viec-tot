import { useEffect, useState } from "react";
import { dataProvider } from "@/providers/dataProvider";
import { Applicant } from "@/providers/types/definition";
import { CrudFilters } from "@/providers/types/IDataContext";

interface UseApplicantsProps {
  page: number;
  search: string;
  isSortNewest: boolean;
  pageSize?: number;
}

export const useApplicants = ({
  page,
  search,
  isSortNewest,
  pageSize = 10,
}: UseApplicantsProps) => {
  const [data, setData] = useState<Applicant[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const filters: CrudFilters = [];

        if (search) {
          const isNumeric = /^\d+$/.test(search.trim());
          filters.push({
            field: isNumeric ? "dienThoai" : "email",
            operator: "contains",
            value: search,
          });
        }

        const { data, total } = await dataProvider.getList<Applicant>({
          resource: "Applicants",
          pagination: {
            current: page,
            pageSize,
          },
          filters,
          sorters: isSortNewest
            ? [
                {
                  field: "createdDate",
                  order: "desc",
                },
              ]
            : [],
          meta: {
            join: [
              "Resume",
              "Applications($expand=Job)",
              "Favorites",
              "ReferralRewards($expand=CampaignUser)",
              "JobViewers",
              "Carts",
            ],
            config: {
              subSystem: "buss",
              auth: "allow",
            },
          },
        });

        setData(data);
        setTotal(total ?? 0);
      } catch (err) {
        console.error("Fetch applicants failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, search, isSortNewest, pageSize]);

  return {
    data,
    total,
    loading,
  };
};
