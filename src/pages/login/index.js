import React from "react";

const Login = () => {
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
                className="w-full py-[22px] px-[18px] text-[17px] rounded-md border-2 border-[#D9D9D9] outline-0 focus:border-[#1877f2] mb-4 linear duration-300"
                placeholder="Email Address"
              />
              <input
                className="w-full py-[22px] px-[18px] text-[17px] rounded-md border-2 border-[#D9D9D9] outline-0 focus:border-[#1877f2] mb-6 linear duration-300"
                placeholder="Password"
              />
              <button
                className="w-full py-[22px] px-[18px] text-xl rounded-md bg-[#1877f2] text-white font-semibold linear duration-300"
                onClick={""}
              >
                Log In
              </button>
              <p
                className="text-center pt-5 pb-8 text-sm text-[#1877f2] linear duration-300"
                onClick={""}
              >
                Forgotten password?
              </p>
              <button
                className="w-[65%] py-[22px] px-[18px] text-lg rounded-[5px] bg-[#36A420] text-white font-semibold m-auto block linear duration-300"
                onClick={""}
              >
                Create New Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
