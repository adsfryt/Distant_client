import React from 'react';
import {useState} from "react";
import styles from "../../styles/tests/task/Test/test_det/InputName.module.css";

const InputName = ({getName}) => {

    return (
        <div className={styles.InputName}>
            <div className={styles.div_text_head}>
                <p className={styles.text_head}>Ваше имя:</p>
            </div>
            <div className={styles.div_text}>
                <input placeholder={"Имя"} onChange={(e) => getName(e.target.value)} className={styles.Input}/>
            </div>
        </div>
    );
};

export default InputName;