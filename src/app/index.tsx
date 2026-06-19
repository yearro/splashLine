import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  return (
    <SafeAreaView>
      <View className='bg-background'>
        <Text className='text-3xl font-bold text-primary'>Hola Mundo</Text>
        <Text className='text-2xl bg-secondary' style={{ fontFamily: 'inter-black' }}>Hola Mundo</Text>
        <Text className='text-2xl font-inter-light text-slate-400'>Hola Mundo</Text>
        <Text className='text-2xl bg-cyan-100/50' style={{ fontFamily: 'inter-medium' }}>Hola Mundo</Text>
        <Text className='text-2xl bg-tertiary text-color_text' style={{ fontFamily: 'inter-medium' }}>Hola Mundo</Text>
      </View>
    </SafeAreaView>
  )
}

export default index