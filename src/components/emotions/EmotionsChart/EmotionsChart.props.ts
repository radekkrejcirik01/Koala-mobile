import { SharedEmotionsBucket } from '@functions/getSharedEmotionsStats';

export interface EmotionsChartProps {
  buckets: SharedEmotionsBucket[];
  selectedKey?: number;
  onPressBucket: (key: number) => void;
}
