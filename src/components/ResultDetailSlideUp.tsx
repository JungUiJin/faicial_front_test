import { useEffect, useState, useMemo } from 'react';
import styles from '../styles/ResultDetailSlideUp.module.css';

interface Props {
  onClose: () => void;
  finalScores: Record<string, number>;
  totalDistance: Record<string, number>;
  partsImages: Record<string, string>;
}

export default function ResultDetailSlideUp({ 
  onClose, 
  finalScores, 
  partsImages, 
  totalDistance, 
}: Props) {
  const [visible, setVisible] = useState(false);
  const [animatedIndices, setAnimatedIndices] = useState<number[]>([]);

  const metricDataList = useMemo(() => [
    {
      label: 'short',
      imageLeft: partsImages.left_eye,
      imageRight: partsImages.right_eye,
      distance: `${Math.abs(totalDistance.left_eye - totalDistance.right_eye)}px`,
      similarity: finalScores.eyes,
    },
    {
      label: 'long',
      imageLeft: partsImages.left_ear,
      imageRight: partsImages.right_ear,
      distance: `${Math.abs(totalDistance.left_ear - totalDistance.right_ear)}px`,
      similarity: finalScores.ears,
    },
    {
      label: 'long',
      imageLeft: partsImages.left_nose,
      imageRight: partsImages.right_nose,
      distance: `${Math.abs(totalDistance.left_nose - totalDistance.right_nose)}px`,
      similarity: finalScores.nose,
    },
    {
      label: 'long',
      imageLeft: partsImages.left_chin,
      imageRight: partsImages.right_chin,
      distance: `${Math.abs(totalDistance.left_chin - totalDistance.right_chin)}px`,
      similarity: finalScores.chin,
    },
    {
      label: 'short',
      imageLeft: partsImages.left_mouth,
      imageRight: partsImages.right_mouth,
      distance: `${Math.abs(totalDistance.left_mouth - totalDistance.right_mouth)}px`,
      similarity: finalScores.mouth,
    },
  ], [finalScores, totalDistance, partsImages]);

  useEffect(() => {
    setVisible(true);

    metricDataList.forEach((_, i) => {
      setTimeout(() => {
        setAnimatedIndices((prev) => [...prev, i]);
      }, i * 400);

    });
  }, [metricDataList]);
  console.log('🔍 metricDataList', metricDataList);
  return (
    <div className={`${styles.slideUpContainer} ${visible ? styles.show : ''}`}>
      <div className={styles.slideCard}>
        <button className={styles.closeBtn} onClick={onClose}>X</button>

        {/* X 아래로 왼쪽/오른쪽 라벨 이동 */}
        <div className={styles.headerLabels}>
          <span>왼쪽</span>
          <span>오른쪽</span>
        </div>

        {metricDataList.map((item, i) => (
          <div className={styles.metricRow} key={i}>
            <div className={styles.imageLabels}>
              <img src={item.imageLeft} alt="left" className={`${styles.faceImage} ${item.label === 'long' ? styles.longFaceImage : ''}`} />
              <span className={styles.dotLine}><span>{item.distance}</span></span>
              <img src={item.imageRight} alt="right" className={`${styles.faceImage} ${item.label === 'long' ? styles.longFaceImage : ''}`} />
            </div>
            <div className={`${styles.similarity} ${animatedIndices.includes(i) ? styles.animate : ''}`}>
              {item.similarity}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
