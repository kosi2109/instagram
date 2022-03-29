import React,{useState,useEffect} from "react";
import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineCheckCircle, AiFillFacebook } from "react-icons/ai";
import Logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { emailCheck, userNameCheck } from "../../utils/checkValidate";
import { checkAuth } from "../../actions/auth";


const inputDiv =
  "mb-3 bg-search peer-focus:outline-borderActive flex w-full h-8 border rounded border-borderPrimary";
const inputSty = "w-full h-full bg-search outline-none border-none peer px-2";
const iconDiv = "flex justify-center items-center px-2 bg-secondary";

function SignupFirstPage({form,handleChange,nextPage}) {
  const dispatch = useDispatch()
  const [emailValid, setEmailValid] = useState(null);
  const [usernameValid, setUsernameValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [validForm, setValidForm] = useState(false);
  

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

  useEffect(() => {
    passForm();
  }, [usernameValid, emailValid, passwordValid]);
  

  const checkValid = ()=>{
    dispatch(checkAuth({username:form.username,email:form.email,password:form.password},nextPage))
  }

  const {error} = useSelector((state) => state.error);
  return (
    <>
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
        <div
          style={{
            position: "absolute",
            borderBottom: "1px solid #DBDBDB",
            width: "100%",
            height: "1px",
            zIndex: "1",
          }}
        ></div>
        <div className="bg-secondary w-16" style={{ zIndex: "5" }}>
          <h6 className="text-center text-sm text-borderActive">OR</h6>
        </div>
      </div>
      <div
        className="w-full flex flex-col justify-center items-center py-3"
      >
        <div className={inputDiv}>
          <input
            type="text"
            name="email"
            className={inputSty}
            value={form.email}
            placeholder="Email"
            required
            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
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
            autoComplete="off"
            required
            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
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
            autoComplete="off"
            required
            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
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
            autoComplete="off"
            required
            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
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
          type="button"
          onClick={checkValid}
          disabled={!validForm}
        >
          Sign Up
        </button>
      </div>
      {error && (
        <div className="w-full text-center text-danger my-2 py-2">
          <p>{error}</p>
        </div>
      )}
      <div className="py-3">
        <p className="text-sm text-center text-textPrimary">
          By signing up, you agree to our Terms , Data Policy and Cookies Policy
          .
        </p>
      </div>
    </>
  );
}

export default SignupFirstPage;
