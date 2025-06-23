import { useEffect, useState } from "react";
import { dataProvider } from "@/providers/dataProvider";
import {  Application } from "@/providers/types/definition";
import { CrudFilters } from "@/providers/types/IDataContext";

interface UseApplyCandidatesProps {
  page: number;
  search: string;
  isSortNewest: boolean;
  pageSize?: number;
}

export const useApplyCandidates = ({
  page,
  search,
  isSortNewest,
  pageSize = 10,
}: UseApplyCandidatesProps) => {
  const [data, setData] = useState<Application[]>([]);
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

        const { data, total } = await dataProvider.getList<Application>({
          resource: "Applications",
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
              "Applicant"
              // "Resume",
              // "Applications($expand=Job)",
              // "Favorites",
              // "ReferralRewards($expand=CampaignUser)",
              // "JobViewers",
              // "Carts",
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
