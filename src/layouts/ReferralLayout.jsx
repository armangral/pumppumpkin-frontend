import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import ReferralSidebar from "src/components/referral/dashboard/ReferralSidebar";

const ReferralLayout = () => {
  return (
    <Container maxW="container.3xl" className="min-h-screen mx-0" p="0">
      <ReferralSidebar />
      <Box minH="100vh">
        <Box ml={{ base: 0, md: 64 }} p={["2", "5"]}>
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
};

export default ReferralLayout;
