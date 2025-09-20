import { useEffect, useState, type CSSProperties } from 'react';
import { clsx } from 'clsx';
import type { Swiper as SwiperType } from 'swiper/types';
import type { ITimeline } from '../../types';
import { Year } from '../Year';
import * as styles from './SpinnerSlider.module.scss';

interface IProps {
  data: ITimeline[];
  activeIndex: number;
  themeSliderInstance: SwiperType | null;
}

const STEP = 60;

export const SpinnerSlider = (props: IProps) => {
  const { data, activeIndex, themeSliderInstance } = props;
  const [positions, setPositions] = useState([30, 90, 150, 210, 270, 330]);
  const currentTheme = data[activeIndex];
  const minYear = currentTheme.milestones[0].year;
  const maxYear =
    currentTheme.milestones[currentTheme.milestones.length - 1].year;

  useEffect(() => {
    if (!themeSliderInstance) return;

    const handleSlideChange = (swiper: SwiperType) => {
      const startPosition = positions[swiper.previousIndex];
      const endPosition = positions[swiper.activeIndex];
      const detectStepCount = (endPosition - startPosition) / STEP;

      setPositions((prev) => prev.map((item) => item - STEP * detectStepCount));
    };

    themeSliderInstance.on('slideChange', handleSlideChange);

    return () => themeSliderInstance.off('slideChange', handleSlideChange);
  }, [themeSliderInstance, positions]);

  const handlePointClick = (index: number) => {
    if (index === activeIndex) return;

    themeSliderInstance?.slideTo(index);
  };

  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.years}>
        <Year number={minYear} variant='min' />
        <Year number={maxYear} variant='max' />
      </div>

      <div className={styles.spinner}>
        {data.map(({ id, theme }, index) => {
          const rotateSpinnerCircle = {
            '--rotate': `${positions[index]}deg`,
          } as CSSProperties;

          const rotatePoint = {
            '--rotate': `${
              positions[index] < 0
                ? Math.abs(positions[index])
                : -Math.abs(positions[index])
            }deg`,
          } as CSSProperties;

          return (
            <div
              key={id}
              className={styles.spinnerCircle}
              style={rotateSpinnerCircle}
            >
              <button
                type='button'
                className={clsx(
                  styles.point,
                  activeIndex === index && styles.pointActive
                )}
                onClick={() => handlePointClick(index)}
                aria-label={`Перейти к теме: ${theme}`}
                style={rotatePoint}
              >
                <div className={styles.pointInner}>
                  <span className={styles.pointId}>{id}</span>
                  <span className={styles.pointTitle}>{theme}</span>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
