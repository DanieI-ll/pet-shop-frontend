import styles from './Header.module.css';
import logo from '../../assets/images/mainLogo.svg';
import cartIcon from '../../assets/icons/cartIcon.svg';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

export default function Header() {
  const { items } = useSelector((state) => state.cart);
  const uniqueItemsCount = items.length;

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.logo_container}>
          <Link style={{ margin: 0, height: 'fit-content' }} to="/">
            <img src={logo} alt="logo" className={styles.main_logo_img} />
          </Link>
        </div>
        <nav>
          <ul className={styles.nav_list}>
            <li className={styles.nav_list_item}>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? '#0D50FF' : '#282828',
                })}
                to="/"
              >
                Main Page
              </NavLink>
            </li>
            <li className={styles.nav_list_item}>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? '#0D50FF' : '#282828',
                })}
                to="/categories"
              >
                Categories
              </NavLink>
            </li>
            <li className={styles.nav_list_item}>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? '#0D50FF' : '#282828',
                })}
                to="/products"
              >
                All products
              </NavLink>
            </li>
            <li className={styles.nav_list_item}>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? '#0D50FF' : '#282828',
                })}
                to="/sales"
              >
                All sales
              </NavLink>
            </li>
          </ul>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link className={styles.cartLink} style={{ margin: 0 }} to="/cart">
            {items.length > 0 && <p className={styles.cartTotal}>{uniqueItemsCount}</p>}

            <img src={cartIcon} alt="cart" className={styles.cart} />
          </Link>
        </div>
      </div>
    </header>
  );
}
