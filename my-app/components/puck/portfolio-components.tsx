"use client";

import type { Config } from "@puckeditor/core";
import type { CSSProperties, JSX, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

type SlotRenderer = (props?: {
  className?: string;
  style?: CSSProperties;
  minEmptyHeight?: CSSProperties["minHeight"] | number;
  allow?: string[];
  disallow?: string[];
  as?: keyof JSX.IntrinsicElements;
}) => ReactNode;

type Alignment = "left" | "center" | "right";
type VerticalAlign = "start" | "center" | "end" | "stretch";
type FlexJustify =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";
type ItemAlign = "start" | "center" | "end" | "stretch";
type AspectRatio = "auto" | "1 / 1" | "4 / 3" | "3 / 2" | "16 / 9" | "21 / 9";
type ShadowSize = "none" | "soft" | "medium" | "large";
type ObjectFit = "cover" | "contain" | "fill" | "none";
type StyleValue = string | number;
type StyleWithVars = CSSProperties & Record<string, string | number | undefined>;

type HeadingBlockProps = {
  title?: string;
  align?: Alignment;
  color?: string;
  fontSize?: StyleValue;
  padding?: StyleValue;
};

type TextBlockProps = {
  content?: string;
  as?: "p" | "h1" | "h2" | "h3" | "div";
  align?: Alignment;
  staticSize?: boolean;
  maxWidth?: StyleValue;
  color?: string;
  backgroundColor?: string;
  fontSize?: StyleValue;
  lineHeight?: StyleValue;
  fontWeight?: StyleValue;
  paddingTop?: StyleValue;
  paddingRight?: StyleValue;
  paddingBottom?: StyleValue;
  paddingLeft?: StyleValue;
  marginTop?: StyleValue;
  marginBottom?: StyleValue;
  borderRadius?: StyleValue;
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
};

type ImageBlockProps = {
  file?: string;
  src?: string;
  alt?: string;
  caption?: string;
  href?: string;
  openInNewTab?: boolean;
  align?: Alignment;
  staticSize?: boolean;
  width?: StyleValue;
  maxWidth?: StyleValue;
  height?: StyleValue;
  aspectRatio?: AspectRatio;
  objectFit?: ObjectFit;
  objectPosition?: string;
  borderRadius?: StyleValue;
  borderWidth?: StyleValue;
  borderColor?: string;
  shadow?: ShadowSize;
  opacity?: StyleValue;
  padding?: StyleValue;
  backgroundColor?: string;
  captionColor?: string;
  captionSize?: StyleValue;
};

type DividerProps = {
  orientation?: "horizontal" | "vertical";
  align?: Alignment;
  length?: StyleValue;
  thickness?: StyleValue;
  color?: string;
  style?: "solid" | "dashed" | "dotted" | "double";
  opacity?: StyleValue;
  marginTop?: StyleValue;
  marginBottom?: StyleValue;
};

type ButtonProps = {
  label?: string;
  href?: string;
  ariaLabel?: string;
  openInNewTab?: boolean;
  align?: Alignment;
  fullWidth?: boolean;
  staticSize?: boolean;
  width?: StyleValue;
  height?: StyleValue;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
  hoverBorderColor?: string;
  borderWidth?: StyleValue;
  borderRadius?: StyleValue;
  paddingY?: StyleValue;
  paddingX?: StyleValue;
  fontSize?: StyleValue;
  fontWeight?: StyleValue;
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
  shadow?: ShadowSize;
};

type SlideItem = {
  type?: "image" | "video" | "text";
  imageFile?: string;
  imageUrl?: string;
  videoFile?: string;
  videoUrl?: string;
  videoMode?: "file" | "embed";
  alt?: string;
  title?: string;
  body?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  titleFontSize?: StyleValue;
  bodyFontSize?: StyleValue;
  bodyLineHeight?: StyleValue;
  buttonFontSize?: StyleValue;
  buttonPaddingY?: StyleValue;
  buttonPaddingX?: StyleValue;
  contentMaxWidth?: StyleValue;
};

type SlideshowProps = {
  slides?: SlideItem[];
  height?: StyleValue;
  maxWidth?: StyleValue;
  aspectRatio?: AspectRatio;
  align?: Alignment;
  objectFit?: ObjectFit;
  overlayPosition?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "center-left"
    | "center"
    | "center-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  overlayBackground?: string;
  overlayOpacity?: StyleValue;
  borderRadius?: StyleValue;
  shadow?: ShadowSize;
  autoplay?: boolean;
  intervalMs?: StyleValue;
  showArrows?: boolean;
  showDots?: boolean;
  videoControls?: boolean;
  videoMuted?: boolean;
  videoLoop?: boolean;
  padding?: StyleValue;
};

type OverlayFrameProps = {
  backgroundType?: "color" | "image" | "video";
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundFit?: ObjectFit;
  backgroundPosition?: string;
  minHeight?: StyleValue;
  maxWidth?: StyleValue;
  align?: Alignment;
  borderRadius?: StyleValue;
  borderWidth?: StyleValue;
  borderColor?: string;
  shadow?: ShadowSize;
  overlayColor?: string;
  overlayOpacity?: StyleValue;
  contentPosition?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "center-left"
    | "center"
    | "center-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  padding?: StyleValue;
  content?: SlotRenderer;
};

type SectionProps = {
  content?: SlotRenderer;
  frozen?: "none" | "header" | "footer";
  edgeToEdge?: boolean;
  backgroundColor?: string;
  textColor?: string;
  maxWidth?: StyleValue;
  fullBleed?: boolean;
  paddingTop?: StyleValue;
  paddingRight?: StyleValue;
  paddingBottom?: StyleValue;
  paddingLeft?: StyleValue;
  gap?: StyleValue;
  zIndex?: StyleValue;
};

type ColumnsProps = {
  left?: SlotRenderer;
  center?: SlotRenderer;
  right?: SlotRenderer;
  layout?: "two-equal" | "left-wide" | "right-wide" | "three-equal" | "center-wide";
  gap?: StyleValue;
  verticalAlign?: VerticalAlign;
  backgroundColor?: string;
  padding?: StyleValue;
  paddingX?: StyleValue;
  marginX?: StyleValue;
  borderRadius?: StyleValue;
  staticSize?: boolean;
  stackOnMobile?: boolean;
};

type RowProps = {
  content?: SlotRenderer;
  align?: Alignment;
  alignItems?: ItemAlign;
  gap?: StyleValue;
  maxWidth?: StyleValue;
  width?: StyleValue;
  minHeight?: StyleValue;
  backgroundColor?: string;
  padding?: StyleValue;
  paddingX?: StyleValue;
  marginX?: StyleValue;
  borderRadius?: StyleValue;
};

type GridProps = {
  content?: SlotRenderer;
  align?: Alignment;
  columns?: string;
  autoRows?: string;
  gap?: StyleValue;
  justifyItems?: ItemAlign;
  alignItems?: ItemAlign;
  staticSize?: boolean;
  maxWidth?: StyleValue;
  width?: StyleValue;
  minHeight?: StyleValue;
  backgroundColor?: string;
  padding?: StyleValue;
  borderRadius?: StyleValue;
};

type HeaderLink = {
  label?: string;
  href?: string;
  openInNewTab?: boolean;
};

type HeaderProps = {
  brand?: string;
  brandHref?: string;
  links?: HeaderLink[];
  buttonLabel?: string;
  buttonUrl?: string;
  buttonOpenInNewTab?: boolean;
  position?: "sticky" | "fixed" | "static";
  top?: StyleValue;
  zIndex?: StyleValue;
  align?: Alignment;
  justifyContent?: FlexJustify;
  maxWidth?: StyleValue;
  height?: StyleValue;
  paddingY?: StyleValue;
  paddingX?: StyleValue;
  gap?: StyleValue;
  backgroundColor?: string;
  textColor?: string;
  linkColor?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  borderColor?: string;
  borderWidth?: StyleValue;
  blur?: boolean;
  shadow?: ShadowSize;
  brandSize?: StyleValue;
  linkSize?: StyleValue;
  buttonSize?: StyleValue;
  buttonPaddingY?: StyleValue;
  buttonPaddingX?: StyleValue;
};

type ProjectProps = {
  title?: string;
  type?: string;
  name?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  openInNewTab?: boolean;
  align?: Alignment;
  typeAlign?: Alignment;
  titleAlign?: Alignment;
  nameAlign?: Alignment;
  buttonAlign?: Alignment;
  layout?: "stacked" | "inline";
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  borderColor?: string;
  borderWidth?: StyleValue;
  borderRadius?: StyleValue;
  padding?: StyleValue;
  gap?: StyleValue;
  maxWidth?: StyleValue;
  titleSize?: StyleValue;
  typeSize?: StyleValue;
  nameSize?: StyleValue;
  buttonSize?: StyleValue;
  buttonPaddingY?: StyleValue;
  buttonPaddingX?: StyleValue;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  buttonBorderColor?: string;
  shadow?: ShadowSize;
};

type CardProps = {
  content?: SlotRenderer;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: StyleValue;
  borderRadius?: StyleValue;
  shadow?: ShadowSize;
  padding?: StyleValue;
  maxWidth?: StyleValue;
  align?: Alignment;
};

type SpacerProps = {
  height?: StyleValue;
  backgroundColor?: string;
};

type GalleryItem = {
  src?: string;
  alt?: string;
  caption?: string;
  href?: string;
};

type GalleryGridProps = {
  images?: GalleryItem[];
  columns?: StyleValue;
  gap?: StyleValue;
  aspectRatio?: AspectRatio;
  objectFit?: ObjectFit;
  borderRadius?: StyleValue;
  shadow?: ShadowSize;
  captionColor?: string;
  captionSize?: StyleValue;
};

type EmbedProps = {
  url?: string;
  title?: string;
  height?: StyleValue;
  maxWidth?: StyleValue;
  align?: Alignment;
  borderRadius?: StyleValue;
  borderWidth?: StyleValue;
  borderColor?: string;
  shadow?: ShadowSize;
  allowFullscreen?: boolean;
};

type VideoBlockProps = {
  src?: string;
  poster?: string;
  caption?: string;
  controls?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  align?: Alignment;
  maxWidth?: StyleValue;
  aspectRatio?: AspectRatio;
  objectFit?: ObjectFit;
  borderRadius?: StyleValue;
  shadow?: ShadowSize;
};

export type PortfolioComponents = {
  HeadingBlock: HeadingBlockProps;
  TextBlock: TextBlockProps;
  ImageBlock: ImageBlockProps;
  Divider: DividerProps;
  Button: ButtonProps;
  Slideshow: SlideshowProps;
  OverlayFrame: OverlayFrameProps;
  Section: SectionProps;
  Columns: ColumnsProps;
  Row: RowProps;
  Grid: GridProps;
  Header: HeaderProps;
  Project: ProjectProps;
  Card: CardProps;
  Spacer: SpacerProps;
  GalleryGrid: GalleryGridProps;
  Embed: EmbedProps;
  VideoBlock: VideoBlockProps;
};

export type PortfolioRootProps = {
  title?: string;
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  contentWidth?: StyleValue;
  pagePaddingX?: StyleValue;
  pagePaddingY?: StyleValue;
};

const yesNoOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
] as const;

const alignOptions = [
  { label: "Left", value: "left" },
  { label: "Center", value: "center" },
  { label: "Right", value: "right" },
] as const;

const itemAlignOptions = [
  { label: "Start", value: "start" },
  { label: "Center", value: "center" },
  { label: "End", value: "end" },
  { label: "Stretch", value: "stretch" },
] as const;

const flexJustifyOptions = [
  { label: "Start", value: "flex-start" },
  { label: "Center", value: "center" },
  { label: "End", value: "flex-end" },
  { label: "Space between", value: "space-between" },
  { label: "Space around", value: "space-around" },
  { label: "Space evenly", value: "space-evenly" },
] as const;

const aspectRatioOptions = [
  { label: "Auto", value: "auto" },
  { label: "Square", value: "1 / 1" },
  { label: "4:3", value: "4 / 3" },
  { label: "3:2", value: "3 / 2" },
  { label: "16:9", value: "16 / 9" },
  { label: "21:9", value: "21 / 9" },
] as const;

const objectFitOptions = [
  { label: "Cover", value: "cover" },
  { label: "Contain", value: "contain" },
  { label: "Fill", value: "fill" },
  { label: "None", value: "none" },
] as const;

const shadowOptions = [
  { label: "None", value: "none" },
  { label: "Soft", value: "soft" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
] as const;

const placementOptions = [
  { label: "Top left", value: "top-left" },
  { label: "Top center", value: "top-center" },
  { label: "Top right", value: "top-right" },
  { label: "Center left", value: "center-left" },
  { label: "Center", value: "center" },
  { label: "Center right", value: "center-right" },
  { label: "Bottom left", value: "bottom-left" },
  { label: "Bottom center", value: "bottom-center" },
  { label: "Bottom right", value: "bottom-right" },
] as const;

const bareNumberPattern = /^-?(?:\d+|\d*\.\d+)$/;

const cssValue = (
  value: StyleValue | undefined,
  fallback: StyleValue = 0,
  unit = "px"
) => {
  const next = value ?? fallback;

  if (typeof next === "number") return `${next}${unit}`;

  const trimmed = next.trim();

  if (!trimmed) return cssValue(fallback, 0, unit);

  return bareNumberPattern.test(trimmed) ? `${trimmed}${unit}` : trimmed;
};

const px = (value: StyleValue | undefined, fallback: StyleValue = 0) =>
  cssValue(value, fallback, "px");

const cssTextValue = (
  value: StyleValue | undefined,
  fallback: StyleValue
): string | number => {
  if (value === undefined || value === null || value === "") return fallback;

  return value;
};

const parseNumber = (value: StyleValue | undefined, fallback: number) => {
  if (value === undefined || value === null || value === "") return fallback;

  const parsed = Number.parseFloat(String(value));

  return Number.isFinite(parsed) ? parsed : fallback;
};

const cssPercentLength = (
  value: StyleValue | undefined,
  fallback: StyleValue = 100
) => {
  const next = value ?? fallback;

  if (typeof next === "number") return `${next}%`;

  const trimmed = next.trim();

  if (!trimmed) return cssPercentLength(fallback);

  return bareNumberPattern.test(trimmed) ? `${trimmed}%` : trimmed;
};

const percent = (value: StyleValue | undefined, fallback = 100) => {
  const next = value ?? fallback;
  const text = String(next).trim();
  const parsed = Number.parseFloat(text);

  if (!Number.isFinite(parsed)) return fallback / 100;

  return text.endsWith("%") || parsed > 1 ? parsed / 100 : parsed;
};

const fileField = (label: string, accept: string) =>
  ({
    label,
    type: "custom",
    render: ({
      id,
      onChange,
      readOnly,
      value,
    }: {
      id: string;
      onChange: (value: string) => void;
      readOnly?: boolean;
      value?: string;
    }) => (
      <div className="pf-file-field">
        <input
          accept={accept}
          disabled={readOnly}
          id={id}
          onChange={(event) => {
            const file = event.currentTarget.files?.[0];

            if (!file) return;

            const reader = new FileReader();

            reader.addEventListener("load", () => {
              onChange(String(reader.result || ""));
            });
            reader.readAsDataURL(file);
          }}
          type="file"
        />
        {value ? (
          <button disabled={readOnly} onClick={() => onChange("")} type="button">
            Clear file
          </button>
        ) : null}
      </div>
    ),
  } as const);

const aspectRatio = (value: AspectRatio | undefined) =>
  value && value !== "auto" ? value : undefined;

const shadow = (value: ShadowSize | undefined) => {
  switch (value) {
    case "soft":
      return "0 10px 28px rgba(15, 23, 42, 0.12)";
    case "medium":
      return "0 18px 48px rgba(15, 23, 42, 0.18)";
    case "large":
      return "0 28px 72px rgba(15, 23, 42, 0.24)";
    default:
      return "none";
  }
};

const justifyFromAlign = (value: Alignment | undefined) => {
  if (value === "left") return "flex-start";
  if (value === "right") return "flex-end";
  return "center";
};

const marginInlineFromAlign = (value: Alignment | undefined): CSSProperties => {
  if (value === "left") return { marginRight: "auto" };
  if (value === "right") return { marginLeft: "auto" };
  return { marginLeft: "auto", marginRight: "auto" };
};

const verticalAlign = (value: VerticalAlign | undefined) => {
  if (value === "start") return "start";
  if (value === "end") return "end";
  if (value === "stretch") return "stretch";
  return "center";
};

const placementStyle = (
  value:
    | NonNullable<OverlayFrameProps["contentPosition"]>
    | NonNullable<SlideshowProps["overlayPosition"]>
    | undefined
): CSSProperties => {
  const [block = "center", inline = "center"] = (value ?? "center").split("-");

  const alignItems =
    inline === "left" ? "flex-start" : inline === "right" ? "flex-end" : "center";
  const justifyContent =
    block === "top" ? "flex-start" : block === "bottom" ? "flex-end" : "center";
  const textAlign =
    inline === "left" ? "left" : inline === "right" ? "right" : "center";

  return { alignItems, justifyContent, textAlign };
};

const twoColumnTemplate = (layout: ColumnsProps["layout"]) => {
  switch (layout) {
    case "left-wide":
      return "minmax(0, 1.6fr) minmax(0, 1fr)";
    case "right-wide":
      return "minmax(0, 1fr) minmax(0, 1.6fr)";
    default:
      return "minmax(0, 1fr) minmax(0, 1fr)";
  }
};

const threeColumnTemplate = (layout: ColumnsProps["layout"]) => {
  if (layout === "center-wide") {
    return "minmax(0, 0.85fr) minmax(0, 1.5fr) minmax(0, 0.85fr)";
  }

  return "repeat(3, minmax(0, 1fr))";
};

function MediaPlaceholder({ label }: { label: string }) {
  return <div className="pf-media-placeholder">{label}</div>;
}

function MaybeLink({
  href,
  openInNewTab,
  children,
}: {
  href?: string;
  openInNewTab?: boolean;
  children: ReactNode;
}) {
  if (!href) return <>{children}</>;

  return (
    <a
      className="pf-reset-link"
      href={href}
      rel={openInNewTab ? "noreferrer" : undefined}
      target={openInNewTab ? "_blank" : undefined}
    >
      {children}
    </a>
  );
}

function SlideshowRenderer({
  slides = [],
  height = 460,
  maxWidth = 1180,
  aspectRatio: ratio = "16 / 9",
  align = "center",
  objectFit = "cover",
  overlayPosition = "center",
  overlayBackground = "#0f172a",
  overlayOpacity = 46,
  borderRadius = 18,
  shadow: shadowSize = "medium",
  autoplay = true,
  intervalMs = 5500,
  showArrows = true,
  showDots = true,
  videoControls = true,
  videoMuted = true,
  videoLoop = true,
  padding = 0,
  isEditing,
}: SlideshowProps & { isEditing?: boolean }) {
  const usableSlides = useMemo(
    () =>
      slides.length
        ? slides
        : [
            {
              type: "text" as const,
              title: "Project highlight",
              body: "<p>Add image, video, or text slides from the right panel.</p>",
              backgroundColor: "#111827",
              textColor: "#ffffff",
            },
          ],
    [slides]
  );
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (active >= usableSlides.length) setActive(0);
  }, [active, usableSlides.length]);

  useEffect(() => {
    if (!autoplay || isEditing || usableSlides.length < 2) return;

    const timeout = window.setTimeout(() => {
      setActive((index) => (index + 1) % usableSlides.length);
    }, parseNumber(intervalMs, 5500));

    return () => window.clearTimeout(timeout);
  }, [active, autoplay, intervalMs, isEditing, usableSlides.length]);

  const selectedSlide = usableSlides[active] ?? usableSlides[0];
  const selectedImageSource = selectedSlide?.imageFile || selectedSlide?.imageUrl;
  const selectedVideoSource = selectedSlide?.videoFile || selectedSlide?.videoUrl;
  const hasOverlayText =
    Boolean(selectedSlide?.title) ||
    Boolean(selectedSlide?.body) ||
    Boolean(selectedSlide?.buttonLabel);

  const goTo = (index: number) => {
    const next = (index + usableSlides.length) % usableSlides.length;
    setActive(next);
  };

  return (
    <div
      className="pf-slideshow-wrap"
      style={{
        justifyContent: justifyFromAlign(align),
        padding: px(padding),
      }}
    >
      <div
        className="pf-slideshow"
        style={{
          width: "100%",
          maxWidth: px(maxWidth),
          minHeight: ratio === "auto" ? px(height) : undefined,
          aspectRatio: aspectRatio(ratio),
          borderRadius: px(borderRadius),
          boxShadow: shadow(shadowSize),
        }}
      >
        <div className="pf-slideshow__stage">
          {selectedSlide?.type === "video" ? (
            selectedSlide.videoMode === "embed" ? (
              selectedSlide.videoUrl ? (
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="pf-slideshow__media"
                  src={selectedSlide.videoUrl}
                  title={selectedSlide.title || "Video slide"}
                />
              ) : (
                <MediaPlaceholder label="Video embed URL" />
              )
            ) : selectedVideoSource ? (
              <video
                autoPlay={!isEditing && autoplay && videoMuted}
                className="pf-slideshow__media"
                controls={videoControls}
                loop={videoLoop}
                muted={videoMuted}
                playsInline
                src={selectedVideoSource}
                style={{ objectFit }}
              />
            ) : (
              <MediaPlaceholder label="Video URL" />
            )
          ) : selectedSlide?.type === "text" ? (
            <div
              className="pf-slideshow__text-backdrop"
              style={{
                backgroundColor: selectedSlide.backgroundColor || "#111827",
                color: selectedSlide.textColor || "#ffffff",
              }}
            />
          ) : selectedImageSource ? (
            <img
              alt={selectedSlide.alt || selectedSlide.title || ""}
              className="pf-slideshow__media"
              src={selectedImageSource}
              style={{ objectFit }}
            />
          ) : (
            <MediaPlaceholder label="Image URL" />
          )}

          <div
            aria-hidden="true"
            className="pf-slideshow__overlay"
            style={{
              backgroundColor: overlayBackground,
              opacity: percent(overlayOpacity, 46),
            }}
          />

          {hasOverlayText ? (
            <div
              className="pf-slideshow__copy"
              style={{
                ...placementStyle(overlayPosition),
                color: selectedSlide?.textColor || "#ffffff",
              }}
            >
              <div
                className="pf-slideshow__copy-inner"
                style={{
                  maxWidth: px(selectedSlide?.contentMaxWidth, 680),
                }}
              >
                {selectedSlide?.title ? (
                  <h2 style={{ fontSize: px(selectedSlide.titleFontSize, 42) }}>
                    {selectedSlide.title}
                  </h2>
                ) : null}
                {selectedSlide?.body ? (
                  <div
                    className="pf-rich-content"
                    style={{
                      fontSize: px(selectedSlide.bodyFontSize, 18),
                      lineHeight: cssTextValue(selectedSlide.bodyLineHeight, 1.6),
                    }}
                  >
                    {selectedSlide.body}
                  </div>
                ) : null}
                {selectedSlide?.buttonLabel ? (
                  <MaybeLink href={selectedSlide.buttonUrl}>
                    <span
                      className="pf-slideshow__cta"
                      style={{
                        fontSize: px(selectedSlide.buttonFontSize, 14),
                        padding: `${px(selectedSlide.buttonPaddingY, 11)} ${px(
                          selectedSlide.buttonPaddingX,
                          16
                        )}`,
                      }}
                    >
                      {selectedSlide.buttonLabel}
                    </span>
                  </MaybeLink>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        {showArrows && usableSlides.length > 1 ? (
          <>
            <button
              aria-label="Previous slide"
              className="pf-slideshow__arrow pf-slideshow__arrow--prev"
              onClick={() => goTo(active - 1)}
              type="button"
            >
              <span aria-hidden="true" className="pf-slideshow__arrow-icon">
                ‹
              </span>
            </button>
            <button
              aria-label="Next slide"
              className="pf-slideshow__arrow pf-slideshow__arrow--next"
              onClick={() => goTo(active + 1)}
              type="button"
            >
              <span aria-hidden="true" className="pf-slideshow__arrow-icon">
                ›
              </span>
            </button>
          </>
        ) : null}

        {showDots && usableSlides.length > 1 ? (
          <div className="pf-slideshow__dots">
            {usableSlides.map((slide, index) => (
              <button
                aria-label={`Go to slide ${index + 1}`}
                className={
                  index === active
                    ? "pf-slideshow__dot pf-slideshow__dot--active"
                    : "pf-slideshow__dot"
                }
                key={`${slide.type}-${index}`}
                onClick={() => goTo(index)}
                type="button"
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export const portfolioRoot: Config<
  PortfolioComponents,
  PortfolioRootProps
>["root"] = {
  fields: {
    title: { label: "Page title", type: "text" },
    backgroundColor: { label: "Page background", type: "text" },
    textColor: { label: "Text color", type: "text" },
    fontFamily: { label: "Font family", type: "text" },
    contentWidth: { label: "Content width", type: "text" },
    pagePaddingX: { label: "Side padding", type: "text" },
    pagePaddingY: { label: "Top/bottom padding", type: "text" },
  },
  defaultProps: {
    title: "Portfolio",
    backgroundColor: "#f8fafc",
    textColor: "#111827",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    contentWidth: 1440,
    pagePaddingX: 0,
    pagePaddingY: 0,
  },
  render: ({
    backgroundColor = "#f8fafc",
    children,
    contentWidth = 1440,
    fontFamily,
    pagePaddingX = 0,
    pagePaddingY = 0,
    textColor = "#111827",
  }) => (
    <main
      className="pf-root"
      style={
        {
          "--pf-root-bg": backgroundColor,
          "--pf-root-color": textColor,
          "--pf-root-font": fontFamily,
          "--pf-root-width": px(contentWidth),
          "--pf-root-padding-x": px(pagePaddingX),
          "--pf-root-padding-y": px(pagePaddingY),
        } as StyleWithVars
      }
    >
      {children}
    </main>
  ),
};

export const portfolioComponents: Config<PortfolioComponents>["components"] = {
  HeadingBlock: {
    label: "Heading",
    fields: {
      title: { label: "Title", type: "text", contentEditable: true },
      align: { label: "Alignment", options: alignOptions, type: "select" },
      color: { label: "Color", type: "text" },
      fontSize: { label: "Font size", type: "text" },
      padding: { label: "Padding", type: "text" },
    },
    defaultProps: {
      title: "Heading",
      align: "center",
      color: "#111827",
      fontSize: 56,
      padding: 64,
    },
    render: ({
      align = "center",
      color = "#111827",
      fontSize = 56,
      padding = 64,
      title = "Heading",
    }) => (
      <section className="pf-heading" style={{ padding: px(padding), textAlign: align }}>
        <h1 style={{ color, fontSize: px(fontSize) }}>{title}</h1>
      </section>
    ),
  },

  TextBlock: {
    label: "Text",
    fields: {
      content: {
        label: "Content",
        type: "richtext",
        initialHeight: 220,
      },
      as: {
        label: "HTML tag",
        options: [
          { label: "Paragraph", value: "p" },
          { label: "Heading 1", value: "h1" },
          { label: "Heading 2", value: "h2" },
          { label: "Heading 3", value: "h3" },
          { label: "Div", value: "div" },
        ],
        type: "select",
      },
      align: { label: "Alignment", options: alignOptions, type: "select" },
      staticSize: { label: "Static size", options: yesNoOptions, type: "radio" },
      maxWidth: { label: "Max width", type: "text" },
      color: { label: "Text color", type: "text" },
      backgroundColor: { label: "Background", type: "text" },
      fontSize: { label: "Font size", type: "text" },
      lineHeight: { label: "Line height", type: "text" },
      fontWeight: { label: "Font weight", type: "text" },
      paddingTop: { label: "Padding top", type: "text" },
      paddingRight: { label: "Padding right", type: "text" },
      paddingBottom: { label: "Padding bottom", type: "text" },
      paddingLeft: { label: "Padding left", type: "text" },
      marginTop: { label: "Margin top", type: "text" },
      marginBottom: { label: "Margin bottom", type: "text" },
      borderRadius: { label: "Radius", type: "text" },
      textTransform: {
        label: "Text transform",
        options: [
          { label: "None", value: "none" },
          { label: "Uppercase", value: "uppercase" },
          { label: "Lowercase", value: "lowercase" },
          { label: "Capitalize", value: "capitalize" },
        ],
        type: "select",
      },
    },
    defaultProps: {
      content:
        "<p>Add a short paragraph, project description, or case study copy here.</p>",
      as: "div",
      align: "left",
      staticSize: false,
      maxWidth: 860,
      color: "#111827",
      backgroundColor: "transparent",
      fontSize: 18,
      lineHeight: 1.65,
      fontWeight: 400,
      paddingTop: 24,
      paddingRight: 24,
      paddingBottom: 24,
      paddingLeft: 24,
      marginTop: 0,
      marginBottom: 0,
      borderRadius: 0,
      textTransform: "none",
    },
    render: ({
      align = "left",
      as: Tag = "div",
      backgroundColor = "transparent",
      borderRadius = 0,
      color = "#111827",
      content,
      fontSize = 18,
      fontWeight = 400,
      lineHeight = 1.65,
      marginBottom = 0,
      marginTop = 0,
      maxWidth = 860,
      paddingBottom = 24,
      paddingLeft = 24,
      paddingRight = 24,
      paddingTop = 24,
      staticSize = false,
      textTransform = "none",
    }) => (
      <div
        className={staticSize ? "pf-text pf-text--static" : "pf-text"}
        style={{
          ...marginInlineFromAlign(align),
          marginBottom: px(marginBottom),
          marginTop: px(marginTop),
          maxWidth: px(maxWidth),
          textAlign: align,
        }}
      >
        <Tag
          className="pf-rich-content"
          style={{
            backgroundColor,
            borderRadius: px(borderRadius),
            color,
            fontSize: px(fontSize),
            fontWeight,
            lineHeight,
            padding: `${px(paddingTop)} ${px(paddingRight)} ${px(
              paddingBottom
            )} ${px(paddingLeft)}`,
            textTransform,
          }}
        >
          {content}
        </Tag>
      </div>
    ),
  },

  ImageBlock: {
    label: "Image",
    fields: {
      file: fileField("Image file", "image/*"),
      src: { label: "Image URL or path", type: "text" },
      alt: { label: "Alt text", type: "text" },
      caption: { label: "Caption", type: "text" },
      href: { label: "Link URL", type: "text" },
      openInNewTab: { label: "Open in new tab", options: yesNoOptions, type: "radio" },
      align: { label: "Alignment", options: alignOptions, type: "select" },
      staticSize: { label: "Static size", options: yesNoOptions, type: "radio" },
      width: { label: "Width percent", type: "text" },
      maxWidth: { label: "Max width", type: "text" },
      height: { label: "Height", type: "text" },
      aspectRatio: { label: "Aspect ratio", options: aspectRatioOptions, type: "select" },
      objectFit: { label: "Object fit", options: objectFitOptions, type: "select" },
      objectPosition: { label: "Object position", type: "text" },
      borderRadius: { label: "Radius", type: "text" },
      borderWidth: { label: "Border width", type: "text" },
      borderColor: { label: "Border color", type: "text" },
      shadow: { label: "Shadow", options: shadowOptions, type: "select" },
      opacity: { label: "Opacity", type: "text" },
      padding: { label: "Padding", type: "text" },
      backgroundColor: { label: "Background", type: "text" },
      captionColor: { label: "Caption color", type: "text" },
      captionSize: { label: "Caption size", type: "text" },
    },
    defaultProps: {
      file: "",
      src: "",
      alt: "",
      caption: "",
      href: "",
      openInNewTab: false,
      align: "center",
      staticSize: false,
      width: 100,
      maxWidth: 980,
      height: 520,
      aspectRatio: "16 / 9",
      objectFit: "cover",
      objectPosition: "center",
      borderRadius: 18,
      borderWidth: 0,
      borderColor: "#e5e7eb",
      shadow: "soft",
      opacity: 100,
      padding: 0,
      backgroundColor: "transparent",
      captionColor: "#475569",
      captionSize: 14,
    },
    render: ({
      align = "center",
      alt = "",
      aspectRatio: ratio = "16 / 9",
      backgroundColor = "transparent",
      borderColor = "#e5e7eb",
      borderRadius = 18,
      borderWidth = 0,
      caption,
      captionColor = "#475569",
      captionSize = 14,
      height = 520,
      href,
      maxWidth = 980,
      objectFit = "cover",
      objectPosition = "center",
      opacity = 100,
      openInNewTab = false,
      padding = 0,
      staticSize = false,
      shadow: shadowSize = "soft",
      file,
      src,
      width = 100,
    }) => (
      <figure
        className={staticSize ? "pf-image pf-image--static" : "pf-image"}
        style={{
          ...marginInlineFromAlign(align),
          backgroundColor,
          maxWidth: px(maxWidth),
          padding: px(padding),
          width: staticSize ? `min(100%, ${px(maxWidth)})` : cssPercentLength(width, 100),
        }}
      >
        <MaybeLink href={href} openInNewTab={openInNewTab}>
          <div
            className="pf-image__frame"
            style={{
              aspectRatio: aspectRatio(ratio),
              border: `${px(borderWidth)} solid ${borderColor}`,
              borderRadius: px(borderRadius),
              boxShadow: shadow(shadowSize),
              height: ratio === "auto" ? px(height) : undefined,
              opacity: percent(opacity),
              maxWidth: "100%",
              width: "100%",
            }}
          >
            {file || src ? (
              <img
                alt={alt}
                src={file || src}
                style={{ objectFit, objectPosition }}
              />
            ) : (
              <MediaPlaceholder label="Image URL" />
            )}
          </div>
        </MaybeLink>
        {caption ? (
          <figcaption style={{ color: captionColor, fontSize: px(captionSize) }}>
            {caption}
          </figcaption>
        ) : null}
      </figure>
    ),
  },

  Divider: {
    label: "Line",
    fields: {
      orientation: {
        label: "Orientation",
        options: [
          { label: "Horizontal", value: "horizontal" },
          { label: "Vertical", value: "vertical" },
        ],
        type: "select",
      },
      align: { label: "Alignment", options: alignOptions, type: "select" },
      length: { label: "Length", type: "text" },
      thickness: { label: "Thickness", type: "text" },
      color: { label: "Color", type: "text" },
      style: {
        label: "Style",
        options: [
          { label: "Solid", value: "solid" },
          { label: "Dashed", value: "dashed" },
          { label: "Dotted", value: "dotted" },
          { label: "Double", value: "double" },
        ],
        type: "select",
      },
      opacity: { label: "Opacity", type: "text" },
      marginTop: { label: "Margin top", type: "text" },
      marginBottom: { label: "Margin bottom", type: "text" },
    },
    defaultProps: {
      orientation: "horizontal",
      align: "center",
      length: 100,
      thickness: 1,
      color: "#cbd5e1",
      style: "solid",
      opacity: 100,
      marginTop: 24,
      marginBottom: 24,
    },
    render: ({
      align = "center",
      color = "#cbd5e1",
      length = 100,
      marginBottom = 24,
      marginTop = 24,
      opacity = 100,
      orientation = "horizontal",
      style = "solid",
      thickness = 1,
    }) => (
      <div
        className="pf-divider-wrap"
        style={{
          justifyContent: justifyFromAlign(align),
          marginBottom: px(marginBottom),
          marginTop: px(marginTop),
        }}
      >
        <div
          className="pf-divider"
          style={{
            borderColor: color,
            borderStyle: style,
            borderWidth:
              orientation === "horizontal"
                ? `${px(thickness)} 0 0`
                : `0 0 0 ${px(thickness)}`,
            height: orientation === "horizontal" ? 0 : cssValue(length, 100, "vh"),
            opacity: percent(opacity),
            width: orientation === "horizontal" ? cssPercentLength(length, 100) : 0,
          }}
        />
      </div>
    ),
  },

  Button: {
    label: "Button",
    fields: {
      label: { label: "Label", type: "text", contentEditable: true },
      href: { label: "Link URL", type: "text" },
      ariaLabel: { label: "Accessible label", type: "text" },
      openInNewTab: { label: "Open in new tab", options: yesNoOptions, type: "radio" },
      align: { label: "Alignment", options: alignOptions, type: "select" },
      fullWidth: { label: "Full width", options: yesNoOptions, type: "radio" },
      staticSize: { label: "Static size", options: yesNoOptions, type: "radio" },
      width: { label: "Width", type: "text" },
      height: { label: "Height", type: "text" },
      backgroundColor: { label: "Background", type: "text" },
      textColor: { label: "Text color", type: "text" },
      borderColor: { label: "Border color", type: "text" },
      hoverBackgroundColor: { label: "Hover background", type: "text" },
      hoverTextColor: { label: "Hover text", type: "text" },
      hoverBorderColor: { label: "Hover border", type: "text" },
      borderWidth: { label: "Border width", type: "text" },
      borderRadius: { label: "Radius", type: "text" },
      paddingY: { label: "Padding Y", type: "text" },
      paddingX: { label: "Padding X", type: "text" },
      fontSize: { label: "Font size", type: "text" },
      fontWeight: { label: "Font weight", type: "text" },
      textTransform: {
        label: "Text transform",
        options: [
          { label: "None", value: "none" },
          { label: "Uppercase", value: "uppercase" },
          { label: "Lowercase", value: "lowercase" },
          { label: "Capitalize", value: "capitalize" },
        ],
        type: "select",
      },
      shadow: { label: "Shadow", options: shadowOptions, type: "select" },
    },
    defaultProps: {
      label: "View project",
      href: "#",
      ariaLabel: "",
      openInNewTab: false,
      align: "left",
      fullWidth: false,
      staticSize: false,
      width: "auto",
      height: "auto",
      backgroundColor: "#2563eb",
      textColor: "#ffffff",
      borderColor: "#2563eb",
      hoverBackgroundColor: "#111827",
      hoverTextColor: "#ffffff",
      hoverBorderColor: "#111827",
      borderWidth: 1,
      borderRadius: 999,
      paddingY: 13,
      paddingX: 22,
      fontSize: 15,
      fontWeight: 700,
      textTransform: "none",
      shadow: "soft",
    },
    render: ({
      align = "left",
      ariaLabel,
      backgroundColor = "#2563eb",
      borderColor = "#2563eb",
      borderRadius = 999,
      borderWidth = 1,
      fontSize = 15,
      fontWeight = 700,
      fullWidth = false,
      height = "auto",
      hoverBackgroundColor = "#111827",
      hoverBorderColor = "#111827",
      hoverTextColor = "#ffffff",
      href = "#",
      label = "View project",
      openInNewTab = false,
      paddingX = 22,
      paddingY = 13,
      shadow: shadowSize = "soft",
      staticSize = false,
      textColor = "#ffffff",
      textTransform = "none",
      width = "auto",
    }) => (
      <div
        className="pf-button-wrap"
        style={{ justifyContent: justifyFromAlign(align) }}
      >
        <a
          aria-label={ariaLabel || label}
          className="pf-button"
          href={href || "#"}
          rel={openInNewTab ? "noreferrer" : undefined}
          style={
            {
              "--pf-button-bg": backgroundColor,
              "--pf-button-border": borderColor,
              "--pf-button-color": textColor,
              "--pf-button-hover-bg": hoverBackgroundColor,
              "--pf-button-hover-border": hoverBorderColor,
              "--pf-button-hover-color": hoverTextColor,
              borderRadius: px(borderRadius),
              borderWidth: px(borderWidth),
              boxShadow: shadow(shadowSize),
              flexShrink: staticSize ? 0 : 1,
              fontSize: px(fontSize),
              fontWeight,
              padding: `${px(paddingY)} ${px(paddingX)}`,
              textTransform,
              height: px(height),
              maxWidth: staticSize ? undefined : "100%",
              width: fullWidth ? "100%" : px(width),
            } as StyleWithVars
          }
          target={openInNewTab ? "_blank" : undefined}
        >
          {label}
        </a>
      </div>
    ),
  },

  Slideshow: {
    label: "Slideshow",
    fields: {
      slides: {
        label: "Slides",
        type: "array",
        min: 1,
        arrayFields: {
          type: {
            label: "Type",
            options: [
              { label: "Image", value: "image" },
              { label: "Video", value: "video" },
              { label: "Text", value: "text" },
            ],
            type: "select",
          },
          imageFile: fileField("Image file", "image/*"),
          imageUrl: { label: "Image URL or path", type: "text" },
          videoFile: fileField("Video file", "video/*"),
          videoUrl: { label: "Video URL, path, or embed URL", type: "text" },
          videoMode: {
            label: "Video mode",
            options: [
              { label: "File", value: "file" },
              { label: "Embed", value: "embed" },
            ],
            type: "select",
          },
          alt: { label: "Alt text", type: "text" },
          title: { label: "Title", type: "text" },
          body: { label: "Body", type: "richtext", initialHeight: 140 },
          buttonLabel: { label: "Button label", type: "text" },
          buttonUrl: { label: "Button URL", type: "text" },
          backgroundColor: { label: "Background", type: "text" },
          textColor: { label: "Text color", type: "text" },
          titleFontSize: { label: "Title size", type: "text" },
          bodyFontSize: { label: "Body size", type: "text" },
          bodyLineHeight: { label: "Body line height", type: "text" },
          buttonFontSize: { label: "Button size", type: "text" },
          buttonPaddingY: { label: "Button padding Y", type: "text" },
          buttonPaddingX: { label: "Button padding X", type: "text" },
          contentMaxWidth: { label: "Text max width", type: "text" },
        },
        defaultItemProps: (index) => ({
          type: index % 3 === 1 ? "text" : "image",
          imageFile: "",
          imageUrl: "",
          videoFile: "",
          videoUrl: "",
          videoMode: "file",
          alt: "",
          title: `Slide ${index + 1}`,
          body: "<p>Add slide copy.</p>",
          buttonLabel: "",
          buttonUrl: "",
          backgroundColor: "#111827",
          textColor: "#ffffff",
          titleFontSize: 42,
          bodyFontSize: 18,
          bodyLineHeight: 1.6,
          buttonFontSize: 14,
          buttonPaddingY: 11,
          buttonPaddingX: 16,
          contentMaxWidth: 680,
        }),
        getItemSummary: (item, index) => item.title || `Slide ${(index ?? 0) + 1}`,
      },
      height: { label: "Height", type: "text" },
      maxWidth: { label: "Max width", type: "text" },
      aspectRatio: { label: "Aspect ratio", options: aspectRatioOptions, type: "select" },
      align: { label: "Alignment", options: alignOptions, type: "select" },
      objectFit: { label: "Media fit", options: objectFitOptions, type: "select" },
      overlayPosition: {
        label: "Text position",
        options: placementOptions,
        type: "select",
      },
      overlayBackground: { label: "Overlay color", type: "text" },
      overlayOpacity: { label: "Overlay opacity", type: "text" },
      borderRadius: { label: "Radius", type: "text" },
      shadow: { label: "Shadow", options: shadowOptions, type: "select" },
      autoplay: { label: "Autoplay", options: yesNoOptions, type: "radio" },
      intervalMs: { label: "Autoplay delay", type: "text" },
      showArrows: { label: "Show arrows", options: yesNoOptions, type: "radio" },
      showDots: { label: "Show dots", options: yesNoOptions, type: "radio" },
      videoControls: { label: "Video controls", options: yesNoOptions, type: "radio" },
      videoMuted: { label: "Video muted", options: yesNoOptions, type: "radio" },
      videoLoop: { label: "Video loop", options: yesNoOptions, type: "radio" },
      padding: { label: "Outer padding", type: "text" },
    },
    defaultProps: {
      slides: [
        {
          type: "text",
          imageFile: "",
          imageUrl: "",
          videoFile: "",
          videoUrl: "",
          videoMode: "file",
          alt: "",
          title: "Featured work",
          body: "<p>Showcase a project with images, video, or text slides.</p>",
          buttonLabel: "Open case study",
          buttonUrl: "#",
          backgroundColor: "#0f172a",
          textColor: "#ffffff",
          titleFontSize: 42,
          bodyFontSize: 18,
          bodyLineHeight: 1.6,
          buttonFontSize: 14,
          buttonPaddingY: 11,
          buttonPaddingX: 16,
          contentMaxWidth: 680,
        },
        {
          type: "image",
          imageFile: "",
          imageUrl: "",
          videoFile: "",
          videoUrl: "",
          videoMode: "file",
          alt: "",
          title: "Image slide",
          body: "<p>Paste an image URL to replace this placeholder.</p>",
          buttonLabel: "",
          buttonUrl: "",
          backgroundColor: "#111827",
          textColor: "#ffffff",
          titleFontSize: 42,
          bodyFontSize: 18,
          bodyLineHeight: 1.6,
          buttonFontSize: 14,
          buttonPaddingY: 11,
          buttonPaddingX: 16,
          contentMaxWidth: 680,
        },
      ],
      height: 460,
      maxWidth: 1180,
      aspectRatio: "16 / 9",
      align: "center",
      objectFit: "cover",
      overlayPosition: "center",
      overlayBackground: "#0f172a",
      overlayOpacity: 46,
      borderRadius: 18,
      shadow: "medium",
      autoplay: true,
      intervalMs: 5500,
      showArrows: true,
      showDots: true,
      videoControls: true,
      videoMuted: true,
      videoLoop: true,
      padding: 0,
    },
    render: ({ puck, ...props }) => (
      <SlideshowRenderer {...props} isEditing={puck.isEditing} />
    ),
  },

  OverlayFrame: {
    label: "On-top frame",
    fields: {
      backgroundType: {
        label: "Background type",
        options: [
          { label: "Color", value: "color" },
          { label: "Image", value: "image" },
          { label: "Video", value: "video" },
        ],
        type: "select",
      },
      backgroundColor: { label: "Background color", type: "text" },
      backgroundImage: { label: "Background image", type: "text" },
      backgroundVideo: { label: "Background video", type: "text" },
      backgroundFit: { label: "Background fit", options: objectFitOptions, type: "select" },
      backgroundPosition: { label: "Background position", type: "text" },
      minHeight: { label: "Min height", type: "text" },
      maxWidth: { label: "Max width", type: "text" },
      align: { label: "Alignment", options: alignOptions, type: "select" },
      borderRadius: { label: "Radius", type: "text" },
      borderWidth: { label: "Border width", type: "text" },
      borderColor: { label: "Border color", type: "text" },
      shadow: { label: "Shadow", options: shadowOptions, type: "select" },
      overlayColor: { label: "Overlay color", type: "text" },
      overlayOpacity: { label: "Overlay opacity", type: "text" },
      contentPosition: {
        label: "Content position",
        options: placementOptions,
        type: "select",
      },
      padding: { label: "Padding", type: "text" },
      content: {
        label: "Overlay content",
        type: "slot",
      },
    },
    defaultProps: {
      backgroundType: "color",
      backgroundColor: "#111827",
      backgroundImage: "",
      backgroundVideo: "",
      backgroundFit: "cover",
      backgroundPosition: "center",
      minHeight: 520,
      maxWidth: 1180,
      align: "center",
      borderRadius: 24,
      borderWidth: 0,
      borderColor: "#e5e7eb",
      shadow: "medium",
      overlayColor: "#000000",
      overlayOpacity: 28,
      contentPosition: "center",
      padding: 48,
    },
    render: ({
      align = "center",
      backgroundColor = "#111827",
      backgroundFit = "cover",
      backgroundImage,
      backgroundPosition = "center",
      backgroundType = "color",
      backgroundVideo,
      borderColor = "#e5e7eb",
      borderRadius = 24,
      borderWidth = 0,
      content,
      contentPosition = "center",
      maxWidth = 1180,
      minHeight = 520,
      overlayColor = "#000000",
      overlayOpacity = 28,
      padding = 48,
      shadow: shadowSize = "medium",
    }) => (
      <section
        className="pf-overlay-frame-wrap"
        style={{ justifyContent: justifyFromAlign(align) }}
      >
        <div
          className="pf-overlay-frame"
          style={{
            backgroundColor,
            border: `${px(borderWidth)} solid ${borderColor}`,
            borderRadius: px(borderRadius),
            boxShadow: shadow(shadowSize),
            maxWidth: px(maxWidth),
            minHeight: px(minHeight),
          }}
        >
          {backgroundType === "image" && backgroundImage ? (
            <img
              alt=""
              aria-hidden="true"
              className="pf-overlay-frame__media"
              src={backgroundImage}
              style={{ objectFit: backgroundFit, objectPosition: backgroundPosition }}
            />
          ) : null}
          {backgroundType === "video" && backgroundVideo ? (
            <video
              aria-hidden="true"
              autoPlay
              className="pf-overlay-frame__media"
              loop
              muted
              playsInline
              src={backgroundVideo}
              style={{ objectFit: backgroundFit, objectPosition: backgroundPosition }}
            />
          ) : null}
          <div
            aria-hidden="true"
            className="pf-overlay-frame__overlay"
            style={{
              backgroundColor: overlayColor,
              opacity: percent(overlayOpacity, 28),
            }}
          />
          <div
            className="pf-overlay-frame__content"
            style={{
              ...placementStyle(contentPosition),
              padding: px(padding),
            }}
          >
            {typeof content === "function"
              ? content({
                  className: "pf-slot pf-overlay-frame__slot",
                  minEmptyHeight: 180,
                })
              : null}
          </div>
        </div>
      </section>
    ),
  },

  Section: {
    label: "Section",
    fields: {
      frozen: {
        label: "Frozen as",
        options: [
          { label: "None", value: "none" },
          { label: "Header", value: "header" },
          { label: "Footer", value: "footer" },
        ],
        type: "select",
      },
      backgroundColor: { label: "Background", type: "text" },
      textColor: { label: "Text color", type: "text" },
      maxWidth: { label: "Content width", type: "text" },
      edgeToEdge: {
        label: "Extend to page edge",
        options: yesNoOptions,
        type: "radio",
      },
      fullBleed: { label: "Full bleed", options: yesNoOptions, type: "radio" },
      paddingTop: { label: "Padding top", type: "text" },
      paddingRight: { label: "Padding right", type: "text" },
      paddingBottom: { label: "Padding bottom", type: "text" },
      paddingLeft: { label: "Padding left", type: "text" },
      gap: { label: "Content gap", type: "text" },
      zIndex: { label: "Z index", type: "text" },
      content: { label: "Content", type: "slot" },
    },
    defaultProps: {
      frozen: "none",
      edgeToEdge: false,
      backgroundColor: "transparent",
      textColor: "#111827",
      maxWidth: 1180,
      fullBleed: false,
      paddingTop: 72,
      paddingRight: 24,
      paddingBottom: 72,
      paddingLeft: 24,
      gap: 24,
      zIndex: 40,
    },
    render: ({
      backgroundColor = "transparent",
      content,
      edgeToEdge = false,
      frozen = "none",
      fullBleed = false,
      gap = 24,
      maxWidth = 1180,
      paddingBottom = 72,
      paddingLeft = 24,
      paddingRight = 24,
      paddingTop = 72,
      textColor = "#111827",
      zIndex = 40,
    }) => (
      <section
        className={
          frozen === "header"
            ? `pf-section pf-section--frozen-header${
                edgeToEdge ? " pf-section--edge" : ""
              }`
            : frozen === "footer"
              ? `pf-section pf-section--frozen-footer${
                  edgeToEdge ? " pf-section--edge" : ""
                }`
              : `pf-section${edgeToEdge ? " pf-section--edge" : ""}`
        }
        style={{
          backgroundColor,
          color: textColor,
          padding: `${px(paddingTop)} ${px(paddingRight)} ${px(paddingBottom)} ${px(
            paddingLeft
          )}`,
          zIndex: frozen === "none" ? undefined : parseNumber(zIndex, 40),
        }}
      >
        <div
          className="pf-section__inner"
          style={{
            maxWidth: fullBleed ? "none" : px(maxWidth),
          }}
        >
          {typeof content === "function"
            ? content({
                className: "pf-slot pf-section__slot",
                minEmptyHeight: 120,
                style: { gap: px(gap) },
              })
            : null}
        </div>
      </section>
    ),
  },

  Columns: {
    label: "Columns",
    fields: {
      layout: {
        label: "Layout",
        options: [
          { label: "Two equal", value: "two-equal" },
          { label: "Left wide", value: "left-wide" },
          { label: "Right wide", value: "right-wide" },
          { label: "Three equal", value: "three-equal" },
          { label: "Center wide", value: "center-wide" },
        ],
        type: "select",
      },
      gap: { label: "Gap", type: "text" },
      verticalAlign: {
        label: "Vertical align",
        options: [
          { label: "Start", value: "start" },
          { label: "Center", value: "center" },
          { label: "End", value: "end" },
          { label: "Stretch", value: "stretch" },
        ],
        type: "select",
      },
      backgroundColor: { label: "Background", type: "text" },
      padding: { label: "Padding", type: "text" },
      paddingX: { label: "Padding X", type: "text" },
      marginX: { label: "Margin X", type: "text" },
      borderRadius: { label: "Radius", type: "text" },
      staticSize: { label: "Static size", options: yesNoOptions, type: "radio" },
      stackOnMobile: {
        label: "Stack below 640px",
        options: yesNoOptions,
        type: "radio",
      },
      left: { label: "Left column", type: "slot" },
      center: { label: "Center column", type: "slot" },
      right: { label: "Right column", type: "slot" },
    },
    defaultProps: {
      layout: "two-equal",
      gap: 28,
      verticalAlign: "start",
      backgroundColor: "transparent",
      padding: 0,
      paddingX: "",
      marginX: "",
      borderRadius: 0,
      staticSize: false,
      stackOnMobile: false,
    },
    render: ({
      backgroundColor = "transparent",
      borderRadius = 0,
      center,
      gap = 28,
      layout = "two-equal",
      left,
      marginX = "",
      padding = 0,
      paddingX = "",
      right,
      staticSize = false,
      stackOnMobile = false,
      verticalAlign: align = "start",
    }) => {
      const hasThreeColumns = layout === "three-equal" || layout === "center-wide";
      const gridTemplateColumns = hasThreeColumns
        ? threeColumnTemplate(layout)
        : twoColumnTemplate(layout);

      return (
        <div
          className={
            [
              "pf-columns",
              stackOnMobile && !staticSize ? "pf-columns--stack" : "",
              staticSize ? "pf-columns--static" : "",
            ]
              .filter(Boolean)
              .join(" ")
          }
          style={
            {
              "--pf-columns-gap": px(gap),
              alignItems: verticalAlign(align),
              backgroundColor,
              borderRadius: px(borderRadius),
              gridTemplateColumns,
              marginLeft: marginX ? px(marginX) : undefined,
              marginRight: marginX ? px(marginX) : undefined,
              padding: `${px(padding)} ${px(paddingX || padding)}`,
            } as StyleWithVars
          }
        >
          <div className="pf-columns__cell">
            {typeof left === "function"
              ? left({ className: "pf-slot", minEmptyHeight: 100 })
              : null}
          </div>
          <div className="pf-columns__cell">
            {typeof center === "function"
              ? center({ className: "pf-slot", minEmptyHeight: 100 })
              : null}
          </div>
          {hasThreeColumns ? (
            <div className="pf-columns__cell">
              {typeof right === "function"
                ? right({ className: "pf-slot", minEmptyHeight: 100 })
                : null}
            </div>
          ) : null}
        </div>
      );
    },
  },

  Row: {
    label: "Row",
    fields: {
      align: { label: "Container alignment", options: alignOptions, type: "select" },
      alignItems: {
        label: "Item width alignment",
        options: itemAlignOptions,
        type: "select",
      },
      gap: { label: "Gap", type: "text" },
      maxWidth: { label: "Max width", type: "text" },
      width: { label: "Width", type: "text" },
      minHeight: { label: "Min height", type: "text" },
      backgroundColor: { label: "Background", type: "text" },
      padding: { label: "Padding", type: "text" },
      paddingX: { label: "Padding X", type: "text" },
      marginX: { label: "Margin X", type: "text" },
      borderRadius: { label: "Radius", type: "text" },
      content: { label: "Content", type: "slot" },
    },
    defaultProps: {
      align: "center",
      alignItems: "stretch",
      gap: 24,
      maxWidth: "100%",
      width: "100%",
      minHeight: 120,
      backgroundColor: "transparent",
      padding: 0,
      paddingX: "",
      marginX: "",
      borderRadius: 0,
    },
    render: ({
      align = "center",
      alignItems = "stretch",
      backgroundColor = "transparent",
      borderRadius = 0,
      content,
      gap = 24,
      marginX = "",
      maxWidth = "100%",
      minHeight = 120,
      padding = 0,
      paddingX = "",
      width = "100%",
    }) => (
      <div
        className="pf-row"
        style={{
          ...marginInlineFromAlign(align),
          backgroundColor,
          borderRadius: px(borderRadius),
          marginLeft: marginX ? px(marginX) : undefined,
          marginRight: marginX ? px(marginX) : undefined,
          maxWidth: px(maxWidth),
          minHeight: px(minHeight),
          padding: `${px(padding)} ${px(paddingX || padding)}`,
          width: px(width),
        }}
      >
        {typeof content === "function"
          ? content({
              className: "pf-slot pf-row__slot",
              minEmptyHeight: 100,
              style: {
                alignItems,
                display: "flex",
                flexDirection: "column",
                gap: px(gap),
              },
            })
          : null}
      </div>
    ),
  },

  Grid: {
    label: "Grid",
    fields: {
      align: { label: "Container alignment", options: alignOptions, type: "select" },
      columns: { label: "Columns", type: "text" },
      autoRows: { label: "Auto rows", type: "text" },
      gap: { label: "Gap", type: "text" },
      justifyItems: {
        label: "Horizontal item align",
        options: itemAlignOptions,
        type: "select",
      },
      alignItems: {
        label: "Vertical item align",
        options: itemAlignOptions,
        type: "select",
      },
      staticSize: { label: "Static size", options: yesNoOptions, type: "radio" },
      maxWidth: { label: "Max width", type: "text" },
      width: { label: "Width", type: "text" },
      minHeight: { label: "Min height", type: "text" },
      backgroundColor: { label: "Background", type: "text" },
      padding: { label: "Padding", type: "text" },
      borderRadius: { label: "Radius", type: "text" },
      content: { label: "Content", type: "slot" },
    },
    defaultProps: {
      align: "center",
      columns: "repeat(3, minmax(0, 1fr))",
      autoRows: "auto",
      gap: 24,
      justifyItems: "stretch",
      alignItems: "stretch",
      staticSize: false,
      maxWidth: "100%",
      width: "100%",
      minHeight: 160,
      backgroundColor: "transparent",
      padding: 0,
      borderRadius: 0,
    },
    render: ({
      align = "center",
      alignItems = "stretch",
      autoRows = "auto",
      backgroundColor = "transparent",
      borderRadius = 0,
      columns = "repeat(3, minmax(0, 1fr))",
      content,
      gap = 24,
      justifyItems = "stretch",
      maxWidth = "100%",
      minHeight = 160,
      padding = 0,
      staticSize = false,
      width = "100%",
    }) => (
      <div
        className="pf-grid"
        style={{
          ...marginInlineFromAlign(align),
          backgroundColor,
          borderRadius: px(borderRadius),
          maxWidth: px(maxWidth),
          minHeight: px(minHeight),
          padding: px(padding),
          width: px(width),
        }}
      >
        {typeof content === "function"
          ? content({
              className: staticSize
                ? "pf-slot pf-grid__slot pf-grid__slot--static"
                : "pf-slot pf-grid__slot",
              minEmptyHeight: 120,
              style: {
                alignItems,
                display: "grid",
                gap: px(gap),
                gridAutoRows: autoRows,
                gridTemplateColumns: columns,
                justifyItems,
              },
            })
          : null}
      </div>
    ),
  },

  Header: {
    label: "Header",
    fields: {
      brand: { label: "Brand", type: "text", contentEditable: true },
      brandHref: { label: "Brand URL", type: "text" },
      links: {
        label: "Links",
        type: "array",
        arrayFields: {
          label: { label: "Label", type: "text" },
          href: { label: "URL", type: "text" },
          openInNewTab: {
            label: "Open in new tab",
            options: yesNoOptions,
            type: "radio",
          },
        },
        defaultItemProps: (index) => ({
          label: `Link ${index + 1}`,
          href: "#",
          openInNewTab: false,
        }),
        getItemSummary: (item, index) => item.label || `Link ${(index ?? 0) + 1}`,
      },
      buttonLabel: { label: "Button label", type: "text", contentEditable: true },
      buttonUrl: { label: "Button URL", type: "text" },
      buttonOpenInNewTab: {
        label: "Button opens new tab",
        options: yesNoOptions,
        type: "radio",
      },
      position: {
        label: "Scroll behavior",
        options: [
          { label: "Sticky", value: "sticky" },
          { label: "Fixed", value: "fixed" },
          { label: "Static", value: "static" },
        ],
        type: "select",
      },
      top: { label: "Top offset", type: "text" },
      zIndex: { label: "Z index", type: "text" },
      align: { label: "Container alignment", options: alignOptions, type: "select" },
      justifyContent: {
        label: "Content spacing",
        options: flexJustifyOptions,
        type: "select",
      },
      maxWidth: { label: "Content max width", type: "text" },
      height: { label: "Height", type: "text" },
      paddingY: { label: "Padding Y", type: "text" },
      paddingX: { label: "Padding X", type: "text" },
      gap: { label: "Gap", type: "text" },
      backgroundColor: { label: "Background", type: "text" },
      textColor: { label: "Text color", type: "text" },
      linkColor: { label: "Link color", type: "text" },
      buttonBackgroundColor: { label: "Button background", type: "text" },
      buttonTextColor: { label: "Button text", type: "text" },
      borderColor: { label: "Border color", type: "text" },
      borderWidth: { label: "Border width", type: "text" },
      blur: { label: "Backdrop blur", options: yesNoOptions, type: "radio" },
      shadow: { label: "Shadow", options: shadowOptions, type: "select" },
      brandSize: { label: "Brand size", type: "text" },
      linkSize: { label: "Link size", type: "text" },
      buttonSize: { label: "Button size", type: "text" },
      buttonPaddingY: { label: "Button padding Y", type: "text" },
      buttonPaddingX: { label: "Button padding X", type: "text" },
    },
    defaultProps: {
      brand: "Portfolio",
      brandHref: "/",
      links: [
        { label: "Work", href: "#work", openInNewTab: false },
        { label: "About", href: "#about", openInNewTab: false },
        { label: "Contact", href: "#contact", openInNewTab: false },
      ],
      buttonLabel: "Resume",
      buttonUrl: "#",
      buttonOpenInNewTab: false,
      position: "sticky",
      top: 0,
      zIndex: 50,
      align: "center",
      justifyContent: "space-between",
      maxWidth: 1180,
      height: "auto",
      paddingY: 14,
      paddingX: 24,
      gap: 20,
      backgroundColor: "rgba(255, 255, 255, 0.88)",
      textColor: "#111827",
      linkColor: "#334155",
      buttonBackgroundColor: "#111827",
      buttonTextColor: "#ffffff",
      borderColor: "rgba(15, 23, 42, 0.1)",
      borderWidth: 1,
      blur: true,
      shadow: "soft",
      brandSize: 18,
      linkSize: 14,
      buttonSize: 14,
      buttonPaddingY: 10,
      buttonPaddingX: 14,
    },
    render: ({
      align = "center",
      backgroundColor = "rgba(255, 255, 255, 0.88)",
      blur = true,
      borderColor = "rgba(15, 23, 42, 0.1)",
      borderWidth = 1,
      brand = "Portfolio",
      brandHref = "/",
      brandSize = 18,
      buttonBackgroundColor = "#111827",
      buttonLabel = "Resume",
      buttonOpenInNewTab = false,
      buttonPaddingX = 14,
      buttonPaddingY = 10,
      buttonSize = 14,
      buttonTextColor = "#ffffff",
      buttonUrl = "#",
      gap = 20,
      height = "auto",
      justifyContent = "space-between",
      linkColor = "#334155",
      links = [],
      linkSize = 14,
      maxWidth = 1180,
      paddingX = 24,
      paddingY = 14,
      position = "sticky",
      shadow: shadowSize = "soft",
      textColor = "#111827",
      top = 0,
      zIndex = 50,
    }) => (
      <header
        className="pf-header"
        style={{
          ...marginInlineFromAlign(align),
          backgroundColor,
          borderBottom: `${px(borderWidth)} solid ${borderColor}`,
          boxShadow: shadow(shadowSize),
          color: textColor,
          height: px(height),
          position,
          top: position === "static" ? undefined : px(top),
          zIndex: parseNumber(zIndex, 50),
        }}
      >
        <div
          className="pf-header__inner"
          style={{
            backdropFilter: blur ? "blur(18px)" : undefined,
            gap: px(gap),
            justifyContent,
            maxWidth: px(maxWidth),
            padding: `${px(paddingY)} ${px(paddingX)}`,
          }}
        >
          <a
            className="pf-header__brand"
            href={brandHref || "#"}
            style={{ color: textColor, fontSize: px(brandSize) }}
          >
            {brand}
          </a>
          {links.length ? (
            <nav className="pf-header__nav" style={{ gap: px(gap) }}>
              {links.map((link, index) => (
                <a
                  className="pf-header__link"
                  href={link.href || "#"}
                  key={`${link.label}-${index}`}
                  rel={link.openInNewTab ? "noreferrer" : undefined}
                  style={{ color: linkColor, fontSize: px(linkSize) }}
                  target={link.openInNewTab ? "_blank" : undefined}
                >
                  {link.label || `Link ${index + 1}`}
                </a>
              ))}
            </nav>
          ) : null}
          {buttonLabel ? (
            <a
              className="pf-header__button"
              href={buttonUrl || "#"}
              rel={buttonOpenInNewTab ? "noreferrer" : undefined}
              style={{
                backgroundColor: buttonBackgroundColor,
                color: buttonTextColor,
                fontSize: px(buttonSize),
                padding: `${px(buttonPaddingY)} ${px(buttonPaddingX)}`,
              }}
              target={buttonOpenInNewTab ? "_blank" : undefined}
            >
              {buttonLabel}
            </a>
          ) : null}
        </div>
      </header>
    ),
  },

  Project: {
    label: "Project",
    fields: {
      title: { label: "Title", type: "text", contentEditable: true },
      type: { label: "Type", type: "text", contentEditable: true },
      name: { label: "Name", type: "text", contentEditable: true },
      buttonLabel: { label: "Button label", type: "text", contentEditable: true },
      buttonUrl: { label: "Button URL", type: "text" },
      openInNewTab: { label: "Open in new tab", options: yesNoOptions, type: "radio" },
      align: { label: "Alignment", options: alignOptions, type: "select" },
      typeAlign: { label: "Type alignment", options: alignOptions, type: "select" },
      titleAlign: { label: "Title alignment", options: alignOptions, type: "select" },
      nameAlign: { label: "Name alignment", options: alignOptions, type: "select" },
      buttonAlign: { label: "Button alignment", options: alignOptions, type: "select" },
      layout: {
        label: "Layout",
        options: [
          { label: "Stacked", value: "stacked" },
          { label: "Inline", value: "inline" },
        ],
        type: "select",
      },
      backgroundColor: { label: "Background", type: "text" },
      textColor: { label: "Text color", type: "text" },
      accentColor: { label: "Accent color", type: "text" },
      borderColor: { label: "Border color", type: "text" },
      borderWidth: { label: "Border width", type: "text" },
      borderRadius: { label: "Radius", type: "text" },
      padding: { label: "Padding", type: "text" },
      gap: { label: "Gap", type: "text" },
      maxWidth: { label: "Max width", type: "text" },
      titleSize: { label: "Title size", type: "text" },
      typeSize: { label: "Type size", type: "text" },
      nameSize: { label: "Name size", type: "text" },
      buttonSize: { label: "Button size", type: "text" },
      buttonPaddingY: { label: "Button padding Y", type: "text" },
      buttonPaddingX: { label: "Button padding X", type: "text" },
      buttonBackgroundColor: { label: "Button background", type: "text" },
      buttonTextColor: { label: "Button text", type: "text" },
      buttonBorderColor: { label: "Button border", type: "text" },
      shadow: { label: "Shadow", options: shadowOptions, type: "select" },
    },
    defaultProps: {
      title: "Selected work",
      type: "Case study",
      name: "Project name",
      buttonLabel: "View project",
      buttonUrl: "#",
      openInNewTab: false,
      align: "center",
      typeAlign: "left",
      titleAlign: "left",
      nameAlign: "left",
      buttonAlign: "left",
      layout: "stacked",
      backgroundColor: "#ffffff",
      textColor: "#111827",
      accentColor: "#2563eb",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      borderRadius: 18,
      padding: 28,
      gap: 14,
      maxWidth: 680,
      titleSize: 28,
      typeSize: 13,
      nameSize: 16,
      buttonSize: 15,
      buttonPaddingY: 12,
      buttonPaddingX: 18,
      buttonBackgroundColor: "#111827",
      buttonTextColor: "#ffffff",
      buttonBorderColor: "#111827",
      shadow: "soft",
    },
    render: ({
      accentColor = "#2563eb",
      align = "center",
      backgroundColor = "#ffffff",
      borderColor = "#e5e7eb",
      borderRadius = 18,
      borderWidth = 1,
      buttonBackgroundColor = "#111827",
      buttonBorderColor = "#111827",
      buttonLabel = "View project",
      buttonAlign = "left",
      buttonPaddingX = 18,
      buttonPaddingY = 12,
      buttonSize = 15,
      buttonTextColor = "#ffffff",
      buttonUrl = "#",
      gap = 14,
      layout = "stacked",
      maxWidth = 680,
      name = "Project name",
      nameAlign = "left",
      nameSize = 16,
      openInNewTab = false,
      shadow: shadowSize = "soft",
      textColor = "#111827",
      title = "Selected work",
      titleAlign = "left",
      titleSize = 28,
      type = "Case study",
      typeAlign = "left",
      typeSize = 13,
      padding = 28,
    }) => (
      <article
        className={
          layout === "inline" ? "pf-project pf-project--inline" : "pf-project"
        }
        style={{
          ...marginInlineFromAlign(align),
          backgroundColor,
          border: `${px(borderWidth)} solid ${borderColor}`,
          borderRadius: px(borderRadius),
          boxShadow: shadow(shadowSize),
          color: textColor,
          gap: px(gap),
          maxWidth: px(maxWidth),
          padding: px(padding),
        }}
      >
        <div className="pf-project__copy" style={{ gap: px(gap) }}>
          {type ? (
            <p
              className="pf-project__type"
              style={{
                color: accentColor,
                fontSize: px(typeSize),
                textAlign: typeAlign,
              }}
            >
              {type}
            </p>
          ) : null}
          {title ? (
            <h3
              className="pf-project__title"
              style={{ fontSize: px(titleSize), textAlign: titleAlign }}
            >
              {title}
            </h3>
          ) : null}
          {name ? (
            <p
              className="pf-project__name"
              style={{ fontSize: px(nameSize), textAlign: nameAlign }}
            >
              {name}
            </p>
          ) : null}
        </div>
        {buttonLabel ? (
          <div
            className="pf-project__button-wrap"
            style={{ justifyContent: justifyFromAlign(buttonAlign) }}
          >
            <a
              className="pf-project__button"
              href={buttonUrl || "#"}
              rel={openInNewTab ? "noreferrer" : undefined}
              style={{
                backgroundColor: buttonBackgroundColor,
                borderColor: buttonBorderColor,
                color: buttonTextColor,
                fontSize: px(buttonSize),
                padding: `${px(buttonPaddingY)} ${px(buttonPaddingX)}`,
              }}
              target={openInNewTab ? "_blank" : undefined}
            >
              {buttonLabel}
            </a>
          </div>
        ) : null}
      </article>
    ),
  },

  Card: {
    label: "Card",
    fields: {
      backgroundColor: { label: "Background", type: "text" },
      textColor: { label: "Text color", type: "text" },
      borderColor: { label: "Border color", type: "text" },
      borderWidth: { label: "Border width", type: "text" },
      borderRadius: { label: "Radius", type: "text" },
      shadow: { label: "Shadow", options: shadowOptions, type: "select" },
      padding: { label: "Padding", type: "text" },
      maxWidth: { label: "Max width", type: "text" },
      align: { label: "Alignment", options: alignOptions, type: "select" },
      content: { label: "Content", type: "slot" },
    },
    defaultProps: {
      backgroundColor: "#ffffff",
      textColor: "#111827",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      borderRadius: 18,
      shadow: "soft",
      padding: 28,
      maxWidth: 640,
      align: "left",
    },
    render: ({
      align = "left",
      backgroundColor = "#ffffff",
      borderColor = "#e5e7eb",
      borderRadius = 18,
      borderWidth = 1,
      content,
      maxWidth = 640,
      padding = 28,
      shadow: shadowSize = "soft",
      textColor = "#111827",
    }) => (
      <div
        className="pf-card"
        style={{
          ...marginInlineFromAlign(align),
          backgroundColor,
          border: `${px(borderWidth)} solid ${borderColor}`,
          borderRadius: px(borderRadius),
          boxShadow: shadow(shadowSize),
          color: textColor,
          maxWidth: px(maxWidth),
          padding: px(padding),
        }}
      >
        {typeof content === "function"
          ? content({ className: "pf-slot", minEmptyHeight: 80 })
          : null}
      </div>
    ),
  },

  Spacer: {
    label: "Spacer",
    fields: {
      height: { label: "Height", type: "text" },
      backgroundColor: { label: "Background", type: "text" },
    },
    defaultProps: {
      height: 48,
      backgroundColor: "transparent",
    },
    render: ({ backgroundColor = "transparent", height = 48 }) => (
      <div aria-hidden="true" style={{ backgroundColor, height: px(height) }} />
    ),
  },

  GalleryGrid: {
    label: "Gallery grid",
    fields: {
      images: {
        label: "Images",
        type: "array",
        arrayFields: {
          src: { label: "Image URL", type: "text" },
          alt: { label: "Alt text", type: "text" },
          caption: { label: "Caption", type: "text" },
          href: { label: "Link URL", type: "text" },
        },
        defaultItemProps: (index) => ({
          src: "",
          alt: "",
          caption: `Image ${index + 1}`,
          href: "",
        }),
        getItemSummary: (item, index) => item.caption || `Image ${(index ?? 0) + 1}`,
      },
      columns: { label: "Columns", type: "text" },
      gap: { label: "Gap", type: "text" },
      aspectRatio: { label: "Aspect ratio", options: aspectRatioOptions, type: "select" },
      objectFit: { label: "Object fit", options: objectFitOptions, type: "select" },
      borderRadius: { label: "Radius", type: "text" },
      shadow: { label: "Shadow", options: shadowOptions, type: "select" },
      captionColor: { label: "Caption color", type: "text" },
      captionSize: { label: "Caption size", type: "text" },
    },
    defaultProps: {
      images: [
        { src: "", alt: "", caption: "Project image", href: "" },
        { src: "", alt: "", caption: "Detail image", href: "" },
        { src: "", alt: "", caption: "Result image", href: "" },
      ],
      columns: 3,
      gap: 18,
      aspectRatio: "4 / 3",
      objectFit: "cover",
      borderRadius: 16,
      shadow: "soft",
      captionColor: "#475569",
      captionSize: 14,
    },
    render: ({
      aspectRatio: ratio = "4 / 3",
      borderRadius = 16,
      captionColor = "#475569",
      captionSize = 14,
      columns = 3,
      gap = 18,
      images = [],
      objectFit = "cover",
      shadow: shadowSize = "soft",
    }) => (
      <div
        className="pf-gallery"
        style={
          {
            "--pf-gallery-columns": Math.max(1, Math.round(parseNumber(columns, 3))),
            "--pf-gallery-gap": px(gap),
          } as StyleWithVars
        }
      >
        {(images.length ? images : [{ caption: "Image URL" }]).map((image, index) => (
          <figure className="pf-gallery__item" key={`${image.src}-${index}`}>
            <MaybeLink href={image.href}>
              <div
                className="pf-gallery__frame"
                style={{
                  aspectRatio: aspectRatio(ratio),
                  borderRadius: px(borderRadius),
                  boxShadow: shadow(shadowSize),
                }}
              >
                {image.src ? (
                  <img
                    alt={image.alt || image.caption || ""}
                    src={image.src}
                    style={{ objectFit }}
                  />
                ) : (
                  <MediaPlaceholder label="Image URL" />
                )}
              </div>
            </MaybeLink>
            {image.caption ? (
              <figcaption style={{ color: captionColor, fontSize: px(captionSize) }}>
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    ),
  },

  Embed: {
    label: "Embed",
    fields: {
      url: { label: "Embed URL", type: "text" },
      title: { label: "Title", type: "text" },
      height: { label: "Height", type: "text" },
      maxWidth: { label: "Max width", type: "text" },
      align: { label: "Alignment", options: alignOptions, type: "select" },
      borderRadius: { label: "Radius", type: "text" },
      borderWidth: { label: "Border width", type: "text" },
      borderColor: { label: "Border color", type: "text" },
      shadow: { label: "Shadow", options: shadowOptions, type: "select" },
      allowFullscreen: { label: "Allow fullscreen", options: yesNoOptions, type: "radio" },
    },
    defaultProps: {
      url: "",
      title: "Embedded content",
      height: 520,
      maxWidth: 980,
      align: "center",
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "#e5e7eb",
      shadow: "soft",
      allowFullscreen: true,
    },
    render: ({
      align = "center",
      allowFullscreen = true,
      borderColor = "#e5e7eb",
      borderRadius = 16,
      borderWidth = 1,
      height = 520,
      maxWidth = 980,
      shadow: shadowSize = "soft",
      title = "Embedded content",
      url,
    }) => (
      <div
        className="pf-embed"
        style={{
          ...marginInlineFromAlign(align),
          border: `${px(borderWidth)} solid ${borderColor}`,
          borderRadius: px(borderRadius),
          boxShadow: shadow(shadowSize),
          height: px(height),
          maxWidth: px(maxWidth),
        }}
      >
        {url ? (
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={allowFullscreen}
            src={url}
            title={title}
          />
        ) : (
          <MediaPlaceholder label="Embed URL" />
        )}
      </div>
    ),
  },

  VideoBlock: {
    label: "Video",
    fields: {
      src: { label: "Video URL", type: "text" },
      poster: { label: "Poster image", type: "text" },
      caption: { label: "Caption", type: "text" },
      controls: { label: "Controls", options: yesNoOptions, type: "radio" },
      autoplay: { label: "Autoplay", options: yesNoOptions, type: "radio" },
      muted: { label: "Muted", options: yesNoOptions, type: "radio" },
      loop: { label: "Loop", options: yesNoOptions, type: "radio" },
      align: { label: "Alignment", options: alignOptions, type: "select" },
      maxWidth: { label: "Max width", type: "text" },
      aspectRatio: { label: "Aspect ratio", options: aspectRatioOptions, type: "select" },
      objectFit: { label: "Object fit", options: objectFitOptions, type: "select" },
      borderRadius: { label: "Radius", type: "text" },
      shadow: { label: "Shadow", options: shadowOptions, type: "select" },
    },
    defaultProps: {
      src: "",
      poster: "",
      caption: "",
      controls: true,
      autoplay: false,
      muted: true,
      loop: false,
      align: "center",
      maxWidth: 980,
      aspectRatio: "16 / 9",
      objectFit: "cover",
      borderRadius: 16,
      shadow: "soft",
    },
    render: ({
      align = "center",
      aspectRatio: ratio = "16 / 9",
      autoplay = false,
      borderRadius = 16,
      caption,
      controls = true,
      loop = false,
      maxWidth = 980,
      muted = true,
      objectFit = "cover",
      poster,
      shadow: shadowSize = "soft",
      src,
    }) => (
      <figure
        className="pf-video"
        style={{ ...marginInlineFromAlign(align), maxWidth: px(maxWidth) }}
      >
        <div
          className="pf-video__frame"
          style={{
            aspectRatio: aspectRatio(ratio),
            borderRadius: px(borderRadius),
            boxShadow: shadow(shadowSize),
          }}
        >
          {src ? (
            <video
              autoPlay={autoplay && muted}
              controls={controls}
              loop={loop}
              muted={muted}
              playsInline
              poster={poster || undefined}
              src={src}
              style={{ objectFit }}
            />
          ) : (
            <MediaPlaceholder label="Video URL" />
          )}
        </div>
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
    ),
  },
};
