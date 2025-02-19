import { ErrorBoundary } from "@dzcode.io/ui-mobile/dist/error-boundary";
import { StackNav } from "@dzcode.io/ui-mobile/dist/stack-nav";
import type { Route } from "@dzcode.io/ui-mobile/dist/types";
import React, { FC } from "react";

import { ArticleDetailsScreen } from "./article-details";
import { ArticlesListScreen } from "./articles-list";

const routes: Route[] = [
  {
    name: "articles-list",
    component: ArticlesListScreen,
  },
  {
    name: "article-details",
    component: ArticleDetailsScreen,
  },
];

export const Navigation: FC = () => {
  return (
    <ErrorBoundary>
      <StackNav routes={routes} headerMode={"none"} initialRouteName={"articles-list"} />
    </ErrorBoundary>
  );
};
