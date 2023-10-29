import React from 'react';
import Router from "next/router";
import styles from "../../styles/tests/result/Result.module.css";

const Load = () => {
    return (
            <>
                <div onClick={() => {Router.reload(window.location.pathname)}} className={styles.btn_refresh}>
                    <div className={styles.text_div_refresh}>
                        <p className={styles.text}>Обновить</p>
                    </div>
                </div>
                <div  className={styles.Divcircle} >
                    <svg className={styles.svg} viewBox="25 25 50 50">
                        <circle className={styles.circle} r="20" cy="50" cx="50">
                        </circle>
                    </svg>
                </div>
            </>
    );
};

export default Load;