"use client";

import React from "react";
import { Typography } from "@mui/material";

import useRenderEditor from "@/qikfy/hooks/useRenderEditor";
import ComponentEditorDialog from "@/qikfy/components/ComponentEditorDialog";

interface EditorPageProps {
  params: {
    page: string;
  };
}

function EditorPage({ params }: EditorPageProps) {
  const { renderPageModel, onSelectComponent } = useRenderEditor();

  return (
    <>
      <Typography>EditorPage: {params.page}</Typography>
      {renderPageModel()}
      <ComponentEditorDialog handleClose={() => onSelectComponent(null)} />
    </>
  );
}

export default EditorPage;
