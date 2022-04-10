import { Badge, makeStyles } from "@material-ui/core";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { deepOrange } from "@mui/material/colors";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import userApi from "../../api/userApi";
import Login from "../../feature/auth/components/Login";
import Register from "../../feature/auth/components/Register";
import actions from "../../feature/auth/UserSlice";
import { cartItemsCountSelector } from "../../feature/Cart/cartSelector";
import "./style.scss";
const pages = ["home", "product"];
const settings = ["Profile", "Account", "Logout"];
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.info.main,
  },
  logo: {
    width: "80px",
    height: "60px",
    marginTop: "5px",
  },
  item: {
    textDecoration: "none",
    "& > button": {
      fontWeight: "600",
      "&:hover": {
        opacity: 0.6,
      },
    },
  },
  iconClose: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(3),
    color: theme.palette.grey[500],
    zIndex: 1,
    cursor: "pointer",
  },
  cart: {
    marginRight: theme.spacing(2),
    color: '#fff', 
  },
}));

const MODE = {
  LOGIN: "login",
  REGISTER: "register",
};
function Header(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState(MODE.LOGIN);
  const user = useSelector((state) => state.user.current);
  const quantityCart = useSelector(cartItemsCountSelector);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      await userApi.logout();
      console.log(actions.logout());
      dispatch(actions.logout());
      window.location.href = "/";
    } catch (err) {}
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={handleCloseNavMenu}
      onKeyDown={handleCloseNavMenu}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem onClick={handleCloseNavMenu} button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <AppBar position="static" className={classes.root}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Link to="/">
              <img src="logobrandNew.png" alt="" className={classes.logo} />
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              open={Boolean(anchorElNav)}
              anchor="left"
              onClose={handleCloseNavMenu}
            >
              {list("left")}
            </Drawer>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <img
              src="D:\DAIHOC\baocao\client\public\logobrandNew.png"
              alt=""
              className={classes.logo}
            />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link to={`/${page}`} key={page} className={classes.item}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              </Link>
            ))}
            {user.role === 1 && (
              <Link to="/admin" className={classes.item}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  admin
                </Button>
              </Link>
            )}
          </Box>
          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            {Object.keys(user).length !== 0 ? (
              user.role === 1 ? (
                false
              ) : (
                <Link to="/cart">
                <IconButton >
                <Badge
                  color="secondary"
                  badgeContent={quantityCart || 0}
                  className={classes.cart}
                >
                  <ShoppingCartOutlinedIcon />
                </Badge>
                </IconButton>
                </Link>
              )
            ) : (
              false
            )}
            {Object.keys(user).length !== 0 && (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>
                    {user.data?.name.slice(0, 1)?.toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
            )}

            {!user.data && (
              <Box className={classes.item}>
                <Button
                  onClick={handleClickOpen}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontWeight: "600",
                  }}
                >
                  Login
                </Button>
              </Box>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" onClick={handleLogout}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CloseOutlinedIcon
          onClick={handleClose}
          className={classes.iconClose}
        />
        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account. Login here
                </Button>
              </Box>
            </>
          )}
          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Dont have an account. Register here
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

Header.propTypes = {};

export default Header;
