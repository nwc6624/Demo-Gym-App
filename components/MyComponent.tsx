// MyComponent.tsx
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ListRenderItem } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

type Timer = {
  id: string;
  name: string;
  description: string;
  icon: string;
  screen: string;
};

const MyComponent: React.FC = () => {
  const navigation = useNavigation();

  const timers: Timer[] = [
    { id: '1', name: 'Standard', description: 'Simple count up or count down timer', icon: 'timer-outline', screen: 'StandardTimer' },
    { id: '2', name: 'Round', description: 'The same round duration repeated multiple times', icon: 'refresh-circle-outline', screen: 'RoundTimer' },
    { id: '3', name: 'Interval', description: 'Set of custom intervals repeated multiple times', icon: 'time-outline', screen: 'IntervalTimer' },
  ];

  const renderItem: ListRenderItem<Timer> = ({ item }) => (
    <TouchableOpacity style={styles.timerItem} onPress={() => navigation.navigate(item.screen)}>
      <Icon name={item.icon} size={40} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.timerName}>{item.name}</Text>
        <Text style={styles.timerDescription}>{item.description}</Text>
      </View>
      <Icon name="chevron-forward-outline" size={24} color="gray" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Timers</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Favorites</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Imports</Text></TouchableOpacity>
        <Icon name="timer-outline" size={24} color="white" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Create New Timer</Text>
        <FlatList 
          data={timers} 
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>No Timers Found</Text>
      </View>
    </View>
  );
};

export default MyComponent;
