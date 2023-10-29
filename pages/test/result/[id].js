import React, {useEffect, useState} from 'react';
import Title from "../../../components/Title";
import styles from "../../../styles/tests/result/Result.module.css";
import Router from "next/router";
import Load from "../../../components/result/Load";
import Tests from "../../../components/tests/Test/Tests";
import STests from "../../../components/Showtests/STest/STests";
import SAnswer from "../../../components/Showtests/SAnswer/SAnswer";

const Result = ({test, Result, uAnswer, Answer, ADDRESS_SITE, ADDRESS_SERVER}) => {
    var points=0;

    if( Result.answer !== undefined){
        for (let j = 0; j < Result.answer.length; j++) {
            points += Result.answer[j].result;
        }
    }

    return (
        <>
            <div className={styles.Content}>
            <Title name={test.title}/>
            {Result === "no answer yet" ?
                test.showAnswer === 0 ? (<><p className={styles.text_s}>Результаты теста:</p> <Load/> </>) :
                    test.showAnswer === 1 ? (<><p className={styles.text_s}>Результаты здесь скоро появятся. Обновите страницу.</p><Load/> </>) :
                        test.showAnswer === 2 ? (<> <p className={styles.text_s}>Результаты здесь появятся после завершения теста.</p><Load/> </>) :
                            test.showAnswer === 3 ? (<> <p className={styles.text_s}>Результаты теста появятся, как только автор проверит его.</p><Load/> </>) :
                (<p className={styles.text_s}>Результаты теста не появятся</p>)
            :<>
                    <p className={styles.text_s}>Результаты теста:</p>
                    <p className={styles.text_s}>Количество баллов: {points}</p>
                    {
                        test.tests.map((key, id) => {
                            var uanswer;
                            var answer;
                            var result;
                            var isfinal;
                            var check;
                            var ismake;
                            if(uAnswer.answer[0] !== undefined) {
                                uAnswer.answer.map((key1, id) => {
                                    if (key.id === key1.id) {
                                        uanswer = key1;
                                    }
                                })
                            }
                            if(Answer[0] !== undefined) {
                                Answer.map((key1, id) => {
                                    if (key.id === key1.id && key1.check === 1) {
                                        answer = key1.answers;
                                        check = key1.check;
                                    }
                                })
                            }

                            if(Result.answer !== undefined) {
                                Result.answer.map((key1, id) => {
                                    if (key.id === key1.id) {
                                        result = key1;
                                        isfinal = key1.final;
                                    }
                                })
                            }

                            switch (key.type) {
                                case 1:return (
                                    <>
                                        {isfinal === 0 ?<p className={styles.text}>Задание проверяется:</p> : ""}
                                        {isfinal === undefined ?<p className={styles.text}>Задание не выполненно:</p> : ""}
                                        <STests result={result} key={id} answer={answer} uanswer={uanswer} data={key} final={isfinal} check={check} />
                                    </>
                                );
                                case 2:return (
                                    <>
                                        {isfinal === 0 ?<p className={styles.text}>Задание проверяется:</p> : ""}
                                        {isfinal === undefined ?<p className={styles.text}>Задание не выполненно:</p> : ""}
                                        <SAnswer result={result} key={id} answer={answer} uanswer={uanswer} data={key} final={isfinal} check={check} />
                                    </>
                                );
                            }
                        })
                    }
                </>
            }
            </div>
        </>
    )
};

export default Result;
export async function getServerSideProps({params}) {
    var responsef = await fetch(`http://localhost:5000/api/get_test_name?testId=`+ params.id.substr(0, 18)  + `&` + `urlGuests=` + params.id.substr(19, 30));
    var tests = await responsef.json();


    var start = await fetch(`http://localhost:5000/api_s/get_time_user?testId=`+ params.id.substr(0, 18) + `&` + `urlGuests=` + params.id.substr(19, 30));
    var start_time = await start.json();

    var urls = await fetch(`http://localhost:5000/api_s/ifExist_s?testId=`+ params.id.substr(0, 18) + `&` + `urlGuests=` + params.id.substr(19, 30));
    var url_s = await urls.json();

    var urlp = await fetch(`http://localhost:5000/api_s/ifExist_p?testId=`+ params.id.substr(0, 18) + `&` + `urlGuests=` + params.id.substr(19, 30));
    var url_p = await urlp.json();

    var Timeneed = tests.timeS;
    var intime = 1;
    var cur_time = new Date();
    var start_time_d = new Date(start_time);
    var TimeLeft = Timeneed - (cur_time.getTime() - start_time_d.getTime())/(1000);
    console.log(tests.timeS)
    if(TimeLeft < 0){
        intime = 0;

    }
    if(intime === 0 && !url_p){
        const postData = {
            testId: tests.testId,
            urlGuests: params.id.substr(19, 30),
        };

        const response = await fetch("http://localhost:5000/api_s/add_passed", {  // check
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData)
        });
    }

    var response = await fetch(`http://localhost:5000/api/get_test_after?testId=`+ params.id.substr(0, 18) + `&` + `urlGuests=` + params.id.substr(19, 30));
    var test = await response.json(); // check

    if(test.testId === undefined){
        return{
            notFound: true,
        }
    }

    var Results = await fetch(`http://localhost:5000/api_s/get_userResult?testId=`+ params.id.substr(0, 18) + `&` + `urlGuests=` + params.id.substr(19, 30));
    var Result = await Results.json(); // check

    var uAnswers = await fetch(`http://localhost:5000/api_s/get_userAnswer?testId=`+ params.id.substr(0, 18) + `&` + `urlGuests=` + params.id.substr(19, 30));
    var uAnswer = await uAnswers.json();// check

    var Answers = await fetch(`http://localhost:5000/api_s/get_Answer_after?testId=`+ params.id.substr(0, 18) + `&` + `urlGuests=` + params.id.substr(19, 30));
    var Answer = await Answers.json();// check

    var urlg = await fetch(`http://localhost:5000/api_s/ifExist_g?testId=`+ params.id.substr(0, 18) + `&` + `urlGuests=` + params.id.substr(19, 30));
    var url_g = await urlg.json();

    console.log(Answer);



    if(!(url_s && url_g && url_p)) {
        return{
            notFound: true,
        }
    }

    var ADDRESS_SITE = process.env.ADDRESS_SITE;
    var ADDRESS_SERVER = process.env.ADDRESS_SERVER;
    return{
        props: {test, Result,uAnswer, Answer, ADDRESS_SITE, ADDRESS_SERVER },
    }
}