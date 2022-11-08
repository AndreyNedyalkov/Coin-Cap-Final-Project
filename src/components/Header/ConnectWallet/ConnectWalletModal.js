import React, { useState, useHash, useEffect } from "react";
import "./ConnectWalletModal.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import "./ConnectWalletModal.css";
import { TextField } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import LockIcon from "../../Icons/Lock-Icon-PNG-Graphic-Cave.png";
import DollarsBackground from "./backgroundDollars.png";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setIsRegistrButtonDisabled, setIsLoginButtonDisabled, setIsLogin} from "../../../store/IsLoginSlice";
import { userManager } from "../../../userManager/UserManager";
import { setMyBalance } from "../../../store/SwapSlice";
import { setMyPortfolioBalance } from "../../../store/PortfolioSlice";
import { addToWatchlistRedux } from "../../../store/WatchlistSlice";
import { getActiveUser } from "../../../userManager/activeUser";

const style = {
  position: "absolute",
  maxWidth: 450,
  height: 450,
  backgroundImage: `url(${DollarsBackground})`,
  borderRadius: "20px",
  boxShadow: 24,
  p: 3,
};

export default function ConnectWalletModal() {
  const isRegistrButtonDisabled = useSelector((state) => state.disabler.isRegistrButtonDisabled);
  const isLoginButtonDisabled = useSelector((state) => state.disabler.isLoginButtonDisabled);
  const isLogin = useSelector((state) => state.disabler.isLogin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeLoginButtonCondition = (username, password) => {
    if (username && password) {
      dispatch(setIsLoginButtonDisabled(false));
    } else {
      dispatch(setIsLoginButtonDisabled(true));
    }
  };

  function changeRegistrButtonCondition(username, password, passwordRepeat) {
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    setUserExistsError("none");
    if (username && password && passwordRepeat) {
      dispatch(setIsRegistrButtonDisabled(false));
      setAccessMessage("block");
    } else {
      dispatch(setIsRegistrButtonDisabled(true));
    }

    if (password && passwordRepeat && password !== passwordRepeat) {
      setPassMismatchError("block");
      setAccessMessage("none");
      dispatch(setIsRegistrButtonDisabled(true));
    } else {
      setPassMismatchError("none");
    }

    if (password && !password.match(passw) || password.includes(" ")) {
      setPasswordRequirementsError("block");
      setPassMismatchError("none");
      dispatch(setIsRegistrButtonDisabled(true));
      setAccessMessage("none");
    } else {
      setPasswordRequirementsError("none");
    }

    if (username && username.length < 8 || username.includes(" ")) {
      setUsernameRequirementsError("block");
      dispatch(setIsRegistrButtonDisabled(true));
      setAccessMessage("none");
    } else {
      setUsernameRequirementsError("none");
    }
  }

  function tryRegister(username, password) {
    if (userManager.addUser(username, password)) {
      setDisplayLogProp("block");
      setDisplayRegProp("none");
      setRegistrUsername("");
      setRegistrPassword("");
      setRegistrPasswordRepeat("");
      setAccessMessage("none");
      setUserExistsError("none");
    } else {
      setRegistrUsername("");
      setAccessMessage("none");
      dispatch(setIsRegistrButtonDisabled(true));
      setUserExistsError("block");
      setTimeout(() => {
        setUserExistsError("none");
      }, 4000);
    }
  }

  function tryLogin(username, password) {
    const usernameTrimed = username.trim();
    const passwordTrimed = password.trim();
    if (userManager.validateCredentials(usernameTrimed, passwordTrimed)) {
      dispatch(setIsLoginButtonDisabled(true));
      userManager.activeUser(usernameTrimed);
      dispatch(setIsLogin());
      handleOpen();
      setLoginUsername("");
      setLoginPassword("");
      setAccessMessage("none");
      const activeUser = getActiveUser();
      const currentWatchlist = activeUser.watchlistIDs;
      dispatch(addToWatchlistRedux(currentWatchlist));
      dispatch(setMyPortfolioBalance(JSON.parse(localStorage.getItem("activeUser")).myBalance))
    } else {
      setLoginUsername("");
      setLoginPassword("");
      dispatch(setIsLoginButtonDisabled(true));
      setWrongCredentials("visible");
      setTimeout(() => {
        setWrongCredentials("hidden");
      }, 3000);
    }
  }

  function logout() {
    if (isLogin) {
      localStorage.removeItem("activeUser");
      dispatch(setMyBalance(0));
      dispatch(setIsLogin());
      dispatch(addToWatchlistRedux([]));
      navigate("/")
    }
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [displayLogProp, setDisplayLogProp] = useState("block");
  const [displayRegProp, setDisplayRegProp] = useState("none");

  const [wrongCredentials, setWrongCredentials] = useState("hidden");
  const [passMismatchError, setPassMismatchError] = useState("none");
  const [userExistsError, setUserExistsError] = useState("none");
  const [usernameRequirementsError, setUsernameRequirementsError] = useState("none");
  const [passwordRequirementsError, setPasswordRequirementsError] = useState("none");
  const [accessMessage, setAccessMessage] = useState("none");

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registrUsername, setRegistrUsername] = useState("");
  const [registrPassword, setRegistrPassword] = useState("");
  const [registrPasswordRepeat, setRegistrPasswordRepeat] = useState("");

  const [typeOfPasswordField, setTypeOfPasswordField] = useState("password");
  const [flagForShowPassword, setFlagForShowPassword] = useState(true);

  const showHidePassword = () => {
    setFlagForShowPassword(!flagForShowPassword);
    if (flagForShowPassword) {
      setTypeOfPasswordField("text");
    } else {
      setTypeOfPasswordField("password");
    }
  };

  return (
    <>
      <Button
        className="Connect-wallet-button"
        onClick={!isLogin ? handleOpen : () => {logout()}}
        style={{
          borderRadius: 40,
          backgroundColor: "rgb(24, 198, 131)",
          padding: "7px 16px",
          fontSize: "12px",
          boxShadow: "rgb(0 0 0 / 40%) 0px 2px 15px -3px",
          minWidth: "150px",
        }}
        variant="contained"
      >
        {!isLogin ? "Sign in & Sign up" : "Logout"}
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {
          setLoginUsername("");
          setLoginPassword("");
          setRegistrUsername("");
          setRegistrPassword("");
          setRegistrPasswordRepeat("");
          setPassMismatchError("none");
          setUsernameRequirementsError("none");
          setPasswordRequirementsError("none");
          setAccessMessage("none");
          setDisplayLogProp("block");
          setDisplayRegProp("none");
          handleOpen();
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        BackdropProps={{timeout: 500}}
      >
        <Fade in={open} className="Modal-connect-wallet">
          <Box className="Wallet-modal-box" sx={style}>
            <div className="Wallet-modal-box-header">
              <img className="Lock-icon" src={LockIcon} alt="lockIcon"></img>
            </div>

            <div
              style={{ display: displayLogProp }}
              className="LogRegCntnr Login-container"
            >
              <h2>Login</h2>
              <Box
                className="Input-box Input-box-login"
                sx={{display: "flex", alignItems: "flex-end"}}
              >
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  id="log-username"
                  value={loginUsername}
                  onChange={(e) => {
                    setLoginUsername(e.target.value);
                    changeLoginButtonCondition(e.target.value, loginPassword);
                  }}
                  className="Log-reg-input-field"
                  fullWidth
                  label="Login here"
                  variant="standard"
                  autoComplete="off"
                />
              </Box>

              <Box
                className="Input-box Input-box-login"
                sx={{display: "flex", alignItems: "flex-end"}}
              >
                {flagForShowPassword ? (
                  <VisibilityOffIcon
                    className="show-hide-password"
                    onClick={showHidePassword}
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                ) : (
                  <VisibilityIcon
                    className="show-hide-password"
                    onClick={showHidePassword}
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                )}
                <form className="form-for-password-field">
                  <TextField
                    id="log-password"
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      changeLoginButtonCondition(loginUsername, e.target.value);
                    }}
                    className="Log-reg-input-field"
                    fullWidth
                    label="Password here"
                    variant="standard"
                    type={typeOfPasswordField}
                    autoComplete="off"
                  />
                </form>
              </Box>

              <div className="Wrong-credentials-div">
                <p
                  style={{ visibility: wrongCredentials }}
                  className="Wrong-credentials-message"
                  id="loginError"
                >
                  Wrong credentials!
                </p>
              </div>

              <FormGroup>
                <FormControlLabel
                  sx={{visibility: "hidden", color: "#2f3640", margin: "8px 0px 18px 0"}}
                  control={<Checkbox />}
                  label="Remember me"
                />
              </FormGroup>

              <Button
                className="Sign-in-button"
                onClick={() => {tryLogin(loginUsername, loginPassword)}}
                style={{
                  borderRadius: 10,
                  backgroundColor: "rgb(24, 198, 131)",
                  padding: "6px 14px",
                  fontSize: "12px",
                  boxShadow: "rgb(0 0 0 / 40%) 0px 2px 15px -3px",
                  width: "100%",
                  margin: "0 0 10px 0",
                }}
                variant="contained"
                disabled={isLoginButtonDisabled}
              >
                Sign in
              </Button>

              <a
                className="Log-reg-link-a"
                onClick={() => {
                  setDisplayLogProp("none");
                  setDisplayRegProp("block");
                  setLoginUsername("");
                  setLoginPassword("");
                  dispatch(setIsLoginButtonDisabled(true));
                }}
              >
                Don't have an account? Sign Up
              </a>
            </div>

            <div
              style={{ display: displayRegProp }}
              className="LogRegCntnr Registration-container"
            >
              <h2>Registration</h2>
              <Box
                className="Input-box"
                sx={{ display: "flex", alignItems: "flex-end" }}
              >
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  id="reg-username"
                  value={registrUsername}
                  onChange={(e) => {
                    setRegistrUsername(e.target.value);
                    changeRegistrButtonCondition(
                      e.target.value,
                      registrPassword,
                      registrPasswordRepeat
                    );
                  }}
                  className="Log-reg-input-field"
                  fullWidth
                  label="Login here"
                  variant="standard"
                  autoComplete="off"
                />
              </Box>

              <Box
                className="Input-box"
                sx={{ display: "flex", alignItems: "flex-end" }}
              >
                {flagForShowPassword ? (
                  <VisibilityOffIcon
                    className="show-hide-password"
                    onClick={showHidePassword}
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                ) : (
                  <VisibilityIcon
                    className="show-hide-password"
                    onClick={showHidePassword}
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                )}
                <form className="form-for-password-field">
                  <TextField
                    id="reg-password"
                    value={registrPassword}
                    onChange={(e) => {
                      setRegistrPassword(e.target.value);
                      changeRegistrButtonCondition(
                        registrUsername,
                        e.target.value,
                        registrPasswordRepeat
                      );
                    }}
                    className="Log-reg-input-field"
                    fullWidth
                    label="Password here"
                    variant="standard"
                    type={typeOfPasswordField}
                    autoComplete="off"
                  />
                </form>
              </Box>
              <Box
                className="Input-box"
                sx={{ display: "flex", alignItems: "flex-end" }}
              >
                <ReportGmailerrorredIcon
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <form className="form-for-password-field">
                  <TextField
                    id="reg-password-repeat"
                    value={registrPasswordRepeat}
                    onChange={(e) => {
                      setRegistrPasswordRepeat(e.target.value);
                      changeRegistrButtonCondition(
                        registrUsername,
                        registrPassword,
                        e.target.value
                      );
                    }}
                    className="Log-reg-input-field"
                    fullWidth
                    label="Confirm password"
                    variant="standard"
                    type={typeOfPasswordField}
                    autoComplete="off"
                  />
                </form>
              </Box>

              <div className="Registration-messages-div">
                <p
                  style={{display: usernameRequirementsError, maxWidth: "275px"}}
                  className="Wrong-credentials-message username-require"
                  id="usernameRequirementsError"
                >
                  Login require: min 8 characters, no spaces!
                </p>
                <p
                  style={{ display: passMismatchError }}
                  className="Wrong-credentials-message"
                  id="passMismatchError"
                >
                  Your passwords don't match!
                </p>
                <p
                  style={{ display: userExistsError }}
                  className="Wrong-credentials-message"
                  id="userExistsError"
                >
                  Username is already taken!
                </p>
                <p
                  style={{
                    display: passwordRequirementsError,
                    maxWidth: "260px",
                  }}
                  className="Wrong-credentials-message password-require"
                  id="passwordRequirementsError"
                >
                  Password require: at least 1: lowercase, uppercase, number.
                  Minimum 8 characters, no spaces!
                </p>
                <p
                  style={{ display: accessMessage, maxWidth: "280px" }}
                  className="Wrong-credentials-message accessMessage"
                  id="accessMessage"
                >
                  Your login and password are very strong!
                </p>
              </div>

              <Button
                id="Registration-Button"
                className="Sign-up-button"
                onClick={() => tryRegister(registrUsername, registrPassword)}
                style={{
                  borderRadius: 10,
                  backgroundColor: "rgb(24, 198, 131)",
                  padding: "6px 16px",
                  fontSize: "12px",
                  boxShadow: "rgb(0 0 0 / 40%) 0px 2px 15px -3px",
                  width: "100%",
                  margin: "10px 0 10px 0",
                }}
                variant="contained"
                disabled={isRegistrButtonDisabled}
              >
                Sign up
              </Button>

              <a
                className="Log-reg-link-a link-to-sign-in"
                onClick={() => {
                  setDisplayLogProp("block");
                  setDisplayRegProp("none");
                  setRegistrUsername("");
                  setRegistrPassword("");
                  setRegistrPasswordRepeat("");
                  setPassMismatchError("none");
                  setPasswordRequirementsError("none");
                  setUsernameRequirementsError("none");
                  setAccessMessage("none");
                  dispatch(setIsRegistrButtonDisabled(true));
                }}
              >
                Do you have an account?? Sign In
              </a>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
