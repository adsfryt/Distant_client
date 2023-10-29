import Tests from "../../../components/tests/Test/Tests"
import Title from "../../../components/Title"
import styles from "../../../styles/tests/invite/Invite.module.css";
import React, {useState, useEffect} from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Variants from "../../../components/tests/Test/test_det/Variants";
import Description from "../../../components/invite/Description";
import Time from "../../../components/invite/Time";
import Peculiarities from "../../../components/invite/Peculiarities";
import InputName from "../../../components/invite/InputName";
import OutputName from "../../../components/invite/OutputName";

export default function Test({test, name_url_g, URLs, ADDRESS_SITE, ADDRESS_SERVER}) {

    const { push } = useRouter();

    const [ Name, setName ] = useState(name_url_g );
    const getName = (e) => {
        setName(e);
    };

    async function f() {
        try {
            var curDate = new Date();
            var endDate = new Date(test.endTime);
            if(Name !== "" && endDate.getTime() > curDate.getTime() && Name.replaceAll(" ","") !== "" && Name.length < 25) {
                const postData = {
                    testId: test.testId,
                    name: Name,
                    urlGuests: URLs
                };
                console.log(URLs);
                const response = await fetch(ADDRESS_SERVER + "/api_s/add_link", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(postData)
                });
                const result = await response.json();
                if(result !== "no"){
                    push('/test/' + test.testId + "-" + result);
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

        return (
            <>
                <Title name = {test.title}/>
                <Description description = {test.description} addTime = {test.addTime} author={test.author}/>
                <Time id={1}  duration={test.timeS} start = {test.startTime} end = {test.endTime}/>
                <Peculiarities data={{strickMode:test.strickMode,saveAnswer:test.saveAnswer,editAnswer:test.editAnswer,showAnswer:test.showAnswer}}/>
               {
                   name_url_g === "" ? <InputName getName={getName} /> : <OutputName Name={name_url_g} />
               }
                <div onClick={() => f()} className={styles.btn}>
                    <div className={styles.btn_div}></div>
                    <div className={styles.text_div}>
                        <p className={styles.text}>Начать прохождение</p>
                    </div>
                </div>
                <div className={styles.text_out_div}>
                <p  className={styles.text_s}>После начала теста, вы сможете использовать индивидуальную ссылку(которая будет находится в адресной строке) для дальнейшего прохождения. Все ответы сохранятся</p>
            </div>
            </>
        );

};

export async function getServerSideProps({params}) {
    var test;

    var url_g = 1;
    var url_s = 0;
    var url_p = 0;
    var URLs = "d";
    var name_url_g = "";
    if(params.id.substr(19, 30)){
        var urlg = await fetch(`http://localhost:5000/api_s/ifExist_g?testId=`+ params.id.substr(0, 18) + `&` + `urlGuests=` + params.id.substr(19, 30));
        url_g = await urlg.json();

        var responsef = await fetch(`http://localhost:5000/api/get_test_name?testId=`+ params.id.substr(0, 18)  + `&` + `urlGuests=` + params.id.substr(19, 30));
        test = await responsef.json();

        var urls = await fetch(`http://localhost:5000/api_s/ifExist_s?testId=`+ params.id.substr(0, 18) + `&` + `urlGuests=` + params.id.substr(19, 30));
        url_s = await urls.json();
        var urlp = await fetch(`http://localhost:5000/api_s/ifExist_p?testId=`+ params.id.substr(0, 18) + `&` + `urlGuests=` + params.id.substr(19, 30));
        url_p = await urlp.json();

        var name_urlg = await fetch(`http://localhost:5000/api_s/get_name_g?testId=`+ params.id.substr(0, 18) + `&` + `urlGuests=` + params.id.substr(19, 30));
        name_url_g = await name_urlg.json();
        URLs = params.id.substr(19, 30);
    }else{
        var response = await fetch(`http://localhost:5000/api/get_test_n?testId=`+ params.id.substr(0, 18));
        test = await response.json();
    }

    // if(test.publicMode === 0){
    //     return {
    //         notFound: true,
    //     }
    // }
    var timeStart = (new Date(test.startTime)).getTime();
    var timeEnd = (new Date(test.endTime)).getTime();

    var timeServer = await fetch(`http://localhost:5000/api_s/get_time`);
    var timeServerJson = await timeServer.json();

    if(!url_g){
        return {
            notFound: true,
        }
    }
    if(!(timeStart < timeServerJson && timeEnd > timeServerJson)){
        return {
            notFound: true,
        }
    }
    if(url_p){

        return {
            redirect: {
                permanent: false,
                destination: "/test/result/" +  params.id.substr(0, 18) + "-" + params.id.substr(19, 30)
            }
        }
    }
    if(url_g && url_s){
        return {
            redirect: {
                permanent: false,
                destination: "/test/" +  params.id.substr(0, 18) + "-" + params.id.substr(19, 30)
            }
        }
    }
    var ADDRESS_SITE = process.env.ADDRESS_SITE;
    var ADDRESS_SERVER = process.env.ADDRESS_SERVER;

    if(test.testId === undefined){
        return{
            notFound: true,
        }
    }
    return{
            props: {test, name_url_g, URLs, ADDRESS_SITE, ADDRESS_SERVER},
        }
}