import { ThemeSlider, Title } from './components';
import * as styles from './HistoryMilestones.module.scss';
import * as history from './data.json';
import 'swiper/css';

export const HistoryMilestones = () => {
  return (
    <div className={styles.container}>
      <Title />
      <ThemeSlider data={history.timelines} />
    </div>
  );
};
