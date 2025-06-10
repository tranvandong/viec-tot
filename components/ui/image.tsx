import { dataProvider } from "@/providers/dataProvider";
import Image, { ImageLoaderProps, ImageProps } from "next/image";
import { FC } from "react";

interface IImageProps extends Omit<ImageProps, "src"> {
  filePath?: string;
  srcDefault?: string;
}

const IImage: FC<IImageProps> = ({ filePath, srcDefault, ...rest }) => {
  const src = filePath
    ? dataProvider.getSource(filePath)
    : srcDefault || "/placeholder.svg";
  return <Image {...rest} src={src} />;
};

export default IImage;
