import React, {useEffect} from 'react';
import styles from "../../../../styles/create/checkbox.module.css";
import stylesC from "../../../../styles/create/tests/CTest/CTest.module.css"

const CheckboxLs =  ({idp,fn,state, change, data,id, changevar, SetPointAf}) => {
    useEffect(()=>{
        if(data.answer === 1){
            document.getElementById("parent" + idp + "check" + id).getElementsByClassName(styles.check_boxls)[0].checked = true;
            console.log(1)
        }else{
            document.getElementById("parent" + idp + "check" + id).getElementsByClassName(styles.check_boxls)[0].checked = false;
            console.log(0)
        }
        document.getElementById("parent" + idp + "inputpoint" + id).value = data.points;
    },[change,changevar]);

    return (
        <div className={stylesC.label_out}>
            <div><p className={stylesC.text}>Правильный ответ:</p></div>
            <div className={styles.labells} id={"parent" + idp + "check" + id}>
                <input className={styles.check_boxls} defaultChecked={state === 1? true : false} onClick={() => fn(id)} type={"checkbox"}  />
                <span className={styles.checkmark}>
                    <svg className={styles.yes} viewBox="0 0 19.67 21.43"><polyline className={styles.yes_line} points="2.5 9.6 7.72 19.93 13.17 2.5"/></svg>
                </span>
            </div>
            <div><p className={stylesC.text}>Баллы:</p></div>
            <input type={"number"}  onChange={(e)=>{if(e.target.value.length > 4){document.getElementById("parent" + idp + "inputpoint" + id).value = data.points}else{SetPointAf(e.target.value, id)}}} id={"parent" + idp + "inputpoint" + id} className={styles.inputNumber} placeholder={"Балл"}/>
        </div>
    );
};

export default CheckboxLs;