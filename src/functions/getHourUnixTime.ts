import moment from 'moment';

export function getHourUnixTime(unix: number): string {
    const stillUtc = moment.utc(moment.unix(Number(unix)));
    const local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
    const localHour = moment(local).format('HH:mm');

    return localHour;
}
