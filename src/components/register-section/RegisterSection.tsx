import React from 'react';
import Container from 'components/container';
import RegisterForm from './RegisterForm';

import SuccessMessage from './SuccessMessage';
import s from './RegisterSection.module.scss';
import { useAppSelector } from 'hooks/redux-hooks';
import { getSuccessAdding } from 'store/users';

const RegisterSection: React.FC = () => {
  const isSuccess = useAppSelector(getSuccessAdding);

  return (
    <section id="signup" className={s.registerSection}>
      <Container>
        {!isSuccess ? <RegisterForm /> : <SuccessMessage />}
      </Container>
    </section>
  );
};

export default RegisterSection;
