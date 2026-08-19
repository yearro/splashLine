import GeneralView from '@/components/GeneralView'
import QueueCardItem from '@/components/QueueCardItem'
import Colors from '@/constants/Colors'
import { useQueueStore } from '@/store/queue.store'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import { FlatList, StyleSheet, Text, View } from 'react-native'

const QueueScreen = () => {
  const { queue, removeFromQueue } = useQueueStore()

  const handleRemoveCar = (id: string) => {
    removeFromQueue(id)
  }

  return (
    <GeneralView>
      <Text style={styles.smText}>LIVE OPERATIONS</Text>
      <View style={styles.queueSection}>
        <Text style={styles.sectionTitle}>Service Queue</Text>
      </View>
      <View style={styles.queueSection}>
        <View style={styles.queueCurrentInfo}>
          <Text style={styles.smText}>AVG. WAIT</Text>
          <Text style={styles.queCurrentText}>4:23 min</Text>
        </View>
        <View style={styles.queueCurrentInfo}>
          <Text style={styles.smText}>TOTAL CARS</Text>
          <Text style={styles.queCurrentText}>{queue.length} Cars</Text>
        </View>
      </View>
      {queue.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialIcons name="queue" size={48} color={Colors.primary} />
          <Text style={styles.emptyTitle}>No queue yet</Text>
          <Text style={styles.emptySubtitle}>
            Add your first car to the queue
          </Text>
        </View>
      ) : (
        <FlatList
          data={queue}
          renderItem={({ item }) => <QueueCardItem
            carModel={item.model}
            licensePlate={item.plateNumber}
            packageName={item.tier}
            initialStatusId={1}
            key={item.id}
            onRemove={() => handleRemoveCar(item.id)}
          />
          }
          keyExtractor={(item) => item.id}
        />)
      }
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
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingBottom: 80,
  },
  emptyTitle: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 18,
    color: '#333',
  },
  emptySubtitle: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
})