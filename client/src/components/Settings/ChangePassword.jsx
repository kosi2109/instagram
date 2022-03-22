import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../actions/user";
import { useCheckAuth } from "../../customHook/hooks";
import Notification from "../Notification";
import Container from "./SettingComponent/Container";
import LeftSide from "./SettingComponent/LeftSide";
import RightSide from "./SettingComponent/RightSide";
import SettingDetail from "./SettingDetail";

function ChangePassword() {
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    old_password : "",
    new_password : "",
    comfirm_password : "",
  })
  const inputStyle =
    "bg-primary border h-10 rounded-md border-borderPrimary w-6/6 px-2";
  const user = useCheckAuth();

  const submitController = (e)=>{
    e.preventDefault();
    dispatch(changePassword(form))
    if (success){
      setForm({
        old_password : "",
        new_password : "",
        comfirm_password : "",
      })
    }
  }

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })

  }

  const {error , success} = useSelector((state) => state.error);

  

  return (
    <form onSubmit={submitController}>
      <SettingDetail>
        <Container>
          <LeftSide>
            <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={user?.profile_url ? user?.profile_url : "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"} alt="profile image" className='w-full h-auto' />
            </div>
          </LeftSide>
          <RightSide>
            <h4 className="text-lg font-medium">{user?.fullName}</h4>
          </RightSide>
        </Container>

        <Container>
          <LeftSide>
            <h5>Old Password</h5>
          </LeftSide>
          <RightSide>
            <input name="old_password" value={form.old_password} onChange={handleChange} type="password" className={inputStyle} />
          </RightSide>
        </Container>

        <Container>
          <LeftSide>
            <h5>New Password</h5>
          </LeftSide>
          <RightSide>
            <input required name="new_password" value={form.new_password} onChange={handleChange} type="password" className={inputStyle} />
          </RightSide>
        </Container>

        <Container>
          <LeftSide>
            <h5>Comfirm Password</h5>
          </LeftSide>
          <RightSide>
            <input required name="comfirm_password" value={form.comfirm_password} onChange={handleChange} type="password" className={inputStyle} />
          </RightSide>
        </Container>

        <Container>
          <LeftSide />
          <RightSide>
            <button required className="bg-btnPrimary text-secondary py-1 px-2 rounded-md float-left">
              Change Password
            </button>
          </RightSide>
        </Container>
      </SettingDetail>


      {error && 
      <Notification message={error} />
      }

      {success && 
      <Notification message={success} />
      }

    </form>
  );
}

export default ChangePassword;
