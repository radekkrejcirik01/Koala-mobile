import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FriendsModalScreenStyle = StyleSheet.create({
  container: {
    height: '42%',
    paddingTop: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-between'
  },
  flexStart: {
    justifyContent: 'flex-start'
  },
  titleText: {
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  invitesText: {
    marginRight: 15,
    color: COLORS.GRAY_200,
    alignSelf: 'flex-end',
    fontWeight: '600'
  },
  profilesContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  profileView: {
    height: 85,
    marginHorizontal: 12,
    marginBottom: 10
  },
  inviteContainer: {
    paddingVertical: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  input: {
    height: 50,
    marginTop: '15%',
    marginHorizontal: '10%',
    borderRadius: 20,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  sendButtonView: {
    height: 45,
    width: 120,
    marginTop: 40,
    borderRadius: 20,
    backgroundColor: COLORS.BUTTON_BLUE,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendButtonText: {
    fontSize: 20,
    color: COLORS.WHITE,
    fontWeight: 'bold'
  },
  friendInvitesView: {
    marginTop: 15
  },
  listEmptyText: {
    marginTop: 100,
    color: COLORS.GRAY_200,
    alignSelf: 'center',
    fontWeight: '500'
  },
  usernameDescriptionText: {
    color: COLORS.GRAY_200,
    alignSelf: 'center',
    fontWeight: '500'
  }
});
