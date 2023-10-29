import React, {useEffect} from 'react';
import styles from "../../../../styles/tests/task/Answer/answer_det/Variants.module.css";

const Variants = (props) => {

    var answer = "";
    if(undefined !== props.cooki){
        answer = props.cooki.answer;
    }
    //console.log(props.cooki.answer);

    return (
        <div className={styles.Variants}>
            <div className={styles.condition}>
                <p className={styles.text}>{props.condition}</p>
            </div>
            <div className={styles.question}>
                <p className={styles.text}>{props.question}</p>
            </div>
            <p className={styles.text_otv}>Ответ:</p><input defaultValue={answer}  className={styles.input} onChange={(e) => props.functionChange(props.id, e.target.value)} />
        </div>
    );
};

export default Variants;