import type { CSSProperties, ReactNode } from "react";
import styles from "./MediaFrame.module.css";

export type MediaCrop = {
  scale: number;
  positionX: number;
  positionY: number;
};

type CropStyle = CSSProperties & {
  "--media-aspect": string;
  "--media-scale-desktop": number;
  "--media-x-desktop": string;
  "--media-y-desktop": string;
  "--media-scale-mobile": number;
  "--media-x-mobile": string;
  "--media-y-mobile": string;
};

type MediaFrameProps = {
  desktop: MediaCrop;
  mobile: MediaCrop;
  aspectRatio: string;
  children: ReactNode;
  className?: string;
};

export default function MediaFrame({ desktop, mobile, aspectRatio, children, className }: MediaFrameProps) {
  const style: CropStyle = {
    "--media-aspect": aspectRatio,
    "--media-scale-desktop": desktop.scale,
    "--media-x-desktop": `${desktop.positionX}px`,
    "--media-y-desktop": `${desktop.positionY}px`,
    "--media-scale-mobile": mobile.scale,
    "--media-x-mobile": `${mobile.positionX}px`,
    "--media-y-mobile": `${mobile.positionY}px`,
  };

  return (
    <div className={[styles.frame, className].filter(Boolean).join(" ")} style={style}>
      <div className={styles.media}>{children}</div>
    </div>
  );
}
