import { useSearchParams } from "next/navigation";

export const useQueryString = () => {
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams?.toString() || "");

  const get = (key: string) => {
    return urlSearchParams.get(key);
  };

  const set = (key: string, value: string) => {
    urlSearchParams.set(key, value);
    return urlSearchParams.toString();
  };

  const sets = (queryStrings: Record<string, string>) => {
    Object.entries(queryStrings).forEach(([name, value]) => {
      urlSearchParams.set(name, value);
    });
    return urlSearchParams.toString();
  };

  const remove = (keys: string[]) => {
    keys.forEach((key) => {
      urlSearchParams.delete(key);
    });
    return urlSearchParams.toString();
  };

  return {
    get,
    set,
    sets,
    remove,
  };
};
