import React from 'react';
import styles from "../../../styles/tests/task/Answer/Answer.module.css";
import Title from "../../tests/Title";
import Variants from "./answer_det/Variants";

const SAnswer = ({data, uanswer, answer, result, final, check}) => {
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
    console.log(uanswer)
    return (
        <div  className={styles.Answer}>
            <Title title={data.title}  description={data.description}/>
            {
                data.Variants.map((key,id) => {
                    var point;
                    var answer;
                    if(uanswer !== undefined && uanswer.answers !== undefined){
                        uAnswer.map((key1, id) => {
                            if(key.id === key1.ids){
                                point = key1.answer;
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
                        return(<Variants uanswer={point} answer={answer} key={id} id={key.id} condition={key.condition} question={key.question}/>)
                    }
                )
            }
        </div>
    );
};

export default SAnswer;