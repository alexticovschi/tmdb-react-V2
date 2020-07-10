import React from 'react';
import PeopleItem from '../PeopleItem/PeopleItem';
import './PeopleList.scss';

const PeopleList = ({ people }) => {
  return (
    <div className="people-list">
      {people.map((person) => (
        <PeopleItem profile_path={person.profile_path} name={person.name} />
      ))}
    </div>
  );
};

export default PeopleList;
