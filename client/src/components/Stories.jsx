import React from "react";
import Story from "./Story";

function Stories() {
  return (
    <div className="flex justify-start p-1 items-center bg-secondary w-full overflow-x-auto overflow-y-hidden rounded-sm border border-borderPrimary">
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
    </div>
  );
}

export default Stories;
