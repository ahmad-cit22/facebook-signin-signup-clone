import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const Registration = () => {
  const auth = getAuth();

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

  const [successMsg, setSuccessMsg] = useState("");

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
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setSuccessMsg(
                "Registration done successfully! Please check your email for verification link."
              );
              console.log("Email verification sent!");
            })
            .catch((err) => {
              console.log(err.code);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
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
        <div className="w-[51%]">
          <div className="flex h-screen items-center">
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

              <input
                type={"password"}
                className="w-full py-5 px-[18px] text-base rounded-md border-2 border-[#D9D9D9] outline-0 focus:border-[#1877f2] mt-4 linear duration-300"
                placeholder="Password"
                onChange={handlePassword}
              />
              {errMsgPass !== "" && (
                <p className="text-[15px] text-[red] pl-1 pt-1 linear duration-300 animate-[popUpY_.4s_ease_1]">
                  {errMsgPass}
                </p>
              )}

              <input
                type={"password"}
                className="w-full py-5 px-[18px] text-base rounded-md border-2 border-[#D9D9D9] outline-0 focus:border-[#1877f2] mt-4 linear duration-300"
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

              <button
                type="submit"
                className="w-full py-5 px-[18px] text-xl rounded-[5px] bg-[#1877f2] text-white font-semibold mt-6 linear duration-300 hover:bg-[#0D60CF]"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
              <button className="w-[65%] py-[22px] px-[18px] text-lg rounded-[5px] bg-[#36A420] text-white font-semibold m-auto block mt-6 linear duration-300 hover:bg-[#248112]">
                Already Have Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
