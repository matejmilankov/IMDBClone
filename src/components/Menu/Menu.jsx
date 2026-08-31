import styles from './Menu.module.css'
import { LogoIcon, CloseIcon, MovieIcon, TvIcon, WatchIcon, EventsIcon, UserIcon, GlobeIcon } from "../Icons/Icons";

export function Menu({ closeMenu, menuWrapperRef }) {

    return (
        <>
            <div className={styles.menuWrapper} ref={menuWrapperRef}>
                <div className='container'>
                    <div className={styles.menuHeader}>
                        <LogoIcon />
                        <button className={styles.closeButton} onClick={closeMenu}>
                            <CloseIcon />
                        </button>
                    </div>

                    <div className={styles.menuItems}>
                        <div className={styles.menuItem}>
                            <MovieIcon />
                            <div className={styles.menuLinks}>
                                <span>Movies</span>
                                <a href="#">Release calendar</a>
                                <a href="#">Top 250 movies</a>
                                <a href="#">Most popular movies</a>
                                <a href="#">Browse movies by gender</a>
                                <a href="#">Top box office</a>
                                <a href="#">Showtimes & tickes</a>
                                <a href="#">Movie news</a>
                                <a href="#">India movie spotlight</a>
                            </div>
                        </div>
                        <div className={styles.doubleMenuItem}>
                            <div className={styles.menuItem}>
                                <TvIcon />
                                <div className={styles.menuLinks}>
                                    <span>TV Shows</span>
                                    <a href="#">What's on TV & streaming</a>
                                    <a href="#">Top 250 TV shows</a>
                                    <a href="#">Most popular TV shows</a>
                                    <a href="#">Browse TV Shows by gender</a>
                                    <a href="#">TV News</a>
                                </div>
                            </div>
                            <div className={styles.menuItem}>
                                <WatchIcon />
                                <div className={styles.menuLinks}>
                                    <span>Watch</span>
                                    <a href="#">What to watch</a>
                                    <a href="#">Latest trailers</a>
                                    <a href="#">IMDb Originals</a>
                                    <a href="#">IMDb picks</a>
                                    <a href="#">IMDb Spotlight</a>
                                    <a href="#">Family entertainments guide</a>
                                    <a href="#">IMDb Podcasts</a>
                                </div>
                            </div>
                        </div>
                        <div className={styles.menuItem}>
                            <EventsIcon />
                            <div className={styles.menuLinks}>
                                <span>Awards & events</span>
                                <a href="#">Oscars</a>
                                <a href="#">Primetime Emmys</a>
                                <a href="#">Disney D23</a>
                                <a href="#">Summer Watch Guide</a>
                                <a href="#">Most Anticipated This Month</a>
                                <a href="#">STARmeter Awards</a>
                                <a href="#">Awards Central</a>
                                <a href="#">Festival Central</a>
                                <a href="#">All events</a>
                            </div>
                        </div>
                        <div className={styles.menuItem}>
                            <UserIcon />
                            <div className={styles.menuLinks}>
                                <span>Celebs</span>
                                <a href="#">Born today</a>
                                <a href="#">Trending people</a>
                                <a href="#">Celebrity news</a>
                            </div>
                        </div>
                        <div className={styles.menuItem}>
                            <GlobeIcon />
                            <div className={styles.menuLinks}>
                                <span>Community</span>
                                <a href="#">IMDb Labs</a>
                                <a href="#">Help center</a>
                                <a href="#">Contributor zone</a>
                                <a href="#">Polls</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}