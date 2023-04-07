import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography, Toolbar, AppBar, IconButton } from "@mui/material";
import BuilderComponent from "../../BuilderComponent";
import { useEditor } from "@builder/hooks/useEditor";

interface Topbar {
  drawerWidth: number;
}

function Topbar({ drawerWidth }: Topbar) {
  return (
    <BuilderComponent>
      <AppBar>
        <Toolbar
          sx={{
            ml: `${drawerWidth}px`,
          }}
        ></Toolbar>
      </AppBar>
    </BuilderComponent>
  );
}

export default Topbar;
