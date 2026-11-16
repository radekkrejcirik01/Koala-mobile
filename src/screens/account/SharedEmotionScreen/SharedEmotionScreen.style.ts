import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const SharedEmotionScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    paddingTop: 28,
    paddingHorizontal: 24
  },
  emojiView: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE_200
  },
  emojiText: {
    color: COLORS.BLACK,
    fontSize: 32
  },
  messageText: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center'
  },
  timeText: {
    marginTop: 6,
    fontSize: 13,
    textAlign: 'center',
    color: COLORS.GRAY_200
  },
  sectionTitle: {
    marginTop: 28,
    marginBottom: 6,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.GRAY_200
  },
  recipientView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8
  },
  profilePhoto: {
    marginRight: 12,
    borderRadius: 9
  },
  profilePhotoShape: {
    borderRadius: 9
  },
  nameText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500'
  },
  emptyText: {
    paddingVertical: 8,
    fontSize: 14,
    color: COLORS.GRAY_200
  }
});
