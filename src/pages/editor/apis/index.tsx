import { Typography } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";

const DynamicLayout = dynamic(
  () => import("../../../builder/base/layout/AppBuilderLayout"),
  {
    ssr: false,
  }
);

const AppBuilderEditor: NextPage = () => {
  return (
    <DynamicLayout>
      <Typography variant="h4">APIs</Typography>
    </DynamicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default AppBuilderEditor;
