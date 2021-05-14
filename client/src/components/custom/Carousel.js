import Carousel from "react-material-ui-carousel";

const ImageCarousel = ({ images, alt }) => {
  return (
    <Carousel
      autoPlay={true}
      animation={"slide"}
      indicators={true}
      timeout={300}
      navButtonsAlwaysVisible={true}
    >
      {images &&
        images.map((image, index) => (
          <img
            style={{
              objectFit: "contain",
              maxWidth: "100%",
              display: "block",
              margin: " auto",
            }}
            src={image.url}
            alt={alt}
          />
        ))}
    </Carousel>
  );
};

export default ImageCarousel;
