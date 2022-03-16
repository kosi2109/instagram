import React from "react";
import ReactDOM from "react-dom";

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    pointerEvents : 'all',
    overflowY: 'hidden'
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
   }

function Modal({ children }) {
 

  return ReactDOM.createPortal(
    <>
        <div style={OVERLAY_STYLES}>
            <div style={MODAL_STYLES}>
                {children}
            </div>
        </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
