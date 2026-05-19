import React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useWindowDimensions } from "react-native";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default function HeroWave() {
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);

  React.useEffect(() => {
    translateX.value = withRepeat(
      withTiming(-width * 0.3, {
        duration: 4000,
        // Easing বাদ — default linear কাজ করবে
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const svgWidth = width * 1.6;
  const rectHeight = 500;
  const waveHeight = 60;

  return (
    <AnimatedSvg
      height={rectHeight + waveHeight}
      width={svgWidth}
      viewBox={`0 0 ${svgWidth} ${rectHeight + waveHeight}`}
      style={[{ position: "absolute", top: 0, left: 0 }, animatedStyle]}
    >
      <Defs>
        <LinearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#4A90D9" stopOpacity="1" />
          <Stop offset="100%" stopColor="#5B7FD4" stopOpacity="1" />
        </LinearGradient>
      </Defs>

      <Path
        fill="url(#heroGrad)"
        d={`
          M0,0
          L${svgWidth},0
          L${svgWidth},${rectHeight}
          C${svgWidth * 0.85},${rectHeight + waveHeight}
            ${svgWidth * 0.65},${rectHeight - waveHeight}
            ${svgWidth * 0.5},${rectHeight}
          C${svgWidth * 0.35},${rectHeight + waveHeight}
            ${svgWidth * 0.15},${rectHeight - waveHeight}
            0,${rectHeight}
          Z
        `}
      />
    </AnimatedSvg>
  );
}