import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { clearError } from "./actions/error";
import Login from "./components/Login";
import EmailSendMes from "./components/PasswordReset/EmailSendMes";
import EmailSentForm from "./components/PasswordReset/EmailSentForm";
import PasswordResetComfirm from "./components/PasswordReset/PasswordResetComfirm";
import Signup from "./components/Signup/Signup";
import Main from "./containers/Main";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("profile");
  if (!user) {
    return <Navigate to="/accounts/login" replace />;
  }

  return children;
};

const PublicRoute = () => {
  const user = localStorage.getItem("profile");
  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(clearError());
  }, [location]);

  return (
    <Routes>
      <Route path="/accounts" element={<PublicRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="emailsignup" element={<Signup />} />
        <Route path="password/reset" element={<EmailSentForm />} />
        <Route path="password/challenge" element={<EmailSendMes />} />
        <Route
          path="password/reset/comfirm/:token"
          element={<PasswordResetComfirm />}
        />
      </Route>
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
