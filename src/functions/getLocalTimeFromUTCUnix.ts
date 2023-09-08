import moment from 'moment';

export const getLocalTimeFromUTCUnix = (time: number): string => {
    const stillUtc = moment.utc(moment.unix(Number(time)));
    const local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');

    const today = moment().format('MM-DD');
    const yesterday = moment().subtract(1, 'days').format('MM-DD');

    const localDate = moment(local).format('MM-DD');
    const localHour = moment(local).format('HH:mm');

    if (localDate === today) {
        return `Today ${localHour}`;
    }
    if (localDate === yesterday) {
        return `Yesterday ${localHour}`;
    }
    return `${localDate} ${localHour}`;
};
