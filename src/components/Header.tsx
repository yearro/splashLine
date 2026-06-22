import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'

const Header = () => {
  return (
    <View>
      <Text className='font-extrabold text-2xl'>HYDRO-LAB</Text>
      <Ionicons name="water-outline" size={24} color="black" />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})