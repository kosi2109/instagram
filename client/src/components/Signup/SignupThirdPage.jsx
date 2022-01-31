import React from "react";
import { IoMailUnreadOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { sendCode } from "../../actions/auth";
const inputSty = "w-full h-full bg-search outline-none border-none peer px-2";
const inputDiv =
  "mb-3 bg-search peer-focus:outline-borderActive flex w-full h-8 border rounded border-borderPrimary";

function SignupSecondPage({ form, handleChange, prePage }) {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.error);

  const sentMail = () => {
    const formData = { username: form.username, email: form.email };
    dispatch(sendCode(formData));
  };
  return (
    <>
      <IoMailUnreadOutline size={50} />
      <h5>Enter Confirmation Code</h5>
      <h6>
        Enter the confirmation code we sent to instagramclone.kosi@gmail.com.
      </h6>
      <button
        className="bg-secondary p-1 rounded-md text-btnPrimary p-2"
        type="button"
        onClick={sentMail}
      >
        Resent Code
      </button>
      <div className={inputDiv}>
        <input
          type="text"
          className={inputSty}
          name="code"
          value={form.code}
          onChange={handleChange}
        />
      </div>
      <button
        className="bg-btnPrimary w-full p-1 rounded-md text-secondary"
        type="submit"
      >
        Comfirm
      </button>
      <button
        className="bg-secondary p-1 rounded-md text-btnPrimary p-2"
        type="button"
        onClick={prePage}
      >
        Go Back
      </button>
      {error && (
        <div className="w-full text-center text-danger my-2 py-2">
          <p>{error}</p>
        </div>
      )}
    </>
  );
}

export default SignupSecondPage;
