import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/LoadingScreen.module.css';

export default function LoadingScreen() {
  const navigate = useNavigate();
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.animate(
        [
          { width: '0%' },
          { width: '60%' }
        ],
        {
          duration: 3000,
          fill: 'forwards',
          easing: 'linear',
        }
      );
    }

    const timer = setTimeout(() => {
      navigate('/main');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <img src="/assets/FAIcial_logo.png" alt="FAIcial Logo" className={styles.logo} />
      <div className={styles.progressBarBackground}>
        <div ref={progressRef} className={styles.progressBarFill} />
      </div>
      <div className={styles.text1}>AI로 알아보는 얼굴 비대칭은?!</div>
      <div className={styles.text}>FAIcial 시작하는 중 ...</div>
    </div>
  );
}
