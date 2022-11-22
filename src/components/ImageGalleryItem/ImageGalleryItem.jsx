import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ data }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Item>
      <Image onClick={toggleModal} src={data.webformatURL} alt="" />
      {showModal === true && (
        <Modal onClose={toggleModal}>
          <img src={data.largeImageURL} alt={data.tags} width="100%" />
        </Modal>
      )}
    </Item>
  );
};
Image.propTypes = {
  onClick: PropTypes.func.isRequired,
};
