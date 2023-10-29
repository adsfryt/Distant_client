import React, {useEffect, useState} from 'react';
import styles from "../../styles/Create.module.css"
import Info from "../../components/create/info";
import Checkbox from "../../components/create/Checkbox";
import CTest from "../../components/create/tests/CTest/CTest";
import styles1 from "../../styles/create/tests/CTest/CTest.module.css"
import styles_pre from "../../styles/create/PreSend.module.css"
import Calendar from "../../components/Calendar";
import Prepare from "../../components/create/Prepare";
import PreSend from "../../components/create/PreSend";
import * as dotenv from 'dotenv';
dotenv.config();
import CAnswer from "../../components/create/tests/CAnswer/CAnswer";
var show_add = false;


const New = ({time, ADDRESS_SITE, ADDRESS_SERVER}) => {

    var [Title, SetTitle] = useState("");
    var [Descr, SetDescr] = useState("");
    var [TimeS, SetTimeS] = useState(0);
    var [ShowAnswer, SetShowAnswer] = useState(4);
    var [SaveAnswer, SetSaveAnswer] = useState(1);
    var [EditAnswer, SetEditAnswer] = useState(1);
    var [Strict, SetStrict] = useState(0);
    var [Author, setAuthor] = useState("")

    var [StartTime, SetStartTime] = useState({year:0,month:1,day:1,hour:0,minute:0,second:0});
    var [EndTime, SetEndTime] = useState({year:0,month:1,day:1,hour:0,minute:0,second:0});

    var [Error, setError] = useState([]);
    var [isSend, setisSend] = useState(false);
    var [PreData, setPreData] = useState({});
    var [Public, SetPublic] = useState(1);

    var [change, setChange] = useState(false);
    var [Tests, setTests] = useState([]);

    function SetSaveAnswerf() {
        if(SaveAnswer === 1){
            SetSaveAnswer(0)
        }else{
            SetSaveAnswer(1)
        }
    }
    function SetEditAnswerf() {
        if(EditAnswer === 1){
            SetEditAnswer(0)
        }else{
            SetEditAnswer(1)
        }
    }
    function SetStrictf() {
        if(Strict === 1){
            SetStrict(0)
        }else{
            SetStrict(1)
        }
    }
    function SetPublicf() {
        if(Public === 1){
            SetPublic(0)
        }else{
            SetPublic(1)
        }
    }

    function show() {
        var el_panel = document.getElementById("add_select");
        show_add = !show_add;
        if(show_add){
            el_panel.style.gridTemplateRows = "1fr";
        }else {
            el_panel.style.gridTemplateRows = "0fr";
        }
    }

    useEffect(()=>{
        document.addEventListener('click', function handleClickOutsideBox(event) {
            const box = document.getElementById('button_add');
            var el_panel = document.getElementById("add_select");

                if (box && !box.contains(event.target)) {
                    show_add = false;
                    el_panel.style.gridTemplateRows = "0fr";
                }
        });
    },[]);

    useEffect(()=>{
        console.log(Tests)
    },[Tests]);

    function Delete(value) {
        var new_t = [...Tests];
        console.log(value)
        new_t.splice(value, 1);
        setTests(new_t);
        setChange(!change);
        var identity = (new_t.length);
        var id = "info" + identity + 1;
        console.log(id)

    }

    async function preSend(){
        var publicJSON = {};

        {
            publicJSON.title = Title;
            publicJSON.description = Descr;
            publicJSON.timeS = TimeS;
            publicJSON.showAnswer = ShowAnswer;
            publicJSON.saveAnswer = SaveAnswer;
            publicJSON.editAnswer = EditAnswer;
            publicJSON.strickMode = Strict;
            publicJSON.startTime = new Date(StartTime.year, StartTime.month,StartTime.day,StartTime.hour, StartTime.minute);
            publicJSON.endTime = new Date(EndTime.year, EndTime.month, EndTime.day, EndTime.hour, EndTime.minute);
            publicJSON.publicMode = Public;
            publicJSON.tests = [];
            publicJSON.author = Author;
            publicJSON.answer = [];

            var check1 = new Prepare;

            for (let i = 0; i < Tests.length; i++) {
                var keys1;
                var keys;
                switch(Tests[i].type){
                    case 1:
                        keys1 = check1.pTest(Tests[i]);
                        keys1.id = i;
                        keys = check1.Test(Tests[i]);
                        keys.id = i;
                        break;
                    case 2:
                        keys1 = check1.pAnswer(Tests[i]);
                        keys1.id = i;
                        keys = check1.Answer(Tests[i]);
                        keys.id = i;
                        break;
                }
                publicJSON.tests.push(keys1);
                publicJSON.answer.push(keys);
            }
            console.log(publicJSON);

            var response = await fetch(ADDRESS_SERVER + "/api/post_test",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(publicJSON)
            });
            var response_json = await response.json();
            if(response_json.ok !== true){
                console.log(response_json.error);

                setError(response_json.error)
            }else{
                setisSend(true)
                setPreData(response_json);
                console.log(response_json)
            }
        }
    }



    function Show_pre(){
        var el_panel = document.getElementById("pre");
        var el_body = document.getElementsByTagName("body")[0];
        var el_center = document.getElementById("pre_center");
        el_panel.style.zIndex = "3";
        el_center.style.gridTemplateRows = "1fr";
        el_body.style.overflow = "hidden";
    }


    return (
        <div className={styles.main}>
            <PreSend ADDRESS_SITE={ADDRESS_SITE} ADDRESS_SERVER={ADDRESS_SERVER} setauthor={setAuthor} send={preSend} Error={Error} isSend={isSend} PreData={PreData}/>
            <div className={styles.content}>
                <div className={styles.title_div}>
                    <p className={styles.title_text}>Основные сведения</p>
                </div>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <p className={styles.name_text}>Название:</p>
                        <input onChange={(e) => SetTitle(e.target.value)} className={styles.input_Name} />
                    </div>
                    <div className={styles.row_desc}>
                        <p className={styles.desc_text}>Описание</p>
                        <textarea onChange={(e) => SetDescr(e.target.value)} className={styles.textarea} />
                    </div>
                    <div className={styles.row}>
                        <p className={styles.name_text}>Дата открытия:</p>
                        <Calendar fn={SetStartTime} cur_time={time} id={0} />
                    </div>
                    <div className={styles.row}>
                        <p className={styles.name_text}>Дата закрытия:</p>
                        <Calendar fn={SetEndTime} cur_time={time} id={1} />
                    </div>
                    <div className={styles.row}>
                        <p className={styles.name_text}>Время на тест (секунд):</p>
                        <input maxlength={"7"} onChange={(e) => SetTimeS(Number(e.target.value))} className={styles.input_name} />
                    </div>
                    <div className={styles.row}>
                        <p className={styles.name_text}>Когда показать результаты участникам:</p>
                        <div className={styles.row_in}>
                            <div onClick={() => SetShowAnswer(1)} className={[styles.chooseT,ShowAnswer === 1 ? styles.chose : ""].join(" ")}><p className={ShowAnswer === 1 ? styles.chose_text : styles.cho_text}>После прохождения</p></div>
                            <div onClick={() => SetShowAnswer(2)} className={[styles.chooseT,ShowAnswer === 2 ? styles.chose : ""].join(" ")}><p className={ShowAnswer === 2 ? styles.chose_text : styles.cho_text}>После окончания</p></div>
                            <div onClick={() => SetShowAnswer(3)} className={[styles.chooseT,ShowAnswer === 3 ? styles.chose : ""].join(" ")}><p className={ShowAnswer === 3 ? styles.chose_text : styles.cho_text}>После проверки</p></div>
                            <div onClick={() => SetShowAnswer(4)} className={[styles.chooseT,ShowAnswer === 4 ? styles.chose : ""].join(" ")}><p className={ShowAnswer === 4 ? styles.chose_text : styles.cho_text}>Никогда</p></div>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.row_in}>
                        <p className={styles.name_text}>Можно сохранять ответы?:</p><Info text={"Если нет, то задния можно будет выполнить только на одном устройстве"} id={1} />
                        </div>
                        <Checkbox fn={SetSaveAnswerf} state={SaveAnswer}/>
                    </div>
                    <div className={styles.row}>
                        <p className={styles.name_text}>Можно редактировать ответы?:</p>
                        <Checkbox fn={SetEditAnswerf} state={EditAnswer}/>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.row_in}>
                        <p className={styles.name_text}>Установить строгий режим?:</p><Info text={"Пользователь не сможет скопировать текст напрямую"}  id={2} />
                        </div>
                        <Checkbox fn={SetStrictf} state={Strict}/>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.row_in}>
                            <p className={styles.name_text}>Общедоступный тест?:</p><Info text={"Если нет, то вам нужно будет создать пригласительные коды"} id={3} />
                        </div>
                        <Checkbox fn={SetPublicf} state={Public}/>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
            <div className={styles.title_div}>
                <p className={styles.title_text}>Задания</p>
            </div>
                {
                    Tests.map((key, id) => {
                        switch (key.type) {
                            case 1:
                                return(<CTest Delete={Delete} key={id} data={key} ido={id} fn={setTests} full={Tests} change={change} />);
                            case 2:
                                return(<CAnswer Delete={Delete} key={id} data={key} ido={id} fn={setTests} full={Tests} change={change} />);

                        }

                    })
                }
                <div id={"button_add"} className={styles.add} onClick={show}>
                    <div  className={styles.add_text_div}>
                        <p className={styles.add_text}>Добавить задание</p>
                    </div>
                </div>
                <div className={styles.add_list_outer}>
                    <div className={styles.add_list_out}>
                        <div className={styles.add_list_ou}>
                            <div id={"add_select"} className={styles.add_list}>
                                <div  className={styles.add_content}>
                                    <div  className={styles.addTask} onClick={() => {setTests(Tests => [...Tests,{type:1,title:"",description:"",mixed:0,maxChoice:1000000,minChoice:0,check:1,variant:[],answer:[], underSelection:"inf", wrongSelection:"inf"}])}}>
                                        <p className={styles.add_textT}>Тест</p>
                                    </div>
                                    <div  className={styles.addTask} onClick={() => {setTests(Tests => [...Tests,{type:2, title:"", description:"", check:0, variant:[], answer:[], intDistant:[], isInt:0}])}}>
                                        <p className={styles.add_textT}>Задание с ответом</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.add_test} onClick={Show_pre}>
                <div  className={styles.add_text_div}>
                    <p className={styles.add_text}>Создать</p>
                </div>
            </div>

        </div>
    );
};

export default New;

export async function getStaticProps() {
    console.log(process.env.REACT_APP_ADDRESS_SITE);
    var timeServer = await fetch(`http://localhost:5000/api_s/get_time`);
    var time = await timeServer.json();
    var ADDRESS_SITE = process.env.ADDRESS_SITE;
    var ADDRESS_SERVER = process.env.ADDRESS_SERVER;
    return {
        props: {
            time, ADDRESS_SITE, ADDRESS_SERVER
        },
    }
}