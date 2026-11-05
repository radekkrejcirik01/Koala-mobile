import { SharedEmotionsBucket } from '@functions/getSharedEmotionsStats';

export interface EmotionsChartProps {
  buckets: SharedEmotionsBucket[];
}
