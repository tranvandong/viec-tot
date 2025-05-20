import { odataCrudDataProvider } from "./odataCrudDataProvider";

// Initialize dataProvider with API URL
export const apiUrl = "http://localhost:3000/api";
const dataProvider = odataCrudDataProvider(apiUrl);
export { dataProvider };
