import React, { useRef } from "react";
import { useOutsideAlerter } from "../utils/clickOutside";
import Modal from "./Modal";
import {MdPermMedia} from "react-icons/md"

function CreatePost({setOpenCreateModal}) {
  const createRef = useRef(null);
    useOutsideAlerter(createRef,setOpenCreateModal);
  return (
    <Modal>
        <div className="flex flex-col bg-secondary w-400 h-450" ref={createRef}>
          <div className="w-full border-2 border-secondary border-b-primary py-3">
            <h1 className="text-center">Create New Post</h1>
          </div>
          <div className="flex-1 w-full flex flex-col items-center justify-center" >
            <MdPermMedia/>
            <h1>Drag photos and videos here</h1>
            <button className="bg-primary py-2 px-3 mt-3">Select from computer</button>
          </div>
        </div>
    </Modal>
  );
}

export default CreatePost;
