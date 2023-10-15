import type { Metadata, ResolvingMetadata } from "next";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./global.editor.css";
import { RenderEditorProvider } from "@/qikfy/hooks/useRenderEditor";
import Header from "@/qikfy/components/base/Header";

import Typography from "@/qikfy/components/base/Typography";
import { getPageDetailService } from "@/qikfy/bff/services/pages";
import Main from "@/qikfy/components/base/Main";
import Drawer from "@/qikfy/components/base/Drawer";
import pageListRouter from "@/qikfy/pages/PageListPage/router";
interface EditorPageProps {
  params: {
    page?: string[];
  };
}

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

  const pageToRender = await getPageDetailService(pagePath);

  return (
    <RenderEditorProvider page={pageToRender.data} editorModeDefault="editor">
      <Header>
        <Typography type="h2">Editando - {pageToRender.data.name}</Typography>
      </Header>
      <Drawer
        backLink={{
          link: pageListRouter.router,
          name: "Voltar para páginas",
        }}
      />
      <Main>{children}</Main>
    </RenderEditorProvider>
  );
}

export async function generateMetadata(
  { params }: EditorPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  let pagePath = "/";

  if (params.page) {
    pagePath = pagePath + params.page.toString().replace(/\,/g, "/");
  }

  const pageToRender = await getPageDetailService(pagePath);

  return {
    title: `Qikfy Editor - ${pageToRender.data.name}`,
  };
}
