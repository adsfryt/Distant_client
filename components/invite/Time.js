import React from 'react';
import styles from "../../styles/tests/task/Test/test_det/Time.module.css";
import {useState, useEffect} from 'react';
import dynamic from 'next/dynamic';

const Time = (props) => {
    var startDate = new Date(props.start);
    var endDate = new Date(props.end);
    var curDate = new Date();
    var [Timepast,useTimepast] = useState((curDate-startDate)/1000);
    // var [OnFocus, useOnFocus] = useState(1);
    // var [OnBlur, useOnBlur] = useState(0);
    // let [Start_time_past_Seconds, useStart ] = useState(0);
    // let [Finished_time_past_Seconds, useFinished ] = useState(0);
    // let [time_past_Seconds, usePast ] = useState(0);
    // var i_b = 0;
    // var i_f = 0;

    var startDate_str = startDate.getFullYear() + "." ;
    startDate_str +=  (startDate.getMonth()+1) < 10 ? "0"+(startDate.getMonth()+1) +"." : (startDate.getMonth()+1)+".";
    startDate_str +=  startDate.getDate() < 10 ? "0"+startDate.getDate()+" " : startDate.getDate() + " ";

    startDate_str +=  startDate.getHours() < 10 ? "0"+startDate.getHours()+":" : startDate.getHours() + ":";
    startDate_str +=  startDate.getMinutes() < 10 ? "0"+startDate.getMinutes() : startDate.getMinutes();


    var endDate_str = startDate.getFullYear() + "." ;
    endDate_str +=  (endDate.getMonth()+1) < 10 ? "0"+(endDate.getMonth()+1) +"." : (endDate.getMonth()+1)+".";
    endDate_str +=  endDate.getDate() < 10 ? "0"+endDate.getDate()+" " : endDate.getDate() + " ";

    endDate_str +=  endDate.getHours() < 10 ? "0"+endDate.getHours()+":" : endDate.getHours() + ":";
    endDate_str +=  endDate.getMinutes() < 10 ? "0"+endDate.getMinutes() : endDate.getMinutes();

    var Timeneed = (endDate-startDate)/1000;

    var TimeLeft = (Timeneed - Timepast);
    if(TimeLeft > 0) {
        var TimeLeft_y = (Timeneed - Timepast) / 31536000;
        TimeLeft_y = Math.floor(TimeLeft_y);

        var TimeLeft_d = (Timeneed - Timepast - (TimeLeft_y * 31536000)) / 86400;
        TimeLeft_d = Math.floor(TimeLeft_d);

        var TimeLeft_h = (Timeneed - Timepast - (TimeLeft_y * 31536000) - (TimeLeft_d * 86400)) / 3600;
        TimeLeft_h = Math.floor(TimeLeft_h);

        var TimeLeft_m = (Timeneed - Timepast - (TimeLeft_y * 31536000) - (TimeLeft_d * 86400) - (TimeLeft_h * 3600)) / 60;
        TimeLeft_m = Math.floor(TimeLeft_m);

        var TimeLeft_s = (Timeneed - Timepast - (TimeLeft_y * 31536000) - (TimeLeft_d * 86400) - (TimeLeft_h * 3600) - (TimeLeft_m * 60));
        TimeLeft_s = Math.floor(TimeLeft_s);
    } else{
        TimeLeft_s = 0;
        TimeLeft = 0;
    }

    // function blur() {
    //     if (OnBlur === 0) {
    //         useStart(Number( new Date().getTime()));
    //         usePast(Timepast);
    //         useOnBlur(1);
    //         useOnFocus( 0);
    //         i_b = 0;
    //
    //     }
    // }
    // function focus() {
    //     if (OnFocus === 0) {
    //         useFinished(Number(new Date().getTime()));
    //         useOnBlur(0);
    //         useOnFocus( 1);
    //         i_f = 0;
    //     }
    //
    // }
    //
    // useEffect(() =>{
    //     if (OnFocus === 1) {
    //         window.addEventListener("blur", blur);
    //     }
    //         if (OnBlur === 1) {
    //             window.removeEventListener("blur", blur);
    //         }
    //     if (OnBlur === 1) {
    //         window.addEventListener("focus", focus);
    //     }
    //     if(OnFocus === 1){
    //         console.log(Finished_time_past_Seconds,1);
    //
    //         let r = Number(Finished_time_past_Seconds - Start_time_past_Seconds);
    //         console.log(r,8);
    //         if (time_past_Seconds + ((Finished_time_past_Seconds - Start_time_past_Seconds)/1000) > Timepast) {
    //             useTimepast(Timepast + ((Finished_time_past_Seconds - Start_time_past_Seconds)/1000));
    //             console.log( time_past_Seconds,2);
    //         }else{
    //
    //         }
    //         console.log(10);
    //         window.removeEventListener("focus", focus);
    //     }
    //
    // },[ OnBlur,OnFocus]);

    var Timeneed1 = props.duration;
    var TimeLeft_y1 = Timeneed1 / 31536000;
    TimeLeft_y1 = Math.floor(TimeLeft_y1);

    var TimeLeft_d1 = (Timeneed1 - (TimeLeft_y1 * 31536000)) / 86400;
    TimeLeft_d1 = Math.floor(TimeLeft_d1);

    var TimeLeft_h1 = (Timeneed1  - (TimeLeft_y1 * 31536000) - (TimeLeft_d1 * 86400)) / 3600;
    TimeLeft_h1 = Math.floor(TimeLeft_h1);

    var TimeLeft_m1 = (Timeneed1  - (TimeLeft_y1 * 31536000) - (TimeLeft_d1 * 86400) - (TimeLeft_h1 * 3600)) / 60;
    TimeLeft_m1 = Math.floor(TimeLeft_m1);

    var TimeLeft_s1 = (Timeneed1 - (TimeLeft_y1 * 31536000) - (TimeLeft_d1 * 86400) - (TimeLeft_h1 * 3600) - (TimeLeft_m1 * 60));
    TimeLeft_s1 = Math.floor(TimeLeft_s1);

    useEffect(() =>{
        var TimeLeft_percent = ((TimeLeft)/Timeneed)*100;
        var  prev = Number( new Date().getTime());
        var timer = setTimeout(() => {
            useTimepast(Timepast + ((Number( new Date().getTime()) - prev)/1000));
            prev = Number( new Date().getTime());
        }, 30);

        if(TimeLeft_percent <= 0) {
            clearTimeout(timer);
        }
        if(TimeLeft_percent >= 100) {
            TimeLeft_percent = 100;
        }
        var Timeline = document.getElementById("TimeShow" + props.id);
        Timeline.style.width = (100 - TimeLeft_percent) + "%";
    },[Timepast]);

    return (
        <div className={styles.Time}>
            <div className={styles.div_text_head}>
                <p className={styles.text_head}>Время:</p>
            </div>

            <div className={styles.div_text}>
                <span className={styles.text_s}>
                    Длительность:
                </span>
                <p  className={styles.par}></p>
                    {TimeLeft_y1 === 0 || TimeLeft_y1 === undefined  ? "" : <span className={styles.text +" "+ styles.time}>{TimeLeft_y1} лет</span>}
                    {TimeLeft_d1 === 0 || TimeLeft_d1 === undefined  ? "" : <span className={styles.text +" "+ styles.time}>{TimeLeft_d1} дней</span>}
                    {TimeLeft_h1 === 0 || TimeLeft_h1 === undefined  ? "" : <span className={styles.text +" "+ styles.time}>{TimeLeft_h1} часов</span>}
                    {TimeLeft_m1 === 0 || TimeLeft_m1 === undefined  ? "" : <span className={styles.text +" "+ styles.time}>{TimeLeft_m1} минут</span>}
                    <span className={styles.text +" "+ styles.time}>{TimeLeft_s1 === undefined  ? "" : TimeLeft_s1 + " секунд"}</span>
                <p></p>
                <span className={styles.text_s}>
                    Можно пройти с
                </span>
                <p  className={styles.par}></p>
                <span className={styles.text}>{startDate_str}</span>
                <span className={styles.texts}>
                    до
                </span>
                <p  className={styles.par}></p>
                <span className={styles.text}>{endDate_str}</span>
                <p></p>
                <span className={styles.text_s}>
                    Осталось времени для прохождения:
                </span>
                <p  className={styles.par}></p>
                {TimeLeft_y === 0 || TimeLeft_y === undefined  ? "" : <span className={styles.text +" "+ styles.time}>{TimeLeft_y} лет</span>}
                {TimeLeft_d === 0 || TimeLeft_d === undefined  ? "" : <span className={styles.text +" "+ styles.time}>{TimeLeft_d} дней</span>}
                {TimeLeft_h === 0 || TimeLeft_h === undefined  ? "" : <span className={styles.text +" "+ styles.time}>{TimeLeft_h} часов</span>}
                {TimeLeft_m === 0 || TimeLeft_m === undefined  ? "" : <span className={styles.text +" "+ styles.time}>{TimeLeft_m} минут</span>}
                <span className={styles.text +" "+ styles.time}>{TimeLeft_s === undefined  ? "" : TimeLeft_s + " секунд"}</span>
            </div>
            <div className={styles.under_div_timeline}>
            <div id={"TimeShow" + props.id} className={styles.div_timeline}> </div>
            </div>
        </div>
    );
};
export default dynamic(() => Promise.resolve(Time), {
    ssr: false
})
