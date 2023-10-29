import React from 'react';
import styles from '../styles/Title.module.css';
const Title = (props) => {
    return (
        <div className={styles.title}>
            <p className={styles.title_text} >{props.name}</p>
        </div>
    );
};

export default Title;