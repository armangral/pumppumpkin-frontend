import AdminAnalyticsComponent from "src/components/admin/dashboard/AdminAnalyticsComponent";
import AdminWithdrawRequestsTable from "src/features/admin/AdminWithdrawRequestsTable";
import { useAdminWithdrawalRequests } from "src/features/admin/useAdminWithdrawalRequests";

const AdminWithdrawPage = () => {
  const { isLoading, withdrawalrequests } = useAdminWithdrawalRequests();

  return (
    <div>
      <AdminAnalyticsComponent />

      <AdminWithdrawRequestsTable withdrawalrequests={withdrawalrequests} />
    </div>
  );
};

export default AdminWithdrawPage;
