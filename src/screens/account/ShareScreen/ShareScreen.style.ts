import { StyleSheet } from 'react-native';

export const CLUSTER_SIZE = { width: 260, height: 260 };

// 5 positions evenly spaced around a circle centered in the cluster.
export const EMOTION_POSITIONS = [
  { left: 94, top: 4 },
  { left: 180, top: 66 },
  { left: 147, top: 167 },
  { left: 41, top: 167 },
  { left: 8, top: 66 }
];

export const ShareScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  contentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 30,
    paddingHorizontal: 20
  },
  clusterView: {
    width: CLUSTER_SIZE.width,
    height: CLUSTER_SIZE.height
  },
  emotionItem: {
    position: 'absolute'
  },
  sendView: {
    flex: 1,
    justifyContent: 'center'
  },
  send: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignSelf: 'flex-end'
  }
});
