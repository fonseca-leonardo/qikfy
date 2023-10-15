import React from "react";
import styles from "./styles.module.css";
import NavigationCard from "@/qikfy/components/base/NavigationCard";
import { searchPageService } from "@/qikfy/backend/services/pages";
import editorRouter from "@/qikfy/pages/EditorPage/router";

async function List() {
  const searchResult = await searchPageService({
    pagePath: "",
    skip: 0,
    take: 10,
  });

  return (
    <div className={styles.pageList}>
      {searchResult.data.map((page) => (
        <NavigationCard
          key={page.pagePath}
          title={page.name}
          subtitle={page.pagePath}
          linkHref={editorRouter.routePath + page.pagePath}
          linkTitle="Editar página"
        />
      ))}
    </div>
  );
}

export default List;
