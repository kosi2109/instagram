import React from 'react'
import Container from './SettingComponent/Container'
import LeftSide from './SettingComponent/LeftSide'
import RightSide from './SettingComponent/RightSide'
import SettingDetail from './SettingDetail'

function ChangePassword() {
    const inputStyle = "bg-primary border h-10 rounded-md border-borderPrimary w-5/6"
  return (
    <SettingDetail>
      <Container>
        <LeftSide>
          <div className="w-12 h-12 rounded-full bg-danger"></div>
        </LeftSide>
        <RightSide>
          <h4>Si Thu Htet</h4>
        </RightSide>
      </Container>

      <Container>
        <LeftSide>
          <h5>Old Password</h5>
        </LeftSide>
        <RightSide>
          <input
            type="password"
            className={inputStyle}
          />
        </RightSide>
      </Container>

      <Container>
        <LeftSide>
          <h5>New Password</h5>
        </LeftSide>
        <RightSide>
          <input
            type="password"
            className={inputStyle}
          />
        </RightSide>
      </Container>

      <Container>
        <LeftSide>
          <h5>Comfirm Password</h5>
        </LeftSide>
        <RightSide>
          <input
            type="email"
            className={inputStyle}
          />
        </RightSide>
      </Container>

      <Container>
        <LeftSide/>
        <RightSide>
          <button className="bg-btnPrimary text-secondary py-1 px-2 rounded-md float-left">
            Change Password
          </button>
        </RightSide>
      </Container>
    </SettingDetail>
  )
}

export default ChangePassword