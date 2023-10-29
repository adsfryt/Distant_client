import React, {useEffect} from 'react';
import styles from "../../../../styles/create/checkbox.module.css";

const Checkbox = ({idp,fn,state, change, data,id}) => {
    useEffect(()=>{

        if(data === 1){
            document.getElementById("parent" + idp + "check" + id).getElementsByClassName(styles.check_box)[0].checked = true;
            console.log(1)
        }else{
            document.getElementById("parent" + idp + "check" + id).getElementsByClassName(styles.check_box)[0].checked = false;
            console.log(0)
        }
    },[change]);

    return (
        <>
            <label className={styles.label} id={"parent" + idp + "check" + id}>
                <input className={styles.check_box} defaultChecked={state === 1? true : false} onClick={fn} type={"checkbox"}  />
                <span className={styles.checkmark}>
                    <svg className={styles.yes} viewBox="0 0 19.67 21.43"><polyline className={styles.yes_line} points="2.5 9.6 7.72 19.93 13.17 2.5"/></svg>
                </span>
            </label>
        </>
    );
};

export default Checkbox;