import { Header, Form, Button, Span, Input } from './SearchbarStyles.js';

import PropTypes from 'prop-types';

import { nanoid } from 'nanoid';

const inputId = nanoid();

const Searchbar = ({ valueSubmit }) => (
  <Header>
    <Form
      onSubmit={evt => {
        evt.preventDefault();
        valueSubmit(prev => ({
          ...prev,
          pictures: prev.pictures.splice(0, prev.pictures.length),
        }));
        valueSubmit(prev => ({ ...prev, q: evt.target[1].value.trim() }));
        valueSubmit(prev => ({ ...prev, page: 1 }));
        valueSubmit(prev => ({ ...prev, showButton: false }));
        valueSubmit(prev => ({ ...prev, isLoading: true }));
      }}
    >
      <Button type="submit">
        <Span>Search</Span>
      </Button>

      <Input
        type="text"
        id={inputId}
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </Form>
  </Header>
);

export { Searchbar };

Searchbar.propTypes = {
  valueSubmit: PropTypes.func.isRequired,
};
