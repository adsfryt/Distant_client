import React from 'react';
import styles from "../../styles/tests/task/Test/test_det/Peculiarities.module.css";
import Variants from "../tests/Test/test_det/Variants";

const IsPaused = (props) => {
    if (props.ii === 0) {
        return (<span className={styles.text_s}>Нельзя поставть на паузу</span>);
    } else {
        return (<span className={styles.text_s}>Можно поставть на паузу</span>);
    }
};
const IsStrick = (props) => {
    if (props.ii === 1) {
        return (<span className={styles.text_s}>Нельзя сворачивать страницу или покидать сайт во время теста</span>);
    } else {
        return <></>;
    }
};
const IsSave = (props) => {
    if (props.ii === 0) {
        return (<span className={styles.text_s}>Нельзя сохранить ответ</span>);
    } else {
        return (<span className={styles.text_s}>Можно сохранить ответ</span>);
    }
};
const IsEdit = (props) => {
    if (props.ii === 0) {
        return (<span className={styles.text_s}>Нельзя редактировать ответ</span>);
    } else {
        return (<span className={styles.text_s}>Можно редактировать ответ</span>);
    }
};
const ShowAnswer = (props) => {
    if (props.ii === 0) {
        return (<span className={styles.text_s}>Ответы можно будет увидеть во время прохождения теста</span>);
    } else if (props.ii === 1 ){
        return (<span className={styles.text_s}>Ответы можно будет увидеть после прохождения теста</span>);
    }else if (props.ii === 2 && props.attem !== 1){
        return (<span className={styles.text_s}>Ответы можно будет увидеть после использованиея всех попыток</span>);
    }else if (props.ii === 2 && props.attem === 1){
        return (<span className={styles.text_s}>Ответы можно будет увидеть после прохождения теста</span>);
    }else if (props.ii === 3){
        return (<span className={styles.text_s}>Ответы можно будет увидеть после окончания времени</span>);
    }else{
        return (<span className={styles.text_s}>Ответов на тест не будет</span>);
    }
};
const HowShow = (props) => {
    if (props.ii === 0) {
        return (<span className={styles.text_s}>Вопросы будут выводится списком</span>);
    } else {
        return (<span className={styles.text_s}>Вопросы будут выводится постранично</span>);
    }
};
const Peculiarities = (props) => {

    return (
        <div className={styles.Peculiarities}>
            <div className={styles.div_text_head}>
                <p className={styles.text_head}>Особенности теста:</p>
            </div>
            <div className={styles.div_text}>
                {/*<IsPaused ii={props.data[0]} />*/}
                <p></p>
                <IsStrick ii={props.strickMode} />
                <p></p>
                <IsSave ii={props.saveAnswer} />
                <p></p>
                <IsEdit ii={props.editAnswer} />
                <p></p>
                <ShowAnswer ii={props.showAnswer} />
                <p></p>
                {/*<HowShow ii={props.data[5]} />*/}
                <p></p>
                {/*<span className={styles.text_s}>Количество попыток:</span>*/}
                {/*<span className={styles.text}>{props.data[6]}</span>*/}
                <p></p>
                {/*<span className={styles.text_s}>Доступные языки для прохождения:</span>*/}
                {/*{props.language.map((key,id) => (<span key={id} className={styles.text}>{key}</span>))}*/}
            </div>
            
        </div>
    );
};
export default Peculiarities;