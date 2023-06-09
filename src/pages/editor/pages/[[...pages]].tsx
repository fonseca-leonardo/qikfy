import React, { useMemo } from "react";
import { NextPage, GetServerSideProps } from "next";

import { BuilderPageModel } from "src/@types/builder";

import { EditorProvider } from "@builder/hooks/useEditor";
import PageService from "@builder/services/PageService";
import clientPromise from "@builder/lib/dbconnect";

interface EditorPageSSR {
  ssr: BuilderPageModel;
}

interface EditorPageProps extends EditorPageSSR {}

const EditorPage: NextPage<EditorPageProps> = ({ ssr }) => {
  const { components, pagePath } = useMemo(() => ssr, [ssr]);

  return <EditorProvider pagePath={pagePath} components={components} />;
};

export const getServerSideProps: GetServerSideProps<EditorPageSSR> = async (
  ctx
) => {
  let pagePath = ctx.resolvedUrl.replace("/editor/pages", "");

  if (ctx.resolvedUrl === "/editor/pages") {
    pagePath = "/";
  }

  const mongoClient = await clientPromise;

  const pageService = new PageService(mongoClient);

  const page = await pageService.getPage(pagePath);

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ssr: {
        components: page.components,
        id: page.id,
        pagePath,
      },
    },
  };
};

export default EditorPage;
