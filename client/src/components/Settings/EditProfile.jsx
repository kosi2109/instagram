import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeProfilePic, changeUserInfo } from "../../actions/user";
import { useCheckAuth } from "../../customHook/hooks";
import { useOutsideAlerter } from "../../utils/clickOutside";
import Modal from "../Modal";
import Container from "./SettingComponent/Container";
import LeftSide from "./SettingComponent/LeftSide";
import RightSide from "./SettingComponent/RightSide";
import SettingDetail from "./SettingDetail";

const btnClass = "h-12 w-full border-t border-borderPrimary";

function EditProfile() {
  const [editProfile, setEditProfile] = useState(false);
  const profileRef = useRef(null);
  const inputStyle = "bg-primary border h-8 border-borderPrimary w-4/6 px-3";
  const user = JSON.parse(localStorage.getItem("profile"));
  const profile = useCheckAuth();
  const dispatch = useDispatch();
  useOutsideAlerter(profileRef, setEditProfile);
  const [form, setForm] = useState({
    fullName: user.fullName,
    userName: user.userName,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeUserInfo(form));
  };

  const profileImageChange = (e)=>{
    const ppForm = new FormData() 
    ppForm.append('profile', e.target.files[0])
    dispatch(changeProfilePic(ppForm))
  }

  
  return (
    <form onSubmit={handleSubmit}>
      {editProfile && (
        <Modal>
          <div
            ref={profileRef}
            className="bg-secondary w-400 text-center flex flex-col rounded-md"
          >
            <div className="h-20 flex items-center justify-center">
              <h5 className="text-xl">Change Profile Photo</h5>
            </div>

            <div>
              <input type="file" id="upload" hidden name="profile" onChange={profileImageChange} />
              <label htmlFor="upload">
                
                <div
                  className="h-12 w-full border-t border-borderPrimary text-btnPrimary flex justify-center items-center cursor-pointer"
                  
                >
                  Upload Photo
                </div>
              </label>
            </div>

            <button type="button" className={btnClass + " text-danger"}>
              Remove Current Photo
            </button>
            <button
              type="button"
              className={btnClass}
              onClick={() => setEditProfile(false)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
      <SettingDetail>
        <Container>
          <LeftSide>
            <div
              onClick={() => setEditProfile(true)}
              className="w-12 h-12 rounded-full bg-danger cursor-pointer overflow-hidden"
            >
              <img src={profile?.profile_url ? profile?.profile_url : "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"} alt="profile image" className='w-full h-auto' />
            </div>
          </LeftSide>
          <RightSide>
            <h4>{profile?.fullName}</h4>
            <h4
              onClick={() => setEditProfile(true)}
              className="text-btnPrimary cursor-pointer select-none"
            >
              Change Profile Photo
            </h4>
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
              className={inputStyle}
              value={form.fullName}
              onChange={handleChange}
            />
            <p className="text-xs text-borderSecondary py-2">
              Help people discover your account by using the name you're known
              by: either your full name, nickname, or business name.
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
              className={inputStyle}
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
              className={inputStyle}
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
              className={inputStyle}
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
              className={inputStyle}
              value={form?.gender}
              onChange={handleChange}
            />
          </RightSide>
        </Container>

        <Container>
          <LeftSide />
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
