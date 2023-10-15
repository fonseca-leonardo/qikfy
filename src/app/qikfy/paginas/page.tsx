import React, { Suspense } from "react";
import PageListPage from "@/qikfy/pages/PageListPage";
import { Metadata } from "next";
import { QikfySearchQuery } from "@/@types/builder";

export const metadata: Metadata = {
  title: "Qikfy - Listar páginas",
};

export const dynamic = "force-dynamic";
export const revalidate = false;

export type SearchPageList = QikfySearchQuery<{
  name: string;
}>;

interface PageListProps {
  searchParams: SearchPageList;
}

async function PageList({ searchParams }: PageListProps) {
  const { name, skip = 0, take = 20 } = searchParams;

  return (
    <Suspense fallback={"Carregando"}>
      <PageListPage searchParams={{ name, skip, take }} />
    </Suspense>
  );
}

export default PageList;
