import moment from 'moment/moment';

export function getChatOnlineStatus(time: number): string {
  const unix = moment.unix(time);

  return `Last online ${unix.fromNow()}`;
}
