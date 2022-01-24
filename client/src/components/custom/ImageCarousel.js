import ImageGallery from "react-image-gallery";
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";

const ImageCarousel = ({ images }) => {
  const imagesForGallery = images.map((img) => ({
    original: img.url,
    originalAlt: img._id,
  }));

  return (
    <ImageGallery
      showFullscreenButton={false}
      showBullets={true}
      autoPlay={true}
      showPlayButton={true}
      items={imagesForGallery}
    />
  );
};

export default ImageCarousel;
