import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
export const ImageGallery = ({ images, сlick }) => {
  return (
    <Gallery>
      {images.map(image => (
        <ImageGalleryItem key={image.id} onClick={сlick} image={image} />
      ))}
    </Gallery>
  );
};




ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
