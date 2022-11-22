import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';
import { LoadMore } from 'components/Button/Button';

export const ImageGallery = ({ dataBase, loadMoreClick }) => {
  return (
    dataBase && (
      <>
        <List>
          {dataBase.map(data => (
            <ImageGalleryItem key={data.id} data={data} />
          ))}
        </List>
        {dataBase.length >= 11 && <LoadMore buttonClick={loadMoreClick} />}
      </>
    )
  );
};
ImageGallery.propTypes = {
  dataBase: PropTypes.array.isRequired,
};
ImageGalleryItem.propTypes = {
  data: PropTypes.object.isRequired,
  showModal: PropTypes.bool,
};
LoadMore.propTypes = {
  buttonClick: PropTypes.func.isRequired,
};
