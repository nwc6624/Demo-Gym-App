import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'purple',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  section: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  timerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  timerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timerDescription: {
    fontSize: 12,
    color: 'gray',
  },
  footer: {
    backgroundColor: 'purple',
    padding: 10,
  },
  footerText: {
    color: 'white',
    textAlign: 'center',
  },
});
