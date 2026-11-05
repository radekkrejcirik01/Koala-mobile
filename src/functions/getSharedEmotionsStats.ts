import moment, { Moment } from 'moment';
import { SharedEmotionInterface } from '@interfaces/general.interface';
import { SharedEmotionsPeriod } from '@enums/SharedEmotionsPeriod';
import { EMOTIONS } from '@constants/EMOTIONS';

// Shares without an emoji, or with one outside of EMOTIONS, are grouped here
export const OTHER_EMOTION = 'other';

export interface SharedEmotionsBucket {
  key: number;
  label: string;
  counts: Record<string, number>;
  total: number;
}

export interface SharedEmotionsRange {
  start: Moment;
  end: Moment;
}

const START_OF: Record<SharedEmotionsPeriod, moment.unitOfTime.StartOf> = {
  [SharedEmotionsPeriod.Week]: 'isoWeek',
  [SharedEmotionsPeriod.Month]: 'month',
  [SharedEmotionsPeriod.Year]: 'year'
};

export function getEmotionKey(emotion?: string): string {
  return EMOTIONS.some((item) => item.type === emotion)
    ? emotion
    : OTHER_EMOTION;
}

// Range of the period `offset` periods back from now, in the device timezone
export function getSharedEmotionsRange(
  period: SharedEmotionsPeriod,
  offset: number
): SharedEmotionsRange {
  const start = moment().add(offset, period).startOf(START_OF[period]);
  const end = start.clone().add(1, period);

  return { start, end };
}

export function getSharedEmotionsTitle(
  period: SharedEmotionsPeriod,
  { start, end }: SharedEmotionsRange
): string {
  if (period === SharedEmotionsPeriod.Week) {
    const last = end.clone().subtract(1, 'day');
    return `${start.format('D. M.')} – ${last.format('D. M. YYYY')}`;
  }
  if (period === SharedEmotionsPeriod.Month) {
    return start.format('MMMM YYYY');
  }
  return start.format('YYYY');
}

export function getSharedEmotionsBuckets(
  emotions: SharedEmotionInterface[],
  period: SharedEmotionsPeriod,
  start: Moment
): SharedEmotionsBucket[] {
  const isYear = period === SharedEmotionsPeriod.Year;
  const unit = isYear ? 'month' : 'day';

  let count = 12;
  if (period === SharedEmotionsPeriod.Week) {
    count = 7;
  } else if (period === SharedEmotionsPeriod.Month) {
    count = start.daysInMonth();
  }

  const buckets: SharedEmotionsBucket[] = Array.from(
    { length: count },
    (_, index: number) => {
      const date = start.clone().add(index, unit);

      let label = date.format('dd');
      if (isYear) {
        label = date.format('MMM').charAt(0);
      } else if (period === SharedEmotionsPeriod.Month) {
        // Label every 7th day, the full month would not fit
        label = index % 7 === 0 ? date.format('D') : '';
      }

      return { key: date.valueOf(), label, counts: {}, total: 0 };
    }
  );

  emotions.forEach((item: SharedEmotionInterface) => {
    const index = moment.unix(item.time).diff(start, unit);
    const bucket = buckets[index];
    if (!bucket) {
      return;
    }

    const key = getEmotionKey(item.emotion);
    bucket.counts[key] = (bucket.counts[key] ?? 0) + 1;
    bucket.total += 1;
  });

  return buckets;
}

export function getSharedEmotionsCounts(
  emotions: SharedEmotionInterface[]
): Record<string, number> {
  return emotions.reduce(
    (counts: Record<string, number>, item: SharedEmotionInterface) => {
      const key = getEmotionKey(item.emotion);
      counts[key] = (counts[key] ?? 0) + 1;
      return counts;
    },
    {}
  );
}
