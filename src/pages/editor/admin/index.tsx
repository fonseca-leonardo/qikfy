import { Typography } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";

const DynamicLayout = dynamic(
  () => import("../../../builder/base/layout/AppBuilderLayout"),
  {
    ssr: false,
  }
);

interface AppBuilderEditorSSR {}

const AppBuilderEditor: NextPage<AppBuilderEditorSSR> = () => {
  return (
    <DynamicLayout>
      <Typography variant="h4">Admin</Typography>
    </DynamicLayout>
  );
};

export const getServerSideProps: GetServerSideProps<
  AppBuilderEditorSSR
> = async (ctx) => {
  return {
    props: {},
  };
};

export default AppBuilderEditor;
