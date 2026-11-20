import moment from 'moment/moment';

// Empty when the friend was never seen online
export function getChatOnlineStatus(online: boolean, time?: number): string {
  if (online) {
    return 'Online';
  }

  return time ? `Last seen ${moment.unix(time).fromNow()}` : '';
}
