import { useAuth } from "../providers/contexts/AuthProvider";

const useCustomFetcher = () => {
  const { handleUnauthorized } = useAuth();

  return null;
};

export default useCustomFetcher;
