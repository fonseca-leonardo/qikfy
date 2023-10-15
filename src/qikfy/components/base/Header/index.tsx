"use client";

import React, { useCallback } from "react";
import { MdMenu, MdOutlineEditOff, MdEdit, MdMenuOpen } from "react-icons/md";
import styles from "./styles.module.css";
import IconButton from "../IconButton";
import Button from "../Button";
import Typography from "../Typography";
import useRenderEditor from "@/qikfy/hooks/useRenderEditor";
import { QikfyEditorMode } from "@/@types/builder";
import classNames from "classnames";
import { useDrawer } from "@/qikfy/hooks/useDrawer";

interface HeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {}

function Header({ children, className, ...props }: HeaderProps) {
  const { editorMode, setEditorMode } = useRenderEditor();
  const { drawerState, changeDrawerState } = useDrawer();

  const compoundClasses = classNames(
    className,
    styles.header,
    drawerState && styles.drawerOpen
  );

  const handleEditorModeChange = useCallback(
    (mode: QikfyEditorMode) => {
      if (mode === "editor") setEditorMode("preview");

      if (mode === "preview") setEditorMode("editor");
    },
    [setEditorMode]
  );

  return (
    <header className={compoundClasses} {...props}>
      <IconButton
        color="inherit"
        size={24}
        onClick={() => changeDrawerState(!drawerState)}
      >
        {drawerState ? <MdMenuOpen /> : <MdMenu />}
      </IconButton>
      <div className={styles.toolbar}>{children}</div>
      <div>
        <Button
          variant="text"
          color="inherit"
          onClick={() => handleEditorModeChange(editorMode)}
        >
          {editorMode === "editor" && (
            <>
              <Typography>Preview</Typography>
              <MdOutlineEditOff />
            </>
          )}

          {editorMode === "preview" && (
            <>
              <Typography>Editor</Typography>
              <MdEdit />
            </>
          )}
        </Button>
      </div>
    </header>
  );
}

export default Header;
