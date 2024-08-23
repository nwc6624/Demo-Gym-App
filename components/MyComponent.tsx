import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Alert, Vibration, Modal, Button } from 'react-native';
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
  const [duration, setDuration] = useState(60); // Default 60 seconds
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [remainingTime, setRemainingTime] = useState(duration);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedMinutes, setSelectedMinutes] = useState(0);
  const [selectedSeconds, setSelectedSeconds] = useState(60);

  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  let interval: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (isPlaying) {
      interval = setInterval(() => {
        setRemainingTime((time) => {
          if (time <= 1) {
            clearInterval(interval as NodeJS.Timeout);
            handleCompletion();
            return 0;
          }
          return time - 1;
        });
      }, 1000);

      return () => clearInterval(interval as NodeJS.Timeout);
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
      if (remainingTime === 0) {
        handleCompletion();
        setIsPlaying(false);
      }
    });
  };

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  const handlePlayPause = () => {
    if (isPlaying) {
      clearInterval(interval as NodeJS.Timeout);
      Animated.timing(animatedValue).stop();
    } else {
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
    beepSound.setNumberOfLoops(-1);
    beepSound.play();
    Vibration.vibrate([500, 500, 500, 500], true);

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

  const handleTimeSelect = () => {
    const totalSeconds = selectedMinutes * 60 + selectedSeconds;
    setDuration(totalSeconds);
    setRemainingTime(totalSeconds);
    setShowTimePicker(false);
  };

  const renderTimePicker = () => (
    <Modal transparent={true} visible={showTimePicker} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Set Timer Duration</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedMinutes}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedMinutes(itemValue)}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <Picker.Item key={i} label={`${i} min`} value={i} />
              ))}
            </Picker>
            <Picker
              selectedValue={selectedSeconds}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedSeconds(itemValue)}
            >
              {Array.from({ length: 60 }, (_, i) => (
                <Picker.Item key={i} label={`${i} sec`} value={i} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity style={styles.modalButton} onPress={handleTimeSelect}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Standard Timer</Text>

      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <View style={styles.timerWrapper}>
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
          <Text style={styles.timerText}>
            {Math.floor(remainingTime / 60)}:{('0' + (remainingTime % 60)).slice(-2)}{' '}
            {remainingTime >= 60 ? 'min' : 'sec'}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={handlePlayPause}>
          <Icon name={isPlaying ? 'pause' : 'play'} size={30} color="white" />
          <Text style={styles.controlButtonText}>{isPlaying ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={handleReset}>
          <Icon name="refresh" size={30} color="white" />
          <Text style={styles.controlButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {renderTimePicker()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
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
    marginTop: 20,
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
    flexDirection: 'row',
  },
  controlButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    width: 100,
    height: 150,
  },
  modalButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default StandardTimer;
