import Image from "next/image";

export default function ResponsiveImage({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={800}
      style={{ width: "100%", height: "auto" }}
      priority
    />
  );
}