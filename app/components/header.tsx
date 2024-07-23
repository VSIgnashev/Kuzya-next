import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Tooltip,
  Avatar,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import MobileMenu from "./mobileMenu";

function Header() {
  // const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  // const handleCloseNavMenu = (): void => {
  //   setAnchorElNav(null);
  // };

  // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  // const AnyComponentButton = <C extends React.ElementType>(
  //   props: ButtonProps<C, { component?: C }>
  // ) => {
  //   return <Button {...props} />;
  // };

  return (
    <AppBar>
      <Container maxWidth="lg">
        <Toolbar className="justify-around" disableGutters>
          <Link
            href="/"
            className=" text-white hover:text-white xs:hidden md:flex"
          >
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
              }}
            >
              Kuzya
            </Typography>
          </Link>
          <MobileMenu />
          {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
           
              <MenuItem>
                <Button color="inherit" href="/">
                  Meal lists
                </Button>
              </MenuItem>
              <MenuItem>
                <Button color="inherit" href="/meals">
                  Meals
                </Button>
              </MenuItem>
              <MenuItem>
                <Button color="inherit" href="/ingredients">
                  Ingredients
                </Button>
              </MenuItem>
            </Menu>
          </Box> */}

          <Link href="/" className=" flex text-white hover:text-white">
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h6"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
              }}
            >
              Kuzya
            </Typography>
          </Link>
          <Box sx={{ mx: 4, display: { xs: "none", md: "flex" } }}>
            <Button sx={{ my: 2, mx: 2 }} color="inherit" href="/">
              Meal lists
            </Button>
            <Button sx={{ my: 2, mx: 2 }} color="inherit" href="/recipes">
              Recipes
            </Button>
            <Button sx={{ my: 2, mx: 2 }} color="inherit" href="/ingredients">
              Ingredients
            </Button>
          </Box>
          <Box>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
