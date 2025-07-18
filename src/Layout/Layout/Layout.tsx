import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';
import type { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, UserActions } from '../../store/user.slice';
import { useEffect } from 'react';

export const Lauoyt = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector((s: RootState) => s.user.profile)

    const logout = () => {
        dispatch(UserActions.logout());
        navigate('/auth/login');
    }

    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch])

    return (
        <div className={styles.layout}>
            <div className={styles.sidebar}>
                <div className={styles.user}>
                    <img className={styles.avatar} src="/user-icon.png" alt="Аватар пользователя" />
                    <div className={styles.name}>{profile?.name}</div>
                    <div className={styles.email}>{profile?.email}</div>
                </div>
                <div className={styles.menu}>
                    <NavLink to='/' className={({isActive}) => cn(styles.link, {
                        [styles.active]: isActive
                    })}>
                        <img src="/menu-icon.svg" alt="menu icon" />
                        Menu
                    </NavLink>
                    <NavLink to='/cart' className={({isActive}) => cn(styles.link, {
                        [styles.active]: isActive
                    })}>
                        <img src="/cart-icon.svg" alt="cart icon" />
                        Cart
                    </NavLink>
                </div>
                <Button className={styles.exit} onClick={logout}>
                    <img src="/close-icon.svg" alt="cart icon" />
                    Выйти
                </Button>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}