import React from 'react';
import styles_pre from "../../styles/create/PreSend.module.css";
import styles from "../../styles/Create.module.css";
import * as dotenv from 'dotenv';
dotenv.config();

const PreSend = ({setauthor,send, isSend,PreData, Error, ADDRESS_SITE, ADDRESS_SERVER}) => {
    function Hide_pre(){
        var el_panel = document.getElementById("pre");
        var el_center = document.getElementById("pre_center");
        var el_body = document.getElementsByTagName("body")[0];
        el_center.style.gridTemplateRows = "0fr";
        el_panel.style.zIndex = "-1";
        el_body.style.overflow = "auto";
    }

    return (
        <div id={"pre"} className={styles_pre.Main}>
            <div className={styles_pre.Center_out}>
            <div id={"pre_center"} className={styles_pre.Center}>
                <div className={styles_pre.Center_in}>
                    <div className={styles_pre.Center_in_in}>
                        <div className={styles_pre.Back} onClick={Hide_pre}>
                            <svg className={styles_pre.svg_redirect}  viewBox="-20 -20 306.77 200.84">
                                <polyline className={styles_pre.cls} points="3.5 80.42 263.27 80.42 163.56 3.5"/>
                                <polyline className={styles_pre.cls} points="3.5 80.42 263.27 80.42 163.56 157.34"/>
                            </svg>
                        </div>
                        <div className={styles_pre.Author_out}>
                            <div className={styles_pre.Author}>
                                <p className={styles_pre.text}>Сначала введите свое имя, а затем нажмите продолжить. Если ошибок не будет, то вы получите специальную ссылку на страницу, где сможете следить за тем, как участники проходят задания. Вы не сможете изменить задания в работе после его создания.</p>
                                <div className={styles.row}>
                                    <p className={styles.name_text}>Введите свое имя:</p>
                                    <input onChange={(e) => setauthor(e.target.value)} className={styles_pre.input_Name} />
                                </div>
                                {isSend === false ?<>
                                <div onClick={send} className={styles_pre.send_btn}><p className={styles_pre.send_text}>Продолжить</p></div>
                                        {
                                            Error.map((key)=>(
                                                <p className={styles_pre.text_error}>{key[1]}</p>
                                            ))
                                        }
                                    </>
                                : <>
                                        <div className={styles.row}>
                                            <p className={styles.name_text}>Ссылка на страницу для проверки заданий:</p>
                                            <a href={ADDRESS_SITE + "/spot/task/" + PreData.testId + "-" + PreData.password}> <p className={styles_pre.link}>{ADDRESS_SITE +"/spot/task/" + PreData.testId + "-" + PreData.password}</p></a>
                                        </div>
                                        <div className={styles.row}>
                                            <p className={styles.name_text}>Код теста:</p>
                                            <p className={styles_pre.code} >{"U-" + PreData.testId}</p>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>

    );
};

export default PreSend;