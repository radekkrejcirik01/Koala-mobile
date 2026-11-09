import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AVATAR_SIZE = 48;

export const FriendsScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 8
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 6,
    marginHorizontal: 20,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: COLORS.GRAY_200
  },
  friendRow: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  friendTextView: {
    flex: 1,
    marginLeft: 14
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600'
  },
  friendUsername: {
    marginTop: 2,
    fontSize: 14,
    color: COLORS.GRAY_200
  },
  listEmptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listEmptyText: {
    marginHorizontal: 40,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.GRAY_200
  }
});
