import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/landing";
import SigninPage from "./pages/auth/SigninPage";
import SignupPage from "./pages/auth/SignupPage";
import ReferralLayout from "./layouts/ReferralLayout";
import ReferralDashboardPage from "./pages/referral";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboardPage from "./pages/admin/dashboard";
import AdminTokenSaleAccusePage from "./pages/admin/dashboard/AdminTokenSaleAccusePage";
import AdminWithdrawPage from "./pages/admin/dashboard/AdminWithdrawPage";
import AdminTransactionsPage from "./pages/admin/dashboard/AdminTransactionsPage";
import UserLayout from "./layouts/UserLayout";
import UserDashboardPage from "./pages/user/dashboard";
import TokenSalePage from "./pages/TokenSalePage";
import AdminSigninPage from "./pages/auth/AdminSigninPage";
import AdminReferralsPage from "./pages/admin/dashboard/AdminReferralsPage";
import AdminProtectedRoute from "./ui/AdminProtectedRoute";
import ReferralProtectedRoute from "./ui/ReferralProtectedRoute";
import UserProtectedRoute from "./ui/UserProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}

      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="/index" />} />
          <Route path="/index" element={<LandingPage />} />
          <Route path="/tokensale" element={<TokenSalePage />} />

          <Route path="/admin/signin" element={<AdminSigninPage />} />

          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route element={<ReferralProtectedRoute />}>
            <Route element={<ReferralLayout />}>
              <Route
                path="/referral/dashboard"
                element={<ReferralDashboardPage />}
              />
            </Route>
          </Route>
          <Route element={<AdminProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route
                path="/admin/tokensale-accuse"
                element={<AdminTokenSaleAccusePage />}
              />
              <Route
                path="/admin/withdraw-requests"
                element={<AdminWithdrawPage />}
              />
              <Route
                path="/admin/transactions"
                element={<AdminTransactionsPage />}
              />
              <Route path="/admin/vips" element={<AdminReferralsPage />} />
            </Route>
          </Route>

          <Route element={<UserProtectedRoute />}>
            <Route element={<UserLayout />}>
              <Route path="/user/dashboard" element={<UserDashboardPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "grey",
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
