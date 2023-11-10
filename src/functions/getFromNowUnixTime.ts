import moment from 'moment';

export function getFromNowUnixTime(unix: number): string {
    return moment.unix(unix).fromNow();
}
