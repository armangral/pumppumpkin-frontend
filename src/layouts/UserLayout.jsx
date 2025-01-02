import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import UserSidebar from "src/components/user/dashboard/UserSidebar";

const UserLayout = () => {
  return (
    <Container maxW="container.3xl" className="min-h-screen mx-0" p="0">
      <UserSidebar />
      <Box minH="100vh">
        <Box ml={{ base: 0, md: 64 }} p={["2", "5"]}>
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
};

export default UserLayout;
