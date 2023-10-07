"use client";

import React, { useCallback } from "react";
import { MdMenu, MdOutlineEditOff, MdEdit } from "react-icons/md";
import styles from "./styles.module.css";
import IconButton from "../IconButton";
import Button from "../Button";
import Typography from "../Typography";
import useRenderEditor from "@/qikfy/hooks/useRenderEditor";
import { QikfyEditorMode } from "@/@types/builder";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

function Header({ children }: HeaderProps) {
  const { editorMode, setEditorMode } = useRenderEditor();

  const handleEditorModeChange = useCallback(
    (mode: QikfyEditorMode) => {
      if (mode === "editor") setEditorMode("preview");

      if (mode === "preview") setEditorMode("editor");
    },
    [setEditorMode]
  );

  return (
    <header className={styles.header}>
      <IconButton color="inherit" size={24}>
        <MdMenu />
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
