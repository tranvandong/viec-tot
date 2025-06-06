import { useSearchParams } from "next/navigation";

export const useQueryString = () => {
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams);

  const getQueryString = (key: string) => {
    return urlSearchParams.get(key);
  };

  const setQueryString = (key: string, value: string) => {
    urlSearchParams.set(key, value);
    window.history.replaceState(
      {},
      "",
      `${location.pathname}?${urlSearchParams.toString()}`
    );
  };

  const removeQueryString = (key: string) => {
    urlSearchParams.delete(key);
    window.history.replaceState(
      {},
      "",
      `${location.pathname}?${urlSearchParams.toString()}`
    );
  };

  return {
    getQueryString,
    setQueryString,
    removeQueryString,
  };
};
