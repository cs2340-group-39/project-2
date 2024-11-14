import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

const AnimatedGradientBackground = () => {
  const colorAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(colorAnimation, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, [colorAnimation]);

  const backgroundColor = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ff6b6b', '#4e54c8'],
  });

  return (
    <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor }]}>
      <LinearGradient
        colors={['#ff6b6b', '#4e54c8', '#1f3b4d']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </Animated.View>
  );
};

export default AnimatedGradientBackground;
