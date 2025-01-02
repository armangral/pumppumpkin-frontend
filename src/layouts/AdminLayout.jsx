import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "src/components/admin/dashboard/AdminSidebar";

const AdminLayout = () => {
  return (
    <Container maxW="container.3xl" className="min-h-screen mx-0" p="0">
      <AdminSidebar />
      <Box minH="100vh">
        <Box ml={{ base: 0, md: 64 }} p={["2", "5"]}>
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
};

export default AdminLayout;
