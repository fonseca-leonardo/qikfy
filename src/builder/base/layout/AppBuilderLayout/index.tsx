/** @jsxImportSource @emotion/react */
import BuilderComponent from "@builder/base/BuilderComponent";
import {
  Box,
  Container,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Web from "@mui/icons-material/Web";
import ApiOutlined from "@mui/icons-material/ApiOutlined";
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";

import { Main } from "./styles";
import Topbar from "./Topbar";

interface AppBuilderLayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 320;

function AppBuilderLayout({ children }: AppBuilderLayoutProps) {
  const router = useRouter();
  const routes = [
    {
      icon: <Web />,
      name: "Suas páginas",
      route: "/editor/pages",
    },
    {
      icon: <ApiOutlined />,
      name: "API's",
      route: "/editor/apis",
    },
    {
      icon: <AdminPanelSettings />,
      name: "Administrador",
      route: "/editor/admin",
    },
  ];

  return (
    <BuilderComponent>
      <Topbar drawerWidth={drawerWidth} />
      <Drawer
        variant="permanent"
        open={false}
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h5">AppBuilder</Typography>
        </Toolbar>
        <Divider />
        <List>
          {routes.map((route) => (
            <ListItem key={route.route}>
              <ListItemButton
                LinkComponent={Link}
                href={route.route}
                selected={router.asPath === route.route}
              >
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText primary={route.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" css={Main(drawerWidth)}>
        <Toolbar />
        {children}
      </Box>
    </BuilderComponent>
  );
}

export default AppBuilderLayout;
