import { ImageSourcePropType } from 'react-native';
import { Images } from '@enums/images';

// Dark mode only has the room, cut out so it sits on the dark background.
// The light illustrations have their background color baked in
export function getIllustration(
  image: Images,
  isDark: boolean
): ImageSourcePropType | undefined {
  if (isDark) {
    return require('@assets/illustrations/room-dark.png');
  }
  if (image === Images.ROOM) {
    return require('@assets/illustrations/room.jpg');
  }
  if (image === Images.PARK) {
    return require('@assets/illustrations/park.jpg');
  }
  if (image === Images.SEA) {
    return require('@assets/illustrations/sea.jpg');
  }
  return undefined;
}
