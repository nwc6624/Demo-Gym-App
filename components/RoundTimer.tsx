import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RoundTimer: React.FC = () => {
    const [rounds, setRounds] = useState(5);
    const [roundDuration, setRoundDuration] = useState(60); // Seconds
    const [restBetweenRounds, setRestBetweenRounds] = useState(false);
    const [restDuration, setRestDuration] = useState(15); // Seconds
    const [isEditingRounds, setIsEditingRounds] = useState(false);
    const [isEditingRoundDuration, setIsEditingRoundDuration] = useState(false);
    const [isEditingRestDuration, setIsEditingRestDuration] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const [currentRound, setCurrentRound] = useState(0);
    const [remainingTime, setRemainingTime] = useState(roundDuration);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timerStarted) {
            resetTimer(); // Reset the timer when the round duration or number of rounds is edited
        }
    }, [roundDuration, rounds]);

    useEffect(() => {
        if (timerStarted && remainingTime === 0) {
            if (currentRound < rounds) {
                if (restBetweenRounds && restDuration > 0) {
                    setRemainingTime(restDuration);
                    // Handle rest period logic here
                } else {
                    setCurrentRound(currentRound + 1);
                    setRemainingTime(roundDuration);
                }
            } else {
                resetTimer();
            }
        }
    }, [remainingTime, timerStarted]);

    const handleSaveRounds = () => {
        setIsEditingRounds(false);
        resetTimer();
    };

    const handleSaveRoundDuration = () => {
        setIsEditingRoundDuration(false);
        resetTimer();
    };

    const handleSaveRestDuration = () => {
        setIsEditingRestDuration(false);
        resetTimer();
    };

    const resetTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        setTimerStarted(false);
        setRemainingTime(roundDuration);
        setCurrentRound(0);
    };

    const handleStartTimer = () => {
        setTimerStarted(true);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        timerRef.current = setInterval(() => {
            setRemainingTime((prev) => prev - 1);
        }, 1000);
    };

    const handlePauseTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        setTimerStarted(false);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Icon name="alarm-outline" size={40} color="#800080" />
                <Text style={styles.headerTitle}>Round</Text>
                <Text style={styles.subHeaderTitle}>{rounds} rounds of {roundDuration} seconds</Text>
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
                <TouchableOpacity onPress={() => setIsEditingRounds(true)}>
                    {isEditingRounds ? (
                        <TextInput
                            style={styles.optionValue}
                            value={String(rounds)}
                            onChangeText={(text) => setRounds(Number(text))}
                            keyboardType="numeric"
                            onBlur={handleSaveRounds}
                            autoFocus
                        />
                    ) : (
                        <Text style={styles.optionValue}>{rounds}</Text>
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.optionContainer}>
                <Text style={styles.optionLabel}>Round duration (seconds)</Text>
                <TouchableOpacity onPress={() => setIsEditingRoundDuration(true)}>
                    {isEditingRoundDuration ? (
                        <TextInput
                            style={styles.optionValue}
                            value={String(roundDuration)}
                            onChangeText={(text) => setRoundDuration(Number(text))}
                            keyboardType="numeric"
                            onBlur={handleSaveRoundDuration}
                            autoFocus
                        />
                    ) : (
                        <Text style={styles.optionValue}>{roundDuration}</Text>
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.optionContainer}>
                <Text style={styles.optionLabel}>Rest between rounds</Text>
                <TouchableOpacity onPress={() => setRestBetweenRounds(!restBetweenRounds)}>
                    <Text style={styles.optionValue}>{restBetweenRounds ? 'Yes' : 'No'}</Text>
                </TouchableOpacity>
            </View>

            {restBetweenRounds && (
                <View style={styles.optionContainer}>
                    <Text style={styles.optionLabel}>Rest duration (seconds)</Text>
                    <TouchableOpacity onPress={() => setIsEditingRestDuration(true)}>
                        {isEditingRestDuration ? (
                            <TextInput
                                style={styles.optionValue}
                                value={String(restDuration)}
                                onChangeText={(text) => setRestDuration(Number(text))}
                                keyboardType="numeric"
                                onBlur={handleSaveRestDuration}
                                autoFocus
                            />
                        ) : (
                            <Text style={styles.optionValue}>{restDuration}</Text>
                        )}
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.timerControls}>
                <TouchableOpacity style={styles.startButton} onPress={handleStartTimer}>
                    <Text style={styles.startButtonText}>{timerStarted ? 'Restart' : 'Start'}</Text>
                </TouchableOpacity>
                {timerStarted && (
                    <TouchableOpacity style={styles.pauseButton} onPress={handlePauseTimer}>
                        <Text style={styles.pauseButtonText}>Pause</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.timerDisplay}>
                <Text style={styles.timerText}>{remainingTime} seconds</Text>
                <Text style={styles.roundText}>Round {currentRound + 1} / {rounds}</Text>
            </View>
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
        minWidth: 50,
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
    pauseButton: {
        backgroundColor: '#FFA500',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 10,
    },
    pauseButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    timerControls: {
        alignItems: 'center',
    },
    timerDisplay: {
        alignItems: 'center',
        marginTop: 30,
    },
    timerText: {
        fontSize: 48,
        color: '#800080',
        fontWeight: 'bold',
    },
    roundText: {
        fontSize: 24,
        color: '#555',
        marginTop: 10,
    },
});

export default RoundTimer;

});

export default RoundTimer;

