import React, { useRef } from "react";
import { useOutsideAlerter } from "../utils/clickOutside";
import Friend from "./Friend";

function SearchResult({ setSearchActive }) {
  const res = false;
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setSearchActive);

  return (
    <div
      ref={wrapperRef}
      className="w-350 h-300 absolute top-full"
      style={{ zIndex: 10 }}
    >
      <div
        className="absolute"
        style={{
          left: "50%",
          bottom: "98%",
          transform: `translateX(-50%)`,
          zIndex: "10",
          width: 0,
          height: 0,
          borderStyle: "solid",
          borderWidth: "0 18px 18px 18px",
          borderColor: "transparent transparent #FFFFFF transparent",
        }}
      ></div>
      {res ? (
        <Friend />
      ) : (
        <div
          className="relative bg-secondary rounded-sm w-full h-full mt-1 p-3 shadow-xl rounded-md"
          style={{
            zIndex: "1",
          }}
        >
          <h5 className="front-bold">Result</h5>
          <p
            className="text-sm front-bold"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              textAlign: "center",
            }}
          >
            No Recent Search Result
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchResult;
