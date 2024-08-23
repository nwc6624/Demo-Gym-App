import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Alert, Vibration } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';
import styles from './styles';

// Correctly reference the path to the sound file
const beepSound = new Sound(require('../assets/beep.mp3'), (error) => {
  if (error) {
    console.log('Failed to load the sound', error);
  }
});

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const StandardTimer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration] = useState(60); // 60 seconds
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [remainingTime, setRemainingTime] = useState(duration);

  const radius = 100;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setRemainingTime((time) => {
          if (time === 0) {
            clearInterval(interval);
            handleCompletion();
            return 0;
          }
          return time - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const animateTimer = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: duration * 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      handleCompletion();
      setIsPlaying(false);
    });
  };

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  const handlePlayPause = () => {
    if (!isPlaying) {
      animateTimer();
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    animatedValue.setValue(0);
    setRemainingTime(duration);
  };

  const handleCompletion = () => {
    // Play sound and vibrate phone
    beepSound.setNumberOfLoops(-1); // Loop indefinitely
    beepSound.play();
    Vibration.vibrate([500, 500, 500, 500], true); // Vibrate pattern (repeating)

    // Show alert to stop sound and vibration
    Alert.alert(
      "Time's up!",
      'The timer has completed.',
      [
        {
          text: 'OK',
          onPress: () => {
            beepSound.stop(); // Stop the sound
            Vibration.cancel(); // Stop the vibration
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Standard Timer</Text>

      <View style={localStyles.timerWrapper}>
        <Svg width={220} height={220} viewBox="0 0 220 220">
          <G rotation="-90" origin="110, 110">
            <Circle
              cx="110"
              cy="110"
              r={radius}
              stroke="#e6e6e6"
              strokeWidth="15"
              fill="none"
            />
            <AnimatedCircle
              cx="110"
              cy="110"
              r={radius}
              stroke="#ff6347"
              strokeWidth="15"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              fill="none"
            />
          </G>
        </Svg>
        <Text style={localStyles.timerText}>{remainingTime}</Text>
      </View>

      <View style={localStyles.controls}>
        <TouchableOpacity style={localStyles.controlButton} onPress={handlePlayPause}>
          <Icon name={isPlaying ? 'pause' : 'play'} size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={localStyles.controlButton} onPress={handleReset}>
          <Icon name="refresh" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  timerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
    position: 'relative',
  },
  timerText: {
    position: 'absolute',
    fontSize: 48,
    color: '#ff6347',
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  controlButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // For Android shadow
  },
});

export default StandardTimer;
