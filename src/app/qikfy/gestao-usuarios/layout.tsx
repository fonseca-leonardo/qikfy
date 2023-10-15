import React from "react";

import Drawer from "@/qikfy/components/base/Drawer";
import Header from "@/qikfy/components/base/Header";
import Main from "@/qikfy/components/base/Main";
import Typography from "@/qikfy/components/base/Typography";
import QikfyDrawerRoutes from "@/qikfy/components/QikfyDrawerRoutes";

function PageListLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header>
        <Typography type="h2">Gestão de usuários</Typography>
      </Header>
      <Drawer>
        <QikfyDrawerRoutes />
      </Drawer>
      <Main container>{children}</Main>
    </>
  );
}

export default PageListLayout;
