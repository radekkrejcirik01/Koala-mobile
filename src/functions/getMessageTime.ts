import moment from 'moment';
import { getLocalTime } from '@functions/getLocalTime';

export function getMessageTime(time: number): string {
  const local = getLocalTime(time);

  const today = moment().format('D. M.');
  const yesterday = moment().subtract(1, 'days').format('D. M.');

  const localDate = moment(local).format('D. M.');
  const localHour = moment(local).format('HH:mm');

  if (localDate === today) {
    return `Today ${localHour}`;
  }
  if (localDate === yesterday) {
    return `Yesterday ${localHour}`;
  }
  return `${localDate} ${localHour}`;
}
