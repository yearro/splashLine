import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CarStatusButtom from './CarStatusButtom';

const QueueCardItem = () => {
  const [isActive, setIsActive] = useState(false)
  const [value, setValue] = useState(null);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.mdText}>Tesla Model 3</Text>
          <Text style={[styles.smText, { paddingTop: 5 }]}>KLR-8821</Text>
        </View>
        <View>
          <Text style={styles.smText}>TIME ELAPSED</Text>
          <Text style={[styles.mdText, { paddingTop: 5, textAlign: 'right' }]}>4:23</Text>
        </View>
      </View>
      <Text style={{ paddingTop: 10 }}>Package name</Text>
      <View style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)', marginVertical: 10 }} />
      <CarStatusButtom />
    </View>
  )
}

export default QueueCardItem
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  },
  mdText: {
    fontFamily: 'Inter_18pt-Medium',
    fontWeight: '700',
    fontSize: 18,
  },
  smText: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 14,
  }
})
