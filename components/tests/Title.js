import styles from "../../styles/tests/task/Test/test_det/Title.module.css"
import Variants from "./Test/test_det/Variants";
const Title = (props) => {
    return (
        <div className={styles.title}>
            <p className={styles.title_text}>{props.title}</p>
            <p className={styles.description_text}>{props.description}</p>
        </div>
    );
};

export default Title;