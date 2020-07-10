import React from 'react';
import './PeopleItem.scss';

const PeopleItem = ({ profile_path, name }) => {
  const base_url = 'https://image.tmdb.org/t/p/w300';

  return (
    <div className="people-item">
      <img
        className="people-item__img"
        src={
          profile_path === null
            ? 'https://journeypurebowlinggreen.com/wp-content/uploads/2018/05/placeholder-person.jpg'
            : base_url + profile_path
        }
        alt=""
      />
      <h1 className="people-item__title">{name}</h1>
    </div>
  );
};

export default PeopleItem;
