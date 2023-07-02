import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';

import s from './UsersList.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { fetchUsers, getFetchedUsers, getCurrentUsers } from 'store/users';
import { setCurrentUsers } from 'store/users/users-slice';
import Preloader from 'components/common/Preloader';

const UsersList: React.FC = () => {
  const dispatch = useAppDispatch();

  const { data, isLoading, fetchingError } = useAppSelector(getFetchedUsers);
  const currentUsers = useAppSelector(getCurrentUsers);

  const currentPage = data?.page;
  const totalPages = data?.total_pages;
  const totalUsers = data?.total_users;
  const currentUsersNumber = currentUsers.length;

  const [count, setCount] = useState<number>(6);

  const handleShowMoreClick = async () => {
    if (totalPages && currentPage! < totalPages - 1) {
      await dispatch(fetchUsers({ page: currentPage! + 1, count }));
    } else if (totalPages && currentPage! === totalPages - 1) {
      const remainingUsers = totalUsers! - currentUsersNumber;
      setCount(remainingUsers > count ? count : remainingUsers);
      await dispatch(fetchUsers({ page: currentPage! + 1, count }));
    } else return null;
  };

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, count: count }));
  }, [dispatch, count]);

  useEffect(() => {
    if (data?.users?.length) {
      if (currentPage === 1) {
        dispatch(setCurrentUsers(data.users));
      } else {
        const newUsers = data.users.filter(
          user => !currentUsers.some(u => u.id === user.id)
        );
        if (newUsers.length > 0) {
          dispatch(setCurrentUsers([...currentUsers, ...newUsers]));
        }
      }
    }
  }, [data?.users, currentPage, dispatch, currentUsers, currentUsersNumber]);

  let renderedUsers;

  if (isLoading && currentUsersNumber === 0) {
    renderedUsers = <Preloader />;
  } else if (fetchingError) {
    renderedUsers = <h2>Something went wrong...{fetchingError}</h2>;
  } else if (data) {
    renderedUsers = currentUsers?.map(user => (
      <UserCard
        key={user.id}
        name={user.name}
        email={user.email}
        phone={user.phone}
        position={user.position}
        photo={user.photo}
      />
    ));
  }

  return (
    <>
      {data?.users?.length !== 0 && (
        <div className={s.usersListWrapper}>
          <ul className={s.usersList}>{renderedUsers}</ul>
          {currentPage !== totalPages && totalUsers! > currentUsersNumber ? (
            <button className={s.users__button} onClick={handleShowMoreClick}>
              Show more
            </button>
          ) : null}
        </div>
      )}
    </>
  );
};

export default UsersList;
