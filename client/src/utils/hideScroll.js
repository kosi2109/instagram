import { useEffect } from "react";


export default function(modal){
    useEffect(() => {
        if (modal) {
          document.querySelector("body").style.overflow = "hidden";
        } else {
          document.querySelector("body").style.overflow = "auto";
        }
      }, [modal]);
}

