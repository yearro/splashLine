import { carStatusList } from '@/constants/CarStatus';
import Colors from '@/constants/Colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import glyphmaps from '@react-native-vector-icons/ionicons/glyphmaps/Ionicons.json';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type IoniconsName = keyof typeof glyphmaps;

const CarStatusButtom = () => {
  const [currentStatus, setCurrentStatus] = useState<number>(1)
  const [iconName, setIconName] = useState<IoniconsName>('rainy-outline')
  const [statusLabel, setStatusLabel] = useState<string>('Washing')

  useEffect(() => {
    const status = carStatusList.find((item) => item.id === currentStatus)
    if (status) {
      setIconName(status.icon as IoniconsName)
      setStatusLabel(status.label)
    }
  }, [currentStatus])

  const handlerStatus = (status: number) => {
    if (status <= 0 || status > carStatusList.length) return
    setCurrentStatus(status)
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => handlerStatus(currentStatus - 1)}>
        <Ionicons name="chevron-back-outline" size={34} color={Colors.primary} />
      </Pressable>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name={iconName} size={22} color={Colors.primary} />
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}>{statusLabel}</Text>
      </View>
      <Pressable onPress={() => handlerStatus(currentStatus + 1)}>
        <Ionicons name="chevron-forward-outline" size={34} color={Colors.primary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
})

export default CarStatusButtom;
