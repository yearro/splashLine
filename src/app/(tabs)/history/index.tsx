import GeneralView from '@/components/GeneralView';
import TopNumbers from '@/components/TopNumbers';
import { useHistoryStore } from '@/store/history.store';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

const HistoryScreen = () => {
  const { getTopNumbers, totalRevenue, totalServices } = useHistoryStore()
  useEffect(() => {
    getTopNumbers();
  }, []);

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