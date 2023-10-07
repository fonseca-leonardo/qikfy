import React from "react";

import EditorPage from "@/qikfy/pages/EditorPage";

interface EditorPageProps {
  params: {
    page?: string[];
  };
}

async function Editor({ params }: EditorPageProps) {
  return <EditorPage />;
}

export default Editor;
