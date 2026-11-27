import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerProps } from '@store/index/index.props.ts';
import { Images } from '@enums/images.ts';
import COLORS from '@constants/COLORS.ts';
import { setImageAction } from '@store/UserReducer.ts';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage.ts';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum.ts';
import { useThemeSelectStyle } from '@components/profile/ThemeSelect/ThemeSelect.style.ts';
import { useTheme } from '@hooks/useTheme.ts';
import { FormIntro } from '@components/profile/FormIntro/FormIntro';
import { getIllustration } from '@functions/getIllustration';
import { AppearanceService } from '@utils/general/AppearanceService';
import { APPEARANCES } from '@constants/APPEARANCES';

const THEMES = [
  { value: Images.ROOM, name: 'Home' },
  { value: Images.PARK, name: 'Park' },
  { value: Images.SEA, name: 'Sea' }
];

const DARK_THEMES = THEMES.filter((theme) => theme.value === Images.ROOM);

export const ThemeSelect = () => {
  const ThemeSelectStyle = useThemeSelectStyle();
  const dispatch = useDispatch();
  const { theme, isDark } = useTheme();
  const { colors } = theme;

  const { image, appearance } = useSelector(
    (state: ReducerProps) => state.user
  );

  const getBackgroundColor = (value: Images) => {
    // The dark illustrations are cut out, they sit on the app's background
    if (isDark) {
      return colors.background;
    }
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
          emojiBackgroundColor={COLORS.PASTEL_PURPLE}
          title="Choose your theme"
        />
        <Text style={ThemeSelectStyle.sectionTitle}>Appearance</Text>
        <View
          style={[
            ThemeSelectStyle.appearanceCard,
            { backgroundColor: colors.surface }
          ]}
        >
          {APPEARANCES.map((item, index) => (
            <TouchableOpacity
              key={item.value}
              activeOpacity={0.7}
              onPress={() => AppearanceService.set(item.value)}
              style={[
                ThemeSelectStyle.appearanceRow,
                index === APPEARANCES.length - 1 && ThemeSelectStyle.noBorder
              ]}
            >
              <Text style={ThemeSelectStyle.appearanceName}>{item.name}</Text>
              {item.value === appearance && (
                <Text style={ThemeSelectStyle.appearanceCheck}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <Text style={ThemeSelectStyle.sectionTitle}>Background</Text>
        <View>
          {/* Dark mode only has the room, the light choice is kept for later */}
          {(isDark ? DARK_THEMES : THEMES).map((theme) => {
            const selected = isDark || theme.value === image;
            return (
              <TouchableOpacity
                key={theme.value}
                activeOpacity={0.8}
                disabled={isDark}
                style={[
                  ThemeSelectStyle.themeCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: selected
                      ? colors.accent
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
                    source={getIllustration(theme.value, isDark)}
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
