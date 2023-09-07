import { useState, useEffect } from 'react';

import Notiflix from 'notiflix';

import { Searchbar } from 'components/Searchbar/Searchbar.js';

import { Button } from 'components/Button/Button.js';

import { Modal } from 'components/Modal/Modal.js';

import { Div } from './PicturesSearchStyles.js';

import { ImageGallery } from 'components/ImageGallery/ImageGallery.js';

import { Loader } from 'components/Loader/Loader.js';

import { getPicturesGallery } from 'api/search.js';

let largeImage;
let largeTags;

const PicturesSearch = () => {
  const [data, setData] = useState({
    pictures: [],
    q: '',
    page: 1,
    show: false,
    showButton: false,
    isLoading: false,
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
          showButton: pageNumber < Math.ceil(pictureLength / 12),
          isLoading: false,
        }));
      })
      .catch(error => {
        console.log(error);
      });
  }, [data.q, data.page]);

  const handleSubmit = evt => {
    evt.preventDefault();

    setData(prev => ({
      ...prev,
      pictures: [],
      q: evt.target[1].value.trim(),
      page: 1,
      showButton: false,
      isLoading: true,
    }));
  };

  const handleChangePage = e => {
    setData(prev => ({
      ...prev,
      page: prev.page + 1,
      showButton: false,
      isLoading: true,
    }));

    window.scrollTo({
      top: data.page * document.documentElement.clientHeight,
      left: 0,
      behavior: 'smooth',
    });
  };

  const showModal = e => {
    setData(prev => ({
      ...prev,
      show: true,
    }));

    largeImage = data.pictures.find(
      picture => picture.webformatURL === e.target.src
    ).largeImageURL;

    largeTags = data.pictures.find(
      picture => picture.webformatURL === e.target.src
    ).tags;
  };

  const showOverlay = () => {
    setData(prev => ({
      ...prev,
      show: false,
    }));
  };

  const handleModalView = e => {
    if (e.key === 'Escape') {
      setData(prev => ({ ...prev, show: false }));
    }
  };

  return (
    <Div>
      <Searchbar valueSubmit={handleSubmit} />
      {!data.isLoading ? (
        <ImageGallery viewModal={showModal} photos={data.pictures} />
      ) : (
        <Loader />
      )}

      {data.showButton && <Button changePage={handleChangePage} />}
      {useEffect(() => {
        if (data.show) {
          document.addEventListener('keydown', handleModalView);
        } else {
          document.removeEventListener('keydown', handleModalView);
        }
      }, [data.show])}
      {data.show && (
        <Modal
          hideModal={showOverlay}
          largeImageURL={largeImage}
          title={largeTags}
        />
      )}
    </Div>
  );
};

export { PicturesSearch };
