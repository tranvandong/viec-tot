import { useQuery } from "@tanstack/react-query";
import { dataProvider as provider } from "@/providers/dataProvider";
import { AttachmentType } from "@/providers/types/IDataContext";

interface UseCommonParams {
  fileId: string | null;
  type: AttachmentType;
}
export const useCommon = ({ type, fileId }: UseCommonParams) => {
  return useQuery({
    queryKey: ["attachment", type, fileId],
    queryFn: async () => {
      if (!fileId) return null;
      const response = await provider.getAttachment({
        key: fileId,
        type,
      });

      return response;
    },
    enabled: !!fileId,
  });
};

interface UseOrganizationParams {
  fileId: string | null;
}
export const useOrganization = (params: UseOrganizationParams) => {
  return useQuery({
    queryKey: ["attachment", "Organization", params.fileId],
    queryFn: async () => {
      if (!params.fileId) return null;
      const response = await provider.getAttachment({
        key: params.fileId,
        type: "Organization",
      });

      return response;
    },
    enabled: !!params.fileId,
  });
};
