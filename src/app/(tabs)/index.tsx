import GeneralView from '@/components/GeneralView'
import QueueCardItem from '@/components/QueueCardItem'
import Colors from '@/constants/Colors'
import { StyleSheet, Text, View } from 'react-native'

const QueueScreen = () => {
  return (
    <GeneralView>
      <Text style={styles.smText}>LIVE OPERATIONS</Text>
      <View style={styles.queueSection}>
        <Text style={styles.sectionTitle}>Service Queue</Text>
        <Text style={styles.infoText}>8 Cars</Text>
      </View>
      <View style={styles.queueSection}>
        <View style={styles.queueCurrentInfo}>
          <Text style={styles.smText}>AVG. WAIT</Text>
          <Text style={styles.queCurrentText}>4:23 min</Text>
        </View>
        <View style={styles.queueCurrentInfo}>
          <Text style={styles.smText}>ACTIVE BAY</Text>
          <Text style={styles.queCurrentText}>02/03</Text>
        </View>
      </View>
      <View>
        <QueueCardItem />
      </View>
    </GeneralView>
  )
}

export default QueueScreen

const styles = StyleSheet.create({
  smText: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 12,
  },
  queueSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  queueCurrentInfo: {
    backgroundColor: 'white',
    width: '48%',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  },
  queCurrentText: {
    color: Colors.primary,
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 18,
  },
  sectionTitle: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoText: {
    fontFamily: 'Inter_18pt-Regular',
    backgroundColor: Colors.chip,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 50,
    color: Colors.primary,
    fontWeight: 'bold'
  }
})