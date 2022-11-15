import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeFill } from "react-icons/ri";

const Registration = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [errMsgFName, setErrMsgFName] = useState("");
  const [errMsgLName, setErrMsgLName] = useState("");
  const [errMsgEmail, setErrMsgEmail] = useState("");
  const [errMsgPass, setErrMsgPass] = useState("");
  const [errMsgCPass, setErrMsgCPass] = useState("");

  const [fErr, setFErr] = useState("");
  const [fErrPass, setFErrPass] = useState("");

  const [successMsg, setSuccessMsg] = useState("");

  const [loading, setLoading] = useState(false);
  const [passShow, setPassShow] = useState(false);

  const validName = /^[A-z\s]+$/;
  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const validPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w])/;

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setErrMsgFName("");
    setSuccessMsg("");
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
    setErrMsgLName("");
    setSuccessMsg("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrMsgEmail("");
    setFErr("");
    setSuccessMsg("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrMsgPass("");
    setSuccessMsg("");
  };

  const handleConfPassword = (e) => {
    setConfPassword(e.target.value);
    setErrMsgCPass("");
    setSuccessMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName) {
      setErrMsgFName("You must enter your first name!");
    } else if (!validName.test(firstName)) {
      setErrMsgFName("Name can't contain any numbers!");
    } else if (!lastName) {
      setErrMsgLName("You must enter your last name!");
    } else if (!validName.test(lastName)) {
      setErrMsgLName("Name can't contain any numbers!");
    } else if (!email) {
      setErrMsgEmail("You must enter your email!");
    } else if (!validEmail.test(email)) {
      setErrMsgEmail("Invalid Email!");
    } else if (!password) {
      setErrMsgPass("You must enter your password!");
    } else if (!validPass.test(password)) {
      setErrMsgPass(
        "Password must contain at least one lowercase, one uppercase, one digit & one symbol!"
      );
    } else if (!confPassword) {
      setErrMsgCPass("You must also confirm your password!");
    } else if (confPassword !== password) {
      setErrMsgCPass("Password does not match!");
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setSuccessMsg(
                "Registration done successfully! Redirecting you to the Login page. Please check your email for verification link."
              );
              setTimeout(() => {
                setLoading(false);
                navigate("/");
                setSuccessMsg("");
              }, 1500);
            })
            .catch((err) => {
              setLoading(false);
              console.log(err.code);
            });
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            setFErr("Sorry! This email is already taken.");
          } else if (errorCode.includes("auth/network-request-failed")) {
            setFErrPass("Network error! Check your connection pls.");
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
            <p className="w-[55%] ml-12 text-sm text-primary">
              Facebook helps you connect and share with the people in your life.
            </p>
          </div>
        </div>
        <div className="w-[51%] mr-20">
          <div className="flex flex-col h-screen items-center justify-center">
            {/* form starts  */}
            <form className="w-3/4">
              <input
                type={"text"}
                className="w-full py-5 px-[18px] text-base rounded-md border-2 border-[#D9D9D9] outline-0 focus:border-[#1877f2] mt-4 linear duration-300"
                placeholder="First Name"
                onChange={handleFirstName}
              />
              {errMsgFName !== "" && (
                <p className="text-[15px] text-[red] pl-1 pt-1 linear duration-300 animate-[popUpY_.4s_ease_1]">
                  {errMsgFName}
                </p>
              )}

              <input
                type={"text"}
                className="w-full py-5 px-[18px] text-base rounded-md border-2 border-[#D9D9D9] outline-0 focus:border-[#1877f2] mt-4 linear duration-300"
                placeholder="Last Name"
                onChange={handleLastName}
              />
              {errMsgLName !== "" && (
                <p className="text-[15px] text-[red] pl-1 pt-1 linear duration-300 animate-[popUpY_.4s_ease_1]">
                  {errMsgLName}
                </p>
              )}

              <input
                type={"email"}
                className="w-full py-5 px-[18px] text-base rounded-md border-2 border-[#D9D9D9] outline-0 focus:border-[#1877f2] mt-4 linear duration-300"
                placeholder="Email Address"
                onChange={handleEmail}
              />
              {errMsgEmail !== "" && (
                <p className="text-[15px] text-[red] pl-1 pt-1 linear duration-300 animate-[popUpY_.4s_ease_1]">
                  {errMsgEmail}
                </p>
              )}

              {fErr !== "" && (
                <p className="text-[15px] text-[red] pl-1 pt-1 linear duration-300 animate-[popUpY_.4s_ease_1]">
                  {fErr}
                </p>
              )}

              <div className="relative">
                <input
                  type={passShow ? "text" : "password"}
                  className="w-full py-5 px-[18px] pr-14 text-base rounded-md border-2 border-[#D9D9D9] outline-0 focus:border-[#1877f2] mt-4 linear duration-300"
                  placeholder="Password"
                  onChange={handlePassword}
                />
                {passShow ? (
                  <RiEyeFill
                    className="text-3xl absolute top-[37px] right-5 text-[#1877f2]/70 hover:text-[#1877f2] cursor-pointer linear duration-300"
                    onClick={() => setPassShow(!passShow)}
                  />
                ) : (
                  <RiEyeCloseLine
                    className="text-3xl absolute top-[37px] right-5 text-[#1877f2]/70 hover:text-[#1877f2] cursor-pointer linear duration-300"
                    onClick={() => setPassShow(!passShow)}
                  />
                )}
              </div>
              {errMsgPass !== "" && (
                <p className="text-[15px] text-[red] pl-1 pt-1 linear duration-300 animate-[popUpY_.4s_ease_1]">
                  {errMsgPass}
                </p>
              )}

              <input
                type={passShow ? "text" : "password"}
                className="w-full py-5 px-[18px] pr-14 text-base rounded-md border-2 border-[#D9D9D9] outline-0 focus:border-[#1877f2] mt-4 linear duration-300"
                placeholder="Confirm Password"
                onChange={handleConfPassword}
              />
              {errMsgCPass !== "" && (
                <p className="text-[15px] text-[red] pl-1 pt-1 linear duration-300 animate-[popUpY_.4s_ease_1]">
                  {errMsgCPass}
                </p>
              )}

              {successMsg !== "" && (
                <p className="text-lg text-[green] pl-1 pt-2 linear duration-300 animate-[popDown_.4s_ease_1]">
                  {successMsg}
                </p>
              )}

              {/* form submit button  */}
              <button
                type="submit"
                className={`w-full py-5 px-[18px] text-xl text-center rounded-[5px] bg-[#1877f2] text-white font-semibold mt-6 linear duration-300 hover:bg-[#0D60CF] active:scale-90 ${
                  loading && "bg-[#1877f2]/70"
                }`}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <SyncLoader margin={3} color={"#fff"} /> : "Sign Up"}
              </button>
              {/* form submit button  */}
            </form>
            {/* form ends  */}

            <Link
              to={loading ? "" : "/login"}
              className="w-[50%] py-[18px] px-[18px] text-center text-lg rounded-[5px] bg-[#36A420] text-white font-semibold mt-8 linear duration-300 hover:bg-[#248112] active:scale-90"
            >
              Already Have Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
