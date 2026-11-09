import { MessageInterface } from '@interfaces/general.interface';
import { PAGE_SIZE } from '@constants/PAGE_SIZE';

// Puts a refreshed first page over the older pages already loaded, keeping
// the messages still being sent (negative ids) on top
export function mergeLatestMessages(
  latest: MessageInterface[],
  current: MessageInterface[]
): MessageInterface[] {
  const sending = current.filter((item) => item.id < 0);

  if (latest.length < PAGE_SIZE) {
    return sending.concat(latest);
  }

  const oldestId = latest[latest.length - 1].id;

  return sending.concat(
    latest,
    current.filter((item) => item.id > 0 && item.id < oldestId)
  );
}
