import styles from './SectionHeader.module.css'
import clsx from 'clsx'
import { ArrowIcon } from '../Icons/Icons'

export function SectionHeader(props) {
    return (
        <div className={styles.sectionHeader}>
            <div className='container'>
                <div className={clsx(
                    styles.headerLayout,
                    {
                        [styles.extended]: props.variant === "extended",
                        [styles.reduced]: props.variant === "reduced",
                        [styles.standard]: props.variant === "standard"
                    })}
                >
                    {props.variant === "standard" && (
                        <div className={styles.sectionPreHeader}>
                            <h2>{props.preHeader}</h2>
                            <div>
                                <span>{props.preHeaderLink}</span>
                                <ArrowIcon
                                    width={"10px"}
                                    height={"10px"}
                                    color={"#0E63BE"}
                                />
                            </div>
                        </div>
                    )}

                    <div className={styles.sectionHeaderWrapper}>
                        <div>
                            <div className={styles.sectionIndicator}>
                                <div className={styles.line}></div>
                                <h3>{props.header}</h3>
                                <ArrowIcon
                                    width={"18px"}
                                    height={"18px"}
                                    color={"#fff"}
                                />
                            </div>
                            <span className={styles.sectionHeaderDesc}>{props.headerDesc}</span>
                        </div>
                        {props.variant === "extended" && (
                            <button className={styles.sectionAction}>
                                <ArrowIcon
                                    width={"10px"}
                                    height={"10px"}
                                    color={"#0E63BE"}
                                />
                                <span>{props.actionText}</span>
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}