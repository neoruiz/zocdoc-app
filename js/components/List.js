import React, { PropTypes } from 'react';
import Item from './Item';

const List = ({ movieList, movieListCount }) => (
  <div className="ui link cards">
    { movieListCount > 0 ? movieList.map((item, index) => <Item key={index} {...item} />) : null }
  </div>
);

List.propTypes = {
  movieList: PropTypes.array,
  movieListCount: PropTypes.number
};

export default List;
