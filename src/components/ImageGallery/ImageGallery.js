import PropTypes from 'prop-types';

import { PicturesList } from './ImageGalleryStyles.js';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem.js';

const ImageGallery = ({ viewModal, addListener, photos }) => (
  <>
    <PicturesList
      onClick={e => {
        viewModal(prev => ({ ...prev, show: true }));
        document.addEventListener('keydown', addListener);
        let largeImage = photos.find(
          photo => photo.webformatURL === e.target.src
        ).largeImageURL;

        let largeTags = photos.find(
          photo => photo.webformatURL === e.target.src
        ).tags;
        viewModal(prev => ({ ...prev, largeImageURL: largeImage }));
        viewModal(prev => ({ ...prev, tags: largeTags }));
      }}
    >
      {photos.map(photo => ImageGalleryItem(photo))}
    </PicturesList>
  </>
);

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      collections: PropTypes.number,
      comments: PropTypes.number,
      downloads: PropTypes.number,
      id: PropTypes.number.isRequired,
      imageHeight: PropTypes.number,
      imageSize: PropTypes.number,
      imageWidth: PropTypes.number,
      largeImageURL: PropTypes.string.isRequired,
      likes: PropTypes.number,
      pageURL: PropTypes.string,
      previewHeight: PropTypes.number,
      previewURL: PropTypes.string,
      previewWidth: PropTypes.number,
      tags: PropTypes.string.isRequired,
      type: PropTypes.string,
      user: PropTypes.string,
      userImageURL: PropTypes.string,
      user_id: PropTypes.number,
      views: PropTypes.number,
      webformatHeight: PropTypes.number,
      webformatURL: PropTypes.string.isRequired,
      webformatWidth: PropTypes.number,
    })
  ),
  viewModal: PropTypes.func.isRequired,
  addListener: PropTypes.func.isRequired,
};

export { ImageGallery };
