import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper/types';
import type { ITimeline } from '../../types';
import { SpinnerSlider } from '../SpinnerSlider';
import { MilestoneSlider } from '../MilestoneSlider';
import { formatSliderCounter } from '../../helpers/formatSliderCounter';
import Arrow from '@/icons/arrow.svg';
import * as styles from './ThemeSlider.module.scss';

interface IProps {
  data: ITimeline[];
}

export const ThemeSlider = ({ data }: IProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeCategory, setActiveCategory] = useState(data[0]);
  const [isAnimation, setIsAnimation] = useState(false);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  const handleSliderChange = ({ activeIndex }: SwiperType) => {
    setIsAnimation(true);
    setTimeout(() => {
      const findCategory = data.find((item) => item.id === activeIndex + 1);

      if (findCategory) setActiveCategory(findCategory);

      setActiveIndex(activeIndex);
      setIsAnimation(false);
    }, 50);
  };

  return (
    <div className={styles.container}>
      <Swiper
        modules={[Navigation]}
        onSwiper={setSwiperInstance}
        onSlideChange={handleSliderChange}
        className={styles.themesSlider}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
      >
        {data.map(({ id, theme }) => (
          <SwiperSlide key={id}>{theme}</SwiperSlide>
        ))}
      </Swiper>

      <SpinnerSlider
        data={data}
        activeIndex={activeIndex}
        themeSliderInstance={swiperInstance}
      />

      <div className={styles.themesSliderNav}>
        <div className={styles.count}>
          <span>{formatSliderCounter(activeIndex + 1)}</span>
          <span>/</span>
          <span>{formatSliderCounter(data.length)}</span>
        </div>

        <div className={styles.buttons}>
          <button
            ref={prevRef}
            type='button'
            className={clsx(styles.button, styles.buttonPrev)}
          >
            <Arrow className={styles.buttonIcon} />
          </button>

          <button
            ref={nextRef}
            type='button'
            className={clsx(styles.button, styles.buttonNext)}
          >
            <Arrow className={styles.buttonIcon} />
          </button>
        </div>
      </div>

      <MilestoneSlider
        data={activeCategory.milestones}
        isAnimation={isAnimation}
      />
    </div>
  );
};
