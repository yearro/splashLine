import Colors from '@/constants/Colors'
import { StyleSheet, Text, View } from 'react-native'

const QueueScreen = () => {
  return (
    <View style={styles.container}>
      <Text>LIVE OPERATIONS</Text>
    </View>
  )
}

export default QueueScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,

    borderColor: 'black',
  }
})