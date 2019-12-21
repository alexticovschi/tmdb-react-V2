import React from 'react';
import Button from '../../Button/Button';

import './buttons.scss';

const Buttons = () => {
  return (
    <section className='buttons'>
      <div className='buttons__inner'>
        <Button name='Popular' path={`/tv-shows/popular`} />
        <Button name='Airing Today' path={`/tv-shows/airing-today`} />
        <Button name='Top Rated' path={`/tv-shows/top-rated`} />
        <Button name='On The Air' path={`/tv-shows/now-on-the-air`} />
      </div>
    </section>
  );
};

export default Buttons;
