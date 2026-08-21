import GeneralView from '@/components/GeneralView';
import TopNumbers from '@/components/TopNumbers';
import { useHistoryStore } from '@/store/history.store';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

const HistoryScreen = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { getTopNumbers, totalRevenue, totalServices } = useHistoryStore()
  useEffect(() => {
    getTopNumbers();
  }, []);

  const navigateYear = (action: 'prev' | 'next') => {
    if (action === 'prev') {
      setCurrentYear(currentYear - 1)
      return
    }
    setCurrentYear(currentYear + 1)
  }

  const data = [
    { value: 250, label: 'Mon' },
    { value: 450, label: 'Tue', frontColor: '#33FFC3' },
    { value: 650, label: 'Wed' },
    { value: 150, label: 'Thu', frontColor: '#33FFC3' },
    { value: 800, label: 'Fri' },
    { value: 300, label: 'Sat', frontColor: '#33FFC3' },
    { value: 700, label: 'Sun' },
  ];

  return (
    <GeneralView>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.sectionDescription}>
          Manage the individual cleaning and maintenance services available for customers.
        </Text>
      </View>
      <TopNumbers totalRevenue={totalRevenue} totalServices={totalServices} />
      <View style={styles.navContainer}>
        <TouchableOpacity
          onPress={() => navigateYear('prev')}
        >
          <Ionicons
            name="chevron-back"
            size={30}
          />
        </TouchableOpacity>
        <Text style={styles.textCurrentYear}>{currentYear}</Text>
        <TouchableOpacity
          disabled={currentYear === new Date().getFullYear()}
          onPress={() => navigateYear('next')}
        >
          <Ionicons
            name="chevron-forward"
            size={30}
            color={currentYear === new Date().getFullYear() ? '#9B9B9B' : 'black'}
          />
        </TouchableOpacity>
      </View>
      <BarChart
        data={data}
        height={200}
        barWidth={22}
        noOfSections={3}
        barBorderRadius={4}
        frontColor={'#33FFC3'}
        yAxisThickness={0}
        xAxisType={'dashed'}
        xAxisColor={'#9B9B9B'}
        yAxisLabelPrefix={'$'}
      />
    </GeneralView>
  )
}

export default HistoryScreen

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  textCurrentYear: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionDescription: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 14,
  },
})