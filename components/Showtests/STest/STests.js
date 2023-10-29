import Variants from './test_det/Variants';
import styles from "../../../styles/tests/task/Test/Tests.module.css"
import Title from "../../tests/Title";
import {useEffect, useState} from "react";

const Tests = ({data, uanswer, answer, result, final, check}) => {
    var uAnswer;
    var Answer;
    var Result;



    if(check === 1){
        if(answer !== undefined) {
            if (answer[0] !== undefined) {
                Answer = answer[0];
            }
        }
    }
    if(uanswer !== undefined && uanswer.answers !== undefined) {
        uAnswer = uanswer.answers;
        if(check === 0){
            if (result !== undefined){
                if(result.Idmax !== undefined){
                    if(answer[result.Idmax] !== undefined) {
                        Answer = answer[result.Idmax];
                    }
                }
            }
        }
    }

    return (

        <div className={styles.Tests}>
            <Title title={data.title} />
            {
                data.Variants.map((key,id) => {
                    var point;
                    var answer;
                    if(uanswer !== undefined && uanswer.answers !== undefined){
                        uAnswer.map((key1, id) => {
                        if(key.id === key1.ids){
                            point = key1;
                        }
                    });
                    }
                    if(Answer !== undefined) {
                        Answer.map((key1, id) => {
                            if (key.id === key1.ids) {
                                answer = key1.answer;
                            }
                        })
                    }
                        return(<Variants check={check} isfinal={final} answer={answer} cooki={point} key={id} id={key.id} amount={data.Variants.length} title={key.title} description={key.description}/>)
                    }
                )
            }
        </div>

    );
};

export default Tests;