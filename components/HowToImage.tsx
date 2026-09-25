type Props = {
  src: string;
  alt: string;
  className: 'step-image' | 'guide-step-image';
  width: number;
  height: number;
};

export default function HowToImage({ src, alt, className, width, height }: Props) {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
    />
  );
}
