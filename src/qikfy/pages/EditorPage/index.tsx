"use client";
import React from "react";

import useRenderEditor from "@/qikfy/hooks/useRenderEditor";
import ComponentEditorDialog from "@/qikfy/components/ComponentEditorDialog";
import ComponentAddDialog from "@/qikfy/components/ComponentAddDialog";
import ComponentDeleteDialog from "@/qikfy/components/ComponentDeleteDialog";
import ComponentAddChildrenDialog from "@/qikfy/components/ComponentAddChildrenDialog";

function EditorPage() {
  const {
    renderPageModel,
    onSelectComponent,
    onDeleteSelectedComponent,
    onAddSelectedComponent,
    onAddSelectedComponentChildren,
  } = useRenderEditor();

  return (
    <>
      {renderPageModel()}
      <ComponentEditorDialog handleClose={() => onSelectComponent(null)} />
      <ComponentAddDialog handleClose={() => onAddSelectedComponent(null)} />
      <ComponentDeleteDialog
        handleClose={() => onDeleteSelectedComponent(null)}
      />
      <ComponentAddChildrenDialog
        handleClose={() => onAddSelectedComponentChildren(null)}
      />
    </>
  );
}

export default EditorPage;
