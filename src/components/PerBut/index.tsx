import React from "react";
import styles from './index.less';

interface IProp {
    text: string;
}

export default function resultBut(prop: IProp) {
    const { text } = prop;

    return (
        <button className={styles.box}>
            <span className={styles.button}>{text}</span>
        </button>
    );
}
