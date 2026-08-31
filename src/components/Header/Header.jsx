import styles from './Header.module.css'
import { useState } from 'react';
import { LogoIcon, HamburgerIcon, ImdbProIcon, ProfileIcon } from '../Icons/Icons';
import { SearchBar } from '../SearchBar/SearchBar';
import { Menu } from '../Menu/Menu';
import { WathchlistDropdown } from '../WatchlistDropdown/WatchlistDropdown';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <Menu 
                isMenuOpen={isMenuOpen}
                closeMenu={() => setIsMenuOpen(false)}  
            />

            <nav className={styles.headerWrapper}>
                <div className='container'>
                    <div className={styles.headerContainer}>
                        <LogoIcon />

                        <button className={styles.menuButton} onClick={() => setIsMenuOpen(true)}>
                            <HamburgerIcon />
                            <span>Menu</span>
                        </button>

                        <SearchBar />

                        <a href="#" className='headerLink'>
                            <ImdbProIcon />
                        </a>

                        <hr className={styles.line} />

                        <WathchlistDropdown />

                        <button className={styles.menuButton}>
                            <ProfileIcon />
                            <span>Matej</span>
                        </button>

                    </div>
                </div>
            </nav>
        </>
    )
}