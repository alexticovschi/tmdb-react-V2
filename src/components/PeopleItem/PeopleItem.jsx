import React from 'react';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

import './PeopleItem.scss';

const PeopleItem = ({ profile_path, name, id }) => {
  const base_url = 'https://image.tmdb.org/t/p/w300';

  return (
    <Link to={`/person/${id}`}>
      <div className="people-item">
        <Fade>
          <img
            className="people-item__img"
            src={
              profile_path === null
                ? 'https://journeypurebowlinggreen.com/wp-content/uploads/2018/05/placeholder-person.jpg'
                : base_url + profile_path
            }
            alt=""
          />
        </Fade>

        <h1 className="people-item__title">{name}</h1>
      </div>
    </Link>
  );
};

export default PeopleItem;
