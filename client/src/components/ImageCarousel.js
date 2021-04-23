import { Carousel } from "react-bootstrap";

const ImageCarousel = ({ images, alt }) => {
  return (
    <Carousel pause="hover">
      {images &&
        images.map((image) => (
          <Carousel.Item key={image.public_id}>
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
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default ImageCarousel;
