import React, { useState } from 'react';
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

            <View style={styles.optionContainer}>
                <Text style={styles.optionLabel}>Flex Timer status shows</Text>
                <Picker
                    selectedValue={flexTimerStatus}
                    style={styles.picker}
                    onValueChange={(itemValue) => setFlexTimerStatus(itemValue)}
                >
                    <Picker.Item label="Round" value="Round" />
                    <Picker.Item label="Time" value="Time" />
                </Picker>
            </View>

            <View style={styles.optionContainer}>
                <Text style={styles.optionLabel}>Direction</Text>
                <Picker
                    selectedValue={direction}
                    style={styles.picker}
                    onValueChange={(itemValue) => setDirection(itemValue)}
                >
                    <Picker.Item label="Up" value="Up" />
                    <Picker.Item label="Down" value="Down" />
                </Picker>
            </View>

            <View style={styles.optionContainer}>
                <Text style={styles.optionLabel}>Prelude</Text>
                <Picker
                    selectedValue={prelude}
                    style={styles.picker}
                    onValueChange={(itemValue) => setPrelude(itemValue)}
                >
                    <Picker.Item label="10s" value="10s" />
                    <Picker.Item label="20s" value="20s" />
                </Picker>
            </View>

            <View style={styles.optionContainer}>
                <Text style={styles.optionLabel}>Segues</Text>
                <Picker
                    selectedValue={segues}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSegues(itemValue)}
                >
                    <Picker.Item label="On" value="On" />
                    <Picker.Item label="Off" value="Off" />
                </Picker>
            </View>

            <View style={styles.optionContainer}>
                <Text style={styles.optionLabel}>Time Remaining Warnings</Text>
                <Picker
                    selectedValue={warnings}
                    style={styles.picker}
                    onValueChange={(itemValue) => setWarnings(itemValue)}
                >
                    <Picker.Item label="Off" value="Off" />
                    <Picker.Item label="On" value="On" />
                </Picker>
            </View>

            <View style={styles.optionContainer}>
                <Text style={styles.optionLabel}>Metronome</Text>
                <Picker
                    selectedValue={metronome}
                    style={styles.picker}
                    onValueChange={(itemValue) => setMetronome(itemValue)}
                >
                    <Picker.Item label="Off" value="Off" />
                    <Picker.Item label="On" value="On" />
                </Picker>
            </View>

            <View style={styles.optionContainer}>
                <Text style={styles.optionLabel}>Rest Period Direction</Text>
                <Picker
                    selectedValue={restPeriodDirection}
                    style={styles.picker}
                    onValueChange={(itemValue) => setRestPeriodDirection(itemValue)}
                >
                    <Picker.Item label="Match Workout" value="Match Workout" />
                    <Picker.Item label="Opposite" value="Opposite" />
                </Picker>
            </View>

            <TouchableOpacity style={styles.startButton}>
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
