import { sidebarLinks } from '@/constants';
import { useUserContext } from '@/context/AuthContext';
import { useLogoutAccount } from '@/lib/appwrite/queriesAndMutations';
import { INavLink } from '@/types';
import { useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const LeftSideBar = () => {
  const { mutate: logout, isSuccess } = useLogoutAccount();
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link className='flex gap-3 items-center' to='/'>
          <img src='/assets/images/logo.svg' alt='logo' width={170} height={36} />
        </Link>
        <Link className='flex gap-3 items-center' to={`/profile/${user.id}`}>
          <img
            className='h-14 w-14 rounded-full'
            src={user.imageURL || '/assets/icons/profile-placeholder.svg'}
            alt='profile'
          />
          <div className='flex flex-col'>
            <p className='body-bold'>{user.name}</p>
            <p className='small-regular text-light-3'>@{user.username}</p>
          </div>
        </Link>
        <ul className='flex flex-col gap-6'>
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`} key={link.label}>
                <NavLink className='flex gap-4 items-center p-4' to={link.route}>
                  <img
                    className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                    src={link.imageURL}
                    alt={link.label}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button className='shad-button_ghost' variant='ghost' onClick={() => logout()}>
        <img src='/assets/icons/logout.svg' alt='logout' />
        <p className='small-medium lg:base-medium'>Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSideBar;
