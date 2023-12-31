import React from 'react';

import Heading from 'components/common/Heading';
import s from './Hero.module.scss';

const Hero: React.FC = () => {
  return (
    <section className={s.hero}>
      <div className={s.hero__bg}>
        <div className={s.hero__contentWrapper}>
          <Heading>Test assignment for front-end developer</Heading>
          <p className={s.hero__text}>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
          <button className={s.hero__btn}>Sign up</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
