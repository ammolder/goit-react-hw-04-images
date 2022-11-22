import { useState } from 'react';
import PropTypes from 'prop-types';
import { RiSearch2Line } from 'react-icons/ri';
import { Header, Form, Input, Submit, Label } from './Searchbar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [imageSearch, seaImageSearch] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (imageSearch.trim() === '') {
      return alert(`No pictures were found for the name ${imageSearch}.`);
    }
    onSubmit(imageSearch);
    seaImageSearch({ imageSearch: '' });
  };

  const handleImageChange = e => {
    seaImageSearch(e.currentTarget.value.toLowerCase());
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Submit type="submit">
          <Label>
            <RiSearch2Line />
          </Label>
        </Submit>
        <Input
          type="text"
          name="imageSearch"
          value={imageSearch}
          onChange={handleImageChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func,
};
