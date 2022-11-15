import React, { useState } from "react";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import { RiCloseFill, RiEyeCloseLine } from "react-icons/ri";
import { RiEyeFill } from "react-icons/ri";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailForgot, setEmailForgot] = useState("");
  const [password, setPassword] = useState("");

  const [errMsgEmail, setErrMsgEmail] = useState("");
  const [errMsgEmailForgot, setErrMsgEmailForgot] = useState("");
  const [errMsgPass, setErrMsgPass] = useState("");

  const [fErrEmail, setFErrEmail] = useState("");
  const [fErrEmailForgot, setFErrEmailForgot] = useState("");
  const [fErrPass, setFErrPass] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [successMsgForgot, setSuccessMsgForgot] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingForgot, setLoadingForgot] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrMsgEmail("");
    setFErrEmail("");
    setSuccessMsg("");
  };

  const handleEmailForgot = (e) => {
    setEmailForgot(e.target.value);
    setErrMsgEmailForgot("");
    setFErrEmailForgot("");
    setSuccessMsgForgot("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrMsgPass("");
    setSuccessMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setErrMsgEmail("You must enter your email!");
    } else if (!validEmail.test(email)) {
      setErrMsgEmail("Invalid Email!");
    } else if (!password) {
      setErrMsgPass("You must enter your password!");
    } else {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          setSuccessMsg(
            "Credentials matched! Redirecting you to the Homepage."
          );
          setTimeout(() => {
            setLoading(false);
            navigate("/");
            setSuccessMsg("");
          }, 1500);
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          if (errorCode.includes("auth/user-not-found")) {
            setFErrEmail("Sorry! User not found.");
          } else if (errorCode.includes("auth/wrong-password")) {
            setFErrPass("Wrong password! Try again.");
          } else if (errorCode.includes("auth/network-request-failed")) {
            setFErrPass("Network error! Check your connection pls.");
          }
          console.log(errorCode);
        });
    }
  };

  const handleSubmitForgot = (e) => {
    e.preventDefault();
    if (!emailForgot) {
      setErrMsgEmailForgot("You must enter your email!");
    } else if (!validEmail.test(emailForgot)) {
      setErrMsgEmailForgot("Invalid Email!");
    } else {
      setLoadingForgot(true);
      sendPasswordResetEmail(auth, emailForgot)
        .then(() => {
          console.log("Password reset email sent!");
          setSuccessMsgForgot(
            "Password reset email sent! Please check your email."
          );
          setTimeout(() => {
            setLoadingForgot(false);
            setSuccessMsgForgot("");
            setShowModal(false);
          }, 2000);
        })
        .catch((error) => {
          setLoadingForgot(false);
          const errorCode = error.code;
          if (errorCode.includes("auth/user-not-found")) {
            setFErrEmailForgot("Sorry! User not found.");
          } else if (errorCode.includes("auth/network-request-failed")) {
            setFErrEmailForgot("Network error! Check your connection pls.");
          }
          console.log(errorCode);
        });
    }
  };

  return (
    <div>
      <div className="flex gap-x-5 font-pop">
        <div className="w-[48%] h-screen flex justify-end items-center">
          <div className="w-[80%] mb-40">
            <picture className="">
              <img src="images/logo192.png" className="" loading="lazy" />
            </picture>
            <p className="w-[60%] ml-12 text-sm text-primary">
              Facebook helps you connect and share with the people in your life.
            </p>
          </div>
        </div>
        <div className="w-[51%]">
          <div className="flex h-screen items-center">
            <form className="w-3/4 border-2 p-6 border-[#D9D9D9] rounded-md">
              <input
                className="w-full py-[22px] px-[18px] text-base rounded-md border-2 border-[#D9D9D9] outline-0 focus:border-[#1877f2] mt-4 linear duration-300"
                placeholder="Email Address"
                type={"email"}
                onChange={handleEmail}
              />
              {errMsgEmail !== "" && (
                <p className="text-[15px] text-[red] pl-1 pt-1 linear duration-300 animate-[popUpY_.4s_ease_1]">
                  {errMsgEmail}
                </p>
              )}
              {fErrEmail !== "" && (
                <p className="text-[15px] text-[red] pl-1 pt-1 linear duration-300 animate-[popUpY_.4s_ease_1]">
                  {fErrEmail}
                </p>
              )}

              <input
                className="w-full py-[22px] px-[18px] text-base rounded-md border-2 border-[#D9D9D9] outline-0 focus:border-[#1877f2] mt-4 linear duration-300"
                placeholder="Password"
                type={"password"}
                onChange={handlePassword}
              />
              {errMsgPass !== "" && (
                <p className="text-[15px] text-[red] pl-1 pt-1 linear duration-300 animate-[popUpY_.4s_ease_1]">
                  {errMsgPass}
                </p>
              )}
              {fErrPass !== "" && (
                <p className="text-[15px] text-[red] pl-1 pt-1 linear duration-300 animate-[popUpY_.4s_ease_1]">
                  {fErrPass}
                </p>
              )}

              {successMsg !== "" && (
                <p className="text-lg text-[green] pl-1 pt-2 linear duration-300 animate-[popDown_.4s_ease_1]">
                  {successMsg}
                </p>
              )}

              <button
                type="submit"
                className={`w-full py-5 px-[18px] text-xl text-center rounded-[5px] bg-[#1877f2] text-white font-semibold mt-6 linear duration-300 hover:bg-[#0D60CF] active:scale-90 ${
                  loading && "bg-[#1877f2]/70"
                }`}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <SyncLoader margin={3} color={"#fff"} /> : "Log In"}
              </button>
              <p
                className="text-center pt-5 pb-8 text-sm text-[#1877f2]/90 hover:text-[#1877f2] linear duration-300 cursor-pointer font-semibold"
                onClick={() => setShowModal(true)}
              >
                Forgotten password?
              </p>

              <Link
                to={loading ? "" : "/registration"}
                className="w-[65%] text-center py-[18px] px-[18px] text-lg rounded-[5px] bg-[#36A420] text-white font-semibold m-auto block linear duration-300"
                onClick={""}
              >
                Create New Account
              </Link>
            </form>
          </div>
        </div>
      </div>

      {/* Forgotten password modal starts  */}
      {showModal && (
        <div className="fixed top-0 left-0 bg-black/40 w-full h-full grid place-items-center">
          <div className="py-14 px-10 bg-white w-2/5 relative animate-[popUp_.4s_ease_1]">
            <RiCloseFill
              className={
                "text-[40px] absolute top-2 right-2 text-[#1877f2]/70 hover:text-[#1877f2] linear duration-300 cursor-pointer"
              }
              onClick={() => setShowModal(false)}
            />
            <p className="text-[34px] text-center font-semibold text-[#1877f2] mb-4">
              Forgotten password?
            </p>
            <p className="text-center text-lg text-primary font-semibold mb-4">
              Enter your email address in order to get a link to reset your
              password.
            </p>
            <form>
              <input
                className="w-full py-[22px] px-[18px] text-lg rounded-md border-2 border-[#D9D9D9] outline-0 focus:border-[#1877f2] mt-4 linear duration-300"
                placeholder="Email Address"
                type={"email"}
                onChange={handleEmailForgot}
              />
              {errMsgEmailForgot !== "" && (
                <p className="text-[15px] text-[red] pl-3 pt-1 linear duration-300 animate-[popUpY_.4s_ease_1]">
                  {errMsgEmailForgot}
                </p>
              )}
              {fErrEmailForgot !== "" && (
                <p className="text-[15px] text-[red] pl-3 pt-1 linear duration-300 animate-[popUpY_.4s_ease_1]">
                  {fErrEmailForgot}
                </p>
              )}
              {successMsgForgot !== "" && (
                <p className="text-lg text-[green] pl-3 pt-2 linear duration-300 animate-[popDown_.4s_ease_1]">
                  {successMsgForgot}
                </p>
              )}

              <button
                type="submit"
                className={`w-full py-5 px-[18px] text-[22px] text-center rounded-[5px] bg-[#1877f2] text-white font-semibold mt-6 linear duration-300 hover:bg-[#0D60CF] active:scale-90 ${
                  loadingForgot && "bg-[#1877f2]/70"
                }`}
                onClick={handleSubmitForgot}
                disabled={loadingForgot}
              >
                {loadingForgot ? (
                  <SyncLoader margin={3} color={"#fff"} />
                ) : (
                  "Proceed"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Forgotten password modal ends  */}
    </div>
  );
};

export default Login;
