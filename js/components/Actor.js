import React, { PropTypes } from 'react';
import fecha from 'fecha';
import { getKind } from '../utils';

const Actor = (
  Name
) => (
  <span>
    {Name}
  </span>
);

Actor.propTypes = {
  Name: PropTypes.string
};

export default Actor;