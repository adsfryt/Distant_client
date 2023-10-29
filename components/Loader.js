import styles from "../styles/Loader.module.css";

const Loader = ({users}) => {


    return (
        <>
            <div id={"underdiv"} className={styles.underdiv}>
                <svg className={styles.svg1} viewBox="25 25 50 50">
                    <circle className={styles.circle} r="20" cy="50" cx="50"></circle>
                </svg>
            </div>
        </>
    );
};

export default Loader;