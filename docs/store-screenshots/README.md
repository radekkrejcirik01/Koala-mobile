# Store screenshots

How to produce the App Store and Google Play screenshots with mock data.

The app runs against a fake backend (`src/utils/Axios/Axios.mock.ts`), a small
dev-only driver switches screens, `capture.sh` grabs the raw screens, and the
`compose_*.py` scripts frame them into the final store images.

| File | What it does |
| --- | --- |
| `src/utils/Axios/Axios.mock.ts` | Fake API responses: user, friends, chats, moods |
| `capture.sh` | Captures the raw screens on iOS and/or Android |
| `slides.py` | Order, headline and subtitle of every screenshot |
| `compose_ios.py` | Builds the App Store images |
| `compose_android.py` | Builds the Google Play images and the feature graphic |

## Output

| Store | Folder | Size |
| --- | --- | --- |
| App Store, iPhone 6.9" | `6.9-inch (1320x2868)/` | 1320 × 2868 |
| App Store, iPhone 6.1"/6.3" | `6.3-inch (1206x2622)/` | 1206 × 2622 |
| Google Play, phone | `phone (1080x1920)/` | 1080 × 1920 |
| Google Play, feature graphic | `feature_graphic (1024x500).png` | 1024 × 500 |

Each folder also gets an `_overview.png` with all images side by side. It is
only a preview, don't upload it.

Google Play rejects screenshots whose long side is more than twice the short
side, so the iPhone images can't be reused there. The Play layout lets the
phone run off the bottom edge to keep the app readable at 9:16.

## Requirements

- macOS (the scripts use the system SF Pro Rounded font)
- Metro running (`yarn start`)
- iOS: a booted simulator with the dev build installed. Use an iPhone with a
  6.3" screen (e.g. iPhone 18 Pro, captures are 1206 × 2622)
- Android: the `Pixel_8_Pro` emulator with the dev build installed
- Pillow:

  ```bash
  python3 -m venv /tmp/screenshots-venv
  /tmp/screenshots-venv/bin/pip install pillow
  ```

Start the emulator and install the Android build:

```bash
~/Library/Android/sdk/emulator/emulator -avd Pixel_8_Pro &
yarn android --no-packager
```

If `yarn android` fails at the end with `spawnSync adb ENOENT`, the app is
installed but `adb` isn't on your PATH. That's fine, `capture.sh` launches the
app itself.

The device must be logged in, any account works since the mocks replace all
API responses.

## 1. Turn on the mocks

In `src/utils/Axios/Axios.instance.ts`:

```ts
const MOCK_DATA = __DEV__ && true;
```

While this is on, the app never calls the real backend. Sending messages,
sharing moods etc. only pretend to succeed.

## 2. Add the screen driver

The driver polls a local server that `capture.sh` runs and resets the
navigation to the requested screen. Create `src/utils/ScreenshotDriver.ts`:

```ts
// TEMPORARY: drives navigation from a local server for store screenshots
import { CommonActions } from '@react-navigation/native';
import { navigationRef } from '@utils/getCurrentRouteName';

let last = '';

setInterval(() => {
  fetch(`http://localhost:8799/command?t=${Date.now()}`, {
    headers: { 'Cache-Control': 'no-cache' }
  })
    .then((response) => response.json())
    .then(({ key, screen, params }) => {
      if (key === last || !navigationRef.isReady()) {
        return;
      }
      last = key;
      const routes: Array<{ name: string; params?: object }> = [
        { name: 'HomeScreen' }
      ];
      if (screen !== 'HomeScreen') {
        routes.push({ name: screen, params });
      }
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'AccountStack',
              state: { index: routes.length - 1, routes }
            }
          ]
        })
      );
    })
    .catch(() => {});
}, 700);
```

And import it in `src/navigation/index.tsx`, below the `navigationRef` import:

```ts
import '@utils/ScreenshotDriver';
```

## 3. Capture

```bash
docs/store-screenshots/capture.sh both /tmp/screenshots/raw
```

Use `ios` or `android` instead of `both` to capture one platform. The script:

- sets a clean status bar (9:41, full battery and signal) and resets it when
  done
- relaunches the app and waits 20 s for the bundle to load
- opens every screen and saves `<name>.png` to `raw/ios` and `raw/android`

Look through the raw captures before composing. Images load from the network,
so if an avatar is missing, run the capture again.

## 4. Compose

```bash
cd docs/store-screenshots
/tmp/screenshots-venv/bin/python compose_ios.py /tmp/screenshots/raw/ios ~/Desktop/Koala-AppStore
/tmp/screenshots-venv/bin/python compose_android.py /tmp/screenshots/raw/android ~/Desktop/Koala-PlayStore
```

Headlines and subtitles live in `slides.py`, used by both stores. To add or
remove a screenshot, change `SLIDES` there and the `capture` calls at the
bottom of `capture.sh`.

## 5. Clean up

Don't commit or release with the screenshot setup on:

- [ ] `MOCK_DATA` back to `__DEV__ && false`
- [ ] delete `src/utils/ScreenshotDriver.ts`
- [ ] remove `import '@utils/ScreenshotDriver';` from `src/navigation/index.tsx`
- [ ] close the emulator (`adb emu kill`)

## Editing the mock data

Everything is in `src/utils/Axios/Axios.mock.ts`. The `route` function maps
each endpoint to a response, anything not listed (all POST/PUT/DELETE requests)
returns `success`.

| Constant | Shown on |
| --- | --- |
| `ME` | Your profile photo on Home |
| `FRIENDS` | Friends list, chat names and photos |
| `INVITES` | Friend invites, and the badge on the add-friend button |
| `CHATS` | Chats list and every conversation |
| `MOOD_PATTERN` | Analytics charts and history |
| `unseenNotifications` in `route` | The badge on the Chats button |

Keep these in mind when changing them:

- **Every chat needs a mood and a support message.** A chat only shows its
  messages after someone sent support for the shared mood, otherwise it shows
  just the "Send support to start a chat" button. `getConversation` builds
  that start for you: `sharedBy` shared the mood and the other person sent
  support.
- **The Chats preview comes from the last message** of each chat, so the list
  and the conversation always match.
- **No voice messages.** The voice message type looks bad in the list.
- **Keep `unseenNotifications` equal to the number of unread chats**
  (`seen: 0`).
- **Moods have no custom text.** The app sends the mood's own label
  ("Super good", "Meh", …), so the generator uses the label from `EMOTIONS`.
- **Keep the moods balanced.** `MOOD_PATTERN` mixes good and bad moods on
  purpose. Analytics shows the total count of the week, it depends on the day
  and time you capture.
- **Profile photos** come from randomuser.me (`avatar('women/27')`). Browse
  `https://randomuser.me/api/portraits/women/<0-99>.jpg` (or `men/`) to pick
  others. They're meant for demo use. For full rights, replace them with
  licensed stock photos or photos of people who agreed to it.
- **`URLSearchParams.get` isn't implemented in React Native**, parse query
  strings by hand like `route` does.

## Gotchas

- **Capture Home before Chats.** Opening Chats marks the chats as seen and
  clears the badge on Home.
- **"Last online" only shows for 7 seconds** after a chat opens, then the
  header switches to the username. `capture.sh` waits 4 seconds for the chat.
- **Android shows a "no screen lock" shield** next to the clock that demo
  mode can't hide. `compose_android.py` paints over it.
- **The Dynamic Island and punch-hole camera** aren't in the raw captures, the
  compose scripts draw them on the frame.
- **The iOS Share screen opens as a sheet**, so its capture shows the dimmed
  Home screen behind the status bar. That's how the app looks.
