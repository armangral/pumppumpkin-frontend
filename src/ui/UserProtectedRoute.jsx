import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const FullPage = ({ children }) => (
  <div className="h-screen bg-gray-50 flex items-center justify-center flex-col">
    {children}
  </div>
);

function UserProtectedRoute() {
  const navigate = useNavigate();

  // Access wallet state directly from Redux
  const wallet = useSelector((state) => state.wallet);

  if (wallet.connected) {
    return <Outlet />;
  } else {
    return (
      <FullPage>
        <h1 className="text-2xl font-bold my-3">Connect Wallet First!</h1>
        <button
          onClick={() => navigate("/index")}
          className="w-60 hover:bg-[#0505fb] bg-[#2929ef] text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Return Home
        </button>
      </FullPage>
    );
  }
}

export default UserProtectedRoute;
