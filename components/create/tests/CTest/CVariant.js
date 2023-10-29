import React, {useEffect, useState} from 'react';
import styles from "../../../../styles/create/tests/CTest/CTest.module.css";

const CVariant = ({id, fn, pId,data, change, Delete_var, full, changevar}) => {

    useEffect(()=>{
        setTimeout(()=>{
            var element = document.getElementById("Test" +pId + "variant" + id);
            console.log(element);
            element.style.gridTemplateRows = "1fr";
        },1)
    },[]);

    useEffect(()=>{
        var ele = document.getElementById("Test" + pId + "variant" + id).getElementsByClassName(styles.inputResp)[0];
            ele.value = data.title;
        var ele1 = document.getElementById("Test" + pId + "variant" + id).getElementsByClassName(styles.inputDescrResp)[0];
        console.log(data.description);
            ele1.value = data.description;
    },[change, changevar]);




    function setTitle(e) {
        var new_v = [...full];
        new_v[pId].variant[id].title = e;
        fn(new_v)
    }
    function setDescr(e) {
        var new_v = [...full];
        new_v[pId].variant[id].description = e;
        fn(new_v)
    }
    return (
        <div id={"Test" + pId + "variant" + id} className={id === full[pId].variant.length - 1 ? styles.V_variant_end : styles.V_variant}>
            <div className={styles.variants_in}>
                <div className={styles.row_del}>
                    <div onClick={() => Delete_var(id)} className={styles.svgdel} >
                        <svg  className={styles.svgdelet_var} viewBox="0 0 145.97 145.97">
                            <path className={styles.cls1}
                                  d="M2555,3486.17l-50.94-50.94a5.87,5.87,0,0,1,0-8.28L2555,3376a10.49,10.49,0,0,0,0-14.84h0a10.5,10.5,0,0,0-14.83,0l-50.94,50.94a5.85,5.85,0,0,1-8.28,0L2430,3361.18a10.5,10.5,0,0,0-14.83,0h0a10.49,10.49,0,0,0,0,14.84l50.93,50.93a5.85,5.85,0,0,1,0,8.28l-50.93,50.94a10.49,10.49,0,0,0,0,14.84h0a10.5,10.5,0,0,0,14.83,0l50.94-50.94a5.85,5.85,0,0,1,8.28,0l50.94,50.94a10.5,10.5,0,0,0,14.83,0h0A10.49,10.49,0,0,0,2555,3486.17Z"
                                  transform="translate(-2412.12 -3358.11)"/>
                        </svg>
                    </div>
                </div>

                <input onChange={(e)=>{setTitle(e.target.value)}} className={styles.inputResp} placeholder={"Вариант ответа"}/>
                <textarea onChange={(e)=>setDescr(e.target.value)} className={styles.inputDescrResp} placeholder={"Описание"}/>
            </div>
        </div>
    );
};

export default CVariant;