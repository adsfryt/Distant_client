import React, {useEffect, useState} from 'react';
import styles from "../../../styles/Spot/table/Table.module.css"
import dynamic from "next/dynamic";


function ToDateStr(date) {
    let createDate = new Date(date);
    var createDate_str = createDate.getFullYear() + ".";
    createDate_str += (createDate.getMonth() + 1) < 10 ? "0" + (createDate.getMonth() + 1) + "." : (createDate.getMonth() + 1) + ".";
    createDate_str += createDate.getDate() < 10 ? "0" + createDate.getDate() + " " : createDate.getDate() + " ";
    createDate_str += createDate.getHours() < 10 ? "0" + createDate.getHours() + ":" : createDate.getHours() + ":";
    createDate_str += createDate.getMinutes() < 10 ? "0" + createDate.getMinutes() : createDate.getMinutes();
    return createDate_str;
}
var Passed = [];

const Table = ({AddURL,setF,isFinal,userAnswer, userResult, passed, started, urlGuests, time, testId, password,ADDRESS_SITE, ADDRESS_SERVER}) => {

    var [Name, setName] = useState("");

    async function setPassed() {
        try {
            console.log(Passed)
            if(!isFinal){
                setF();
            const postData = {
                testId: testId,
                urlGuests: Passed,
                password: password,
            };

            const response = await fetch(ADDRESS_SERVER + "/admin/add_passed", {  // check
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData)
            });
            const result = await response.json();
            }


        } catch (error) {
            console.error("Error:", error);
        }
    }


    return (
        <>
            <div className={styles.Content_in}>
        <div className={styles.Table}>
            <div className={styles.Title}>
                <div className={styles.section}>Имя</div>
                <div className={styles.section}>Пригласительный код</div>
                <div className={styles.section}>Время начала</div>
                <div className={styles.section}>Время выполнения</div>
                <div className={styles.section}>Время окончания</div>
                <div className={styles.section_last}>Количество баллов</div>
            </div>
            {
                urlGuests.map((key,id)=>{
                    var createDate_str;
                    var createDate;
                    var endDate_sh;
                    for (let i = 0; i < started.length; i++) {
                        if (started[i][0] === key[0]) {
                            createDate = new Date(started[i][1]);
                            endDate_sh = new Date((new Date(started[i][1])).getTime() + (time*1000));
                            createDate_str = ToDateStr(started[i][1]);
                            break;
                        }
                    }
                    if(createDate_str === undefined){
                        createDate_str = "-";
                        return(<div className={styles.TitleG}>
                            <div className={styles.section}>{key[1]}</div>
                            <div className={styles.section}>{"A-" + testId + "-" + key[0]}</div>
                            <div className={styles.section}>{createDate_str}</div>
                            <div className={styles.section}>-</div>
                            <div className={styles.section}>-</div>
                            <div className={styles.section_last}>-</div>
                        </div>)
                    }
                    var endDate_str;
                    var endDate;
                    var Ispassed = false;
                    for (let i = 0; i < passed.length; i++) {
                        if (passed[i][0] === key[0]) {
                            endDate =  new Date(passed[i][1]);
                            endDate_str = ToDateStr(passed[i][1]);
                            Ispassed = true;
                            break;
                        }
                    }
                    if(!Ispassed && endDate_sh <= Date.now()){
                        Passed.push(key[0]);
                        if(id === urlGuests.length - 1){
                            setPassed()
                        }
                        endDate_str = "-";
                    }
                    if(endDate_str === undefined){
                    return(<div className={styles.TitleG}>
                        <div className={styles.section}>{key[1]}</div>
                        <div className={styles.section}>{"A-" + testId + "-" + key[0]}</div>
                        <div className={styles.section}>{createDate_str}</div>
                        <div className={styles.section}>-</div>
                        <div className={styles.section}>-</div>
                        <div className={styles.section_last}>-</div>
                    </div>)
                    }else {
                        var points = 0;
                        for (let i = 0; i < userResult.length; i++) {
                            if(userResult[i].URLs === key[0]){
                                for (let j = 0; j < userResult[i].answer.length; j++) {
                                    points += userResult[i].answer[j].result;
                                }
                                break;
                            }
                        }
                        if (Ispassed) {

                            return (<div className={styles.TitleG}>
                                <div className={styles.section}>{key[1]}</div>
                                <div className={styles.section}>{"A-" + testId + "-" + key[0]}</div>
                                <div className={styles.section}>{createDate_str}</div>
                                <div className={styles.section}>{Math.round((endDate.getTime() - createDate.getTime()) / 1000) + " секунд"}</div>
                                <div className={styles.section}>{endDate_str}</div>
                                <div className={styles.section_last}>{points}</div>
                            </div>)
                        }else{

                            return (<div className={styles.TitleG}>
                                <div className={styles.section}>{key[1]}</div>
                                <div className={styles.section}>{"A-" + testId + "-" + key[0]}</div>
                                <div className={styles.section}>{createDate_str}</div>
                                <div className={styles.section}>-</div>
                                <div className={styles.section}>-</div>
                                <div className={styles.section_last}>-</div>
                            </div>)
                        }
                    }

                })
            }
            <div className={styles.div_name}>
                <div className={styles.InputName_div}><input placeholder={"Имя"} className={styles.inputName} onChange={(e)=>setName(e.target.value)}/></div>
                <div className={styles.BtnName_div}><div className={styles.BtnName} onClick={() => AddURL(Name)}>Добавить</div></div>
            </div>
        </div>
            </div>
        </>
    );
};

export default dynamic(() => Promise.resolve(Table), {
    ssr: false
})

