import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../actions/auth";
import { clearError } from "../../actions/error";
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
    e.preventDefault();
    dispatch(register(form, navigate));
  };

  const error = useSelector((state)=> state.error)
  return (
    <div className="flex flex-col justify-start items-center mt-3 py-5">
      <form onSubmit={handleSubmit} className="pt-8 bg-secondary px-10 w-350 flex flex-col justify-start items-center mb-5 rounded border-2 border-borderPrimary">
        {page === 1 && <SignupFirstPage form={form} handleChange={handleChange} nextPage={nextPage} /> }
        {page === 2 && <SignupSecondPage  form={form} handleChange={handleChange} prePage={prePage} nextPage={nextPage} /> }
        {page === 3 && <SignupThirdPage form={form} handleChange={handleChange} prePage={prePage} nextPage={nextPage} /> }
      </form>
      
      <div className="bg-secondary w-350 py-4 rounded border-2 border-borderPrimary">
        <h5 className="text-center">
          Have an account?{" "}
          <Link to="/accounts/login">
            <span className="text-btnPrimary font-light">Log in</span>
          </Link>{" "}
        </h5>
      </div>
    </div>
  );
}

export default Signup;
