import Variants from './test_det/Variants';
import styles from "../../../styles/tests/task/Test/Tests.module.css"
import Title from "../Title";
import {useEffect, useState} from "react";

const Tests = ({data, SetAnswer,cookie,FullAnswer}) => {
    var [Answer,setAnswerl ]= useState([]);
    useEffect(()=> {
        let new_a = [];
        for (var i = 0; i < data.Variants.length; i++) {
            var isExist = 0;
            if (cookie !== undefined) {
                for (var i1 = 0; i1 < cookie.answers.length; i1++) {
                    if (data.Variants[i].id === cookie.answers[i1].ids) {
                        new_a.push({ids: data.Variants[i].id, answer: cookie.answers[i1].answer});
                        isExist = 1;
                        break;
                    }
                }
            }
            if (!isExist) {
                new_a.push({ids: data.Variants[i].id, answer: 0})

            }
        }
        setAnswerl(new_a)
    },[])

    // useEffect(()=> {
    //     console.log("SAnswer")
    //     console.log(SAnswer)
    //     console.log(FullAnswer)
    // },[SAnswer]);


    function ChangeAnswer(id){
        var new_a = [...Answer];
        for(var i = 0; i < new_a.length;i++){
            if(new_a[i].ids === id){
                if(new_a[i].answer === 0){
                    new_a[i].answer = 1;
                }else{
                    new_a[i].answer = 0;
                }
                break;
            }
        }
        setAnswerl(new_a)
    }

    useEffect(()=> {
            // var new_a = [...FullAnswer];
            var Task = {id: data.id, type: data.type, answers: [...Answer]};
            // for (let i = 0; i < new_a.length; i++) {
            //     if (new_a[i].id === data.id){
            //         new_a.splice(i,1)
            //         new_a.push(Task)
            //     }
            // }

            SetAnswer(Task)
    },[Answer])

    return (
        <div className={styles.Tests}>
            <Title title={data.title}  description={data.description}/>
            {
                data.Variants.map((key,id) => {
                    var point;
                    if(cookie !== undefined && cookie.answers !== undefined){
                    cookie.answers.map((key1, id) => {
                        if(key.id === key1.ids){
                            point = key1;

                        }
                    })
                    }
                        return(<Variants functionChange={ChangeAnswer} cooki={point} key={id} id={key.id} amount={data.Variants.length} title={key.title} description={key.description}/>)
                    }
                )
            }
        </div>
    );
};

export default Tests;