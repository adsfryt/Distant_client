import React from 'react';
import Link from "next/link";
import styles from "../styles/404.module.css";

const Error
= () => {
    return (
        <div>
            <p className={styles.text_404}>404</p>
            <p className={styles.text_head}>Страница не найдена</p>

            <Link href = "/">
                <div className={styles.div_link}>
                    <p className={styles.text_link}>Вернуться на главную</p>
                    <svg className={styles.svg_redirect}  viewBox="-20 -20 306.77 200.84">
                        <polyline className={styles.cls} points="3.5 80.42 263.27 80.42 163.56 3.5"/>
                        <polyline className={styles.cls} points="3.5 80.42 263.27 80.42 163.56 157.34"/>
                    </svg>
                </div>
            </Link>
        </div>
    );
};

export default Error;