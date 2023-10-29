import React, {useEffect, useState} from 'react';
import styles from "../styles/Register.module.css";
import Link from "next/link";
import {useRouter} from "next/router";

const Register = () => {
    var [Name, SetName] = useState("");
    var [SName, SetSName] = useState("");
    var [NickName, SetNickName] = useState("");
    var [Email, SetEmail] = useState("");
    var [Password, SetPassword] = useState("");
    var router = useRouter();
    var [link, Setlink] = useState(false);
    async function Register() {
        var postdata ={
            name: Name,
            surname:SName,
            nickname:NickName,
            email:Email,
            password:Password
        };

        var register = await fetch(process.env.ADDRESS_SERVER + "/user/registration",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postdata)
        });
        var register_j = await register.json();

        if(register_j.user.email !== undefined){
            Setlink(true)
        }


    }

    return (
        <div className={styles.mains}>
            <div className={styles.top}>
                <Link href = "/">
                    <div className={styles.div_link}>
                        <svg className={styles.svg_redirect}  viewBox="-20 -20 306.77 200.84">
                            <polyline className={styles.cls} points="3.5 80.42 263.27 80.42 163.56 3.5"/>
                            <polyline className={styles.cls} points="3.5 80.42 263.27 80.42 163.56 157.34"/>
                        </svg>
                    </div>
                </Link>
            </div>
            <div className={styles.mains_in}>
                {link === false ?
                    <div className={styles.Register}>
                        <p className={styles.text}>Регистрация</p>
                        <div className={styles.main_div}>
                            <div className={styles.name_div}>
                                <input className={styles.inputName} placeholder={"Имя"}
                                       onChange={(e) => SetName(e.target.value)}/>
                                <input className={styles.inputSName} placeholder={"Фамилия"}
                                       onChange={(e) => SetSName(e.target.value)}/>
                            </div>
                            <div className={styles.name_div}>
                                <input className={styles.inputLogin} placeholder={"Ник"}
                                       onChange={(e) => SetNickName(e.target.value)}/>
                            </div>
                            <div className={styles.name_div}>
                                <input className={styles.inputEmail} placeholder={"Почта"}
                                       onChange={(e) => SetEmail(e.target.value)}/>
                            </div>
                            <div className={styles.name_div}>
                                <input className={styles.inputPassword} placeholder={"Пароль"}
                                       onChange={(e) => SetPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div className={styles.register} onClick={() => Register()}>
                            <p className={styles.text_reg}>Зарегистрироваться</p>
                        </div>
                    </div>
                :
                    <div className={styles.Register}>
                        <p className={styles.text_s}>На почту {Email} придет ссылка для активации аккаунта</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default Register;