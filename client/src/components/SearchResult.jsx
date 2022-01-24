import React, { useEffect, useRef, useState } from 'react';
import Friend from './Friend';





function SearchResult({setSearchActive}) {
    const res = false
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);


    function useOutsideAlerter(ref) {
        
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setSearchActive(false)
                }
            }
    
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    

  return ( 
  <div ref={wrapperRef} className='bg-secondary rounded-sm shadow-md w-350 h-300 absolute top-full mt-1 p-3' style={{zIndex:2}}>
      <div className='w-6 h-6 bg-secondary rotate-45 absolute' style={{left:"50%" , top:"-5px" ,transform: `translateX(-50%) rotate(45deg)`}}>

      </div>
      {res ? < Friend /> : (
          <div>
            <h5 className='front-bold'>Result</h5>
            <p className='text-sm front-bold' style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center"}}>No Recent Search Result</p>
          </div>
      )}
  </div>
  );
}

export default SearchResult;
