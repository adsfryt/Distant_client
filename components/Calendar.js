import React, {useEffect, useState} from 'react';
import styles from "../styles/create/Calendar.module.css"
import {formatNextPathnameInfo} from "next/dist/shared/lib/router/utils/format-next-pathname-info";
import dynamic from "next/dynamic";
import {log} from "next/dist/server/typescript/utils";
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
var showv = false;
const Calendar = ({fn, cur_time, id}) => {
    var [show, setShow] = useState(false);
    var startdate = new Date(cur_time);

    var [Years, setYears] = useState([]);
    var [Month,setMonth] = useState([["Январь",0],["Февраль",1],["Март",2],["Апрель",3],["Май",4],["Июнь",5],["Июль",6],["Август",7],["Сентябрь",8],["Октябрь",9],["Ноябрь",10],["Декабрь",11]]);
    var [Day, setDay] = useState([[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]]);
    var [Hour, setHour] = useState([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]);
    var [Minute, setMinute] = useState([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59])


    var [Time, setTime] = useState({year:startdate.getFullYear(),month:startdate.getMonth(),day:startdate.getDate(),hour:startdate.getHours()+1,minute:startdate.getMinutes()});
    var [State, SetState] = useState("Year");
    var [weekH, setWeekH] = useState([]);


    useEffect(()=>{
        var new_y = [...Years];
        new_y = [];
        for (let i = startdate.getFullYear(); i < startdate.getFullYear()+25; i++) {
            new_y.push(i)
        }
        setYears(new_y);

    },[])


    useEffect(()=>{
        fn(Time)
    },[Time]);

    function Showf() {
        if(show === true){
            setShow(false)
        }
        else{
            setShow(true)
        }
    }

    function ToDays(value) {
        SetState("Day");
        setTime(t =>({...t, month:value}));
        if(Time.year === startdate.getFullYear() && value === startdate.getMonth()){
        setTime(t =>({...t, day:startdate.getDate()}));
        }else{
            setTime(t =>({...t, day:1}));
        }
        var MDate = new Date();
        MDate.setFullYear(Time.year);
        MDate.setDate(1);
        MDate.setMonth(value);

        var new_weekH = [...weekH];
        new_weekH = [];
        for (let i = 0; i < MDate.getDay()-1; i++) {
            new_weekH.push(0);
        }
        setWeekH(new_weekH);
    }

    useEffect(()=>{
        // var isClick = false;
        // function handle(event) {
        //     var box = document.getElementById("Calendar" + id);
        //     console.log(id)
        //     console.log(showv);
        //     if(showv){
        //         if (!isClick) {
        //             isClick = true;
        //         }else{
        //             console.log(!box.contains(event.target));
        //             if (box && !box.contains(event.target)) {
        //                 isClick = false;
        //                 console.log("///");
        //                 setShow(false);
        //             }
        //         }
        //     }
        //
        // }
        // document.addEventListener('click',handle);

        function handle(event) {
            var box = document.getElementById("Calendar" + id);
            var box_out = document.getElementById("CalendarView" + id);
            var isContain = false;
            var cur_el = event.target;
            while (cur_el.parentNode.id !== "__next"){

                if(cur_el.parentNode.id === "Calendar" + id){
                    isContain = true;

                    break;
                }else{
                    cur_el = cur_el.parentNode;
                }
            }

            if (box && !isContain && !box_out.contains(event.target)) {

                setShow(false);
            }

        }
        document.addEventListener('click', handle);

    },[]);

    useEffect(()=>{
        //console.log(show)
        showv = show;
    },[show]);

    function showList(value, svg) {
        var el = document.getElementById(value);
        var svg_el = document.getElementById(svg);
        if(el.style.gridTemplateRows === "1fr"){
            svg_el.style.transform = "rotate(0deg)";
            el.style.gridTemplateRows = "0fr";
        }else{
            svg_el.style.transform = "rotate(180deg)";
            el.style.gridTemplateRows = "1fr";
        }
    }

    function ToMonth(key) {
        SetState("Month");
        if(key === startdate.getFullYear()) {
            setTime(t =>({...t, year:key, month:startdate.getMonth(),day: startdate.getDate()}))
        }else {
            setTime(t =>({...t, year:key, month:0, day:1}))
        }
    }

        return (
        <>
        <div id={"CalendarView" + id} onClick={Showf} className={styles.Time}>
            <p className={styles.text_year}>{Time.year}</p>
            <p className={styles.text_month}>{Month[Time.month][0]}</p>
            <p className={styles.text_day}>{Time.day}</p>

            <p className={styles.text_hour}>{Time.hour >= 10 ? Time.hour : "0" + Time.hour}</p>
            <p className={styles.text}>:</p>
            <p className={styles.text_minute}>{Time.minute >= 10 ? Time.minute : "0" + Time.minute}</p>
        </div>
            {
                show === true ?
                    <>
                    <div className={styles.Calendar_out} id={"Calendar" + id}>
                            {State === "Year" ?
                                <div className={styles.Calendar}>
                                    <div className={styles.CalendarYear}>
                                    {
                                        Years.map((key, ids) =>
                                            (<div className={styles.year} onClick={async () =>{await sleep(10); ToMonth(key)}}>{key}</div>)
                                        )
                                    }
                                </div>
                                </div>
                            : State === "Month" ?
                                <div className={styles.Calendar}>
                                    <svg  onClick={async () =>{await sleep(10);SetState("Year")}} className={styles.svg_back} viewBox="-100 -100 3048.34 2856.08">
                                        <path className={styles.cls}
                                              d="M4866.54,6552.39,3790.12,4588.47c-23.5-42.88-112-42.88-135.49,0L2578.2,6552.39"
                                              transform="translate(-2348.2 -4326.31)"/>
                                    </svg>
                                <div className={styles.CalendarMonth}>
                                        {Time.year !== startdate.getFullYear() ?
                                            Month.map((Month) =>
                                                (<div className={styles.month} onClick={async () =>{await sleep(10);ToDays(Month[1])}}>{Month[0]}</div>)
                                            ):
                                            Month.map((Month) =>{
                                                if (Month[1] >= startdate.getMonth())
                                                {return (<div className={styles.month} onClick={async () =>{await sleep(10);ToDays(Month[1])}}>{Month[0]}</div>)}
                                            }
                                            )
                                        }
                                </div>
                                </div>
                            : State === "Day" ?
                                <div className={styles.Calendar}>
                                    <svg  onClick={async () =>{await sleep(10);SetState("Month")}} className={styles.svg_back} viewBox="-100 -100 3048.34 2856.08">
                                        <path className={styles.cls}
                                              d="M4866.54,6552.39,3790.12,4588.47c-23.5-42.88-112-42.88-135.49,0L2578.2,6552.39"
                                              transform="translate(-2348.2 -4326.31)"/>
                                    </svg>
                                    <div className={styles.CalendarDay}>
                                    {
                                        weekH.map((key)=>(
                                            <div></div>
                                        ))
                                    }
                                    {
                                        Day[Time.month].map((key) =>{
                                            if(Time.month === 1) {
                                                if (key === 29 && (Time.year % 4 === 0 && Time.year % 100 !== 0)) {
                                                    if (Time.year === startdate.getFullYear() && Time.month === startdate.getMonth() && key < startdate.getDate()) {
                                                        return (<div className={styles.day_gost}>{key}</div>)
                                                    } else {
                                                        return (<div className={styles.day} onClick={async () =>{await sleep(10);
                                                            SetState("Hour");
                                                            setTime(t => ({...t, day: key}))
                                                        }}>{key}</div>)
                                                    }
                                                } else if (Time.year % 400 === 0) {
                                                    if (Time.year === startdate.getFullYear() && Time.month === startdate.getMonth() && key < startdate.getDate()) {
                                                        return (<div className={styles.day_gost}>{key}</div>)
                                                    } else {
                                                        return (<div className={styles.day} onClick={async () =>{await sleep(10);
                                                            SetState("Hour");
                                                            setTime(t => ({...t, day: key}))
                                                        }}>{key}</div>)
                                                    }
                                                } else if (key !== 29) {
                                                    if (Time.year === startdate.getFullYear() && Time.month === startdate.getMonth() && key < startdate.getDate()) {
                                                        return (<div className={styles.day_gost}>{key}</div>)
                                                    } else {
                                                        return (<div className={styles.day} onClick={async () =>{await sleep(10);
                                                            SetState("Hour");
                                                            setTime(t => ({...t, day: key}))
                                                        }}>{key}</div>)
                                                    }
                                                }
                                            }else{

                                                    if (Time.year === startdate.getFullYear() && Time.month === startdate.getMonth() && key < startdate.getDate()) {
                                                        return (<div className={styles.day_gost}>{key}</div>)
                                                    } else {
                                                        return (<div className={styles.day} onClick={async () =>{await sleep(10);
                                                            SetState("Hour");
                                                            setTime(t => ({...t, day: key}))
                                                        }}>{key}</div>)
                                                    }

                                            }

                                        })
                                    }
                                </div>
                                </div>
                            : State === "Hour" ?
                                <div className={styles.Calendar_h}>
                                    <svg  onClick={async () =>{await sleep(10);SetState("Day")}} className={styles.svg_back} viewBox="-100 -100 3048.34 2856.08">
                                        <path className={styles.cls}
                                              d="M4866.54,6552.39,3790.12,4588.47c-23.5-42.88-112-42.88-135.49,0L2578.2,6552.39"
                                              transform="translate(-2348.2 -4326.31)"/>
                                    </svg>
                                    <div id={"calendar" + "list_hour" + id + "_" + 0} className={styles.Hour_list}>
                                        <div  className={styles.Hour_list_in}>
                                            <div className={styles.Hour_list_in_in}>
                                                {
                                                    Hour.map((key) =>{
                                                        if(Time.year === startdate.getFullYear() &&  Time.month === startdate.getMonth() &&  Time.day === startdate.getDate() && key < startdate.getHours() ){
                                                            return (<div className={styles.hour_gost}>{key}</div>)
                                                        }else{
                                                            return (<div className={styles.hour} onClick={async () =>{await sleep(10);setTime(t=>({...t, hour:key}))}}>{key}</div>)
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div  id={"calendar" + "list_hour" + id + "_" + 1} className={styles.Minute_list}>
                                        <div  className={styles.Hour_list_in}>
                                            <div className={styles.Hour_list_in_in}>
                                        {
                                            Minute.map((key) =>{
                                                if(Time.year === startdate.getFullYear() &&  Time.month === startdate.getMonth() &&  Time.day === startdate.getDate() && Time.hour === startdate.getHours() && key < startdate.getMinutes()){
                                                    return (<div className={styles.hour_gost}>{key}</div>)
                                                }else {
                                                    return (<div onClick={async () =>{await sleep(10);setTime(t => ({...t, minute: key}))}} className={styles.hour}>{key}</div>)
                                                }
                                            })
                                        }
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.CalendarHour}>
                                        <div onClick={() => showList("calendar" + "list_hour" + id + "_" + 0, "calendar" + "svglist_hour" + id + "_" + 0)} className={styles.Hour_div_out}>
                                            <div className={styles.Hour_div}>
                                                {Time.hour}
                                            </div>
                                            <div className={styles.Hour_div_b}>
                                                <svg  id={"calendar" + "svglist_hour" + id + "_" + 0}  className={styles.svg} viewBox="-100 -100 3048.34 2856.08">
                                                    <path className={styles.cls}
                                                          d="M4866.54,6552.39,3790.12,4588.47c-23.5-42.88-112-42.88-135.49,0L2578.2,6552.39"
                                                          transform="translate(-2348.2 -4326.31)"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <p className={styles.text_h}>
                                           :
                                        </p>
                                        <div onClick={() => showList("calendar" + "list_hour" + id + "_" + 1, "calendar" + "svglist_hour" + id + "_" + 1)} className={styles.Hour_div_out}>
                                            <div className={styles.Minute_div}>
                                                {Time.minute}
                                            </div>
                                            <div className={styles.Hour_div_b}>
                                                <svg  id={"calendar" + "svglist_hour" + id + "_" + 1}  className={styles.svg} viewBox="-100 -100 3048.34 2856.08">
                                                    <path className={styles.cls}
                                                          d="M4866.54,6552.39,3790.12,4588.47c-23.5-42.88-112-42.88-135.49,0L2578.2,6552.39"
                                                          transform="translate(-2348.2 -4326.31)"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            :""
                            }
                    </div>
                    </>
                :""
            }
        </>
    );
};


export default dynamic(() => Promise.resolve(Calendar), {
    ssr: false
})