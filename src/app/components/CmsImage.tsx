import Image, { type ImageProps } from "next/image";

/**
 * next/image for pictures whose address comes from the CMS.
 * Local files and Cloudinary uploads are optimised; any other web address
 * (pasted manually in the CMS) is shown as-is instead of crashing the page.
 */
export default function CmsImage(props: ImageProps) {
  const src = typeof props.src === "string" ? props.src : "";
  const optimisable = !src || src.startsWith("/") || src.startsWith("https://res.cloudinary.com/");
  return <Image {...props} unoptimized={props.unoptimized ?? !optimisable} alt={props.alt} />;
}
