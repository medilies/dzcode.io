import { AppBar } from "@dzcode.io/ui-mobile/dist/app-bar";
import { DrawerActions } from "@dzcode.io/ui-mobile/dist/drawer-actions";
import { DrawerContent } from "@dzcode.io/ui-mobile/dist/drawer-content";
import { DrawerNav } from "@dzcode.io/ui-mobile/dist/drawer-nav";
import type { Route } from "@dzcode.io/ui-mobile/dist/types";
import React, { FC } from "react";

import { Navigation as ArticlesStack } from "./articles/navigation";
import { ContributeScreen } from "./contribute";
import { FAQScreen } from "./faq";
import { Navigation as DocumentsStack } from "./learn/navigation";
import { ProjectsScreen } from "./projects";

const routes: Route[] = [
  {
    name: "contribute",
    title: "Contribution Gallery",
    label: "Contribute",
    component: ContributeScreen,
  },
  {
    name: "learn",
    title: "Read & Learn",
    label: "Learn",
    component: DocumentsStack,
  },
  {
    name: "projects",
    title: "Projects Gallery",
    label: "DZ Open-Source Projects",
    component: ProjectsScreen,
  },
  {
    name: "articles",
    title: "Articles",
    label: "Read Articles",
    component: ArticlesStack,
  },
  {
    name: "faq",
    title: "Frequently Asked Questions",
    label: "Have a Question?",
    component: FAQScreen,
  },
];

export const Navigation: FC = () => {
  return (
    <DrawerNav
      routes={routes}
      initialRouteName="contribute"
      header={(props) => (
        <AppBar
          title={routes.find(({ name }) => name === props.scene.route.name)?.title || ""}
          openDrawer={() => props.scene.descriptor.navigation.dispatch(DrawerActions.openDrawer())}
        />
      )}
      drawerContent={(props) => <DrawerContent {...props} version={window.bundleInfo.version} />}
    />
  );
};
