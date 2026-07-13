import GeneralView from '@/components/GeneralView';
import { StyleSheet, Text, View } from 'react-native';

const ServicesListScreen = () => {
  return (
    <GeneralView>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.title}>Services List</Text>
        <Text style={styles.sectionDescription}>Manage the individual cleaning and maintenance services available for customers.</Text>
      </View>
    </GeneralView>
  );
}

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

export default ServicesListScreen;
