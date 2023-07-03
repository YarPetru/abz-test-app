import React from 'react';

import { ReactComponent as PreloaderImg } from 'images/preloader.svg';
import s from './Preloader.module.scss';

const Preloader: React.FC = () => {
  return (
    <div className={s.preloaderWrapper}>
      <div className={s.preloader}>
        <PreloaderImg />
      </div>
    </div>
  );
};

export default Preloader;
