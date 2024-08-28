import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Alert, Vibration, Modal } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';
import { Picker } from '@react-native-picker/picker';

const beepSound = new Sound(require('../assets/beep.mp3'), (error) => {
  if (error) {
    console.log('Failed to load the sound', error);
  }
});

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const StandardTimer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(60); // 60 seconds initial time
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [remainingTime, setRemainingTime] = useState(duration);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedMinutes, setSelectedMinutes] = useState(0);
  const [selectedSeconds, setSelectedSeconds] = useState(0);
  const animation = useRef<Animated.CompositeAnimation | null>(null);

  const radius = 100;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (isPlaying && remainingTime > 0) {
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
  }, [isPlaying, remainingTime]);

  const animateTimer = () => {
    animation.current = Animated.timing(animatedValue, {
      toValue: 1,
      duration: remainingTime * 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    animation.current.start(() => {
      if (remainingTime === 0) {
        handleCompletion();
      }
    });
  };

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      animation.current?.stop();
    } else {
      setIsPlaying(true);
      animateTimer();
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    animatedValue.setValue(0);
    setRemainingTime(duration);
  };

  const handleCompletion = () => {
    setIsPlaying(false);
    animation.current = null;

    beepSound.setNumberOfLoops(-1); // Loop indefinitely
    beepSound.play();
    Vibration.vibrate([500, 500, 500, 500], true); // Vibrate pattern (repeating)

    Alert.alert(
      "Time's up!",
      'The timer has completed.',
      [
        {
          text: 'OK',
          onPress: () => {
            beepSound.stop();
            Vibration.cancel();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleTimeSelection = () => {
    const newTime = selectedMinutes * 60 + selectedSeconds;
    setDuration(newTime);
    setRemainingTime(newTime);
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Standard Timer</Text>

      <TouchableOpacity style={styles.timerWrapper} onPress={() => setShowPicker(true)}>
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
        <Text style={styles.timerText}>{Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}</Text>
      </TouchableOpacity>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={handlePlayPause}>
          <Text style={styles.buttonText}>
            {isPlaying ? 'Pause' : remainingTime < duration ? 'Resume' : 'Start'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showPicker} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Select Time:</Text>
            <Picker
              selectedValue={selectedMinutes}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedMinutes(itemValue)}
              itemStyle={styles.pickerItem}
            >
              {Array.from({ length: 10 }, (_, i) => i).map((minute) => (
                <Picker.Item key={minute} label={`${minute} min`} value={minute} />
              ))}
            </Picker>
            <Picker
              selectedValue={selectedSeconds}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedSeconds(itemValue)}
              itemStyle={styles.pickerItem}
            >
              {Array.from({ length: 60 }, (_, i) => i).map((second) => (
                <Picker.Item key={second} label={`${second} sec`} value={second} />
              ))}
            </Picker>
            <TouchableOpacity onPress={handleTimeSelection} style={styles.controlButton}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
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
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  pickerLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  picker: {
    width: 150,
    height: 50,
    color: 'black',
  },
  pickerItem: {
    color: 'black',
  },
});

export default StandardTimer;
