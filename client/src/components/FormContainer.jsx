import React from "react";

function FormContainer({children}) {
  return (
    <div className="pt-8 px-10 relative flex flex-col justify-start items-center mt-5 py-5 bg-secondary w-350 mx-auto rounded border-2 border-borderPrimary">
       {children}
    </div>
  );
}

export default FormContainer;
