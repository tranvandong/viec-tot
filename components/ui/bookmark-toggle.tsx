import { cn } from "@/lib/utils";
import React from "react";
import "../../styles/bookmark-toggle.css"; // Import your CSS file here
import { Bookmark } from "lucide-react";

export interface BookmarkToggleProps
  extends React.HTMLAttributes<HTMLInputElement> {
  checked?: boolean;
}

const BookmarkToggle = ({
  className,
  checked,
  ...props
}: BookmarkToggleProps) => {
  return (
    <div className={cn("flex items-center justify-center bg-white", className)}>
      <label className="ui-bookmark">
        <input type="checkbox" checked {...props} />
        <div className="bookmark">
          <Bookmark
            className={`h-5 w-5 ${
              checked ? "fill-blue-500 text-blue-500" : ""
            }`}
          />
        </div>
      </label>
    </div>
  );
};

export default BookmarkToggle;
