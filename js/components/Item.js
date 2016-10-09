import React, { PropTypes } from 'react';
import fecha from 'fecha';
import { getKind } from '../utils';
import Actor from './Actor';

const Item = ({
  Description,
  Director,
  Duration,
  Id,
  Name,
  Rank,
  Actors,
  Genres
}) => (
 <a
    className="ui card"
    href={ Name || Name }
    target="_blank" rel="noopener noreferrer"
  >
    <div className="image">
    </div>
    <div className="content">
      <div className="header">{Name || Name}</div>
      <div className="meta right floated">
        as
      </div>
      <div className="meta">
        {Actors}
      </div>
      <div className="description">
        {Name || Name}
      </div>
    </div>
    <div className="extra content">
      { typeof Actors !== "undefined" ? Actors.map((item, index) => ( <span key={index}>{item}</span> )) : null }
    </div>
  </a>
);

Item.propTypes = {
  Genres: PropTypes.array,
  Actors: PropTypes.array,
  Rank: PropTypes.number,
  Name: PropTypes.string,
  Id: PropTypes.number,
  Duration: PropTypes.string,
  Description: PropTypes.string,
  Director: PropTypes.string
};


export default Item;