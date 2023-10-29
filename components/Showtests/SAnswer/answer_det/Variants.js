import React from 'react';
import styles from "../../../../styles/tests/task/Answer/answer_det/Variants.module.css";

const Variants = (props) => {
    return (
        <div className={styles.Variants}>
            <div className={styles.condition}>
                <p className={styles.text}>{props.condition}</p>
            </div>
            <div className={styles.question}>
                <p className={styles.text}>{props.question}</p>
            </div>
            <p className={styles.text_otv}>Ответ:</p><input value={props.uanswer} className={styles.input}  disabled/><p  className={styles.right_text}>{props.answer}</p>
        </div>
    );
};

export default Variants;