import React, {useEffect} from 'react';
import styles from "../styles/ShowSave.module.css";

const ShowSave = ({isSave, isSaveID, setisSave, setisSaveID, id}) => {

        if (id === isSaveID && isSave === true) {
            document.getElementById("save" + id).className = styles.textdiv_an;
            setisSave(false);
            setTimeout(() => {
                document.getElementById("save" + id).className = styles.textdiv;
            }, 2000)
        }



    return (
        <div class={styles.textdiv} id={"save" + id}>
            <p class={styles.text}>Сохранено</p>
        </div>
    );
};

export default ShowSave;