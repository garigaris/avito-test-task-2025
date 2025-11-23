import { Link } from 'react-router-dom';
import routes from '../../shared/routes/routes';
import { useContext } from 'react';
import { ThemeContext } from '../../app/context/ThemeContext';

import s from './Header.module.css';

const navItems = [
  { to: routes.HOME, label: 'Главная' },
  { to: routes.STATISTICS, label: 'Статистика' },
];

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={s.header}>
      <div className={s.header_Container}>
        <nav className={s.nav}>
          <ul
            className={s.nav_List}
            aria-label="Основная навигация по приложению"
          >
            {navItems.map(({ to, label }) => (
              <li key={to} className={s.nav_Item}>
                <Link to={to} className={s.nav_Link}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>


        <button
          className={s.themeButton}
          onClick={toggleTheme}
        >
          {theme === 'light' ? 'Темная' : 'Светлая'}
        </button>
      </div>
    </header>
  );
};

export default Header;
