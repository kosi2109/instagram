import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sendCode } from "../../actions/auth";
import CakePng from "../../assets/cake.png"



function SignupSecondPage({ form , handleChange ,prePage, nextPage }) {
    const dispatch = useDispatch()

    const [validDate , setValidDate] = useState(false)
    useEffect(()=>{
        if ((new Date(new Date() - new Date(form.birthday)).getFullYear()- 1970) > 16){
            setValidDate(true)
        }else{
            setValidDate(false)
        }
    },[form])

    const sentMail = ()=>{
        const formData = {username:form.username,email:form.email}
        dispatch(sendCode(formData))
    }

  return (
    <>
      <img src={CakePng} alt="cake" className="w-100 h-auto" />
      <h5 className="text-center font-bold text-md py-2 text-textPrimary">Add Your Birthday</h5>
      <h6 className="text-center font-medium text-sm py-2 text-textPrimary">This won't be a part of your public profile.</h6>
        <div className="w-full py-3">
            <input onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} type="date" value={form.birthday} name="birthday" onChange={handleChange} className="w-full outline-borderActive border border-borderPrimary h-10" />
        </div>
      <h6 className="text-center font-medium text-xs py-2 text-textSecondary">You need to enter the date you were born</h6>
      <h6 className="text-center font-medium text-sm py-2 text-textSecondary">Use your own birthday, even if this account is for a business, a pet, or something else</h6>
      <button
          className={
            validDate
              ? "bg-btnPrimary w-full p-1 rounded-md text-secondary"
              : "bg-btnSecondary w-full p-1 rounded-md text-primary"
          }
          type="button"
          onClick={()=> {nextPage();sentMail()}}
          disabled={!validDate}
        >
          Next
        </button>
      <button className="bg-secondary p-1 rounded-md text-btnPrimary p-2" type="button" onClick={prePage}>Go Back</button>
    </>
  );
}

export default SignupSecondPage;
