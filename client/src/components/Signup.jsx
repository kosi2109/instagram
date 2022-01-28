import React, { useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import Logo from "../assets/logo.png";
import { emailCheck, userNameCheck } from "../utils/checkValidate";
import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineCheckCircle, AiFillFacebook } from "react-icons/ai";
import {useDispatch} from "react-redux"
import { register } from "../actions/auth";
const inputDiv =
  "mb-3 bg-search peer-focus:outline-borderActive flex w-full h-8 border rounded border-borderPrimary";
const inputSty = "w-full h-full bg-search outline-none border-none peer px-2";
const iconDiv = "flex justify-center items-center px-2 bg-secondary";

function Signup() {
  const initialForm = {
    email: "",
    fullName: "",
    username: "",
    password: "",
  };
  const [form, setForm] = useState(initialForm);
  const [emailValid, setEmailValid] = useState(null);
  const [usernameValid, setUsernameValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [validForm, setValidForm] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const emailChecker = () => {
    setTimeout(() => {
      if (!emailCheck(form.email) && form.email !== "") {
        setEmailValid(false);
      } else {
        setEmailValid(true);
      }
    }, 1000);
  };

  const userNameChecker = () => {
    setTimeout(() => {
      if (!userNameCheck(form.username) && form.username !== "") {
        setUsernameValid(false);
      } else {
        setUsernameValid(true);
      }
    }, 1000);
  };

  const passwordChecker = () => {
    if (form.password.length > 7) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  const passForm = () => {
    if (form.fullName !== "" && usernameValid && passwordValid && emailValid) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  };

  useEffect(() => {
    emailChecker();
    userNameChecker();
    passwordChecker();
  }, [form]);

  useEffect(()=>{
    passForm();
  },[usernameValid,emailValid,passwordValid])
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(form,navigate))
  };

  return (
    <div className="flex flex-col justify-start items-center mt-3 py-5">
      <div className="pt-8 bg-secondary px-10 w-350 flex flex-col justify-start items-center mb-5 rounded border-2 border-borderPrimary">
        <img src={Logo} alt="logo" className="w-150 h-auto py-5" />
        <h1 className="text-center text-textSecondary font-bold leading-tight mb-5">
          Sign up to see photos and videos from your friends.
        </h1>
        <button className="bg-btnPrimary w-full p-1 rounded-md text-secondary flex justify-center items-center font-medium mb-5">
          <span>
            <AiFillFacebook size={23} />
          </span>
          Log in with Facebook
        </button>
        <div className="w-full h-8 p-3 relative flex items-center justify-center">
          <div style={{position:"absolute",borderBottom:"1px solid #DBDBDB",width:"100%",height:"1px",zIndex:"1"}}></div>
          <div className="bg-secondary w-16" style={{zIndex:"5"}}>
            <h6 className="text-center text-sm text-borderActive">OR</h6>

          </div>
        </div>
        <form
          className="w-full flex flex-col justify-center items-center py-3"
          onSubmit={handleSubmit}
        >
          <div className={inputDiv}>
            <input
              type="text"
              name="email"
              className={inputSty}
              value={form.email}
              placeholder="Email"
              autoComplete="false"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {form.email !== "" && (
              <div className={iconDiv}>
                {emailValid ? (
                  <AiOutlineCheckCircle size={20} color="green" />
                ) : (
                  <BiErrorCircle size={20} color="red" />
                )}
              </div>
            )}
          </div>

          <div className={inputDiv}>
            <input
              type="text"
              className={inputSty}
              name="fullName"
              placeholder="Full Name"
              autoComplete="false"
              value={form.fullName}
              onChange={handleChange}
            />
            {form.fullName !== "" && (
              <div className={iconDiv}>
                <AiOutlineCheckCircle size={20} color="green" />
              </div>
            )}
          </div>

          <div className={inputDiv}>
            <input
              type="text"
              className={inputSty}
              name="username"
              placeholder="Username"
              autoComplete="false"
              value={form.username}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {form.username !== "" && (
              <div className={iconDiv}>
                {usernameValid ? (
                  <AiOutlineCheckCircle size={20} color="green" />
                ) : (
                  <BiErrorCircle size={20} color="red" />
                )}
              </div>
            )}
          </div>
          <div className={inputDiv}>
            <input
              type="password"
              className={inputSty}
              name="password"
              placeholder="Password"
              autoComplete="false"
              value={form.password}
              onChange={handleChange}
            />
            {form.password !== "" && (
              <div className={iconDiv}>
                {passwordValid ? (
                  <AiOutlineCheckCircle size={20} color="green" />
                ) : (
                  <BiErrorCircle size={20} color="red" />
                )}
              </div>
            )}
          </div>
          <button
            className={
              validForm
                ? "bg-btnPrimary w-full p-1 rounded-md text-secondary"
                : "bg-btnSecondary w-full p-1 rounded-md text-primary"
            }
            type="submit"
            disabled={!validForm}
          >
            Sign Up
          </button>
        </form>
        <div className="w-full py-3">
          <h5 className="text-center">Login with Facebook</h5>
          <h6 className="text-center">Forgot Password ?</h6>
        </div>
      </div>
      <div></div>
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
