import { MIN_PHOTO_HEIGHT, MIN_PHOTO_WIDTH } from '../constants';

export const resolutionCheck = async (
  value: File | undefined
): Promise<boolean> => {
  if (!value) {
    return true;
  }

  return new Promise<boolean>((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(value);

    image.onload = function () {
      if (
        image.naturalWidth >= MIN_PHOTO_WIDTH &&
        image.naturalHeight >= MIN_PHOTO_HEIGHT
      ) {
        resolve(true);
      } else {
        resolve(false);
      }
      URL.revokeObjectURL(objectUrl);
    };

    image.onerror = function () {
      resolve(false);
      URL.revokeObjectURL(objectUrl);
    };

    image.src = objectUrl;
  });
};
