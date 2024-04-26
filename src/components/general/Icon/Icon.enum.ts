import BackBlue from '@assets/webp/BackBlue.webp';
import BackBlueRight from '@assets/webp/BackBlueRight.webp';
import Clean from '@assets/webp/Clean.webp';
import Direct from '@assets/webp/Direct.webp';
import Mail from '@assets/webp/Mail.webp';
import Menu from '@assets/webp/Menu.webp';
import Microphone from '@assets/webp/Microphone.webp';
import Reply from '@assets/webp/Reply.webp';
import Plus from '@assets/webp/Plus.webp';
import Send from '@assets/webp/Send.webp';
import Stop from '@assets/webp/Stop.webp';

export enum IconEnum {
    BACK_BLUE = 'BackBlue',
    BACK_BLUE_RIGHT = 'BackBlueRight',
    CLEAN = 'Clean',
    DIRECT = 'Direct',
    MAIL = 'Mail',
    MENU = 'Menu',
    MICROPHONE = 'Microphone',
    REPLY = 'Reply',
    PLUS = 'Plus',
    SEND = 'Send',
    STOP = 'Stop'
}

export const ICONS = {
    [IconEnum.BACK_BLUE]: BackBlue,
    [IconEnum.BACK_BLUE_RIGHT]: BackBlueRight,
    [IconEnum.CLEAN]: Clean,
    [IconEnum.DIRECT]: Direct,
    [IconEnum.MENU]: Menu,
    [IconEnum.MICROPHONE]: Microphone,
    [IconEnum.MAIL]: Mail,
    [IconEnum.REPLY]: Reply,
    [IconEnum.PLUS]: Plus,
    [IconEnum.SEND]: Send,
    [IconEnum.STOP]: Stop
};
