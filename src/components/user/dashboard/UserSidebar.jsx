/* eslint-disable react/prop-types */
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Img,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";

import { NavLink, useLocation, useNavigate } from "react-router-dom";

import dashboardsvg from "src/assets/img/admin/Menu/dashboard.svg";
import cartsvg from "src/assets/img/user/cart.svg";
import logo from "src/assets/logo.svg";

import profilepic from "src/assets/img/referral/profile.svg";
import { useDispatch, useSelector } from "react-redux";
import { disconnectWallet } from "src/features/wallet/walletSlice";
import toast from "react-hot-toast";

const LinkItems = [
  {
    name: "Dashboard",
    icon: dashboardsvg,
    path: "/user/dashboard",
  },
  {
    name: "Buy Tokens",
    icon: cartsvg,
    path: "/tokensale",
  },
];
const SidebarContent = ({ onClose, user, ...rest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleWalletDisconnect = () => {
    // Dispatch disconnect action
    dispatch(disconnectWallet());
    toast.success("Wallet disconnected successfully!");
    navigate("/tokensale");
  };

  return (
    <Box
      transition="3s ease"
      w={{ base: "full", md: 64 }}
      pos="fixed"
      h="full"
      className="overflow-y-auto bg-[#171717]"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <span className="text-2xl font-mono font-bold">
          <img src={logo} alt="logo" />
        </span>
        <CloseButton
          display={{ base: "flex", md: "none" }}
          color="white"
          onClick={onClose}
        />
      </Flex>
      <>
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            to={link.path}
            onClick={onClose}
          >
            {link.name}
          </NavItem>
        ))}
      </>

      <button
        className="flex gap-x-2 mt-28 lg:mt-60 w-[90%] md:w-56  text-grey text-base mx-4 items-center rounded-md  hover:bg-dark_blue font-medium p-4"
        onClick={handleWalletDisconnect}
      >
        <IoIosLogOut className="w-6 h-6 font-medium" />
        <p>Disconnect Wallet</p>
      </button>
    </Box>
  );
};

const NavItem = ({ icon, children, to, ...rest }) => {
  return (
    <NavLink to={to} end>
      {({ isActive }) => (
        <Flex
          align="center"
          p="4"
          mx="4"
          my="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          fontWeight={isActive ? "bold" : "medium"}
          bg={isActive ? "#1a75ff" : ""}
          color={isActive ? "white" : "#B3B3B3"}
          _hover={{
            bg: "#104699",
            color: "white",
          }}
          {...rest}
        >
          {icon && <Img mr="2" src={icon} />}
          {children}
        </Flex>
      )}
    </NavLink>
  );
};

const MobileNav = ({ onOpen, user, ...rest }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleWalletDisconnect = () => {
    // Dispatch disconnect action
    dispatch(disconnectWallet());
    toast.success("Wallet disconnected successfully!");
    navigate("/tokensale");
  };
  const wallet = useSelector((state) => state.wallet);

  const location = useLocation(); // Get current location

  // Find the current route's name based on pathname
  const currentRoute = LinkItems.find(
    (link) => link.path === location.pathname
  );
  const currentPageName =
    currentRoute?.name === "Dashboard"
      ? "User Dashboard"
      : currentRoute?.name || "User Dashboard";

  return (
    <Flex
      className="ml-0 md:ml-[270px] mr-0 md:mr-4"
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      borderBottomColor="white"
      justifyContent={{ base: "space-between", md: "space-between" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
        color="white"
      />

      <h1 className="text-white font-bold text-2xl">{currentPageName}</h1>

      {/* <span className="text-sm text-white font-bold">
                    {wallet && wallet?.address}
                  </span> */}

      <HStack spacing={{ base: "0", md: "6" }}>
        <span className=" hidden md:block text-sm text-white font-bold">
          {wallet && wallet?.address}
        </span>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  {/* <span className="text-xs text-gray-300">{user?.role}</span> */}
                </VStack>
                <Img
                  src={profilepic}
                  className="w-10 h-10 rounded-full text-white"
                />

                {/* <Box display={{ base: "none", md: "flex" }}>
                      <FiChevronDown className="text-white" />
                    </Box> */}
              </HStack>
            </MenuButton>
            <MenuList
              bg="#171717"
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuDivider />
              <MenuItem
                onClick={handleWalletDisconnect}
                bg="#333333"
                color="white"
              >
                <RiLogoutBoxRLine className="mr-2" />
                Disconnect Wallet
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const UserSidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //   const { user } = useUser();

  return (
    <>
      <SidebarContent
        onClose={() => onClose}
        // user={user}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
    </>
  );
};

export default UserSidebar;