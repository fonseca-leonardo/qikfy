import type { Metadata } from "next";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./global.editor.css";
import { RenderEditorProvider } from "@/qikfy/hooks/useRenderEditor";
import Header from "@/qikfy/components/base/Header";

import styles from "./styles.module.css";
import Typography from "@/qikfy/components/base/Typography";
import { getPageService } from "@/qikfy/backend/services/pages";

export const metadata: Metadata = {
  title: "Qikfy - Editor",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    page?: string[];
  };
}) {
  let pagePath = "/";

  if (params.page) {
    pagePath = pagePath + params.page.toString().replace(/\,/g, "/");
  }

  const pageToRender = await getPageService(pagePath);

  return (
    <RenderEditorProvider page={pageToRender} editorModeDefault="editor">
      <Header>
        <Typography type="h2">Editor</Typography>
      </Header>
      <main className={styles.main}>{children}</main>
    </RenderEditorProvider>
  );
}
