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
      {images.map((image) => (
        <img
          key={image._id}
          style={{
            objectFit: "contain",
            maxHeight: "80vh",
            height: "100%",
            maxWidth: "100%",
            width: "100%",
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
