import Tests from "../../components/tests/Test/Tests"
import Title from "../../components/Title"
import stylesT from "../../styles/tests/task/Test/Tests.module.css";
import styles from "../../styles/tests/task/Test/test_det/Variants.module.css";
import React, {useState, useEffect} from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import Variants from "../../components/tests/Test/test_det/Variants";
import Timer from "../../components/Timer";
import PreSend from "../../components/create/PreSend";
import Answer from "../../components/tests/Answer/Answer";


export  default function Test({test, start_time_s,URL,user_result, ADDRESS_SITE, ADDRESS_SERVER}) {

    const router = useRouter();
    var cur_time = new Date();
    var end_time = new Date(test.endTime);
    var Timeneed = test.timeS > (end_time.getTime() - cur_time.getTime())/1000 ? (end_time.getTime() - cur_time.getTime())/1000 : test.timeS;
    var TimeLeft = (Timeneed - ((cur_time.getTime() - start_time_s)/1000)) >= (end_time.getTime() - cur_time.getTime())/1000 ? (end_time.getTime() - cur_time.getTime())/1000 : Timeneed - ((cur_time.getTime() - start_time_s)/1000);
    var FullAnswer = [];
    function  ChangeFullAnswer(a){
        var isExist = 0;
        var ind;
        for(var i = 0; i < FullAnswer.length;i++){
            if(FullAnswer[i].id === a.id){
                isExist = 1;
                ind = i;
                break;
            }
        }
        if(isExist) {
            //console.log(a)
            FullAnswer[ind] = {...a};
        }else{
            FullAnswer.push(a);
        }
        //console.log(FullAnswer)
    }

    async function f() {
        try {
                const postData = {
                    testId: test.testId,
                    urlGuests: URL,
                };

                if(test.saveAnswer === 0){
                    var answers = FullAnswer;


                    const postDatas = {
                        testId: test.testId,
                        URLs: URL,
                        answer:answers
                    };

                    await fetch(ADDRESS_SERVER + "/api_s/save_userAnswer", { // check
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(postDatas)
                    });
                }

                const response = await fetch(ADDRESS_SERVER + "/api_s/add_passed", {  // check
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(postData)
                });
                const result = await response.json();



            router.push('/test/result/' + test.testId + "-" + result);

        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function saveAnswer(id) {
        try {
            var answers = [];

            for (var i = 0; i < FullAnswer.length; i++){
                if(FullAnswer[i].id === id){
                    answers.push(FullAnswer[i]);
                    break;
                }
            }

            const postData = {
                testId: test.testId,
                URLs: URL,
                answer:answers
            };
            const response = await fetch(ADDRESS_SERVER + "/api_s/save_userAnswer", { // check
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData)
            });

        } catch (error) {
            console.error("Error:", error);
        }
    }



    return (
        <div className={[stylesT.Content,test.strickMode === 1 ? stylesT.noselect :""].join(" ") }>
            <Title name={test.title}/>
            <div className={stylesT.Timer_div}>
            <Timer  ADDRESS_SITE={ADDRESS_SITE} ADDRESS_SERVER={ADDRESS_SERVER} start={start_time_s} time={Timeneed} left={TimeLeft} URL={URL} testId={test.testId} />
            </div>
            {
                test.tests.map((key, id) => {
                    var task;
                    if(user_result.answer !== undefined) {
                        user_result.answer.map((key1, id) => {
                            if (key.id === key1.id) {
                                task = key1;
                            }
                        })
                    }
                    switch (key.type) {
                        case 1:return (
                            <>
                            <Tests FullAnswer={FullAnswer} SetAnswer={ChangeFullAnswer} cookie={task} id={key.id} key={key.id} data={key} />
                            {test.saveAnswer === 1 ?
                            <div onClick={() => saveAnswer(key.id)} className={styles.btn_save}>
                                    <div className={styles.text_div_save}>
                                        <p className={styles.text}>Сохранить ответ</p>
                                    </div>
                            </div>
                            :""
                            }
                            </>
                        );
                        case 2:return (
                            <>
                                <Answer FullAnswer={FullAnswer} SetAnswer={ChangeFullAnswer} cookie={task} id={key.id} key={key.id} data={key} />
                                {test.saveAnswer === 1 ?
                                    <div onClick={() => saveAnswer(key.id)} className={styles.btn_save}>
                                        <div className={styles.text_div_save}>
                                            <p className={styles.text}>Сохранить ответ</p>
                                        </div>
                                    </div>
                                    :""
                                }
                            </>
                        );
                    }
                })
            }
            <div onClick={() => f()} className={styles.btn}>
                <div className={styles.btn_div}></div>
                <div className={styles.text_div}>
                    <p className={styles.text}>Закончить прохождение</p>
                </div>
            </div>
        </div>
    );
};

export async function getServerSideProps({params}) {
    var response = await fetch(`http://localhost:5000/api/get_test?testId=`+ params.id.substr(0, 18) + `&` + `urlGuests=` + params.id.substr(19, 30));
    var test = await response.json();
// check
    if(test.testId === undefined){

        return{
            notFound: true,
        }
    }
    var URL = params.id.substr(19, 30);
    var urlg = await fetch(`http://localhost:5000/api_s/ifExist_g?testId=`+ params.id.substr(0, 18) + `&` + `urlGuests=` + params.id.substr(19, 30));
    var url_g = await urlg.json();

    var urls = await fetch(`http://localhost:5000/api_s/ifExist_s?testId=`+ params.id.substr(0, 18) + `&` + `urlGuests=` + params.id.substr(19, 30));
    var url_s = await urls.json();

    var urlp = await fetch(`http://localhost:5000/api_s/ifExist_p?testId=`+ params.id.substr(0, 18) + `&` + `urlGuests=` + params.id.substr(19, 30));
    var url_p = await urlp.json();

    var start = await fetch(`http://localhost:5000/api_s/get_time_user?testId=`+ params.id.substr(0, 18) + `&` + `urlGuests=` + params.id.substr(19, 30));
    var start_time = await start.json();


    var left = await fetch(`http://localhost:5000/api_s/get_leftTime_user?testId=`+ params.id.substr(0, 18) + `&` + `urlGuests=` + params.id.substr(19, 30));
    var left_time = await left.json();

    var UserResult = await fetch(`http://localhost:5000/api_s/get_userAnswer?testId=`+ params.id.substr(0, 18) + `&` + `urlGuests=` + params.id.substr(19, 30));
    var user_result = await UserResult.json();
// check

    var Timeneed = test.timeS;
    var intime = 1;
    var cur_time = new Date();
    var start_time_d = new Date(start_time);
    var TimeLeft = Timeneed - (cur_time.getTime() - start_time_d.getTime())/(1000);
    var start_time_s = (start_time_d.getTime());
    if(TimeLeft < 0){
        intime = 0;
    }
    if(!url_g){

        return {
            notFound: true,
        }
    }
    if(url_p){

        return {
            redirect: {
                permanent: false,
                destination: "/test/result/" +  params.id.substr(0, 18) + "-" + URL
            }
        }
    }
    else if(!url_s) {
        return {
            redirect: {
                permanent: false,
                destination: "/test/invite/" +  params.id.substr(0, 18)
            }
        }
    }

    if(intime === 0){

        return{
            notFound: true,
        }
    }

    if(intime === 0 && !url_p){

        return {
            redirect: {
                permanent: false,
                destination: "/test/result/" +  params.id.substr(0, 18) + "-" + params.id.substr(19, 30)
            }
        }
    }
    var ADDRESS_SITE = process.env.ADDRESS_SITE;
    var ADDRESS_SERVER = process.env.ADDRESS_SERVER;
    return{
            props: {test, start_time_s, URL,user_result, ADDRESS_SITE, ADDRESS_SERVER},
    }
}