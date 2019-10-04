import React from "react";

import "./profileInfo.scss";

const ProfileInfo = ({ person, base_url }) => {
  console.log(person.profile_path);

  return (
    <section className="person">
      <div className="person__img-box">
        <img
          className="person__img"
          src={
            person.profile_path === null
              ? "https://journeypurebowlinggreen.com/wp-content/uploads/2018/05/placeholder-person.jpg"
              : base_url + person.profile_path
          }
          alt={"person profile"}
        />
      </div>
      <div className="person__profile-box">
        <h1 className="person__name">{person.name}</h1>

        <p className="person__fact">
          <span>Known For: </span>
          {person.known_for_department}
        </p>
        <p className="person__fact">
          <span>Gender: </span>
          {person.gender === 1 ? "Female" : "Male"}
        </p>
        <p className="person__fact">
          <span>Birthday: </span>
          {person.birthday}
        </p>
        <p className="person__fact">
          <span>Place of Birth: </span>
          {person.place_of_birth}
        </p>
        {person.homepage ? (
          <p className="person__fact">
            <span>Official Site: </span>
            <a href={person.homepage} target="_blank">{person.homepage}</a>
          </p>
        ) : null}
      </div>
    </section>
  );
};

export default ProfileInfo;
