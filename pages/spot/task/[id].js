import React, {useState} from 'react';
import styles from "../../../styles/Spot/Spot.module.css"
import Title from "../../../components/Title";
import Description from "../../../components/invite/Description";
import Time from "../../../components/invite/Time";
import Peculiarities from "../../../components/invite/Peculiarities";
import STests from "../../../components/Showtests/STest/STests";
import List from "../../../components/spot/list";
import { useRouter } from 'next/navigation';
import SAnswer from "../../../components/Showtests/SAnswer/SAnswer";
var isFinal = false;

const Task = ({post, post_full, password}) => {
    const { push } = useRouter();
    var [isFinal, setF] = useState(false)
    var [CurPage, setCurPage] = useState("Task");
    return (
        <div className={styles.Content}>
            <Title name={post.title}/>
            <List CurPage={CurPage} testId={post.testId} password={password}/>
            <div className={styles.Content_in}>
                <Description description = {post.description} addTime = {post.addTime} author={post.author}/>
                <Time id={0}  duration={post.timeS} start = {post.startTime} end = {post.endTime}/>
                <Peculiarities data={{strickMode:post.strickMode,saveAnswer:post.saveAnswer,editAnswer:post.editAnswer,showAnswer:post.showAnswer}}/>
                <p className={styles.title_text}>Задания:</p>
                {
                    post.tests.map((key, id) => {
                        var answer;
                        var check;
                            post_full.answer.map((key1, id) => {
                                if (key.id === key1.id && key1.check === 1) {
                                    answer = key1.answers;
                                    check = key1.check;
                                }
                            })

                        switch (key.type) {
                            case 1:return (
                                <>
                                    {check === 0 ?<p className={styles.text}>Задание проверяется вручную:</p> : ""}
                                    <STests result={undefined} key={id} answer={answer} uanswer={undefined} data={key} final={undefined} check={check} />
                                </>
                            );
                            case 2:return (
                                <>
                                    {check === 0 ?<p className={styles.text}>Задание проверяется вручную:</p> : ""}
                                    <SAnswer result={undefined} key={id} answer={answer} uanswer={undefined} data={key} final={undefined} check={check} />
                                </>
                            );

                        }
                    })
                }
            </div>
        </div>
    );
};

export default Task;
export async function getServerSideProps({params}) {

    var response = await fetch(`http://localhost:5000/admin/get_All?testId=`+ params.id.substr(0, 18) + `&` + `password=` + params.id.substr(19, 30));
    var {post, post_full} = await response.json();

    var password = params.id.substr(19, 30);
    if(post === undefined){
        return{
            notFound: true,
        }
    }
    return{
        props: {post, post_full,password},
    }
}