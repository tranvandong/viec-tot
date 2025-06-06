// lib/dayjs.ts
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

// Thiết lập múi giờ mặc định là Asia/Ho_Chi_Minh (UTC+7)
dayjs.tz.setDefault("Asia/Ho_Chi_Minh");
dayjs.locale("vi");

export default dayjs;
