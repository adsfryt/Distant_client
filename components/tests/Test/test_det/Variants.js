import styles from "../../../../styles/tests/task/Test/test_det/Variants.module.css"
import {useState} from "react";


const Variants = (props) => {
    var Checked = 0;
   if(undefined !== props.cooki){
       Checked = props.cooki.answer;
   }
    console.log(props.cooki);

    return (
        <label className={styles.label}>
        <div className={ props.amount !== props.id ? styles.Variants : styles.Variants_end}>

            <input className={styles.check_box} defaultChecked={Checked === 1? true : false} onClick={(e) => props.functionChange(props.id)} type={"checkbox"}  />
            <span className={styles.checkmark}>
                <svg className={styles.yes} viewBox="0 0 19.67 21.43"><polyline className={styles.yes_line} points="2.5 9.6 7.72 19.93 13.17 2.5"/></svg>
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
        </label>
    );
};

export default Variants;