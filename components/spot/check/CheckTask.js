import React, {useEffect, useState} from 'react';
import styles from "../../../styles/Spot/check/CheckTask.module.css"
import STests from "../../Showtests/STest/STests";
import ShowSave from "../../ShowSave";
import SAnswer from "../../Showtests/SAnswer/SAnswer";

const CheckTask = ({tests,CurUser, userResult, userAnswer, CurUserN, Answer, ID, password, testId, ADDRESS_SITE, ADDRESS_SERVER}) => {
    var [userAnswerID, setuserAnswerID]= useState([]);
    var [Result, setResult] = useState([]);
    var [isSave, setisSave] = useState(false);
    var [isSaveID, setisSaveID] = useState(0);
    var userResultID = [];

    useEffect(()=>{
        for (let i = 0; i < userAnswer.length; i++) {
            if (userAnswer[i].URLs === CurUser){
                setuserAnswerID(userAnswer[i].answer);
                break;
            }
        }

        for (let i = 0; i < userResult.length; i++) {
            if (userResult[i].URLs === CurUser){

                userResultID = userResult[i];
                break;
            }
        }
        setResult([]);
        console.log(userResultID);
        if(CurUser !== ""){
        for (let i = 0; i < ID.length; i++) {
            var result = 0;

            for (let j = 0; j < userResultID.answer.length; j++) {
                if(userResultID.answer[j].id === ID[i].id){
                    result = userResultID.answer[j].result;
                    break;
                }
            }
            document.getElementById("input_point" + 0 + "_" + i).value = result;
        }
        }
    },[CurUser]);

    function SetPoint(value, id){
        var new_r = [...Result];
        for (let i = 0; i < Result.length; i++) {
            if(Result[i].id === id){
                new_r[i].result = Number(value);
                setResult(new_r);
                return 0;
            }
        }
        new_r.push({id:id,result: Number(value), Idmax:0, final:1});
        setResult(new_r);
    }

    async function sendResult() {
        try {
            var postData = {
                password:password,
                URLs: CurUser,
                result: Result,
                testId:testId
            }

            const response = await fetch(ADDRESS_SERVER + "/admin/add_result", {  // check
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData)
            });
            var responsejson = await response.json();
            if(responsejson === "ok"){
                setisSave(true);
                setisSaveID(0)
            }

        }catch (e) {

        }
    }

    return (

            <div className={styles.Content}>
                <p className={styles.title_text}>{CurUserN}</p>
                {ID.length !== 0 ?<>
                    {CurUser !== "" ?
                        <>
                        {ID.map((key, idm) => {
                            var id = key.id;
                            var uanswer;
                            var test;
                            var isdo = false;
                            for (let i = 0; i < userAnswerID.length; i++) {
                                if (userAnswerID[i].id === id) {
                                    uanswer = userAnswerID[i];
                                    isdo = true;
                                }
                            }

                            for (let i = 0; i < tests.length; i++) {
                                if (tests[i].id === id) {
                                    test = tests[i];
                                    break;
                                }
                            }

                            switch (key.type) {
                                case 1:
                                    return (
                                        <>
                                            <div className={styles.div_point}>
                                                <div className={styles.InputPoint_div}><input
                                                    id={"input_point" + 0 + "_" + idm}
                                                    type={"number"}
                                                    placeholder={"Балл"}
                                                    className={styles.inputPoint}
                                                    onChange={(e) => {
                                                        if (e.target.value.length > 4) {
                                                            document.getElementById("input_point" + 0 + "_" + idm).value = 0
                                                        } else {
                                                            SetPoint(e.target.value, id)
                                                        }
                                                    }}/></div>
                                            </div>
                                            {isdo === false ?
                                                <p className={styles.text}>Задание не выполненно:</p> : ""}
                                            <STests result={undefined} key={id} answer={undefined} uanswer={uanswer}
                                                    data={test}
                                                    check={0}/>
                                        </>
                                    );
                                case 2:
                                    return (
                                        <>
                                            <div className={styles.div_point}>
                                                <div className={styles.InputPoint_div}><input
                                                    id={"input_point" + 0 + "_" + idm}
                                                    type={"number"}
                                                    placeholder={"Балл"}
                                                    className={styles.inputPoint}
                                                    onChange={(e) => {
                                                        if (e.target.value.length > 4) {
                                                            document.getElementById("input_point" + 0 + "_" + idm).value = 0
                                                        } else {
                                                            SetPoint(e.target.value, id)
                                                        }
                                                    }}/></div>
                                            </div>
                                            {isdo === false ?
                                                <p className={styles.text}>Задание не выполненно:</p> : ""}
                                            <SAnswer result={undefined} key={id} answer={undefined} uanswer={uanswer}
                                                    data={test}
                                                    check={0}/>
                                        </>
                                    );
                            }
                        })}
                        <div className={styles.btn_out}>
                        <div onClick={() => sendResult()} className={styles.btn}>
                        <div className={styles.btn_div}></div>
                        <div className={styles.text_div}>
                        <p className={styles.text_btn}>Сохранить</p>
                        </div>
                        </div>
                        <ShowSave id={0} isSave={isSave} isSaveID={isSaveID} setisSave={setisSave}
                        setisSaveID={setisSaveID}/>
                        </div>
                        </>
                        : ""
                    }
                    </>: ""
                }
            </div>
    );
};

export default CheckTask;