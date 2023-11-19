import BackBlue from '@assets/webp/BackBlue.webp';
import BackBlueRight from '@assets/webp/BackBlueRight.webp';
import Clean from '@assets/webp/Clean.webp';
import Mail from '@assets/webp/Mail.webp';
import Menu from '@assets/webp/Menu.webp';
import Plus from '@assets/webp/Plus.webp';
import Send from '@assets/webp/Send.webp';

export enum IconEnum {
    BACK_BLUE = 'BackBlue',
    BACK_BLUE_RIGHT = 'BackBlueRight',
    CLEAN = 'Clean',
    MAIL = 'Mail',
    MENU = 'Menu',
    PLUS = 'Plus',
    SEND = 'Send'
}

export const ICONS = {
    [IconEnum.BACK_BLUE]: BackBlue,
    [IconEnum.BACK_BLUE_RIGHT]: BackBlueRight,
    [IconEnum.CLEAN]: Clean,
    [IconEnum.MENU]: Menu,
    [IconEnum.MAIL]: Mail,
    [IconEnum.PLUS]: Plus,
    [IconEnum.SEND]: Send
};
