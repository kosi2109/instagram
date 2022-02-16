import React, { useRef } from "react";
import { useOutsideAlerter } from "../../utils/clickOutside";

function AsceptOption({ setAspect, setAsceptOpen }) {
  const asceptRef = useRef(null);
  useOutsideAlerter(asceptRef, setAsceptOpen);
  return (
    <div
      ref={asceptRef}
      className="bg-textPrimary flex flex-col opacity-70 absolute w-150 h-200 bottom-16 left-5 cursor-pointer"
    >
      <div
        onClick={() => setAspect(1)}
        className="flex items-center justify-between px-5 w-full h-1/3 border-b border-b-textSecondary"
      >
        <h6 className="text-textSecondary font-medium">1:1</h6>
        <div className="w-6 h-6 border-2 border-textSecondary"></div>
      </div>
      <div
        onClick={() => setAspect(4 / 5)}
        className="flex items-center justify-between px-5 w-full h-1/3 border-b border-b-textSecondary"
      >
        <h6 className="text-textSecondary font-medium">4:5</h6>
        <div className="w-6 h-8 border-2 border-textSecondary"></div>
      </div>
      <div
        onClick={() => setAspect(16 / 9)}
        className="flex items-center justify-between px-5 w-full h-1/3 border-b border-b-textSecondary"
      >
        <h6 className="text-textSecondary font-medium">16:9</h6>
        <div className="w-10 h-6 border-2 border-textSecondary"></div>
      </div>
    </div>
  );
}

export default AsceptOption;
