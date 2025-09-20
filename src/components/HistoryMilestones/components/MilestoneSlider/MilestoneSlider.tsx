import { useState, useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import type { IMilestone } from '../../types';
import Arrow from '@/icons/arrow.svg';
import * as styles from './MilestoneSlider.module.scss';

interface IProps {
  data: IMilestone[];
  isAnimation: boolean;
}

export const MilestoneSlider = ({ data, isAnimation }: IProps) => {
  const [milestoneSwiperInstance, setMilestoneSwiperInstance] =
    useState<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const isInited = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      isInited.current = true;
    }, 0);

    return () => {
      clearTimeout(timeout);
      isInited.current = false;
    };
  }, []);

  useEffect(() => {
    if (milestoneSwiperInstance && prevRef.current && nextRef.current) {
      milestoneSwiperInstance.navigation.init();
      milestoneSwiperInstance.navigation.update();
    }
  }, [milestoneSwiperInstance]);

  return (
    <div
      className={styles.container}
      data-is-animation={isAnimation}
      data-is-inited={isInited.current}
    >
      <button
        ref={prevRef}
        type='button'
        className={clsx(styles.button, styles.buttonPrev)}
        disabled
      >
        <Arrow className={styles.buttonIcon} />
      </button>

      <Swiper
        modules={[Navigation]}
        slidesPerView={1.5}
        spaceBetween={25}
        slidesOffsetAfter={25}
        freeMode
        onSwiper={setMilestoneSwiperInstance}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSlidesUpdated={(swiper) => swiper.slideTo(0)}
        breakpoints={{
          768: {
            slidesPerView: 3,
            spaceBetween: 80,
            freeMode: false,
            slidesOffsetAfter: 0,
          },
        }}
      >
        {data.map(({ id, year, text }) => (
          <SwiperSlide key={id}>
            <div className={styles.milestone}>
              <span className={styles.year}>{year}</span>
              <p className={styles.text}>{text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        ref={nextRef}
        type='button'
        className={clsx(styles.button, styles.buttonNext)}
        disabled
      >
        <Arrow className={styles.buttonIcon} />
      </button>
    </div>
  );
};
