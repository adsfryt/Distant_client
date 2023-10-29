import styles from "../../../../styles/tests/task/Test/test_det/Variants.module.css"
import {useEffect, useState} from "react";


const Variants = (props) => {
    var[ Checked,setChecked ]= useState(0);
    var[ Answer,setAnswer ]= useState(0);

    useEffect(()=> {

            if (undefined !== props.cooki) {
                setChecked(props.cooki.answer);
            }else{
                setChecked(0);
            }
            if (undefined !== props.answer) {
                setAnswer(props.answer);
                console.log(Answer)
            }

    })
    return (
        <div className={ props.amount !== props.id ? styles.Variants : styles.Variants_end}>
            {props.check === 1 ?
                <svg className={styles.yes_before} viewBox="0 0 19.67 21.43">
                    <polyline className={[Answer === 1 ? styles.yes_line_true_r : styles.yes_line_false].join(" ")}
                              points="2.5 9.6 7.72 19.93 13.17 2.5"/>
                </svg>
                :""
            }
            <span className={styles.checkmark}>
                <svg className={styles.yes} viewBox="0 0 19.67 21.43"><polyline className={[styles.yes_line_def, Checked === 1 && Answer === 1 ? styles.yes_line_true_r : Checked === 1 && Answer === 0 ? styles.yes_line_true_w : styles.yes_line_false, props.isfinal !== 1 ? styles.yes_line_def : ""].join(" ")} points="2.5 9.6 7.72 19.93 13.17 2.5"/></svg>
            </span>
            <div className={styles.right_div}>
                <div className={styles.title}>
                    <p className={styles.title_text}>{props.title}</p>
                </div>
                <div className={styles.description}>
                    <p className={styles.description_text}>{props.description}</p>
                </div>
            </div>
        </div>
    );
};

export default Variants;