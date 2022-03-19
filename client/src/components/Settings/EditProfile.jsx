import React from "react";
import Container from "./SettingComponent/Container";
import LeftSide from "./SettingComponent/LeftSide";
import RightSide from "./SettingComponent/RightSide";
import SettingDetail from "./SettingDetail";

function EditProfile() {
  const inputStyle = "bg-primary border h-8 border-borderPrimary w-4/6 px-3"
  return (
    <SettingDetail>
      <Container>
        <LeftSide>
          <div className="w-12 h-12 rounded-full bg-danger"></div>
        </LeftSide>
        <RightSide>
          <h4>Si Thu Htet</h4>
          <h4 className="text-btnPrimary cursor-pointer select-none">Change Profile Photo</h4>
        </RightSide>
      </Container>

      <Container>
        <LeftSide>
          <h5>Name</h5>
        </LeftSide>
        <RightSide>
          <input
            type="text"
            className= {inputStyle}
          />
          <p className="text-xs text-borderSecondary py-2">
            Help people discover your account by using the name you're known by:
            either your full name, nickname, or business name.
          </p>
          <p className="text-xs text-borderSecondary py-2">
            You can only change your name twice within 14 days.
          </p>
        </RightSide>
      </Container>

      <Container>
        <LeftSide>
          <h5>Username</h5>
        </LeftSide>
        <RightSide>
          <input
            type="text"
            className= {inputStyle}
          />
        </RightSide>
      </Container>

      <Container>
        <LeftSide>
          <h5>Email</h5>
        </LeftSide>
        <RightSide>
          <input
            type="email"
            className= {inputStyle}
          />
        </RightSide>
      </Container>

      <Container>
        <LeftSide>
          <h5>Phone Number</h5>
        </LeftSide>
        <RightSide>
          <input
            type="text"
            className= {inputStyle}
          />
        </RightSide>
      </Container>

      <Container>
        <LeftSide>
          <h5>Gender</h5>
        </LeftSide>
        <RightSide>
          <input
            type="text"
            className= {inputStyle}
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
  );
}

export default EditProfile;
