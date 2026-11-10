import moment from 'moment';
import { getLocalTime } from '@functions/getLocalTime';

export function getChatSeparatorTime(time: number): string {
  const local = moment(getLocalTime(time));
  const localHour = local.format('HH:mm');

  if (local.isSame(moment(), 'day')) {
    return `Today ${localHour}`;
  }
  if (local.isSame(moment().subtract(1, 'days'), 'day')) {
    return `Yesterday ${localHour}`;
  }
  if (local.isAfter(moment().subtract(6, 'days').startOf('day'))) {
    return `${local.format('ddd')} ${localHour}`;
  }
  if (local.isSame(moment(), 'year')) {
    return `${local.format('D. M.')} ${localHour}`;
  }
  return `${local.format('D. M. YYYY')} ${localHour}`;
}
