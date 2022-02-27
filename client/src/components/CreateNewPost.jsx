import React, { useRef, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useSelector } from "react-redux";
import { useOutsideAlerter } from "../utils/clickOutside";
import CreateLoading from "./CreateLoading";

const btnClass =
  "relative opacity-7 w-8 h-8 flex items-center justify-center rounded-full mr-4 bg-textPrimary hover:bg-textSecondary text-secondary hover:text-primary";

function CreateNewPost({
  imagesUrl,
  setOpenCreate,
  caption,
  setCaption,
  setDiscard,
  clearForm,
  setOpenCreateModal,
  posting
}) {
  const user =
    localStorage.getItem("profile") &&
    JSON.parse(localStorage.getItem("profile"));
  const [selectedImg, setSelectedImg] = useState(0);
  const newRef = useRef(null);
  useOutsideAlerter(newRef, setDiscard);

  const nextImg = () => {
    if (selectedImg < imagesUrl.length - 1) setSelectedImg(selectedImg + 1);
  };

  const preImg = () => {
    if (selectedImg > 0) {
      setSelectedImg(selectedImg - 1);
    }
  };

  const {loading} = useSelector((state)=> state.posts)
  return (
    <div className="min-w-600 h-400 flex flex-col rounded-lg bg-secondary overflow-hidden ">
      {posting ? (
        <CreateLoading
          loading={loading}
          clearForm={clearForm}
          setOpenCreateModal={setOpenCreateModal}
        />
      ) : (
        <div ref={newRef}>
          <div className="flex justify-between px-4 py-3 items-center border-b border-b-borderPrimary">
            <button onClick={() => setOpenCreate(false)} type="button">
              Back
            </button>
            <h5>Create New Post</h5>
            <button type="submit">Post</button>
          </div>
          <div className="flex w-full h-full">
            <div className="relative w-3/5 h-full bg-primary">
              {selectedImg < imagesUrl.length - 1 && (
                <button
                  type="button"
                  onClick={nextImg}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "5%",
                    zIndex: "100",
                  }}
                  className={btnClass}
                >
                  <GrFormNext />
                </button>
              )}
              {selectedImg > 0 && (
                <button
                  type="button"
                  onClick={preImg}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "5%",
                    zIndex: "100",
                  }}
                  className={btnClass}
                >
                  <GrFormPrevious />
                </button>
              )}
              <div className="w-full h-full flex items-center justify-center">
                {imagesUrl.length > 0 &&
                  imagesUrl.map((image, i) => (
                    <>{selectedImg === i && <img src={image.url} alt="" />}</>
                  ))}
              </div>
            </div>
            <div className="relative w-2/5 h-full bg-secondary border-l border-textSecondary flex flex-col h-full px-2">
              <div className="flex mb-4">
                <div className="w-8 h-8 bg-primary rounded-full mr-2 overflow-hidden">
                  <img
                    src="https://picsum.photos/200/300"
                    alt="user-image"
                    className="w-full h-full"
                  />
                </div>
                <div className="flex flex-col justify-center items-start">
                  <h5 className="font-bold">{user?.userName}</h5>
                </div>
              </div>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="border-none outline-none"
                cols="30"
                rows="10"
                placeholder="Write a caption..."
              ></textarea>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateNewPost;
