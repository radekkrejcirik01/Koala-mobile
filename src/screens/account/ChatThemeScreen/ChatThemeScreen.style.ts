import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';
import { createStyles } from '@utils/general/createStyles';

export const useChatThemeScreenStyle = createStyles((colors) => ({
  container: {
    flex: 1
  },
  contentContainer: {
    paddingHorizontal: 16
  },
  themeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    borderWidth: 2,
    borderRadius: 14
  },
  // A small chat in the theme's colors
  preview: {
    width: 84,
    height: 84,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    gap: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.surface_200
  },
  previewBubble: {
    height: 14,
    borderRadius: 7
  },
  previewInbound: {
    width: '60%',
    alignSelf: 'flex-start',
    backgroundColor: colors.bubble
  },
  previewOutbound: {
    width: '70%',
    alignSelf: 'flex-end'
  },
  footerRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 6
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600'
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.border
  },
  radioSelected: {
    borderColor: COLORS.BUTTON_BLUE,
    backgroundColor: COLORS.BUTTON_BLUE
  },
  radioCheck: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.WHITE
  }
}));
