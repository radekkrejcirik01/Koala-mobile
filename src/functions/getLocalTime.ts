import moment from 'moment';

export function getLocalTime(time: number): string {
  const unix = moment.unix(time);

  return moment(unix).format('YYYY-MM-DD HH:mm:ss');
}
