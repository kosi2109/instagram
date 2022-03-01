import React from "react";
import { useRef } from "react";
import { TailSpin } from "react-loader-spinner";
import { useOutsideAlerter } from "../utils/clickOutside";

function CreateLoading({loading,setOpenCreateModal}) {
  const loadingRef = useRef(null)
  useOutsideAlerter(loadingRef, setOpenCreateModal);
  
  return (
    <div ref={loadingRef} className="w-400 h-400 flex flex-col rounded-lg bg-secondary overflow-hidden">
      <div className="flex justify-center px-4 py-3 items-center border-b border-b-borderPrimary">
        <h5>{loading ? "Sharing" : "Post shared"}</h5>
      </div>

      <div className="h-full flex flex-col justify-center items-center">
        {loading ? (
          <TailSpin width={55} height={55} />
        ) : (
          <div className="flex items-center justify-center flex-col">
              <img src="https://www.instagram.com/static/images/creation/30fpsCheckLoopsOnce.gif/10a8cbeb94ba.gif" alt="" />
                <h1 className="mt-5 text-2xl">Your post has been shared.</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateLoading;
