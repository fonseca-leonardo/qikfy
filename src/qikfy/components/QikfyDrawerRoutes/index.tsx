"use client";

import { QikfyPageRouter } from "@/@types/builder";
import pageListRouter from "@/qikfy/pages/PageListPage/router";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "../base/Link";

import styles from "./styles.module.css";
import configurationRouter from "@/qikfy/pages/Configuration/router";
import userManagementRouter from "@/qikfy/pages/UserPage/router";

const routes: QikfyPageRouter[] = [
  pageListRouter,
  configurationRouter,
  userManagementRouter,
];

function QikfyDrawerRoutes() {
  const pathName = usePathname();

  return (
    <div className={styles.container}>
      {routes.map((el) => (
        <Link
          key={el.router}
          href={el.router}
          color={pathName.includes(el.router) ? "secondary" : "primary"}
        >
          {el.pageName}
        </Link>
      ))}
    </div>
  );
}

export default QikfyDrawerRoutes;
