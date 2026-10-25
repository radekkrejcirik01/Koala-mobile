import { StyleSheet } from 'react-native';

export const ThemeSelectStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 14
  },
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: 84,
    height: 84
  },
  name: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '600'
  },
  title: {
    marginTop: 20,
    alignSelf: 'center'
  },
  description: {
    marginTop: 5,
    marginBottom: 20,
    alignSelf: 'center'
  }
});
