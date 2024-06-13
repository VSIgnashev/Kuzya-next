"use client";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";
import { LinkProps } from "@mui/material/Link";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: false;
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 360,
      sm: 640,
      md: 768,
      lg: 1024,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
