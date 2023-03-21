import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography, Toolbar, AppBar, IconButton, Button } from "@mui/material";
import BuilderComponent from "../BuilderComponent";
import { useEditor } from "@builder/hooks/useEditor";
import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";

function Topbar() {
  const { editorDisabled, switchEditorMode } = useEditor();

  return (
    <BuilderComponent>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Editor
          </Typography>
          <Button
            color="inherit"
            onClick={() => switchEditorMode()}
            startIcon={editorDisabled ? <VisibilityOff /> : <RemoveRedEye />}
          >
            {editorDisabled ? "Modo Publicado" : "Modo Editor"}
          </Button>
        </Toolbar>
      </AppBar>
    </BuilderComponent>
  );
}

export default Topbar;
