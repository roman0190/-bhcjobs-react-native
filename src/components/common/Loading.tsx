import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';

interface LoadingProps {
  size?: number;
  color?: string;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export default function Loading({ size = 50, color }: LoadingProps) {
  const { theme } = useTheme();
  const spinValue = useSharedValue(0);
  const loadingColor = color || theme.primary;

  useEffect(() => {
    spinValue.value = withRepeat(
      withTiming(360, {
        duration: 1200,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spinValue.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      <AnimatedView
        style={[
          {
            width: size,
            height: size,
            borderWidth: size / 10,
            borderRadius: size / 2,
            borderColor: `${loadingColor}33`,
            borderTopColor: loadingColor,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
