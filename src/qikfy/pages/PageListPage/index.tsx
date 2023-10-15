"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  ApiResponse,
  MongoQikfyPageModel,
  QikfySearchResult,
} from "@/@types/builder";
import styles from "./styles.module.css";
import TextInput from "@/qikfy/components/base/TextInput";
import Button from "@/qikfy/components/base/Button";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import debounce from "debounce";
import editorRouter from "../EditorPage/router";
import NavigationCard from "@/qikfy/components/base/NavigationCard";
import newPageRouter from "../NewPage/router";
import { deletePage, searchPage } from "@/qikfy/frontend/services/pages";
import { SearchPageList } from "@/app/qikfy/paginas/page";

interface PageListPageProps {
  searchParams: SearchPageList;
}

function PageListPage({ searchParams }: PageListPageProps) {
  const [searchResult, setSearchResult] =
    useState<ApiResponse<QikfySearchResult<MongoQikfyPageModel>>>();
  const urlParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { register, trigger } = useForm<SearchPageList>({
    defaultValues: {
      name: searchParams.name,
    },
  });

  const onSearchSubmit = useCallback(
    (data: string) => {
      const params = new URLSearchParams(urlParams);
      params.set("name", data);
      router.push(pathname + "?" + params.toString());
    },
    [pathname, router, urlParams]
  );

  const onDeletePage = useCallback(
    async (id: string) => {
      await deletePage(id);
      router.refresh();
    },
    [router]
  );

  useEffect(() => {
    async function load() {
      const result = await searchPage(searchParams);

      setSearchResult(result);
    }

    load();
  }, [searchParams]);

  return (
    <div className={styles.page}>
      <div className={styles.filterContainer}>
        <div className={styles.form}>
          <TextInput
            variant="underlined"
            label="Buscar página"
            {...register("name")}
            onChange={debounce(
              async (e: React.ChangeEvent<HTMLInputElement>) => {
                await trigger("name");
                onSearchSubmit(e.target.value);
              },
              500
            )}
          />
        </div>
        <Button href={newPageRouter.router}>Nova página</Button>
      </div>
      <div className={styles.pageList}>
        {searchResult?.data.list?.map((page) => (
          <NavigationCard
            key={page.pagePath}
            onDelete={() => onDeletePage(page._id)}
            title={page.name}
            subtitle={page.pagePath}
            linkHref={editorRouter.routePath + page.pagePath}
            linkTitle="Editar página"
          />
        ))}
      </div>
    </div>
  );
}

export default PageListPage;
