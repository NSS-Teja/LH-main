import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';

const BookLoader = () => {
  const [pageFlip, setPageFlip] = useState(new Animated.Value(0));

  useEffect(() => {
    const startFlipping = () => {
      Animated.loop(
        Animated.timing(pageFlip, {
          toValue: 1,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    };

    startFlipping();
  }, [pageFlip]);

  const rotate = pageFlip.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const resetFlip = () => pageFlip.setValue(0);

  return (
    <View style={styles.container}>
      <View style={styles.book}>
        <Animated.View
          style={[styles.page, {transform: [{rotateY: rotate}]}]}
        />
        <Animated.View
          style={[styles.page, {transform: [{rotateY: rotate}]}]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  book: {
    width: 80,
    height: 100,
    backgroundColor: '#eee',
    position: 'relative',
  },
  page: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
    borderWidth: 1,
  },
});

export default BookLoader;
