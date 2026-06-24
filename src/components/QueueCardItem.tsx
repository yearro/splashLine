import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const QueueCardItem = () => {
  const [isActive, setIsActive] = useState(false)
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text style={styles.stateContainer}>Washing</Text>
          </View>
          <Text style={styles.textModel}>Tesla Model3</Text>
          <Text style={styles.textPlates}>KLR-8821</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.smText}>TIME ELAPSED</Text>
          <Text style={styles.textTime}>4:23</Text>
        </View>
      </View>
      <View style={styles.acctions}>
        <View>
          <Text>Package</Text>
        </View>
        <Pressable>
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  )
}

export default QueueCardItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#eee'
  },
  smText: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 12,
  },
  textModel: {
    fontFamily: 'Inter_18pt-Medium',
    fontWeight: '700',
    fontSize: 20,
  },
  textPlates: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 14,
  },
  textTime: {
    fontFamily: 'Inter_18pt-Medium',
    fontWeight: '700',
    fontSize: 24,
  },
  acctions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    marginTop: 20,
    paddingTop: 20,
  },
  stateContainer: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 10,
    color: 'black'
  }
})