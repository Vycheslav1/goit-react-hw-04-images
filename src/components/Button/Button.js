import PropTypes from 'prop-types';

import { Load, ButtonWrapper } from './ButtonStyles.js';

const Button = ({ changePage }) => (
  <ButtonWrapper>
    <Load
      type="button"
      onClick={() => {
        changePage(prev => ({ ...prev, page: prev.page + 1 }));
        changePage(prev => ({ ...prev, showButton: false }));
        changePage(prev => ({ ...prev, isLoading: true }));
      }}
    >
      Load more
    </Load>
  </ButtonWrapper>
);
export { Button };

Button.propTypes = {
  changePage: PropTypes.func.isRequired,
};
