import PropTypes from 'prop-types';
import { LoadMore } from './Button.styled';
export const Button = ({ onLoadMore, children }) => {
  return <LoadMore onClick={onLoadMore}>{children}</LoadMore>;
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};
