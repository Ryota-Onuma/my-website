import React from "react";
import styles from "./index.module.css";

const Top = () => {
    return (
        <>
            <div className={styles.greeting}>
                <div className={styles.background}></div>
            </div>
            <div className={styles.contents}>
                <div className={styles.title}>
                    <OnumaRyota />
                    <Portfolio />
                </div>
                <div className={styles.characters}>
                    <SakuraWitch />
                    <Hero />
                    <Princess />
                    <MusicianDuck />
                </div>
                <div className={styles.buttons}>
                    <Scroll />
                </div>
            </div>
        </>
    );
};

// 画像は明示的にわかりやすくコンポーネント化することで、コードの見通しを良くする
const OnumaRyota = () => {
    return <div className={styles.onumaRyota} />;
};

const Portfolio = () => {
    return <div className={styles.portfolio} />;
};

const SakuraWitch = () => {
    return <div className={styles.sakuraWitch} />;
};

const Hero = () => {
    return <div className={styles.hero} />;
};

const Princess = () => {
    return <div className={styles.princess} />;
};

const MusicianDuck = () => {
    return <div className={styles.musicianDuck} />;
};

const Scroll = () => {
    return <div className={styles.scroll} />;
};


export default Top;