import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  return (
    <SafeAreaView>
      <View>
        <Text className='text-3xl font-bold text-blue-500'>Hola Mundo</Text>
        <Text className='text-2xl' style={{ fontFamily: 'inter-black' }}>Hola Mundo</Text>
        <Text className='text-2xl font-inter-light'>Hola Mundo</Text>
        <Text className='text-2xl' style={{ fontFamily: 'inter-medium' }}>Hola Mundo</Text>
      </View>
    </SafeAreaView>
  )
}

export default index