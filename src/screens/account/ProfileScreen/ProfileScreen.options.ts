import { Image } from 'react-native';
import { Options } from 'react-native-image-crop-picker';
import { ShareSingleOptions, Social } from 'react-native-share';
import COLORS from '@constants/COLORS';

export const ImagePickerOptions: Options = {
  width: 500,
  height: 500,
  cropping: true,
  waitAnimationEnd: false
};

export const ShareOptions: ShareSingleOptions = {
  backgroundBottomColor: COLORS.BUTTON_BLUE,
  backgroundTopColor: COLORS.BUTTON_BLUE,
  stickerImage: Image.resolveAssetSource(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('../../../assets/images/preview.png')
  ).uri,
  social: Social.InstagramStories,
  appId: 'app.com.koala'
};
