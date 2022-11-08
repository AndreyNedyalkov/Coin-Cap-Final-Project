import React from "react";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import "./Header.css";

import InputSearch from "./SearchBar/InputSearch";

import headerLogo from "./header_logo.svg";
import { FaBitcoin } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import { TbExchange } from "react-icons/tb";
import { GiProgression } from "react-icons/gi";
import { MdStarBorder } from "react-icons/md";
import ConnectWalletModal from "./ConnectWallet/ConnectWalletModal";

const setupHeaderMobileIcon = (name) => {
  if (name === "Coins") {
    return <FaBitcoin />;
  } else if (name === "Top 40 Exchanges") {
    return <FaExchangeAlt />;
  } else if (name === "Swap") {
    return <TbExchange />;
  } else if (name === "API") {
    return <FaRegNewspaper />;
  } else if (name === "Settings") {
    return <MdSettings />;
  } else if (name === "My Watchlist") {
    return <MdStarBorder />;
  } else if (name === "My Portfolio") {
    return <GiProgression />;
  }

  return false;
};

const style = {
  position: "absolute",
  top: "35%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  p: 4,
};

const checkPage = (page) => {
  if (page === "Settings") {
    return <Link className="Nav-Link">Settings</Link>;
  } else {
    return (
      <Link className="Nav-Link" to={page.toLowerCase().split(" ").join("-")}>
        {page}
      </Link>
    );
  }
};

const drawerWidth = 215;
const navItems = ["Coins", "Top 40 Exchanges", "Swap", "My watchlist", "My portfolio"];
const navItemsNoAutorisation = ["Coins", "Top 40 Exchanges", "Swap"];
const navItemsMobile = [
  "Coins",
  "Top 40 Exchanges",
  "Swap",
  "API",
  "My Watchlist",
  "My Portfolio",
];
const navItemsMobileNoAutorisation = [
  "Coins",
  "Top 40 Exchanges",
  "Swap",
  "API",
];

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    if (!open) {
      setMobileOpen(false);
    }
  };
  const handleDrawerOpen = () => {
    if (!open) {
      setMobileOpen(true);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isLogin = useSelector((state) => state.disabler.isLogin);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {isLogin
          ? navItemsMobile.map((item) => (
              <ListItem key={item} disablePadding>
                {item !== "Settings" ? (
                  <Link
                    className="List-item-link"
                    to={item.toLowerCase().split(" ").join("-")}
                  >
                    <ListItemButton sx={{ textAlign: "center" }}>
                      <ListItemButton
                        className="Flex-Column"
                        sx={{ textAlign: "center" }}
                      >
                        <div className="Mobile-Icons-Header">
                          {setupHeaderMobileIcon(item)}
                        </div>
                        <div className="Mobile-Links-Header">{item}</div>
                      </ListItemButton>
                    </ListItemButton>
                  </Link>
                ) : (
                  <ListItemButton
                    onClick={handleOpen}
                    sx={{ textAlign: "center" }}
                  >
                    <ListItemButton
                      className="Flex-Column"
                      sx={{ textAlign: "center" }}
                    >
                      <div className="Mobile-Icons-Header">
                        {setupHeaderMobileIcon(item)}
                      </div>
                      <div className="Mobile-Links-Header">{item}</div>
                    </ListItemButton>
                  </ListItemButton>
                )}
              </ListItem>
            ))
          : navItemsMobileNoAutorisation.map((item) => (
              <ListItem key={item} disablePadding>
                {item !== "Settings" ? (
                  <Link
                    className="List-item-link"
                    to={item.toLowerCase().split(" ").join("-")}
                  >
                    <ListItemButton sx={{ textAlign: "center" }}>
                      <ListItemButton
                        className="Flex-Column"
                        sx={{ textAlign: "center" }}
                      >
                        <div className="Mobile-Icons-Header">
                          {setupHeaderMobileIcon(item)}
                        </div>
                        <div className="Mobile-Links-Header">{item}</div>
                      </ListItemButton>
                    </ListItemButton>
                  </Link>
                ) : (
                  <ListItemButton
                    onClick={handleOpen}
                    sx={{ textAlign: "center" }}
                  >
                    <ListItemButton
                      className="Flex-Column"
                      sx={{ textAlign: "center" }}
                    >
                      <div className="Mobile-Icons-Header">
                        {setupHeaderMobileIcon(item)}
                      </div>
                      <div className="Mobile-Links-Header">{item}</div>
                    </ListItemButton>
                  </ListItemButton>
                )}
              </ListItem>
            ))}
      </List>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        sx={{
          backdropFilter: "blur(5px)",
        }}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open} className="Modal-settings">
          <Box className="Settings-modal-box" sx={style}>
            <div className="Close-settings-div">
              <div className="setLogoDiv">

                <h1>Settings</h1>
              </div>
              <AddIcon
                onClick={handleClose}
                className="Close-settings-btn"
                sx={{ fontSize: 40 }}
              />
            </div>
            <hr></hr>
            <div>

            </div>
          </Box>
        </Fade>
      </Modal>

      <Box
        sx={{
          display: { xs: "block", sm: "block" },
          width: "100%",
          margin: "5px 0 25px 0",
        }}
      >
        <ConnectWalletModal />
      </Box>
      <Divider />
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", height: "62px" }}>
      <AppBar
        component="nav"
        sx={{
          display: "flex",
          justifyContent: "centre",
          bgcolor: "white",
          color: "black",
          height: "62px",
        }}
      >
        <Toolbar sx={{ margin: "0vw 6vw", height: "62px" }}>
          <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
            {isLogin ?
             navItems.map((item) => (
              <Button
                className="Nav-Link-container"
                key={item}
                sx={{ color: "black" }}
                style={{
                  fontSize: "12px",
                }}
              >
                {checkPage(item)}
              </Button>
            ))
            :
            navItemsNoAutorisation.map((item) => (
              <Button
                className="Nav-Link-container"
                key={item}
                sx={{ color: "black" }}
                style={{
                  fontSize: "12px",
                }}
              >
                {checkPage(item)}
              </Button>
            ))
           }
          </Box>

          <Box sx={{ display: { xs: "block", sm: "block", md: "none" } }}>
            <InputSearch />
          </Box>
          <Typography
            className="Logo-icon"
            variant="h6"
            align="center"
            component="div"
            sx={{ flexGrow: 1, display: { sm: "block" } }}
          >
            <Button
              style={{
                borderRadius: 30,
              }}
            >
              <Link className="" to="/">
                <img
                  className="MobileLogoSize"
                  src={headerLogo}
                  alt="LOGO"
                ></img>
              </Link>
            </Button>
          </Typography>

          <Box
            className="Menu-button"
            onClick={(e) => {
              if (e.target.style.transform === "") {
                e.target.style.transformOrigin = "center";
                e.target.style.transform = "rotateY(360deg)";
                e.target.style.transition = "1s";
              } else {
                e.target.style.transformOrigin = "center";
                e.target.style.transform = "";
                e.target.style.transition = "1s";
              }
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerOpen}
              sx={{ display: { xs: "block", sm: "block", md: "none" } }}
            >
              <FormatAlignJustifyIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
            <InputSearch />
          </Box>
          <Box
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
            style={{
              padding: "10px 20px",
            }}
          >

          </Box>
          <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
            <ConnectWalletModal />
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          // BackdropProps={{ invisible: true}}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
            width: "200px",
          }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Header;
