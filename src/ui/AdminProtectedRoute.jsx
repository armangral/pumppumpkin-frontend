import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import { useAdmin } from "src/features/auth/useAdmin";

const FullPage = ({ children }) => (
  <div className="h-screen bg-gray-50 flex items-center justify-center">
    {children}
  </div>
);

function AdminProtectedRoute() {
  const navigate = useNavigate();

  //1. Load authenticated user
  const { isLoading, isAuthenticated, user } = useAdmin();

  //2 . if not authenticated, redirect to login page

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/admin/signin");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3. if loading show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner size="xl" />
      </FullPage>
    );

  //4. if user render app
  if (isAuthenticated && user?.is_superadmin) {
    return <Outlet />;
  } else {
    return (
      <FullPage>
        <h1>Not Enough Access!</h1>
      </FullPage>
    );
  }
}

export default AdminProtectedRoute;
