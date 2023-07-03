import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage, Field, FormikHelpers } from 'formik';
import Heading from 'components/common/Heading';
import Preloader from 'components/common/Preloader';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { fetchPositions, getPositions } from 'store/positions';
import { fetchToken, getToken } from 'store/token';
import { addUser, fetchUsers, getFetchedUsers } from 'store/users';
import { setCurrentUsers } from 'store/users/users-slice';
import { validationSchema } from '../../constants';
import { INewUserData } from 'types';
import s from './RegisterForm.module.scss';

const initialValues: INewUserData = {
  name: '',
  email: '',
  phone: '',
  position_id: 0,
  photo: undefined,
};

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [uploadedFileName, setUploadedFileName] = useState<string>('');

  const { data: positions, isLoading, error } = useAppSelector(getPositions);
  const { registerError } = useAppSelector(getFetchedUsers);
  const token = useAppSelector(getToken);

  const handleSubmit = async (
    values: INewUserData,
    actions: FormikHelpers<INewUserData>
  ) => {
    const user = { ...values, position_id: Number(values.position_id) };
    await dispatch(addUser({ body: user, token: token || '' }));

    if (registerError === null) {
      dispatch(setCurrentUsers([]));
      await dispatch(fetchUsers({ page: 1, count: 6 }));
      actions.resetForm();
    }
  };

  const onPhotoInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    if (e.target.files) {
      setFieldValue('photo', e.target.files[0]);
      setUploadedFileName(e.target.files[0].name);
    }
  };

  let renderedPositions: React.ReactNode;

  if (isLoading) {
    renderedPositions = <Preloader />;
  } else if (error) {
    renderedPositions = <h2>{error}</h2>;
  } else if (positions) {
    renderedPositions = positions?.map(position => {
      return (
        <label htmlFor={position.name} key={position.id}>
          <Field
            className={s.defaultRadio}
            type="radio"
            name="position_id"
            value={String(position.id)}
            id={position.name}
          />
          {position.name}
        </label>
      );
    });
  }

  useEffect(() => {
    dispatch(fetchPositions());
    dispatch(fetchToken());
  }, [dispatch, registerError]);

  return (
    <>
      <Heading>Working with POST request</Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, touched, setFieldValue, errors, values }) => {
          return (
            <Form name="RegisterForm" className={s.form}>
              <div className={s.fieldsWrapper}>
                <Field
                  className={
                    (!touched && errors.name) || (touched && !errors.name)
                      ? `${s.field}`
                      : `${s.field} ${s.field__invalid}`
                  }
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="off"
                />
                <label
                  className={
                    !errors.name
                      ? `${s.label}`
                      : `${s.label} ${s.label__invalid}`
                  }
                  htmlFor="name"
                >
                  Your name
                </label>
                <ErrorMessage
                  name="name"
                  component="div"
                  className={s.validationError}
                />
              </div>

              <div className={s.fieldsWrapper}>
                <Field
                  className={
                    (!touched && errors.email) || (touched && !errors.email)
                      ? `${s.field}`
                      : `${s.field} ${s.field__invalid}`
                  }
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Email"
                  autoComplete="off"
                />
                <label
                  className={
                    !errors.email
                      ? `${s.label}`
                      : `${s.label} ${s.label__invalid}`
                  }
                  htmlFor="email"
                >
                  Email
                </label>
                <ErrorMessage
                  name="email"
                  component="div"
                  className={s.validationError}
                />
              </div>

              <div className={s.fieldsWrapper}>
                <Field
                  className={
                    (!touched && errors.phone) || (touched && !errors.phone)
                      ? `${s.field}`
                      : `${s.field} ${s.field__invalid}`
                  }
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Phone"
                  autoComplete="off"
                />
                <label
                  className={
                    !errors.phone
                      ? `${s.label}`
                      : `${s.label} ${s.label__invalid}`
                  }
                  htmlFor="phone"
                >
                  Phone
                </label>
                {!errors.phone && (
                  <div className={s.phoneMask}>+38 (XXX) XXX - XX - XX</div>
                )}

                <ErrorMessage
                  name="phone"
                  component="div"
                  className={s.validationError}
                />
              </div>

              <div className={`${s.fieldsWrapper} ${s.selectWrapper}`}>
                <div id="positions-group" className={s.selectLabel}>
                  Select your position
                </div>
                <div
                  className={s.radioBtnsWrapper}
                  role="group"
                  aria-labelledby="positions-group"
                >
                  {renderedPositions}
                </div>

                <ErrorMessage
                  name="position_id"
                  component="div"
                  className={s.validationError}
                />
              </div>

              <div className={s.fieldsWrapper}>
                <Field
                  value={undefined}
                  className={s.field}
                  name="photo"
                  id="photo"
                  type="file"
                  accept="image/jpeg, image/jpg"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onPhotoInputChange(e, setFieldValue)
                  }
                  hidden
                />
                <label
                  className={
                    !errors.photo
                      ? `${s.customFileLoader}`
                      : `${s.customFileLoader} ${s.customFileLoader__invalid}`
                  }
                  htmlFor="photo"
                >
                  <div
                    className={
                      !errors.photo
                        ? `${s.customFileLoader__fakeBtn}`
                        : `${s.customFileLoader__fakeBtn} ${s.customFileLoader__fakeBtnInvalid}`
                    }
                  >
                    Upload
                  </div>
                  <div
                    className={
                      !errors.photo
                        ? `${s.customFileLoader__fakePlaceholder}`
                        : `${s.customFileLoader__fakePlaceholder} ${s.customFileLoader__fakePlaceholderInvalid}`
                    }
                  >
                    {!errors.photo && !!values.photo
                      ? `Photo "${uploadedFileName.slice(0, 7)}..." uploaded`
                      : errors.photo
                      ? `${errors.photo}`
                      : 'Upload your photo'}
                  </div>
                </label>

                <ErrorMessage
                  name="photo"
                  component="div"
                  className={s.validationError}
                />
              </div>

              <button
                type="submit"
                disabled={
                  (!touched.email &&
                    !touched.name &&
                    !touched.phone &&
                    !touched.photo) ||
                  !isValid
                }
                className={s.submitBtn}
              >
                Sign up
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default RegisterForm;
