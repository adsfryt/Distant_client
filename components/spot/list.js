import React from 'react';
import styles from "../../styles/Spot/List.module.css";
import {useRouter} from "next/navigation";

const List = ({CurPage, password, testId}) => {
    const { push } = useRouter();
    return (
        <div className={styles.list}>
            <div className={[styles.element_out, CurPage === "Task"? styles.element_out_b:""].join(" ")} onClick={()=>push('/spot/task/' + testId + "-" + password)}>
                <div className={styles.element}>
                    <svg className={styles.svg} viewBox="0 0 115.4 136.12">
                        <rect className={styles.cls1} x="4" y="4" width="107.4" height="128.12" rx="15.54"/>
                        <line className={styles.cls1} x1="16.09" y1="27.83" x2="97.93" y2="27.83"/>
                        <line className={styles.cls1} x1="16.09" y1="80.32" x2="97.93" y2="80.32"/>
                        <line className={styles.cls1} x1="16.09" y1="54.07" x2="97.93" y2="54.07"/>
                        <line className={styles.cls1} x1="16.09" y1="106.56" x2="53.04" y2="106.56"/>
                    </svg>
                </div>
                <p className={styles.title_text}>Задания</p>
            </div>
            <div className={[styles.element_out, CurPage === "Table"? styles.element_out_b:""].join(" ")} onClick={()=>push('/spot/table/' + testId + "-" + password)}>
                <div className={styles.element}>
                    <svg className={styles.svg}  viewBox="0 0 115.4 132.32">
                        <rect  className={styles.cls1} x="4" y="4" width="107.4" height="124.32" rx="15.54"/>
                        <line  className={styles.cls1} x1="4" y1="35.08" x2="111.4" y2="35.08"/>
                        <line  className={styles.cls1} x1="4" y1="66.16" x2="111.4" y2="66.16"/>
                        <line  className={styles.cls1} x1="4" y1="97.24" x2="111.4" y2="97.24"/>
                        <line  className={styles.cls1} x1="34.39" y1="4" x2="34.39" y2="128.32"/>
                    </svg>
                </div>
                <p className={styles.title_text}>Таблица</p>
            </div>
            <div className={[styles.element_out, CurPage === "Check"? styles.element_out_b:""].join(" ")} onClick={()=>push('/spot/check/' + testId + "-" + password)}>
                <div className={styles.element}>
                    <svg className={styles.svg} viewBox="0 0 115.4 136.12">
                        <rect className={styles.cls1} x="4" y="4" width="107.4" height="128.12" rx="15.54"/>
                        <polyline className={styles.cls2} points="76.95 103.04 86.1 114.26 92.84 91.64"/>
                        <polyline className={styles.cls2} points="76.95 67.96 86.1 79.18 92.84 56.56"/>
                        <polyline className={styles.cls2} points="76.95 32.87 86.1 44.1 92.84 21.48"/>
                        <line className={styles.cls1} x1="15.4" y1="35.61" x2="63.4" y2="35.61"/>
                        <line className={styles.cls1} x1="15.4" y1="69.28" x2="63.4" y2="69.28"/>
                        <line className={styles.cls1} x1="15.4" y1="102.95" x2="63.4" y2="102.95"/>
                    </svg>
                </div>
                <p className={styles.title_text}>Проверка заданий</p>
            </div>
        </div>
    );
};

export default List;