import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useLogoutAccount } from '@/lib/appwrite/queriesAndMutations';
import { useUserContext } from '@/context/AuthContext';

const TopBar = () => {
  const { mutate: logout, isSuccess } = useLogoutAccount();
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className='topbar'>
      <div className='flex-between py-4 px-5'>
        <Link className='flex gap-3 items-center' to='/'>
          <img src='/assets/images/logo.svg' alt='logo' width={130} height={325} />
        </Link>
        <div className='flex gap-4'>
          <Button className='shad-button_ghost' variant='ghost' onClick={() => logout()}>
            <img src='/assets/icons/logout.svg' alt='logout' />
          </Button>
          <Link className='flex-center gap-3' to={`/profile/${user.id}`}>
            <img
              className='h-8 w-8 rounded-full'
              src={user.imageURL || '/assets/images/profile-placeholder.svg'}
              alt='avatar'
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
