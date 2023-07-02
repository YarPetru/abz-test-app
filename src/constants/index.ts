import * as yup from 'yup';
import { INewUserData } from 'types';
import { resolutionCheck } from 'helpers/resolution-check';

export const BASE_URL =
  'https://frontend-test-assignment-api.abz.agency/api/v1/';

export const MAX_PHOTO_SIZE = 5242880;
export const MIN_PHOTO_WIDTH = 70;
export const MIN_PHOTO_HEIGHT = 70;

const emailRegEx =
  // eslint-disable-next-line
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

// eslint-disable-next-line
const phoneRegEx = /^[\+]{0,1}380([0-9]{9})$/;

export const validationSchema: yup.Schema<INewUserData> = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name is too short - should be 2 chars minimum')
    .max(60, 'Name is too long - no more than 60 chars')
    .required('Name is a required field'),
  email: yup
    .string()
    .min(2, 'Email is too short - should be 2 chars minimum')
    .max(100, 'Email is too long - no more than 60 chars')
    .email('Enter a valid email')
    .matches(emailRegEx, 'Email must be a valid according to RFC2822')
    .required('Email is a required field'),
  phone: yup
    .string()
    .matches(phoneRegEx, 'Phone should be 13 chars and start with +380')
    .required('Phone is a required field'),
  position_id: yup.number().integer().min(1).required('Choose the position'),
  photo: yup
    .mixed<File>()
    .test(
      'is-valid-filetype',
      'The photo format must be jpeg/jpg type',
      value =>
        value && value.type
          ? value.type.includes('image/jpeg') ||
            value.type.includes('image/jpg')
          : true
    )
    .test(
      'is-valid-size',
      'File size must not be greater than 5Mb',
      value => value && value.size <= MAX_PHOTO_SIZE
    )
    .test('is-valid-resolution', 'Minimum size of photo 70x70px', value =>
      resolutionCheck(value)
    )
    .required('Upload your photo please'),
});
