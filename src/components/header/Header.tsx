import React from 'react';

import { ReactComponent as Logo } from 'images/logo.svg';
import Container from 'components/container';
import s from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header id="header" className={s.header}>
      <Container>
        <nav className={s.header__navigation}>
          <a href="/" className={s.header__logoLink}>
            <Logo className={s.header__logo} />
          </a>
          <div className={s.linkWrapper}>
            <a href="#users" className={s.header__link}>
              Users
            </a>
            <a href="#signup" className={s.header__link}>
              Sign up
            </a>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
