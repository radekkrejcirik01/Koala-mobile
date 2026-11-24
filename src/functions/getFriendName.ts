import { UserInterface } from '@interfaces/general.interface';

// The user's private nickname for the friend, otherwise their own name
export function getFriendName(
  friend: Pick<UserInterface, 'name' | 'nickname'>
): string {
  return friend.nickname || friend.name;
}
