import { StyleSheet, Text, View } from 'react-native';

type iProps = {
  totalRevenue: number,
  totalServices: number,
}
const TopNumbers = ({ totalRevenue = 0, totalServices = 0 }: iProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.numberContainer}>
        <Text style={styles.numberText}>{totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
        <Text style={styles.numberLabel}>Total Revenue</Text>
      </View>
      <View style={styles.numberContainer}>
        <Text style={styles.numberText}>{totalServices}</Text>
        <Text style={styles.numberLabel}>Total services</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  },
  numberContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  numberLabel: {
    fontSize: 14,
    color: '#666',
  },
})

export default TopNumbers;
