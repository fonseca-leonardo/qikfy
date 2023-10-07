"use client";
import React from "react";
import { Typography } from "@mui/material";

import useRenderEditor from "@/qikfy/hooks/useRenderEditor";
import ComponentEditorDialog from "@/qikfy/components/ComponentEditorDialog";
import ComponentAddDialog from "@/qikfy/components/ComponentAddDialog";
import ComponentDeleteDialog from "@/qikfy/components/ComponentDeleteDialog";

function EditorPage() {
  const {
    renderPageModel,
    onSelectComponent,
    onDeleteSelectedComponent,
    onAddSelectedComponent,
  } = useRenderEditor();

  return (
    <>
      {renderPageModel()}
      <ComponentEditorDialog handleClose={() => onSelectComponent(null)} />
      <ComponentAddDialog handleClose={() => onAddSelectedComponent(null)} />
      <ComponentDeleteDialog
        handleClose={() => onDeleteSelectedComponent(null)}
      />
    </>
  );
}

export default EditorPage;
