import React, { useState } from "react";
import Modal from "../Modal";
import Cropper from "./Cropper";
import { HiSelector } from "react-icons/hi";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import AsceptOption from "./AsceptOption";
import CreateNewPost from "../CreateNewPost";
import getCroppedImg from "../../utils/cropimage";
import { useOutsideAlerter } from "../../utils/clickOutside";
import { useRef } from "react";
import { TailSpin } from "react-loader-spinner";

const btnClass =
  "relative opacity-7 w-8 h-8 flex items-center justify-center rounded-full mr-4 bg-textPrimary hover:bg-textSecondary text-secondary hover:text-primary";

function CropContainer({
  imagesUrl,
  setImagesUrl,
  croped,
  setCroped,
  setCaption,
  setOpenCreateModal,
  clearForm,
  posting
}) {
  const [aspect, setAspect] = useState(1);
  const [asceptOpen, setAsceptOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(0);
  const [openCreate, setOpenCreate] = useState(false);
  const [discard, setDiscard] = useState(true);
  const [cropLoading, setcropLoading] = useState(false);
  const cropRef = useRef(null);
  useOutsideAlerter(cropRef, setDiscard);

  const nextImg = () => {
    if (selectedImg < imagesUrl.length - 1) setSelectedImg(selectedImg + 1);
  };

  const preImg = () => {
    if (selectedImg > 0) {
      setSelectedImg(selectedImg - 1);
    }
  };

  const cropImage = async (index) => {
    try {
      return await getCroppedImg(
        imagesUrl[index].file.name,
        imagesUrl[index].url,
        imagesUrl[index].croppedAreaPixels
      );
    } catch (error) {
      console.log(error);
    }
  };

  const makeCrop = async () => {
    setcropLoading(true);
    const arr = [];
    for (let i = 0; i < imagesUrl.length; i++) {
      arr.push(await cropImage(i));
    }
    setcropLoading(false);
    setCroped(arr);
    setOpenCreate(true);
  };

  
  return (
    <div>
      {openCreate ? (
        <CreateNewPost
          imagesUrl={croped}
          setOpenCreate={setOpenCreate}
          setCaption={setCaption}
          clearForm={clearForm}
          setDiscard={setDiscard}
          setOpenCreateModal={setOpenCreateModal}
          posting={posting}
        />
      ) : (
        <>
          <div ref={cropRef}>
            <div className="w-400 h-400 flex flex-col rounded-lg bg-secondary overflow-hidden ">
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
              <div className="flex justify-between px-4 py-3 items-center border-b border-b-borderPrimary">
                <button type="button" onClick={() => setDiscard(false)}>
                  Back
                </button>
                <h5>Crop</h5>
                <button type="button" onClick={makeCrop}>
                  {cropLoading ? (
                    <TailSpin height={30} width={30} color="blue" />
                  ) : (
                    "Next"
                  )}
                </button>
              </div>
              <div className="relative w-full h-full bg-secondary">
                {imagesUrl.length > 0 &&
                  imagesUrl.map((image, i) => (
                    <>
                      {selectedImg === i && (
                        <Cropper
                          key={i}
                          index={i}
                          image={image.url}
                          imagesUrl={imagesUrl}
                          setImagesUrl={setImagesUrl}
                          aspect={aspect}
                          openCreate={openCreate}
                          setCroped={setCroped}
                          croped={croped}
                          openCreate={openCreate}
                          className="w-auto h-full rounded-md"
                        />
                      )}
                    </>
                  ))}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full flex justify-between items-center p-5">
              {asceptOpen && (
                <AsceptOption
                  setAspect={setAspect}
                  setAsceptOpen={setAsceptOpen}
                />
              )}
              <div className="flex items-center ">
                <button
                  className={btnClass}
                  onClick={() => setAsceptOpen(!asceptOpen)}
                  type="button"
                >
                  <HiSelector />
                </button>
                <h6>
                  {selectedImg + 1}/{imagesUrl.length}
                </h6>
              </div>
            </div>
          </div>
        </>
      )}
      {!discard && (
        <Modal>
          <div className="bg-secondary text-center flex flex-col w-350 rounded-md">
            <div className="py-10">
              <h4 className="font-bold text-lg">Discard Post?</h4>
              <h6 className="text-sm">
                If you leave, your edits won't be saved.
              </h6>
            </div>
            <button
              className="w-full h-12 border-t border-textSecondary text-danger"
              onClick={clearForm}
            >
              Discard
            </button>
            <button
              className="w-full h-12 border-t border-textSecondary"
              onClick={() => setDiscard(true)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CropContainer;
