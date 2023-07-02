import React from 'react';

import s from './Preloader.module.scss';
import { ReactComponent as PreloaderImg } from 'images/preloader.svg';

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
