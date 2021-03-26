type PictureCellProps = {
  width?: string;
  alt?: string;
  src: string;
};

const PictureCell = (props: PictureCellProps) => <img width={props.width}
                                                      src={props.src}
                                                      alt={props.alt}/>;

PictureCell.defaultProps = {
  width: '50px',
  alt: 'Picture',
};

export default PictureCell;
