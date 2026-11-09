import { MessageInterface } from '@interfaces/general.interface';
import { PAGE_SIZE } from '@constants/PAGE_SIZE';

// Puts a refreshed first page over the older pages already loaded, keeping
// the messages still being sent (negative ids) on top. Also says whether
// older messages are left to load, undefined when that hasn't changed
export function mergeLatestMessages(
  latest: MessageInterface[],
  current: MessageInterface[]
): { messages: MessageInterface[]; hasOlder?: boolean } {
  const sending = current.filter((item) => item.id < 0);
  const loaded = current.filter((item) => item.id > 0);

  // The page holds the whole chat
  if (latest.length < PAGE_SIZE) {
    return { messages: sending.concat(latest), hasOlder: false };
  }

  const oldestId = latest[latest.length - 1].id;

  // First load, or more messages arrived than a page holds and the loaded
  // ones no longer connect to it, they load again when scrolling up
  if (!loaded.some((item) => item.id >= oldestId)) {
    return { messages: sending.concat(latest), hasOlder: true };
  }

  return {
    messages: sending.concat(
      latest,
      loaded.filter((item) => item.id < oldestId)
    )
  };
}
