import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerProps } from '@store/index/index.props.ts';
import { Images } from '@enums/images.ts';
import COLORS from '@constants/COLORS.ts';
import { setImageAction } from '@store/UserReducer.ts';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage.ts';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum.ts';
import { ThemeSelectStyle } from '@components/profile/ThemeSelect/ThemeSelect.style.ts';

const THEMES = [Images.ROOM, Images.PARK, Images.SEA];

export const ThemeSelect = () => {
  const dispatch = useDispatch();

  const { image } = useSelector((state: ReducerProps) => state.user);

  const getImageSource = (value: Images) => {
    if (value === Images.ROOM) {
      return require('@assets/illustrations/room.jpg');
    }
    if (value === Images.PARK) {
      return require('@assets/illustrations/park.jpg');
    }
    if (value === Images.SEA) {
      return require('@assets/illustrations/sea.jpg');
    }
    return undefined;
  };

  const getBackgroundColor = (value: Images) => {
    if (value === Images.ROOM) {
      return COLORS.BEIGE;
    }
    if (value === Images.PARK) {
      return COLORS.GREEN;
    }
    if (value === Images.SEA) {
      return COLORS.BLUE;
    }
  };

  const onSelect = (value: Images) => {
    dispatch(setImageAction(value));
    PersistStorage.setItem(PersistStorageKeys.IMAGE, value.toString()).catch();
  };

  return (
    <View style={ThemeSelectStyle.container}>
      <View style={ThemeSelectStyle.imagesRow}>
        {THEMES.map((theme) => {
          return (
            <TouchableOpacity
              key={theme}
              activeOpacity={0.8}
              style={[
                ThemeSelectStyle.imageContainer,
                {
                  borderColor:
                    theme === image ? COLORS.BUTTON_BLUE : COLORS.LIGHTGRAY,
                  backgroundColor: getBackgroundColor(theme)
                }
              ]}
              onPress={() => onSelect(theme)}
            >
              <Image
                source={getImageSource(theme)}
                style={ThemeSelectStyle.image}
                resizeMode="contain"
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={ThemeSelectStyle.title}>Illustrations by Jana Polak</Text>
      <Text style={ThemeSelectStyle.description}>@janapolak</Text>
    </View>
  );
};
