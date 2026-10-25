import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerProps } from '@store/index/index.props.ts';
import { Images } from '@enums/images.ts';
import COLORS from '@constants/COLORS.ts';
import { setImageAction } from '@store/UserReducer.ts';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage.ts';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum.ts';
import { ThemeSelectStyle } from '@components/profile/ThemeSelect/ThemeSelect.style.ts';

const THEMES = [
  { value: Images.ROOM, name: 'Home' },
  { value: Images.PARK, name: 'Nature' },
  { value: Images.SEA, name: 'Sea' }
];

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
      <View>
        {THEMES.map((theme) => (
          <TouchableOpacity
            key={theme.value}
            activeOpacity={0.8}
            style={[
              ThemeSelectStyle.themeRow,
              {
                borderColor:
                  theme.value === image
                    ? COLORS.BUTTON_BLUE
                    : COLORS.LIGHTGRAY
              }
            ]}
            onPress={() => onSelect(theme.value)}
          >
            <View
              style={[
                ThemeSelectStyle.imageContainer,
                { backgroundColor: getBackgroundColor(theme.value) }
              ]}
            >
              <Image
                source={getImageSource(theme.value)}
                style={ThemeSelectStyle.image}
                resizeMode="contain"
              />
            </View>
            <Text style={ThemeSelectStyle.name}>{theme.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <Text style={ThemeSelectStyle.title}>Illustrations by Jana Polak</Text>
        <Text style={ThemeSelectStyle.description}>@janapolak</Text>
      </View>
    </View>
  );
};
