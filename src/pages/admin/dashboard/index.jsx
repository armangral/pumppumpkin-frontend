import { Spinner } from "@chakra-ui/react";

import AdminAnalyticsComponent from "src/components/admin/dashboard/AdminAnalyticsComponent";
import AdminTransactionsTable from "src/features/admin/AdminTransactionsTable";
import { useAdminTransactions } from "src/features/admin/useAdminTransactions";

const AdminDashboardPage = () => {
  const { isLoading, transactions } = useAdminTransactions();

  return (
    <div>
      <AdminAnalyticsComponent />

      {isLoading ? (
        <Spinner className="text-white" />
      ) : (
        <AdminTransactionsTable transactions={transactions} />
      )}
    </div>
  );
};

export default AdminDashboardPage;
