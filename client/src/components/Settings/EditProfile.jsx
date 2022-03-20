import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeUserInfo } from "../../actions/user";
import { useCheckAuth } from "../../customHook/hooks";
import Container from "./SettingComponent/Container";
import LeftSide from "./SettingComponent/LeftSide";
import RightSide from "./SettingComponent/RightSide";
import SettingDetail from "./SettingDetail";

function EditProfile() {
  const inputStyle = "bg-primary border h-8 border-borderPrimary w-4/6 px-3"
  const user = JSON.parse(localStorage.getItem('profile'))
  const profile = useCheckAuth()
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    fullName : user.fullName,
    userName : user.userName,
    email : user.email,
    phone : user.phone ,
    gender : user.gender
  })

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(changeUserInfo(form))
  }
  return (
    <form onSubmit={handleSubmit}>

    
    <SettingDetail>
      <Container>
        <LeftSide>
          <div className="w-12 h-12 rounded-full bg-danger"></div>
        </LeftSide>
        <RightSide>
          <h4>{profile?.fullName}</h4>
          <h4 className="text-btnPrimary cursor-pointer select-none">Change Profile Photo</h4>
        </RightSide>
      </Container>

      <Container>
        <LeftSide>
          <h5>Name</h5>
        </LeftSide>
        <RightSide>
          <input
            name="fullName"
            type="text"
            className= {inputStyle}
            value={form.fullName}
            onChange={handleChange}
          />
          <p className="text-xs text-borderSecondary py-2">
            Help people discover your account by using the name you're known by:
            either your full name, nickname, or business name.
          </p>
          
        </RightSide>
      </Container>

      <Container>
        <LeftSide>
          <h5>Username</h5>
        </LeftSide>
        <RightSide>
          <input
            name="userName"
            type="text"
            className= {inputStyle}
            value={form.userName}
            onChange={handleChange}
          />
        </RightSide>
      </Container>

      <Container>
        <LeftSide>
          <h5>Email</h5>
        </LeftSide>
        <RightSide>
          <input
            name="email"
            type="email"
            className= {inputStyle}
            value={form?.email}
            onChange={handleChange}
          />
        </RightSide>
      </Container>

      <Container>
        <LeftSide>
          <h5>Phone Number</h5>
        </LeftSide>
        <RightSide>
          <input
            name="phone"
            type="text"
            className= {inputStyle}
            value={form?.phone}
            onChange={handleChange}
          />
        </RightSide>
      </Container>

      <Container>
        <LeftSide>
          <h5>Gender</h5>
        </LeftSide>
        <RightSide>
          <input
            name="gender"
            type="text"
            className= {inputStyle}
            value={form?.gender}
            onChange={handleChange}
          />
        </RightSide>
      </Container>

      <Container>
        <LeftSide/>
        <RightSide>
          <button className="bg-btnPrimary text-secondary py-1 px-2 rounded-md float-left">
            Submit
          </button>
        </RightSide>
      </Container>
    </SettingDetail>
    </form>
  );
}

export default EditProfile;
