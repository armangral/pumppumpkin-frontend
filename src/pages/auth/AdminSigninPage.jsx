import pumpkin from "src/assets/img/auth/logo.svg";
import circleimg from "src/assets/img/auth/circles.svg";

import AdminSigninForm from "src/features/auth/AdminSigninForm";

const AdminSigninPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-poppins">
      <div className="w-full min-h-screen bg-white shadow-md overflow-hidden md:flex text-indigo-950">
        {/* Left Side  */}

        <div className="hidden relative w-full md:w-3/5 gradient-color p-12 text-white lg:flex lg:flex-col lg:justify-center lg:items-center ">
          {/* Auth Logo Preview Image */}
          <div className="flex flex-col items-center">
            <img
              src={pumpkin}
              alt="auth-logo"
              className="md:w-64 h-auto rounded-lg"
            />
            <h1 className="capitalize md:text-5xl font-extrabold">
              pump pumpkin
            </h1>
          </div>

          {/* Circles*/}
          <div className="absolute bottom-0 left-0">
            <img src={circleimg} alt="auth-circles" />
          </div>
        </div>

        {/* Right Side - Login Form */}

        <div className="w-full lg:w-2/5 p-6 md:p-12 lg:p-24 min-h-screen flex justify-center items-center">
          <div className=" w-full">
            <div className="mb-12 text-dark_grey">
              <div className="text-2xl font-bold mb-2">Admin Signin</div>
              <div className=" text-sm">Welcome Back</div>
            </div>
            <AdminSigninForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSigninPage;
