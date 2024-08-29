import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        if (timerStarted) {
            setRemainingTime(roundDuration); // Reset the timer when the round duration is edited
            setCurrentRound(0); // Reset the current round
        }
    }, [roundDuration, rounds]);

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
    };

    const resetTimer = () => {
        setTimerStarted(false);
        setRemainingTime(roundDuration);
        setCurrentRound(0);
    };

    const handleStartTimer = () => {
        setTimerStarted(true);
        // Implement the timer logic here
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

            <TouchableOpacity style={styles.startButton} onPress={handleStartTimer}>
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
});

export default RoundTimer;

