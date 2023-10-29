import React from 'react';
import styles from "../../../styles/Spot/check/ListUser.module.css"
import {formatNextPathnameInfo} from "next/dist/shared/lib/router/utils/format-next-pathname-info";

const ListUser = ({user,passed,setCurUser,setCurUserN}) => {
    return (
        <div className={styles.Content}>
            {
                passed.map((key)=>{
                    var name;
                    for (let i = 0; i < user.length; i++) {
                        if (user[i][0] === key[0]){
                            name = user[i][1];
                        }
                    }
                    return(<div onClick={()=>{setCurUser(key[0]); setCurUserN(name)}} className={styles.div_user}><p className={styles.title_text}><span className={styles.name_text}>{name}</span>  {" (" + key[0] + ")"}</p></div>)
                })
            }
        </div>
    );
};

export default ListUser;