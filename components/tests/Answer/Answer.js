import React, {useEffect, useState} from 'react';
import style from "../../../styles/tests/task/Answer/Answer.module.css"
import Title from "../Title";
import styles from "../../../styles/tests/task/Answer/Answer.module.css";
import Variants from "./answer_det/Variants";

const Answer = ({data, SetAnswer,cookie,FullAnswer}) => {
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
                new_a.push({ids: data.Variants[i].id, answer: ""})
            }
        }
        setAnswerl(new_a)
    },[])


    useEffect(()=>{
        //console.log(SAnswer)
        var Task = {id: data.id, type: data.type, answers: [...Answer]};
        SetAnswer(Task)
    },[Answer]);

    function ChangeAnswer(id, value){
        console.log("ggg")
        var new_a = [...Answer];
        for(var i = 0; i < new_a.length;i++){
            if(new_a[i].ids === id){
                new_a[i].answer = value;
                break;
            }
        }
        setAnswerl(new_a)
    }

    return (
        <div  className={styles.Answer}>
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
                        return(<Variants functionChange={ChangeAnswer}  cooki={point} key={id} id={key.id} amount={data.Variants.length} condition={key.condition} question={key.question}/>)
                    }
                )
            }
        </div>
    );
};

export default Answer;