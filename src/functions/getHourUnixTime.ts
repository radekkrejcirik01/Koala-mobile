import moment from 'moment';

export function getHourUnixTime(time: number): string {
    const unix = moment.unix(time);
    const local = moment(unix).format('YYYY-MM-DD HH:mm:ss');

    return moment(local).format('HH:mm');
}
