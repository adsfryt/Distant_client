import React, {useEffect, useState} from 'react';
import styles from "../styles/Timer.module.css"
import dynamic from 'next/dynamic';
import TitleTimer from "./TitleTimer";
import {useRouter} from "next/router";
import PreSend from "./create/PreSend";

const Timer = ({time, left, start, URL, testId,  ADDRESS_SITE, ADDRESS_SERVER}) => {
    var [left_t, setleft] = useState(left);
    const router = useRouter();
    if(left_t > 0) {
        var TimeLeft_y = (left_t) / 31536000;
        TimeLeft_y = Math.floor(TimeLeft_y);

        var TimeLeft_d = (left_t - (TimeLeft_y * 31536000)) / 86400;
        TimeLeft_d = Math.floor(TimeLeft_d);

        var TimeLeft_h = (left_t - (TimeLeft_y * 31536000) - (TimeLeft_d * 86400)) / 3600;
        TimeLeft_h = Math.floor(TimeLeft_h);

        var TimeLeft_m = (left_t - (TimeLeft_y * 31536000) - (TimeLeft_d * 86400) - (TimeLeft_h * 3600)) / 60;
        TimeLeft_m = Math.floor(TimeLeft_m);

        var TimeLeft_s = (left_t - (TimeLeft_y * 31536000) - (TimeLeft_d * 86400) - (TimeLeft_h * 3600) - (TimeLeft_m * 60));
        TimeLeft_s = Math.floor(TimeLeft_s);
    } else{
        TimeLeft_s = 0;
    }

    async function f() {
        try {
            const postData = {
                testId: testId,
                urlGuests: URL
            };
            const response = await fetch(ADDRESS_SERVER + "/api_s/add_passed", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData)
            });
            const result = await response.json();
            router.push('/test/result/' + testId + "-" + result);

        } catch (error) {
            console.error("Error:", error);
        }
    }

    useEffect(() =>{
        var TimeLeft_percent = ((left_t)/time);
        var timer =  setTimeout(() => {
             setleft(time - (new Date().getTime() - start)/1000);

        }, 50);

        if(left_t <= 0) {
            console.log("fff")
            clearTimeout(timer);
            f();
        }
        var Timeline = document.getElementById("circle_time");
        Timeline.style.strokeDasharray = ((126*TimeLeft_percent)) + "px, 200px";
        Timeline.style.stroke =  "rgb(" + (255*((1 - TimeLeft_percent)+0.5)) + "," + 255*(((TimeLeft_percent*2))) + ",0)";

        var TimeTxt = document.getElementById("txt_time");
        TimeTxt.style.color =  "rgb(" + (255*((1 - TimeLeft_percent)+0.5)) + "," + 255*(((TimeLeft_percent*2))) + ",0)";

        var TimeTxt1 = document.getElementById("txt_time1");
        TimeTxt1.style.color =  "rgb(" + (255*((1 - TimeLeft_percent)+0.5)) + "," + 255*(((TimeLeft_percent*2))) + ",0)";

    }, [left_t]);



    return (
        <div className={styles.Timer}>
            <TitleTimer title={"Осталось"} />
            <svg className={styles.svg} viewBox="25 25 50 50">
                <circle  className={styles.circle_under} r="20" cy="50" cx="50"></circle>
                <circle id={"circle_time"} className={styles.circle} r="20" cy="50" cx="50"></circle>
            </svg>
            <div className={styles.div_time}>
                <div className={styles.div_time_in}>
                    {left_t > 86400 ? (<>
                            <p id={"txt_time"} className={styles.text_y }>{TimeLeft_y === 0 || TimeLeft_y === undefined  ? "" : TimeLeft_y + " лет " }
                            {TimeLeft_d === 0 || TimeLeft_d === undefined  ? "" : TimeLeft_d + " дней"}</p>

                    <p id={"txt_time1"} className={styles.text}>{TimeLeft_h === 0 || TimeLeft_h === undefined  ? "" : TimeLeft_h+ ":"}
                    {TimeLeft_m === undefined  ? "" : TimeLeft_m < 10  ? "0" + TimeLeft_m + ":" : TimeLeft_m + ":"}
                    {TimeLeft_s === undefined  ? "" : TimeLeft_s < 10  ? "0" + TimeLeft_s : TimeLeft_s}</p></>)
                    : (<>
                            <p id={"txt_time"} className={styles.text_y }>{TimeLeft_y === 0 || TimeLeft_y === undefined  ? "" : TimeLeft_y + " лет " }
                            {TimeLeft_d === 0 || TimeLeft_d === undefined  ? "" : TimeLeft_d + " дней"}</p>

                            <p id={"txt_time1"} className={styles.text_day}>{TimeLeft_h === 0 || TimeLeft_h === undefined  ? "" : TimeLeft_h+ ":"}
                            {TimeLeft_m === undefined  ? "" : TimeLeft_m < 10  ? "0" + TimeLeft_m + ":" : TimeLeft_m + ":"}
                            {TimeLeft_s === undefined  ? "" : TimeLeft_s < 10  ? "0" + TimeLeft_s : TimeLeft_s}</p></>)
                    }
                </div>
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(Timer), {
    ssr: false
})