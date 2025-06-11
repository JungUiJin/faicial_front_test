import { useState, useEffect } from 'react'; // useEffect 추가
import { useNavigate } from 'react-router-dom';
import styles from '../styles/StartScreen.module.css';

export default function StartScreen() {
  const [agreed, setAgreed] = useState<boolean>(false);
  const navigate = useNavigate();

  // ⭐ 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // 진입 시 스크롤 차단
    return () => {
      document.body.style.overflow = 'auto'; // 나갈 때 원래대로
    };
  }, []);

  const handleStartClick = () => {
    if (agreed) {
      navigate('/loading');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.gradientBackground}>
        <img src="/assets/FAIcial_logo.png" alt="FAIcial Logo" className={styles.logo} />

        <h1 className={styles.title}>AI로 알아보는 내 얼굴</h1>

        <div className={styles.subtextWrapper}>
          <p className={styles.subtext}>
            <strong className={styles.bold}>FAIcial</strong>에서 간편하게
          </p>
        </div>

        <div className={styles.checkboxRow}>
          <p className={styles.checkboxText}>
            업로드된 이미지는 분석 목적에만 사용되며<br />
            저장되거나 외부에 공유되지 않습니다
          </p>
          <div className={styles.checkboxContainer} onClick={() => setAgreed(!agreed)}>
            <div className={`${styles.checkbox} ${agreed ? styles.checkboxChecked : ''}`}>
              {agreed && <span className={styles.checkmark}>✔</span>}
            </div>
          </div>
        </div>

        <img src="/assets/face_icon.png" alt="Face Icon" className={styles.faceIcon} />

        <button
          className={`${styles.button} ${!agreed ? styles.buttonDisabled : ''}`}
          disabled={!agreed}
          onClick={handleStartClick}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
