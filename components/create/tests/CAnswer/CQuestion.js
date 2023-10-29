import React, {useEffect} from 'react';
import styles from "../../../../styles/create/tests/CAnswer/CAnswer.module.css";

const CQuestion = ({idp, fn, id, full, Delete_ques, changeques, change}) => {
    function setQuestion(e) {
        var new_v = [...full];
        new_v[idp].variant[id].question = e;
        fn(new_v)
    }
    useEffect(()=>{
        setTimeout(()=>{
            var element = document.getElementById("Test" + idp + "question" + id);
            element.style.gridTemplateRows = "1fr";
        },1)
    },[]);
    function setCondition(e) {
        var new_v = [...full];
        new_v[idp].variant[id].condition = e;
        fn(new_v)
    }
    useEffect(()=>{
        console.log(full[idp].variant[id].question);
        var ele = document.getElementById("Test" + idp + "question" + id ).getElementsByClassName(styles.inputQuestion)[0];
        console.log(ele);
        ele.value = full[idp].variant[id].question;
        var ele1 = document.getElementById("Test" + idp + "question" + id ).getElementsByClassName(styles.inputCondition)[0];
        ele1.value = full[idp].variant[id].condition;
    },[change, changeques]);

    return (
        <div  id={"Test" + idp + "question" + id } className={id === full[idp].variant.length - 1 ? styles.V_variant_end : styles.V_variant}>
            <div className={styles.variants_in}>
                <div className={styles.row_del}>
                    <div onClick={() => Delete_ques(id)} className={styles.svgdel} >
                        <svg  className={styles.svgdelet_var} viewBox="0 0 145.97 145.97">
                            <path className={styles.cls1}
                                  d="M2555,3486.17l-50.94-50.94a5.87,5.87,0,0,1,0-8.28L2555,3376a10.49,10.49,0,0,0,0-14.84h0a10.5,10.5,0,0,0-14.83,0l-50.94,50.94a5.85,5.85,0,0,1-8.28,0L2430,3361.18a10.5,10.5,0,0,0-14.83,0h0a10.49,10.49,0,0,0,0,14.84l50.93,50.93a5.85,5.85,0,0,1,0,8.28l-50.93,50.94a10.49,10.49,0,0,0,0,14.84h0a10.5,10.5,0,0,0,14.83,0l50.94-50.94a5.85,5.85,0,0,1,8.28,0l50.94,50.94a10.5,10.5,0,0,0,14.83,0h0A10.49,10.49,0,0,0,2555,3486.17Z"
                                  transform="translate(-2412.12 -3358.11)"/>
                        </svg>
                    </div>
                </div>

                {/*<input onChange={(e)=>{setAnswer(e.target.value)}} className={styles.inputResp} placeholder={"Правильный ответ"}/>*/}
                <textarea onChange={(e)=>setCondition(e.target.value)} className={styles.inputCondition} placeholder={"Условие"}/>
                <input onChange={(e)=>setQuestion(e.target.value)} className={styles.inputQuestion} placeholder={"Вопрос"}/>
            </div>
        </div>
    );
};

export default CQuestion;