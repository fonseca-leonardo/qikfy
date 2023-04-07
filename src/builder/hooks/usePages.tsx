import editorApi from "@builder/api/editorApi";
import {
  CreatePageRequest,
  ListPageRequest,
} from "@builder/services/PageService/PageService.types";
import { BuilderPageModel } from "src/@types/builder";
import { useCallback, useState } from "react";

const useSearchPages = (defaultPages: BuilderPageModel[]) => {
  const [pages, setPages] = useState<BuilderPageModel[]>(defaultPages);
  const [loadingPages, setLoadingPages] = useState<boolean>(false);

  const searchPages = useCallback(async ({ search }: ListPageRequest) => {
    setLoadingPages(true);
    const { data } = await editorApi.get<BuilderPageModel[]>("/pages", {
      params: {
        search,
      },
    });

    setPages(data);
    setLoadingPages(false);
  }, []);

  const createPage = useCallback(
    async ({ pagePath, title }: CreatePageRequest, search?: string) => {
      setLoadingPages(true);

      await editorApi.post("/pages", { pagePath, title });

      setLoadingPages(false);
    },
    []
  );

  return { pages, searchPages, createPage, loadingPages };
};

export default useSearchPages;
