import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

const defaultDataWith6Colors = [
  '#B0604D',
  '#899F9C',
  '#B3C680',
  '#5C6265',
  '#F5D399',
  '#F1F1F1'
];

export const HomeCarousel = (): React.JSX.Element => {
  const ref = React.useRef<ICarouselInstance>(null);

  const onPress = (direction: 'right' | 'left') => {
    ref.current?.scrollTo({
      count: direction === 'right' ? 1 : -1,
      animated: true
    });
  };

  return (
    <View
      style={{
        paddingTop: 120
      }}
    >
      <Carousel
        ref={ref}
        data={defaultDataWith6Colors}
        height={500}
        loop={false}
        pagingEnabled
        snapEnabled
        width={380}
        style={{
          alignSelf: 'center'
        }}
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50
        }}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: item
            }}
          >
            <Text style={{ textAlign: 'center', fontSize: 30 }}>
              {index + 1}
            </Text>
          </View>
        )}
      />
      <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}
      >
        <TouchableOpacity
          onPress={() => onPress('left')}
          style={{
            width: 75,
            height: 75,
            backgroundColor: 'lightgrey',
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ fontSize: 28 }}>⬅️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPress('right')}
          style={{
            width: 75,
            height: 75,
            backgroundColor: 'lightgrey',
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ fontSize: 28 }}>➡️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
