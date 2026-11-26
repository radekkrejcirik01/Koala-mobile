import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';
import { createStyles } from '@utils/general/createStyles';

export const useSupportOverlayStyle = createStyles((colors) => ({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.64)'
  },
  pill: {
    position: 'absolute',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 12
  },
  buttonView: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  // The circle with the label under it, all of it can be tapped
  button: {
    alignItems: 'center'
  },
  buttonCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  buttonEmoji: {
    color: colors.text,
    fontSize: 32
  },
  buttonText: {
    marginTop: 10,
    color: COLORS.WHITE,
    fontSize: 15,
    fontWeight: '600',
    // Readable on the light dim over a light chat
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3
  }
}));
