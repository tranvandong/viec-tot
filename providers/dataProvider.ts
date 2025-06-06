import { odataCrudDataProvider } from "./odataCrudDataProvider";

// Initialize dataProvider with API URL
export const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
const serverSideApiUrl = "https://viectot.nextform.vn/api";
const dataProvider = odataCrudDataProvider(apiUrl, serverSideApiUrl);
export { dataProvider };
