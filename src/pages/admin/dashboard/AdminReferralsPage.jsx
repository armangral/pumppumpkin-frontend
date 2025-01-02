import { Spinner } from "@chakra-ui/react";
import AdminReferralsTable from "src/features/admin/AdminReferralsTable";
import { useAdminReferrals } from "src/features/admin/useAdminReferrals";

const AdminReferralsPage = () => {
  const { isLoading, referrals } = useAdminReferrals();

  return (
    <div>
      {isLoading ? (
        <Spinner className="text-white" />
      ) : referrals && referrals.length === 0 ? (
        <p>No referrals available.</p>
      ) : (
        <AdminReferralsTable referrals={referrals} />
      )}
    </div>
  );
};

export default AdminReferralsPage;
