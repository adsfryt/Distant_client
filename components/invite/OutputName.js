import React from 'react';
import {useState} from "react";
import styles from "../../styles/tests/task/Test/test_det/InputName.module.css";

const OutputName = ({Name}) => {

    return (
        <div className={styles.OutputName}>
            <div className={styles.div_text_head}>
                <p className={styles.text_head}>Ваше имя:</p>
            </div>
                <p className={styles.text}>{Name}</p>
        </div>
    );
};

export default OutputName;