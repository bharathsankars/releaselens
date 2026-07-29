import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

const drawerWidth = 240;

export const AppLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            ReleaseLens
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />

        <Divider />

        <List>
          <ListItemButton
            component={NavLink}
            to="/"
            end
            sx={{
              "&.active": {
                backgroundColor: "action.selected",
              },
            }}
          >
            <ListItemIcon>
              <DashboardOutlinedIcon />
            </ListItemIcon>

            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to="/health"
            sx={{
              "&.active": {
                backgroundColor: "action.selected",
              },
            }}
          >
            <ListItemIcon>
              <FavoriteBorderOutlinedIcon />
            </ListItemIcon>

            <ListItemText primary="Health" />
          </ListItemButton>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
};