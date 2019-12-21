import React from 'react';
import Button from '../../Button/Button';

import './buttons.scss';

const Buttons = () => {
  return (
    <section className='buttons'>
      <div className='buttons__inner'>
        <Button name='Top Rated' path={`/movies/top-rated`} />
        <Button name='Popular' path={`/movies/popular`} />
        <Button name='Now Playing' path={`/movies/now-playing`} />
      </div>
    </section>
  );
};

export default Buttons;
