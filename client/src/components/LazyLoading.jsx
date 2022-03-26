import React from "react";



function LazyLoading() {
    return (

    <div className="flex flex-col justify-start w-full bg-secondary md:mb-5 border border-borderPrimary rounded">
      {/* header */}
      <div className="flex justify-between items-center w-full h-16 px-3 py-2">
        <div className="flex items-center justify-start">
          <div className="animate-pulse w-10 h-10 bg-slate rounded-full mr-2 overflow-hidden">
            
          </div>
            <div className="animate-slate w-100 h-5 bg-slate">

            </div>
        </div>

      </div>
      {/* end header */}
      {/* img */}
      
        <div className="animate-pulse bg-slate w-full h-300">

        </div>
      
      {/* end img */}
      <div className="flex flex-col justify-start items-start p-3">
        {/* menu */}
        <div className="flex justify-between items-center py-4 w-full">
          <div className="animate-pulse w-200 h-5 bg-slate">
        
          </div>
        </div>
      </div>
    </div>
  );
}

export default LazyLoading;
