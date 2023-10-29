import React from 'react';
import styles from "../../../../styles/create/tests/CTest/CTest.module.css"
import Info from "../../info";
import Checkbox from "../CTest/Checkbox";

const CheckBoxAsk = ({question,isInfo, textInfo, idp, id, SetCheckf, state, change}) => {
    return (
        <>
            <div className={styles.row}>
                <div className={styles.row_in}>
                    <p className={styles.name_text}>{question}</p>{isInfo === true ? <Info text={textInfo} id={"info" + idp + id} /> : ""}
                </div>
                <Checkbox id={id} idp={idp} fn={SetCheckf} state={state} change={change} data={state}/>
            </div>
        </>
    );
};

export default CheckBoxAsk;