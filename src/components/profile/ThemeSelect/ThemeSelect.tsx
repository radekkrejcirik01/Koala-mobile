import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerProps } from '@store/index/index.props.ts';
import { Images } from '@enums/images.ts';
import COLORS from '@constants/COLORS.ts';
import { setImageAction } from '@store/UserReducer.ts';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage.ts';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum.ts';
import { ThemeSelectStyle } from '@components/profile/ThemeSelect/ThemeSelect.style.ts';
import { useTheme } from '@hooks/useTheme.ts';
import { FormIntro } from '@components/profile/FormIntro/FormIntro';

const THEMES = [
  { value: Images.ROOM, name: 'Home' },
  { value: Images.PARK, name: 'Park' },
  { value: Images.SEA, name: 'Sea' }
];

export const ThemeSelect = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme().theme;

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
    <ScrollView contentContainerStyle={ThemeSelectStyle.container}>
      <View>
        <FormIntro
          emoji="🎨"
          emojiBackgroundColor={COLORS.PASTEL_BLUE}
          title="Choose your theme"
        />
        <View style={ThemeSelectStyle.themes}>
          {THEMES.map((theme) => {
            const selected = theme.value === image;
            return (
              <TouchableOpacity
                key={theme.value}
                activeOpacity={0.8}
                style={[
                  ThemeSelectStyle.themeCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: selected
                      ? COLORS.BUTTON_BLUE
                      : COLORS.TRANSPARENT
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
                <View style={ThemeSelectStyle.footerRow}>
                  <Text style={[ThemeSelectStyle.name, { color: colors.text }]}>
                    {theme.name}
                  </Text>
                  <View
                    style={[
                      ThemeSelectStyle.radio,
                      selected && ThemeSelectStyle.radioSelected
                    ]}
                  >
                    {selected && (
                      <Text style={ThemeSelectStyle.radioCheck}>✓</Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={ThemeSelectStyle.credits}>
        <Text style={ThemeSelectStyle.creditsText}>
          Illustrations by Jana Polak
        </Text>
        <Text style={ThemeSelectStyle.creditsHandle}>@janapolak</Text>
      </View>
    </ScrollView>
  );
};
