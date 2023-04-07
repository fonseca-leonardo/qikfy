import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useDebouncedCallback } from "use-debounce";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import clientPromise from "@builder/lib/dbconnect";
import PageService from "@builder/services/PageService";
import { BuilderPageModel } from "src/@types/builder";
import FileItem from "@builder/base/components/FileItem";
import PlusOneIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import { EDIT_PAGES_BASE_ROUTE } from "@builder/constants/builder";
import useSearchPages from "@builder/hooks/usePages";
import { useCallback, useState } from "react";
import useDebounce from "@builder/hooks/useDebounce";
import PageModal from "@builder/base/components/PageModal";
import { CreatePageRequest } from "@builder/services/PageService/PageService.types";

const DynamicLayout = dynamic(
  () => import("../../../builder/base/layout/AppBuilderLayout"),
  {
    ssr: false,
  }
);

interface AppBuilderEditorSSR {
  pageList: BuilderPageModel[];
}

const AppBuilderEditor: NextPage<AppBuilderEditorSSR> = ({ pageList }) => {
  const router = useRouter();

  const { pages, searchPages, createPage, loadingPages } =
    useSearchPages(pageList);
  const [search, setSearch] = useState("");
  const [defaultValuePage, setDefaultValuePage] =
    useState<BuilderPageModel | null>(null);

  const debounceSearch = useDebouncedCallback((value) => {
    setSearch(value);
    searchPages({
      search: value,
    });
  }, 500);

  const handleSubmit = useCallback(
    async (data: CreatePageRequest) => {
      await createPage(data);
      await searchPages({ search });
    },
    [createPage, search, searchPages]
  );

  return (
    <DynamicLayout>
      <Stack spacing={2}>
        <Typography variant="h4">Suas páginas</Typography>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Grid item xs={12} md={7}>
            <TextField
              label="Buscar pelo caminho"
              variant="standard"
              placeholder="Ex: /home"
              fullWidth
              onChange={(e) => debounceSearch(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    {loadingPages ? (
                      <CircularProgress size={16} />
                    ) : (
                      <SearchIcon />
                    )}
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={3} xl={2}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<PlusOneIcon />}
              onClick={() => setDefaultValuePage({} as BuilderPageModel)}
            >
              Nova página
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {pages.map((el) => (
            <Grid key={el.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <FileItem
                title={el.title}
                subtitle={el.pagePath}
                onClick={() => router.push(EDIT_PAGES_BASE_ROUTE + el.pagePath)}
                onEdit={() => setDefaultValuePage(el)}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
      <PageModal
        open={!!defaultValuePage}
        page={defaultValuePage}
        onClose={() => setDefaultValuePage(null)}
        onSubmit={handleSubmit}
      />
    </DynamicLayout>
  );
};

export const getServerSideProps: GetServerSideProps<
  AppBuilderEditorSSR
> = async () => {
  const mongoClient = await clientPromise;
  const pageService = new PageService(mongoClient);

  const pages = await pageService.listPages({});

  return {
    props: {
      pageList: pages,
    },
  };
};

export default AppBuilderEditor;
