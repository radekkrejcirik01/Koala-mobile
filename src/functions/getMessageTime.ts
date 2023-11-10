import moment from 'moment';

export function getMessageTime(time: number): string {
    const stillUtc = moment.utc(moment.unix(Number(time)));
    const local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');

    const today = moment().format('D. M.');

    const localDate = moment(local).format('D. M.');
    const localHour = moment(local).format('HH:mm');

    if (localDate === today) {
        return localHour;
    }
    return `${localDate} ${localHour}`;
}
