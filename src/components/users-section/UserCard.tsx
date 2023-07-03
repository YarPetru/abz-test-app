import React from 'react';
import { Tooltip } from 'react-tooltip';

import userPicDefault from 'images/photo-cover.svg';
import s from './UserCard.module.scss';

interface IUserCard {
  name: string;
  email: string;
  phone: string;
  position: string;
  photo?: string;
}

const UserCard: React.FC<IUserCard> = ({
  name,
  email,
  phone,
  position,
  photo,
}) => {
  return (
    <div className={s.cardWrapper}>
      <img
        className={s.userPhoto}
        src={!!photo ? photo : userPicDefault}
        alt="user portret"
        width="70"
        height="70"
      />
      <p
        className={
          name.length > 28
            ? `${s.userDetails} ${s.userDetails__tip}`
            : `${s.userDetails}`
        }
        data-tooltip-id="tooltip"
        data-tooltip-content={name.length > 28 ? name : undefined}
      >
        {name.length > 28 ? `${name.slice(0, 25)}...` : name}
      </p>
      <div className={s.contactsWrapper}>
        <p
          className={
            position.length > 28
              ? `${s.userDetails} ${s.userDetails__tip}`
              : `${s.userDetails}`
          }
          data-tooltip-id="tooltip"
          data-tooltip-content={position.length > 28 ? position : undefined}
        >
          {position.length > 28 ? `${position.slice(0, 25)}...` : position}
        </p>
        <p
          className={
            email.length > 28
              ? `${s.userDetails} ${s.userDetails__tip}`
              : `${s.userDetails}`
          }
          data-tooltip-id="tooltip"
          data-tooltip-content={email.length > 28 ? email : undefined}
        >
          {email.length > 28 ? `${email.slice(0, 25)}...` : email}
        </p>
        <p className={s.userDetails}>{phone}</p>
      </div>
      <Tooltip id="tooltip" className={s.tooltip} place="bottom" noArrow />
    </div>
  );
};

export default UserCard;
