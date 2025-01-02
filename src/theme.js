import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: "light", // Always start in light mode
    useSystemColorMode: false, // Disable system color mode preference
  },

  colors: {
    customyellow: {
      50: "#fefce8",
      100: "#fef9c3",
      200: "#fde047",
      300: "#facc15",
      500: "#eab308",
      600: "#ca8a04",
      700: "#a16207",
      800: "#854d0e",
      900: "#713f12",
    },
  },
});
