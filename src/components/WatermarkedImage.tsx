import watermarkLogo from "@/assets/casavostra-logo.png";
import { cn } from "@/lib/utils";

interface WatermarkedImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Renders an image with a CASAVOSTRA watermark overlaid in the bottom-right corner.
 * The watermark is applied as a separate <img> so the original asset is never modified.
 * Right-click and drag are disabled to make downloading less convenient.
 */
const WatermarkedImage = ({ src, alt, className }: WatermarkedImageProps) => {
  const handleContextMenu = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
  };

  const handleDragStart = (event: React.DragEvent<HTMLImageElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={cn(
          "no-save-image",
          className,
        )}
        onContextMenu={handleContextMenu}
        draggable={false}
        onDragStart={handleDragStart}
      />
      <img
        src={watermarkLogo}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 m-auto w-16 md:w-20 lg:w-24 opacity-50"
      />
    </>
  );
};

export default WatermarkedImage;


