import Tests from "../components/tests/Test/Tests"
import styles from "../styles/Index.module.css";
import {useState, useEffect} from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import {observer} from "mobx-react-lite";
import auth from "../components/auth";
import spanel from "../styles/Panel.module.css";
var ADDRESS_SITE = process.env.ADDRESS_SITE;
var ADDRESS_SERVER = process.env.ADDRESS_SERVER;


const Index =  observer(({users}) => {
    var[ID, setID] = useState('');
    var error;
    const { push} = useRouter();
    var showp = false;

    useEffect(()=>{
        const log = document.getElementById("log");
        document.addEventListener("keypress",GoTOUrl);

        window.addEventListener("load", (event) => {
            console.log("page is fully loaded");
        });

    });

    function GoTOUrl(e)
    {
        if(e.code === "Enter" || e === "Enter") {
            error = 0;
            var str;
            ID = ID.toUpperCase();
            if (ID[0] === "U") {
                str = ID.substr(2, ID.length);
                console.log(str.length);
                if (str.length !== 18 || ID[1] !== "-" || str[5] !== "-" || str[11] !== "-") {
                    error = 1
                }
            } else if (ID[0] === "A") {
                str = ID.substr(2, ID.length);
                if (str.length !== 30 || ID[1] !== "-" || str[5] !== "-" || str[11] !== "-" || str[18] !== "-") {
                    error = 1;
                }
            }
            if (str !== undefined && str !== "" && error === 0) {
                push('/test/invite/' + str);
            }
        }
    }
    function GoTOReg(e)
    {
        push('/register')
    }
    function GoTOLogin()
    {
        push('/login')
    }

    function show() {
        var el_panel = document.getElementById("panel");
        showp = !showp;
        if(showp){
        el_panel.style.gridTemplateRows = "1fr";
        }else {
            el_panel.style.gridTemplateRows = "0fr";
        }
    }

    async function Logout(){
        var login = await fetch(ADDRESS_SERVER + "/user/logout",{
            method:"POST",
            credentials: 'include'
        });
        localStorage.removeItem("token");
        if(login){
            auth.setFalse()
        }
    }

    useEffect(()=>{
        document.addEventListener('click', function handleClickOutsideBox(event) {
            const box = document.getElementById('user');
            var el_panel = document.getElementById("panel");
            if (box) {
                if (!box.contains(event.target)) {
                    console.log("cc")
                    showp = false;
                    el_panel.style.gridTemplateRows = "0fr";
                }
            }
        });
    })

    return (
        <>
        <div className="main">
            {/*<div id={"err"} className={styles.error}><p className={styles.text_error}>Ошибка!</p>*/}
            {/*    <p className={styles.text_error}>Неправильный синтаксис id или кода</p>*/}
            {/*</div>*/}
            {/*<div className={styles.top}>*/}
            {/*    { auth.auth !== true ?(<>*/}
            {/*    <div className={styles.login}  onClick={() => GoTOLogin()}>*/}
            {/*        <p  className={styles.text}>Войти</p>*/}
            {/*    </div>*/}
            {/*    <div className={styles.register}  onClick={() => GoTOReg()}>*/}
            {/*        <p  className={styles.text_reg}>Зарегистрироваться</p>*/}
            {/*    </div></>)*/}
            {/*    :<>*/}
            {/*    <div id={"user"} className={[styles.user, spanel.userp].join(" ")} onClick={show}>*/}
            {/*        <div  className={styles.text_user_div}>*/}
            {/*            <p  className={styles.text_user}>@My name</p>*/}
            {/*        </div>*/}
            {/*        <div className={styles.user_image}>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <div id={"panel"} className={spanel.panel}>*/}

            {/*        <div className={spanel.panel_content}>*/}
            {/*            <div  className={spanel.line}>*/}
            {/*                <div  className={spanel.line_div}>*/}
            {/*                    <p  className={spanel.line_text}>Ваши тесты</p>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div  className={spanel.line}>*/}
            {/*                <div  className={spanel.line_div}>*/}
            {/*                    <p  className={spanel.line_text}>Настройки</p>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div  className={spanel.line} onClick={() => Logout()}>*/}
            {/*                <div  className={spanel.line_div}>*/}
            {/*                    <p  className={spanel.line_text_logout}>Выйти</p>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    </>}*/}
            {/*</div>*/}

            <div className={styles.center}>
                <div  className={styles.Invite_out}>
                    <input placeholder={"код или id теста"} onChange={(e) => setID(e.target.value)} className={styles.Invite}/>
                    <div className={styles.btn} onClick={() => GoTOUrl("Enter")}>
                        <svg className={styles.svgsearch} viewBox="-30 -30 280 290">
                            <path className={styles.cles1} d="M143,499,255,389" transform="translate(-140.83 -250)"/>
                            <path className={styles.cles2} d="M302,404a77,77,0,1,1,77-77A77.08,77.08,0,0,1,302,404Zm0-148a71,71,0,1,0,71,71A71.08,71.08,0,0,0,302,256Z" transform="translate(-140.83 -250)"/>
                        </svg>
                    </div>
                </div>

                <div className={styles.Create} onClick={() => push("/create/new")}>
                    <svg className={styles.svg} viewBox="0 0 395.93 395.93">
                        <path className={styles.cls1}
                              d="M551.46,465.62H424.65a14.49,14.49,0,0,1-14.49-14.49V324.32a14.49,14.49,0,0,0-14.49-14.49H341.32a14.48,14.48,0,0,0-14.49,14.49V451.13a14.5,14.5,0,0,1-14.5,14.49H185.52A14.5,14.5,0,0,0,171,480.12v54.34A14.5,14.5,0,0,0,185.52,549H312.33a14.5,14.5,0,0,1,14.5,14.49V690.26a14.49,14.49,0,0,0,14.49,14.49h54.35a14.49,14.49,0,0,0,14.49-14.49V563.45A14.49,14.49,0,0,1,424.65,549H551.46a14.5,14.5,0,0,0,14.5-14.5V480.12A14.5,14.5,0,0,0,551.46,465.62Z"
                              transform="translate(-170.53 -309.33)"/>
                    </svg>
                    <p className={styles.text_create}>СОЗДАТЬ ТЕСТ</p>
                </div>
            </div>

        </div>
        </>
);
});

export default Index;

