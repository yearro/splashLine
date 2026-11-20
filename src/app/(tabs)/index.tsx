import CarCard from '@/components/CarCard'
import EmptyMessage from '@/components/EmptyMessage'
import GeneralView from '@/components/GeneralView'
import Colors from '@/constants/Colors'
import { useHistoryStore } from '@/store/history.store'
import { useQueueStore } from '@/store/queue.store'
import { useEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

const QueueScreen = () => {
  const { getTopNumbers, avgTime } = useHistoryStore()
  const { queue, removeFromQueue } = useQueueStore()
  const { addServiceHistory } = useHistoryStore()
  useEffect(() => {
    getTopNumbers();
  }, []);
  const handleRemoveCar = (id: string) => {
    removeFromQueue(id)
  }

  const handleCompleteCar = async (id: string, elapsedSeconds: number, price: number) => {
    const result = await addServiceHistory(elapsedSeconds, price)
    if (result) {
      removeFromQueue(id);
      getTopNumbers();
    }
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
          <Text style={styles.queCurrentText}>{avgTime} min</Text>
        </View>
        <View style={styles.queueCurrentInfo}>
          <Text style={styles.smText}>TOTAL CARS</Text>
          <Text style={styles.queCurrentText}>{queue.length} Cars</Text>
        </View>
      </View>
      {queue.length === 0 ? (
        <EmptyMessage
          title='No queue yet'
          subTitle='Add your first car to the queue'
          icon='queue'
        />
      ) : (
        <FlatList
          data={queue}
          renderItem={({ item }) => <CarCard
            id={item.id}
            carModel={item.model}
            licensePlate={item.plateNumber}
            packageName={item.tier}
            initialStatusId={1}
            price={item.price}
            key={item.id}
            onRemove={() => handleRemoveCar(item.id)}
            onCompletion={handleCompleteCar}
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