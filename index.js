/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./src/app/App";
import { name as appName } from "./app.json";
import "react-native-gesture-handler";
import TrackPlayer from "react-native-track-player";
import { PlaybackService } from "./src/utils/general/PlaybackService";

AppRegistry.registerComponent(appName, () => App);

TrackPlayer.registerPlaybackService(() => PlaybackService);