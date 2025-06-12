// ResultPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/ResultPage.module.css';
import ResultDetailSlideUp from '../components/ResultDetailSlideUp';

export default function ResultPage() {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState(false); // ✅ 슬라이드업 상태
  const location = useLocation();

  const [finalScores, setFinalScores] = useState<Record<string, number>>({});
  const [totalDistance, setTotalDistance] = useState<Record<string, number>>({});
  const [partsImages, setPartsImages] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!location.state) return;

    const state = location.state as {
      finalScore?: number;
      finalScores?: Record<string, number>;
      partsImages?: Record<string, string>;
      resultImage?: string;
      totalDistance?: Record<string, number>;
    };

    if (state.finalScores) setFinalScores(state.finalScores);
    if (state.totalDistance) setTotalDistance(state.totalDistance);
    if (state.partsImages) setPartsImages(state.partsImages);

    const storedImage = state.resultImage;
    if (storedImage) {
      setImageSrc(storedImage);
    }
  }, []);

  const handleRetry = () => {
    localStorage.removeItem('FAIcialImage');
    navigate('/main');
  };

  const handleDownload = () => {
    if (!imageSrc) return;
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'FAIcial_result.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'FAIcial 안면 비대칭 판별 서비스',
      text: '사진만 올리면 AI가 내 얼굴의 좌우 균형을 분석해줘요!',
      url: 'https://faicial.site', // ✅ 고정된 메인 페이지 링크
    };

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('모바일 공유 실패:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('📎 공유 링크가 복사되었어요!\nFAIcial을 친구들에게 공유 해주세요 😊');
      } catch (err) {
        alert('링크 복사에 실패했어요 😢');
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.cardBox}>
          <img src="/assets/FAIcial_logo.png" alt="FAIcial Logo" className={styles.logo} />
          <h1 className={styles.title}>분석이 끝났어요! 결과를 확인해보세요!</h1>

          <div className={styles.resultBox}>
            {imageSrc ? (
              <img
                src={imageSrc}
                alt="AI 분석 결과 이미지"
                className={styles.resultImage}
              />
            ) : (
              <p>이미지를 불러올 수 없습니다.</p>
            )}
          </div>

          <p className={styles.summary}>사진의 명암에 따라 결과가 달라질 수 있습니다. 😎</p>

          <button
            className={styles.highlightButton}
            onClick={() => setShowDetail(true)}
          >
            분석 자세히 보기
          </button>

          <div className={styles.resultActions}>
            <button className={styles.actionBtn} onClick={handleRetry}>다시하기</button>
            <button className={styles.actionBtn} onClick={handleDownload}>저장하기</button>
            <button className={styles.actionBtn} onClick={handleShare}>공유하기</button>
          </div>
        </div>
      </div>

      {/* ✅ 상세 결과 슬라이드업 */}
      {showDetail && (
        <ResultDetailSlideUp
          onClose={() => setShowDetail(false)}
          finalScores={finalScores}
          totalDistance={totalDistance}
          partsImages={partsImages}
        />
      )}
    </div>
  );
}
