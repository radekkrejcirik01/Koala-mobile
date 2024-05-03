import moment from 'moment';

export function getMessageTime(time: number): string {
    const unix = moment.unix(time);
    const local = moment(unix).format('YYYY-MM-DD HH:mm:ss');

    const today = moment().format('D. M.');

    const localDate = moment(local).format('D. M.');
    const localHour = moment(local).format('HH:mm');

    if (localDate === today) {
        return localHour;
    }
    return `${localDate} ${localHour}`;
}
