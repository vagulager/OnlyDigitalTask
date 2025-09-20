import { clsx } from 'clsx';
import * as styles from './Year.module.scss';
import { useEffect, useState } from 'react';

interface IProps {
  number: number;
  variant: 'min' | 'max';
  className?: string;
}

export const Year = ({ number, variant, className }: IProps) => {
  const [year, setYear] = useState(number);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setYear((prev) => {
        if (prev === number) {
          clearInterval(intervalId);

          return prev;
        }

        return prev < number ? prev + 1 : prev - 1;
      });
    }, 30);

    return () => clearInterval(intervalId);
  }, [number]);

  return (
    <span className={clsx(className, styles.digit)} data-variant={variant}>
      {year}
    </span>
  );
};
