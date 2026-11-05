import { SharedEmotionsPeriod } from '@enums/SharedEmotionsPeriod';

export interface PeriodSelectorProps {
  period: SharedEmotionsPeriod;
  title: string;
  canGoNext: boolean;
  onPeriodChange: (period: SharedEmotionsPeriod) => void;
  onPrevious: () => void;
  onNext: () => void;
}
