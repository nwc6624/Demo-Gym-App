import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

const RoundTimer: React.FC = () => {
    const [rounds, setRounds] = useState(5);
    const [roundDuration, setRoundDuration] = useState('1:00');
    const [restDuration, setRestDuration] = useState('None');
    const [flexTimerStatus, setFlexTimerStatus] = useState('Round');
    const [direction, setDirection] = useState('Up');
    const [prelude, setPrelude] = useState('10s');
    const [segues, setSegues] = useState('On');
    const [warnings, setWarnings] = useState('Off');
    const [metronome, setMetronome] = useState('Off');
    const [restPeriodDirection, setRestPeriodDirection] = useState('Match Workout');
    const [currentRound, setCurrentRound] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (isRunning && timeRemaining > 0) {
            const timer = setTimeout(() => {
                setTimeRemaining(timeRemaining - 1);
            }, 1000);

            return () => clearTimeout(timer);
        } else if (isRunning && timeRemaining === 0) {
            if (currentRound < rounds) {
                setCurrentRound(currentRound + 1);
                setTimeRemaining(parseDuration(roundDuration)); // Start the next round
            } else {
                setIsRunning(false); // Stop the timer when all rounds are complete
            }
        }
    }, [isRunning, timeRemaining, currentRound]);

    const parseDuration = (duration) => {
        const [minutes, seconds] = duration.split(':').map(Number);
        return minutes * 60 + seconds;
    };

    const startTimer = () => {
        setIsRunning(true);
        setCurrentRound(1);
        setTimeRemaining(parseDuration(roundDuration));
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Icon name="alarm-outline" size={40} color="#800080" />
                <Text style={styles.headerTitle}>Round</Text>
                <Text style={styles.subHeaderTitle}>{rounds} rounds of {roundDuration}</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity><Icon name="pencil-outline" size={24} color="#800080" /></TouchableOpacity>
                    <TouchableOpacity><Icon name="eye-outline" size={24} color="#800080" /></TouchableOpacity>
                    <TouchableOpacity><Icon name="star-outline" size={24} color="#800080" /></TouchableOpacity>
                    <TouchableOpacity><Icon name="timer-outline" size={24} color="#800080" /></TouchableOpacity>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Timer Options</Text>

            <View style={styles.optionContainer}>
                <Text style={styles.optionLabel}>Number of rounds</Text>
                <TextInput 
                    style={styles.optionValue}
                    value={String(rounds)}
                    onChangeText={(text) => setRounds(Number(text))} // Convert to number
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.optionContainer}>
                <Text style={styles.optionLabel}>Round duration</Text>
                <Picker
                    selectedValue={roundDuration}
                    style={styles.picker}
                    onValueChange={(itemValue) => setRoundDuration(itemValue)}
                >
                    <Picker.Item label="0:30" value="0:30" />
                    <Picker.Item label="1:00" value="1:00" />
                    <Picker.Item label="1:30" value="1:30" />
                </Picker>
            </View>

            <View style={styles.optionContainer}>
                <Text style={styles.optionLabel}>Rest between rounds</Text>
                <Picker
                    selectedValue={restDuration}
                    style={styles.picker}
                    onValueChange={(itemValue) => setRestDuration(itemValue)}
                >
                    <Picker.Item label="None" value="None" />
                    <Picker.Item label="0:15" value="0:15" />
                    <Picker.Item label="0:30" value="0:30" />
                </Picker>
            </View>

            {/* Continue with other options... */}

            <View style={styles.timerDisplay}>
                <Text style={styles.timerText}>Round: {currentRound}/{rounds}</Text>
                <Text style={styles.timerText}>Time Remaining: {`${Math.floor(timeRemaining / 60)}:${('0' + (timeRemaining % 60)).slice(-2)}`}</Text>
            </View>

            <TouchableOpacity style={styles.startButton} onPress={startTimer}>
                <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 32,
        color: '#800080',
        fontWeight: 'bold',
    },
    subHeaderTitle: {
        fontSize: 16,
        color: '#555',
    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 120,
    },
    sectionTitle: {
        fontSize: 18,
        color: '#800080',
        marginVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#800080',
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    optionLabel: {
        fontSize: 16,
        color: '#333',
    },
    optionValue: {
        fontSize: 16,
        color: '#800080',
        borderBottomWidth: 1,
        borderBottomColor: '#800080',
        textAlign: 'right',
    },
    picker: {
        height: 50,
        width: 150,
    },
    timerDisplay: {
        marginTop: 30,
        alignItems: 'center',
    },
    timerText: {
        fontSize: 24,
        color: '#800080',
    },
    startButton: {
        backgroundColor: '#800080',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 30,
    },
    startButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default RoundTimer;

