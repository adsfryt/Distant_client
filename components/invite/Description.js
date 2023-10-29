import styles from "../../styles/tests/task/Test/test_det/Description.module.css"
import dynamic from "next/dynamic";

const Description = (props) => {
    var createDate = new Date(props.addTime);
console.log(createDate.getUTCMonth());
    var createDate_str = createDate.getFullYear() + "." ;
    createDate_str +=  (createDate.getMonth()+1) < 10 ? "0"+(createDate.getMonth()+1)+"." : (createDate.getMonth()+1) + ".";
    createDate_str +=  createDate.getDate() < 10 ? "0"+createDate.getDate()+" " : createDate.getDate() + " ";
    createDate_str +=  createDate.getHours() < 10 ? "0"+createDate.getHours()+":" : createDate.getHours() + ":";
    createDate_str +=  createDate.getMinutes() < 10 ? "0"+createDate.getMinutes() : createDate.getMinutes();

    return (
        <div className={styles.Description}>
            <div className={styles.div_text_head}>
                <p className={styles.text_head}>Описание:</p>
            </div>
            <div className={styles.div_text}>
                 <span className={styles.text}>
                    {props.description}
                </span>
                <p></p>
                <span className={styles.text_s}>Время создания: </span>
                <p  className={styles.par}></p>
                <span className={styles.text}>{createDate_str}</span>
                <p></p>
                <span className={styles.text_s}>Автор: </span>
                <p  className={styles.par}></p>
                <span className={styles.text}>{props.author}</span>
            </div>
        </div>
    );
};


export default dynamic(() => Promise.resolve(Description), {
    ssr: false
})