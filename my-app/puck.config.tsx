"use client";

import type { Config } from "@puckeditor/core";
import {
  portfolioComponents,
  portfolioRoot,
  type PortfolioComponents,
  type PortfolioRootProps,
} from "./components/puck/portfolio-components";

type CategoryName =
  | "portfolio"
  | "layout"
  | "typography"
  | "media"
  | "actions"
  | "utilities";

export const config: Config<
  PortfolioComponents,
  PortfolioRootProps,
  CategoryName
> = {
  root: portfolioRoot,
  categories: {
    portfolio: {
      title: "Portfolio",
      components: ["Header", "Project"],
      defaultExpanded: true,
    },
    layout: {
      title: "Layout",
      components: ["Section", "Row", "Grid", "Columns", "Card", "OverlayFrame"],
      defaultExpanded: true,
    },
    typography: {
      title: "Typography",
      components: ["HeadingBlock", "TextBlock"],
      defaultExpanded: true,
    },
    media: {
      title: "Media",
      components: ["ImageBlock", "GalleryGrid", "Slideshow", "VideoBlock", "Embed"],
      defaultExpanded: true,
    },
    actions: {
      title: "Actions",
      components: ["Button"],
      defaultExpanded: true,
    },
    utilities: {
      title: "Utilities",
      components: ["Divider", "Spacer"],
      defaultExpanded: false,
    },
  },
  components: portfolioComponents,
};

export default config;
