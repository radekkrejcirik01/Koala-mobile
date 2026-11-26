import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';
import { createStyles } from '@utils/general/createStyles';

// The iOS system red, for Delete
export const DESTRUCTIVE = '#ff3b30';

// A soft wide shadow, the cards float over the light dim
const CARD_SHADOW = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.14,
  shadowRadius: 24,
  elevation: 10
};

export const useMessageMenuStyle = createStyles((colors) => ({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  preview: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 12
  },
  // Lines the reactions and actions up with the message
  row: {
    position: 'absolute'
  },
  reactions: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 28,
    backgroundColor: colors.card,
    ...CARD_SHADOW
  },
  reactionButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center'
  },
  reaction: {
    color: colors.text,
    fontSize: 32
  },
  // As wide as its longest action
  actions: {
    minWidth: 168,
    paddingVertical: 6,
    borderRadius: 26,
    backgroundColor: colors.card,
    ...CARD_SHADOW
  },
  action: {
    height: 46,
    marginHorizontal: 6,
    paddingLeft: 8,
    paddingRight: 20,
    // The card's corners less its 6pt inset, so a pressed row follows them
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  actionPressed: {
    backgroundColor: colors.surface_200
  },
  actionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionText: {
    fontSize: 15.5,
    fontWeight: '500',
    color: colors.text
  },
  destructiveText: {
    color: DESTRUCTIVE
  },
  // A caption under the card, readable on the dim over a light chat
  time: {
    marginTop: 8,
    paddingHorizontal: 8,
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.WHITE,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3
  }
}));
