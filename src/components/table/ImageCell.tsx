type ImageCellProps = {
  width?: string;
  alt?: string;
  src: string;
};

const ImageCell = (props: ImageCellProps) => <img width={props.width} src={props.src} alt={props.alt} />;

ImageCell.defaultProps = {
  width: '50px',
  alt: 'Image',
};

export default ImageCell;
