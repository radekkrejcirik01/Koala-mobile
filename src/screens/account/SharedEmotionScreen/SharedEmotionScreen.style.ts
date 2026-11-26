import { createStyles } from '@utils/general/createStyles';

export const useSharedEmotionScreenStyle = createStyles((colors) => ({
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
    backgroundColor: colors.surface_200
  },
  emojiText: {
    color: colors.text,
    fontSize: 32
  },
  messageText: {
    color: colors.text,
    marginTop: 16,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center'
  },
  timeText: {
    marginTop: 6,
    fontSize: 13,
    textAlign: 'center',
    color: colors.textSecondary
  },
  sectionTitle: {
    marginTop: 28,
    marginBottom: 6,
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary
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
    color: colors.text,
    flex: 1,
    fontSize: 16,
    fontWeight: '500'
  },
  emptyText: {
    paddingVertical: 8,
    fontSize: 14,
    color: colors.textSecondary
  }
}));
