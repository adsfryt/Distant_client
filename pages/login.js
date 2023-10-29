import React, {useState} from 'react';
import styles from "../styles/Login.module.css";
import Link from "next/link";
import auth from "../components/auth";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";

const Login = observer(() => {
    var [Email, SetEmail] = useState("");
    var [Password, SetPassword] = useState("");
    var {push} = useRouter();
    async function Login() {
        var postdata ={
            email:Email,
            password:Password
        };

        var login = await fetch(process.env.ADDRESS_SERVER + "/user/login",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(postdata)
        });
        var login_j = await login.json();
        if(login_j.accessToken !== undefined){
            localStorage.setItem("token",login_j.accessToken)
            auth.setTrue()
            push("/");
        }
    }

    useState(()=>{
        console.log(Email,Password)
    });


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
                <div className={styles.Register}>
                    <p className={styles.text}>Войти</p>
                    <div className={styles.main_div}>
                        <div className={styles.name_div}>
                            <input className={styles.inputEmail} placeholder={"Почта"}  onChange={(e) => SetEmail(e.target.value)} />
                        </div>
                        <div className={styles.name_div}>
                            <input className={styles.inputPassword} placeholder={"Пароль"} onChange={(e) => SetPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.login} onClick={() => Login()}>
                        <p className={styles.text_reg}>Войти</p>
                    </div>
                </div>
            </div>

        </div>
    );
})

export default Login;