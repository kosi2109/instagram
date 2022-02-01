import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../actions/auth";
import { clearError } from "../../actions/error";
import FormContainer from "../FormContainer";
import SignupFirstPage from "./SignupFirstPage";
import SignupSecondPage from "./SignupSecondPage";
import SignupThirdPage from "./SignupThirdPage";


function Signup() {
  const initialForm = {
    email: "",
    fullName: "",
    username: "",
    password: "",
    birthday : "",
    code : ""
  };
  const [page,setPage] = useState(1)
  const [form, setForm] = useState(initialForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const nextPage = ()=>{
    if (page < 4){
      setPage(page+1)
    }
  }
  const prePage = ()=>{
    if (page > 0)
    setPage(page-1)
  }

  useEffect(()=>{
    dispatch(clearError())
  },[page])


  const handleSubmit = (e) => {
    console.log(e.target.keyCode);
    e.preventDefault();
    dispatch(register(form, navigate));
  };

 
  return (
    <div className="py-5"  >
    <FormContainer>
      <form onSubmit={(e)=> handleSubmit(e)} className="flex flex-col justify-start items-center mb-5 w-full">
        {page === 1 && <SignupFirstPage form={form} handleChange={handleChange} nextPage={nextPage} /> }
        {page === 2 && <SignupSecondPage  form={form} handleChange={handleChange} prePage={prePage} nextPage={nextPage} /> }
        {page === 3 && <SignupThirdPage form={form} handleChange={handleChange} prePage={prePage} nextPage={nextPage} /> }
      </form>
      
      
    </FormContainer>
    <div className="bg-secondary w-350 py-5 rounded border-2 border-borderPrimary mx-auto">
        <h5 className="text-center">
          Have an account?
          <Link to="/accounts/login">
            <span className="text-btnPrimary font-light">Log in</span>
          </Link>
        </h5>
      </div>
    </div>
  );
}

export default Signup;
