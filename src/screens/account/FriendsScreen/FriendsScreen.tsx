import React, { JSX, useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useFriends } from '@hooks/useFriends';
import { useTheme } from '@hooks/useTheme';
import { usePrompt } from '@hooks/usePrompt';
import {
  AVATAR_SIZE,
  FriendsScreenStyle
} from '@screens/account/FriendsScreen/FriendsScreen.style';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest
} from '@utils/Axios/Axios.service';
import {
  ResponseInterface,
  ResponseInvitesGetInterface
} from '@interfaces/response/Response.interface';
import { InvitePostInterface } from '@interfaces/post/Post.interface';
import { InviteInterface, UserInterface } from '@interfaces/general.interface';
import COLORS from '@constants/COLORS';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { AddButton } from '@components/general/AddButton/AddButton';
import { Prompt } from '@components/general/Prompt/Prompt';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { InviteItem } from '@components/friends/InviteItem/InviteItem';
import { setUnseenInvites } from '@store/NotificationsReducer';

export const FriendsScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const { top, bottom } = useSafeAreaInsets();
  const { colors } = useTheme().theme;
  const { showActionSheetWithOptions } = useActionSheet();
  const { promptVisible, showPrompt, hidePrompt } = usePrompt();

  const [invites, setInvites] = useState<InviteInterface[]>([]);
  const [accepting, setAccepting] = useState<boolean>(false);

  const { friends, loadFriends, loaded } = useFriends();

  const loadInvites = useCallback(() => {
    getRequest<ResponseInvitesGetInterface>('invites').subscribe(
      (response: ResponseInvitesGetInterface) => {
        if (response?.status) {
          setInvites(response?.data);
          dispatch(setUnseenInvites(response?.data?.length ?? 0));
        }
      }
    );
  }, [dispatch]);

  useEffect(() => {
    loadInvites();
  }, [loadInvites]);

  const sendInvite = useCallback((text: string) => {
    const receiver = text.trim();
    if (!receiver) {
      return;
    }

    postRequest<ResponseInterface, InvitePostInterface>('invite', {
      receiver
    }).subscribe((response: ResponseInterface) => {
      if (response?.status) {
        Alert.alert(response.message);
      }
    });
  }, []);

  const acceptInvite = (user: string) => {
    setAccepting(true);

    putRequest<ResponseInterface, InvitePostInterface>('invite', {
      receiver: user
    }).subscribe((response: ResponseInterface) => {
      setAccepting(false);

      if (response?.status) {
        if (response?.message) {
          Alert.alert(response.message);
          return;
        }

        loadFriends();
        loadInvites();
      }
    });
  };

  const removeInvite = (id: number) => {
    deleteRequest<ResponseInterface>(`invite/${id}`).subscribe(
      (response: ResponseInterface) => {
        if (response?.status) {
          loadInvites();
        }
      }
    );
  };

  const removeFriend = useCallback(
    (id: number) => {
      deleteRequest<ResponseInterface>(`friend/${id}`).subscribe(
        (response: ResponseInterface) => {
          if (response?.status) {
            loadFriends();
          }
        }
      );
    },
    [loadFriends]
  );

  const openFriendActions = useCallback(
    (id: number, name: string) => {
      showActionSheetWithOptions(
        {
          options: ['Remove friend', 'Cancel'],
          cancelButtonIndex: 1,
          destructiveButtonIndex: 0,
          userInterfaceStyle: 'light',
          title: name
        },
        (selectedIndex: number) => {
          if (selectedIndex === 0) {
            removeFriend(id);
          }
        }
      );
    },
    [removeFriend, showActionSheetWithOptions]
  );

  return (
    <View style={[FriendsScreenStyle.container, { paddingTop: top }]}>
      <ScreenHeader
        title="Friends"
        rightComponent={<AddButton onPress={showPrompt} />}
      />
      <ScrollView
        contentContainerStyle={[
          FriendsScreenStyle.contentContainer,
          { paddingBottom: bottom + 30 }
        ]}
      >
        {!!invites?.length && (
          <>
            <Text style={FriendsScreenStyle.sectionTitle}>
              Invites · {invites.length}
            </Text>
            {invites.map((value: InviteInterface) => (
              <InviteItem
                key={value.id}
                item={value}
                posting={accepting}
                onAcceptInvite={() => acceptInvite(value.username)}
                onRemove={() => removeInvite(value.id)}
              />
            ))}
          </>
        )}

        {loaded ? (
          friends?.length ? (
            friends.map((friend: UserInterface) => (
              <TouchableOpacity
                key={friend.id ?? friend.username}
                activeOpacity={0.7}
                onLongPress={() => openFriendActions(friend.id, friend.name)}
                style={FriendsScreenStyle.friendRow}
              >
                <ProfilePhoto
                  name={friend.name}
                  photo={friend.profilePhoto}
                  size={AVATAR_SIZE}
                />
                <View style={FriendsScreenStyle.friendTextView}>
                  <Text
                    numberOfLines={1}
                    style={[
                      FriendsScreenStyle.friendName,
                      { color: colors.text }
                    ]}
                  >
                    {friend.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={FriendsScreenStyle.friendUsername}
                  >
                    @{friend.username}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={FriendsScreenStyle.listEmptyView}>
              <Text style={FriendsScreenStyle.listEmptyText}>
                No friends yet. Add someone by their username.
              </Text>
            </View>
          )
        ) : (
          <ActivityIndicator
            color={COLORS.BUTTON_BLUE}
            style={FriendsScreenStyle.activityIndicator}
          />
        )}
      </ScrollView>
      <Prompt
        title="Add friend by username"
        isVisible={promptVisible}
        onPressOk={sendInvite}
        onClose={hidePrompt}
      />
    </View>
  );
};
