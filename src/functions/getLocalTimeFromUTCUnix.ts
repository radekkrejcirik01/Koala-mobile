import moment from 'moment';

export function getLocalTimeFromUTCUnix(time: number): string {
    const unix = moment.unix(time);
    const local = moment(unix).format('YYYY-MM-DD HH:mm:ss');

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
