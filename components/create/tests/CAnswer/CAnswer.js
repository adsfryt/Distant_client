import React, {useEffect, useState} from 'react';
import styles from "../../../../styles/create/tests/CAnswer/CAnswer.module.css";
import common from "../../../../styles/create/tests/common.module.css";
import Info from "../../info";
import Checkbox from "../CTest/Checkbox";
import CheckboxLs from "../CTest/CheckboxLs";
import CVariant from "../CTest/CVariant";
import Question from "./CQuestion";
import CheckBoxAsk from "../common/CheckBoxAsk";
import stylescb from "../../../../styles/create/checkbox.module.css";

const CAnswer = ({data, ido, fn, full, Delete, change}) => {
    var [changeques, setChangeques] = useState(false);
    useEffect(()=>{
        setTimeout(()=>{
            var element =  document.getElementById("Test" + ido);
            console.log(element);
            element.style.gridTemplateRows = "1fr";
        },1)
    },[]);

    useEffect(()=>{
        document.getElementById("Test" + ido).getElementsByClassName(styles.inputName)[0].value = full[ido].title;
        document.getElementById("Test" + ido).getElementsByClassName(styles.inputDescr)[0].value = full[ido].description;
    },[change]);

    function setTitle(e) {
        var new_v =[...full];
        new_v[ido].title = e;
        fn(new_v);
    }

    function setAnswer(e, id, idp) {
        var new_v =[...full];
        new_v[ido].answer[idp][id].answer = e;
        fn(new_v);
    }

    function setDescription(e) {
        var new_v =[...full];
        new_v[ido].description = e;
        fn(new_v);
    }

    function addVariant() {
        var new_v =[...full];
        new_v[ido].variant.push({question:"",condition:""});
        if(new_v[ido].check === 1){
            new_v[ido].answer[0].push({answer:"",points:0});
        }
        fn(new_v);
    }

    function SetPointAf(value, index){
        var new_v =[...full];
        new_v[ido].answer[0][index].points = Number(value);
        fn(new_v);
    }

    function SetCheckf(){
        var new_v =[...full];
        if(new_v[ido].check === 0){
            new_v[ido].answer = [];
            new_v[ido].answer.push([]);
            for (let i = 0; i < new_v[ido].variant.length; i++) {
                new_v[ido].answer[0].push({answer:"",points:0})
            }
            new_v[ido].check = 1;
        }else {
            new_v[ido].check = 0;
        }
        fn(new_v);
    }

    function Delete_ques(value){
        var new_v =[...full];
        setChangeques(!changeques);
        new_v[ido].variant.splice(value,1);
        if(new_v[ido].check === 1){
            new_v[ido].answer[0].splice(value,1);
        }
        fn(new_v);
    }

    return (
        <div className={common.Test_out} id={"Test" + ido}>
            <div className={common.Test}>
                <div className={styles.row_del}>
                    <div onClick={() => Delete(ido)} className={styles.svgdel} >
                        <svg  className={styles.svgdelet} viewBox="0 0 145.97 145.97">
                            <path className={styles.cls1}
                                  d="M2555,3486.17l-50.94-50.94a5.87,5.87,0,0,1,0-8.28L2555,3376a10.49,10.49,0,0,0,0-14.84h0a10.5,10.5,0,0,0-14.83,0l-50.94,50.94a5.85,5.85,0,0,1-8.28,0L2430,3361.18a10.5,10.5,0,0,0-14.83,0h0a10.49,10.49,0,0,0,0,14.84l50.93,50.93a5.85,5.85,0,0,1,0,8.28l-50.93,50.94a10.49,10.49,0,0,0,0,14.84h0a10.5,10.5,0,0,0,14.83,0l50.94-50.94a5.85,5.85,0,0,1,8.28,0l50.94,50.94a10.5,10.5,0,0,0,14.83,0h0A10.49,10.49,0,0,0,2555,3486.17Z"
                                  transform="translate(-2412.12 -3358.11)"/>
                        </svg>
                    </div>
                </div>
                <div className={styles.title}>
                    <div className={styles.title_in}>
                        <input onChange={(e)=>setTitle(e.target.value)}  className={styles.inputName} placeholder={"Вопрос задания"}/>
                        <textarea id={'textarea1'}  onChange={(e)=>setDescription(e.target.value)}  className={styles.inputDescr} placeholder={"Описание"}/>
                    </div>
                </div>

                <CheckBoxAsk SetCheckf={SetCheckf} id={-1} idp={ido} isInfo={true} change={change} state={data.check} question={"Проверить автоматически?:"} textInfo={"Отметив этот пункт, вы должны выбрть правильный ответ, иначе все ответы будут неправильными"}/>

                <div className={styles.variants}>
                    {
                        data.variant.map((key, id)=>(
                            <>
                                {data.check === 1 ? <>
                                    <div className={styles.label_out}>
                                        <p className={styles.text}>Правильный ответ:</p>
                                        <input onChange={(e)=>setAnswer(e.target.value, id, 0)} className={styles.inputAnswer} placeholder={"Ответ"}/>
                                        <div><p className={styles.text}>Баллы:</p></div>
                                        <input type={"number"}  onChange={(e)=>{if(e.target.value.length > 4){document.getElementById("parent" + idp + "inputpoint" + id).value = data.points}else{SetPointAf(e.target.value, id)}}} id={"parent" + ido + "inputpoint" + id} className={stylescb.inputNumber} placeholder={"Балл"} />
                                    </div>
                                </>: ""}
                                <Question fn={fn} id={id} idp={ido} full={full} Delete_ques={Delete_ques} changeques={changeques} change={change} />
                            </>
                        ))
                    }
                    <div onClick={addVariant} className={styles.add_variants}>
                        <svg className={styles.svg} viewBox="0 0 395.93 395.93">
                            <path className={styles.cls0}
                                  d="M551.46,465.62H424.65a14.49,14.49,0,0,1-14.49-14.49V324.32a14.49,14.49,0,0,0-14.49-14.49H341.32a14.48,14.48,0,0,0-14.49,14.49V451.13a14.5,14.5,0,0,1-14.5,14.49H185.52A14.5,14.5,0,0,0,171,480.12v54.34A14.5,14.5,0,0,0,185.52,549H312.33a14.5,14.5,0,0,1,14.5,14.49V690.26a14.49,14.49,0,0,0,14.49,14.49h54.35a14.49,14.49,0,0,0,14.49-14.49V563.45A14.49,14.49,0,0,1,424.65,549H551.46a14.5,14.5,0,0,0,14.5-14.5V480.12A14.5,14.5,0,0,0,551.46,465.62Z"
                                  transform="translate(-170.53 -309.33)"/>
                        </svg>
                        <p  className={styles.add_variants_text}>Добавить вопрос</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CAnswer;