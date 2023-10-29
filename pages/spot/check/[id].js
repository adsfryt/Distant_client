import React, {useEffect, useState} from 'react';
import styles from "../../../styles/Spot/Spot.module.css"
import Title from "../../../components/Title";
import List from "../../../components/spot/list";
import Table from "../../../components/spot/table/Table";
import ListUser from "../../../components/spot/check/list";
import CheckTask from "../../../components/spot/check/CheckTask";
import Timer from "../../../components/Timer";



const Check = ({post_s, post_full_s, password, ADDRESS_SITE, ADDRESS_SERVER }) => {
    var ID = [];
    var [post, setpost] = useState(post_s);
    var [post_full, setpost_full] = useState(post_full_s);
    var [CurPage, setCurPage] = useState("Check");
    var [CurUser, setCurUser] = useState("");
    var [CurUserN, setCurUserN] = useState("");
    var tests = [];

    for (let i = 0; i < post_full_s.answer.length; i++) {
        if(post_full_s.answer[i].check === 0){
            ID.push(post_full_s.answer[i])

        }
    }

    for (let i1 = 0; i1 < ID.length; i1++) {
        for (let i = 0; i < post_s.tests.length; i++) {
            if (post_s.tests[i].id === ID[i1].id) {

                tests.push(post_s.tests[i])
            }
        }
    }


    return (
        <div className={styles.Content}>
            <Title name={post.title}/>
            <List CurPage={CurPage} testId={post.testId} password={password}/>
            <ListUser setCurUserN={setCurUserN} user={post_full.urlGuests} passed={post_full.passed} setCurUser={setCurUser} />
            <CheckTask ADDRESS_SITE={ADDRESS_SITE} ADDRESS_SERVER={ADDRESS_SERVER} testId={post.testId} password={password} tests={tests} ID={ID} Answer={post_full.answer} CurUser={CurUser} CurUserN={CurUserN} userAnswer={post_full.userAnswer} userResult={post_full.userResult} />
        </div>
    );
};

export default Check;

export async function getServerSideProps({params}) {

    var response = await fetch(`http://localhost:5000/admin/get_All?testId=`+ params.id.substr(0, 18) + `&` + `password=` + params.id.substr(19, 30));
    var {post, post_full} = await response.json();
    var password = params.id.substr(19, 30);
    if(post === undefined){
        return{
            notFound: true,
        }
    }
    var post_s = post;
    var post_full_s = post_full;
    var ADDRESS_SITE = process.env.ADDRESS_SITE;
    var ADDRESS_SERVER = process.env.ADDRESS_SERVER;
    return{
        props: {post_s, post_full_s, password, ADDRESS_SITE, ADDRESS_SERVER },
    }
}