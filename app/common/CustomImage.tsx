"use client";
import Image from "next/image";
import {
  CSSProperties,
  useMemo,
  useState,
} from "react";

const IMG_URL =
  process.env.NEXT_PUBLIC_BASE_IMAGE_URL || "";

const FALLBACK =
  "https://assets.webdads2u.com/images/1778042348274-image-not-found--1-.png";

interface CustomImageProps {
  src?: string | null;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

function CustomImage({
  src,
  alt = "image",
  className = "",
  style = {},
  width = 500,
  height = 500,
  fill = false,
  priority = false,
  sizes = "100vw",
  quality = 85,
}: CustomImageProps) {

  const finalSrc = useMemo(() => {
    if (
      typeof src !== "string" ||
      !src.trim()
    ) {
      return FALLBACK;
    }

    if (
      src.startsWith("http") ||
      src.startsWith("blob:") ||
      src.startsWith("data:")
    ) {
      return src;
    }

    return `${IMG_URL}${src}`;
  }, [src]);

  const [imgSrc, setImgSrc] =
    useState<string>(finalSrc);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      fill={fill}
      sizes={sizes}
      quality={quality}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      className={className}
      style={style}
      onError={() => {
        if (imgSrc !== FALLBACK) {
          setImgSrc(FALLBACK);
        }
      }}
    />
  );
}

export default CustomImage