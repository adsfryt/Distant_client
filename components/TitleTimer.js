import styles from "../styles/TitleTimer.module.css"
const Title = (props) => {
    return (
        <div className={styles.title}>
            <p className={styles.title_text}>{props.title}</p>
        </div>
    );
};

export default Title;