import { useState, useEffect } from 'react';

import Notiflix from 'notiflix';

import { Searchbar } from 'components/Searchbar/Searchbar.js';

import { Button } from 'components/Button/Button.js';

import { Modal } from 'components/Modal/Modal.js';

import { Div } from './PicturesSearchStyles.js';

import { ImageGallery } from 'components/ImageGallery/ImageGallery.js';

import { Loader } from 'components/Loader/Loader.js';

import { getPicturesGallery } from 'api/search.js';

const PicturesSearch = () => {
  const [data, setData] = useState({
    pictures: [],
    q: '',
    page: 1,
    show: false,
    showButton: false,
    isLoading: false,
    largeImageURL: '',
    tags: '',
  });

  useEffect(() => {
    if (!data.q) return;

    getPicturesGallery(data.q, data.page)
      .then(response => {
        if (response.data.totalHits === 0) {
          Notiflix.Notify.info(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        let pictureLength = response.data.totalHits;
        let pageNumber = data.page;

        setData(prev => ({
          ...prev,
          pictures: [...prev.pictures, ...response.data.hits],
        }));
        setData(prev => ({
          ...prev,
          showButton: pageNumber < Math.ceil(pictureLength / 12),
        }));

        setData(prev => ({ ...prev, isLoading: false }));
      })
      .catch(error => {
        console.log(error);
      });
  }, [data.q, data.page]);

  useEffect(() => {
    document.removeEventListener('keydown', handleModalView);
  }, [data.show]);

  const handleModalView = e => {
    if (e.key === 'Escape') {
      setData(prev => ({ ...prev, show: false }));
    }
  };

  return (
    <Div>
      <Searchbar valueSubmit={setData} />
      {!data.isLoading ? (
        <ImageGallery
          viewModal={setData}
          addListener={handleModalView}
          photos={data.pictures}
        />
      ) : (
        <Loader />
      )}
      {data.showButton && <Button changePage={setData} />}
      {data.show && (
        <Modal
          hideModal={setData}
          largeImageURL={data.largeImageURL}
          title={data.tags}
        />
      )}
    </Div>
  );
};

export { PicturesSearch };
