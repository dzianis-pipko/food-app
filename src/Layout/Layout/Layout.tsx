import { Link, Outlet } from 'react-router-dom'
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';

export const Lauoyt = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.sidebar}>
                <div className={styles.user}>
                    <img className={styles.avatar} src="/user-icon.png" alt="Аватар пользователя" />
                    <div className={styles.name}>name</div>
                    <div className={styles.email}>email</div>
                </div>
                <div className={styles.menu}>
                    <Link to='/' className={styles.link}>
                        <img src="/menu-icon.svg" alt="menu icon" />
                        Menu
                    </Link>
                    <Link to='/cart' className={styles.link}>
                        <img src="/cart-icon.svg" alt="cart icon" />
                        Cart
                    </Link>
                </div>
                <Button className={styles.exit}>
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