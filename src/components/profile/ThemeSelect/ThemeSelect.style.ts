import { StyleSheet } from 'react-native';

export const ThemeSelectStyle = StyleSheet.create({
  container: {
    paddingBottom: 20
  },
  imagesRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  imageContainer: {
    borderWidth: 2,
    borderRadius: 10
  },
  image: {
    width: 100,
    height: 100
  },
  title: {
    marginTop: 20,
    alignSelf: 'center'
  },
  description: {
    marginTop: 5,
    alignSelf: 'center'
  }
});
