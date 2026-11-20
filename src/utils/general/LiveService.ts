import { AppState } from 'react-native';
import store from '@store/index/index';
import {
  resetTypingAction,
  startTypingAction,
  stopTypingAction
} from '@store/LiveReducer';
import { getRequest } from '@utils/Axios/Axios.service';
import { NotificationsService } from '@utils/general/NotificationsService';
import { ResponseUserGetInterface } from '@interfaces/response/Response.interface';
import {
  LiveEvent,
  LivePingSendInterface,
  LiveTypingSendInterface
} from '@interfaces/live/Live.interface';
import { LiveEventType } from '@enums/LiveEventType';

const LIVE_URL = 'wss://g0yngqfbu3.execute-api.eu-central-1.amazonaws.com/prod';
// The server closes a socket after 10 minutes without messages
const PING_INTERVAL = 5 * 60 * 1000;
const MAX_RETRY_DELAY = 30 * 1000;
// Hides the friend's typing when the stop never arrives
const TYPING_TIMEOUT = 5000;

type Listener<T> = (value: T) => void;

class LiveServiceClass {
  private socket: WebSocket = null;

  // The token the socket is open with, or is reconnecting with
  private token: string = null;

  private retry = 0;

  private retryTimer: ReturnType<typeof setTimeout> = null;

  private pingTimer: ReturnType<typeof setInterval> = null;

  private typingTimers = new Map<number, ReturnType<typeof setTimeout>>();

  private eventListeners = new Set<Listener<LiveEvent>>();

  private connectListeners = new Set<Listener<void>>();

  public init = () => {
    AppState.addEventListener('change', this.update);
    store.subscribe(this.update);
    this.update();
  };

  // Every event, nothing is replayed after a reconnect
  public subscribe = (listener: Listener<LiveEvent>) => {
    this.eventListeners.add(listener);
    return () => {
      this.eventListeners.delete(listener);
    };
  };

  // After every connect, to refetch what may have been missed meanwhile
  public onConnect = (listener: Listener<void>) => {
    this.connectListeners.add(listener);
    return () => {
      this.connectListeners.delete(listener);
    };
  };

  public sendTyping = (friendId: number, typing: boolean) => {
    this.send<LiveTypingSendInterface>({ action: 'typing', friendId, typing });
  };

  // Open only in the foreground while logged in, a new token reconnects.
  // Closed already on 'inactive', iOS may suspend the app before a close on
  // 'background' goes out, leaving the user online until the idle timeout
  private update = () => {
    const { token } = store.getState().user;
    const { currentState } = AppState;
    const wanted =
      token && currentState !== 'background' && currentState !== 'inactive'
        ? token
        : null;

    if (wanted === this.token) {
      return;
    }

    // Set first, closing dispatches to the store, which runs this again
    this.token = wanted;
    this.close();
    if (wanted) {
      this.open();
    }
  };

  private open = () => {
    let opened = false;

    const socket = new WebSocket(
      `${LIVE_URL}?token=${encodeURIComponent(this.token)}`
    );
    this.socket = socket;

    socket.onopen = () => {
      opened = true;
      this.retry = 0;
      this.pingTimer = setInterval(
        () => this.send<LivePingSendInterface>({ action: 'ping' }),
        PING_INTERVAL
      );
      this.connectListeners.forEach((listener) => listener());
      NotificationsService.getUnreadChats();
    };

    socket.onmessage = (message: WebSocketMessageEvent) => {
      try {
        this.handle(JSON.parse(message.data));
      } catch (e) {
        // Not JSON, nothing to handle
      }
    };

    socket.onclose = () => {
      // Closed on purpose
      if (this.socket !== socket) {
        return;
      }

      clearInterval(this.pingTimer);
      this.socket = null;

      // A rejected token only shows as a closed socket, a 401 from the REST
      // API logs out, which closes it for good
      if (!opened) {
        getRequest<ResponseUserGetInterface>('user').subscribe();
      }

      this.retryTimer = setTimeout(
        this.open,
        Math.min(1000 * 2 ** this.retry, MAX_RETRY_DELAY)
      );
      this.retry += 1;
    };
  };

  private close = () => {
    clearTimeout(this.retryTimer);
    clearInterval(this.pingTimer);
    this.retry = 0;

    const { socket } = this;
    this.socket = null;
    socket?.close();

    // No stop arrives while closed
    this.typingTimers.forEach((timer) => clearTimeout(timer));
    this.typingTimers.clear();
    store.dispatch(resetTypingAction());
  };

  private send = <T>(body: T) => {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(body));
    }
  };

  private handle = (event: LiveEvent) => {
    if (event.type === LiveEventType.Typing) {
      this.setTyping(event.data.friendId, event.data.typing);
    }

    // The friend's message ends their typing
    if (
      event.type === LiveEventType.MessageNew &&
      event.data.message.senderId === event.data.friendId
    ) {
      this.setTyping(event.data.friendId, false);
    }

    this.eventListeners.forEach((listener) => listener(event));

    if (this.changesUnread(event)) {
      NotificationsService.getUnreadChats();
    }
  };

  // The badge counts unread chats, the user's own sends don't change it
  private changesUnread = (event: LiveEvent): boolean => {
    switch (event.type) {
      case LiveEventType.MessageNew:
        return event.data.message.senderId === event.data.friendId;
      case LiveEventType.MessageDeleted:
      case LiveEventType.MessageReaction:
        return true;
      case LiveEventType.ChatRead:
        return event.data.readerId !== event.data.friendId;
      default:
        return false;
    }
  };

  private setTyping = (friendId: number, typing: boolean) => {
    clearTimeout(this.typingTimers.get(friendId));
    this.typingTimers.delete(friendId);

    if (typing) {
      this.typingTimers.set(
        friendId,
        setTimeout(() => this.setTyping(friendId, false), TYPING_TIMEOUT)
      );
      store.dispatch(startTypingAction(friendId));
    } else {
      store.dispatch(stopTypingAction(friendId));
    }
  };
}

export const LiveService: LiveServiceClass = new LiveServiceClass();
