import Footer from '@/components/Footer';
import GeneralView from '@/components/GeneralView';
import Colors from '@/constants/Colors';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ServicesListScreen = () => {
  const handleService = (id: number) => {
    router.push(`../settings/services/${id}`);
  }
  return (
    <GeneralView>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.title}>Services List</Text>
        <Text style={styles.sectionDescription}>Manage the individual cleaning and maintenance services available for customers.</Text>
      </View>
      <View style={styles.serviceItemContainer}>
        <View style={styles.serviceItemHeader}>
          <Text style={styles.serviceItemTitle}>Exterior Wash</Text>
          <Pressable onPress={() => { }}>
            <MaterialIcons name="mode-edit" size={24} color={Colors.primary} />
          </Pressable>
        </View>
        <Text style={styles.serviceItemDescription}>Precision pressure wash, foam cannon treatment, and hand dry</Text>
        <Text style={styles.serviceItemPrice}>$15.00</Text>
      </View>
      <TouchableOpacity style={styles.addServiceButton} onPress={() => handleService(0)}>
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
      <Footer />
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
  serviceItemContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#eef4ff',
  },
  serviceItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  serviceItemTitle: {
    fontFamily: 'Inter_18pt-Black',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  serviceItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceItemDescription: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Light',
    color: '#000',
  },
  serviceItemPrice: {
    marginVertical: 10,
    fontSize: 20,
    fontFamily: 'Inter_18pt-Medium',
    color: Colors.primary,
  },
  addServiceButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 30,
  }
})

export default ServicesListScreen;
