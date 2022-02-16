import React, { useRef, useState } from "react";
import { useOutsideAlerter } from "../utils/clickOutside";
import Modal from "./Modal";
import { MdPermMedia } from "react-icons/md";
import CropContainer from "./Crop/CropContainer";
import { useDispatch } from "react-redux";
import { createPost } from "../actions/post";
import { useEffect } from "react";

function CreatePost({ setOpenCreateModal }) {
  const dispatch = useDispatch();
  const [imagesUrl, setImagesUrl] = useState([]);
  const [croped, setCroped] = useState([]);
  const createRef = useRef(null);
  const inputRef = useRef(null);
  const [caption, setCaption] = useState("");
  const [cropOpen, setCropOpen] = useState(true);
  useOutsideAlerter(createRef, setOpenCreateModal);

  useEffect(() => {
    if (imagesUrl.length > 0) {
      setCropOpen(true);
    } else {
      setCropOpen(false);
    }
  }, [imagesUrl]);

  const imagesChange = (e) => {
    setImagesUrl(e.target.files[0]);
    const images = [];
    if (e.target.files && e.target.files.length > 0) {
      for (let i = 0; i < e.target.files.length; i++) {
        images.push({
          file: e.target.files[i],
          url: URL.createObjectURL(e.target.files[i]),
          crop: { x: 0, y: 0 },
          zoom: 1,
          croppedAreaPixels: null,
        });
      }
      setImagesUrl(images);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const images = croped.map((img) => img.file);
    for (const key of Object.keys(images)) {
      formData.append("images", images[key]);
    }
    formData.append("caption", caption);
    dispatch(createPost(formData));
    setImagesUrl([]);
    setCroped([]);
    setCaption("");
    setOpenCreateModal(false);
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {!cropOpen ? (
          <div
            className="flex flex-col bg-secondary w-400 h-450"
            ref={createRef}
          >
            <div className="w-full border-2 border-secondary border-b-primary py-3">
              <h1 className="text-center">Create New Post</h1>
            </div>
            <div className="flex-1 w-full flex flex-col items-center justify-center">
              <MdPermMedia size={50} />
              <h1 className="text-xl my-2">Drag photos and videos here</h1>
              <input
                name="images"
                type="file"
                multiple
                className="hidden"
                ref={inputRef}
                onChange={imagesChange}
              />

              <button
                className="bg-primary mt-3 bg-btnPrimary text-primary px-3 py-1 rounded-md"
                onClick={() => inputRef.current.click()}
                type="button"
              >
                Select from computer
              </button>
            </div>
          </div>
        ) : (
          <CropContainer
            imagesUrl={imagesUrl}
            setImagesUrl={setImagesUrl}
            croped={croped}
            setCroped={setCroped}
            setCaption={setCaption}
            caption={caption}
            setCropOpen={setCropOpen}
          />
        )}
      </form>
    </Modal>
  );
}

export default CreatePost;
