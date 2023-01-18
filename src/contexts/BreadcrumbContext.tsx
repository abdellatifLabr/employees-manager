import React from "react";

export type BreadcrumbContent = { name: string; path?: string }[];

export const BreadcrumbContext = React.createContext<{
  breadcrumb: BreadcrumbContent;
  setBreadcrumb: (data: any) => void;
}>({ breadcrumb: [], setBreadcrumb: () => {} });
