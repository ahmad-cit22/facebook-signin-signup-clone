import React, { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (auth.currentUser === null) {
        navigate('/login');
    } 
  
  }, []);

  return (
    <div className="bg-primary/20 border-[1px] lg:border-[3px] border-[#1877f2]/70 rounded-md mt-14 text-[#1877f2] flex-col justify-center items-center p-5 lg:p-10 lg:pt-8 w-4/5 lg:w-3/5 m-auto text-xl lg:text-[28px] font-semibold text-center animate-[popUp_.4s_ease_1]">
      <p className="lg:leading-[34px]">
        Please verify your email address first in order to get access to your
        account.
      </p>
      <p className="mt-2 lg:mt-3 text-lg lg:text-2xl">
        Check your email for the verification link.
      </p>
    </div>
  );
};

export default Home;
