import React, {useEffect} from 'react';
import styles from "../../styles/create/checkbox.module.css";

const Checkbox = ({fn,state}) => {

    return (
        <>
            <label className={styles.label}>
                <input className={styles.check_box} defaultChecked={state === 1? true : false} onClick={fn} type={"checkbox"}  />
                <span className={styles.checkmark}>
                    <svg className={styles.yes} viewBox="0 0 19.67 21.43"><polyline className={styles.yes_line} points="2.5 9.6 7.72 19.93 13.17 2.5"/></svg>
                </span>
            </label>
        </>
    );
};

export default Checkbox;