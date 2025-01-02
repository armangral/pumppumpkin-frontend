import { Spinner } from "@chakra-ui/react";
import AdminTransactionsTable from "src/features/admin/AdminTransactionsTable";
import { useAdminTransactions } from "src/features/admin/useAdminTransactions";

const AdminTransactionsPage = () => {
  const { isLoading, transactions } = useAdminTransactions();

  return (
    <div>
      {isLoading ? (
        <Spinner className="text-white" />
      ) : (
        <AdminTransactionsTable transactions={transactions} />
      )}{" "}
    </div>
  );
};

export default AdminTransactionsPage;
