type ImageCellProps = {
  width?: string;
  alt?: string;
  src: string;
};

const ImageCell = ({ width, alt, src }: ImageCellProps) => <img width={width} src={src} alt={alt} />;

export default ImageCell;
