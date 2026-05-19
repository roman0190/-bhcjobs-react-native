import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';
const { width } = Dimensions.get('window');
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const Wave = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const svgWidth = width * 1.6;
  const rectHeight = 300;
  const waveHeight = 40;
  const translateX = useSharedValue(0);

  React.useEffect(() => {
    translateX.value = withRepeat(
      withTiming(-width * 0.5, { duration: 4000 }),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <AnimatedSvg
      height={rectHeight + waveHeight}
      width={svgWidth}
      viewBox={`0 0 ${svgWidth} ${rectHeight + waveHeight}`}
      style={[StyleSheet.absoluteFill, { width: svgWidth }, animatedStyle]}
    >
      <Defs>
        <LinearGradient id="heroGrad" x1="0" y1="0" x2="0.5" y2="0.8">
          <Stop offset="0.5%" stopColor={theme.wavefg} stopOpacity="1" />
          <Stop offset="100%" stopColor={theme.waveBg} stopOpacity="1" />
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
};

const Hero = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.bg, borderBottomColor: theme.overlay },
      ]}
    >
      <Wave />
      <View style={styles.content}>
        <Text style={styles.topText}>#1 Platform for Saudi Jobs</Text>

        <Text style={styles.description}>
          Apply for jobs in Saudi Arabia with verified employers. We connect
          Bangladeshi workforce with high-demand Saudi Jobs.
        </Text>

        <View
          style={[
            styles.searchContainer,
            { backgroundColor: theme.transparentBg },
          ]}
        >
          <TextInput
            placeholder="Search Job"
            placeholderTextColor="#94A3B8"
            style={[styles.input]}
          />
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Hero;

const styles = StyleSheet.create({
  container: {
    height: 350,
    overflow: 'hidden',
    position: 'relative',
    borderBottomWidth: 0.4,
  },

  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 50,
    alignItems: 'center',
  },

  topText: {
    fontSize: width > 400 ? 24 : 20,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 34,
  },

  description: {
    marginTop: 16,
    fontSize: 15,
    color: '#E0EEFF',
    lineHeight: 24,
    textAlign: 'center',
  },

  searchContainer: {
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    width: '100%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // elevation: 4,
  },

  input: {
    flex: 1,
    height: 52,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#0F172A',
  },

  searchBtn: {
    width: 42,
    height: 42,
    borderRadius: 50,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
});
