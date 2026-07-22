import Footer from '@/components/Footer';
import GeneralView from '@/components/GeneralView';
import ServiceListItem from '@/components/ServiceListItem';
import Colors from '@/constants/Colors';
import { useBusinessStore } from '@/store/business.store';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ServicesListScreen = () => {
  const { fetchServices } = useBusinessStore();
  const handleService = (id: number) => {
    router.push(`../settings/services/${id}`);
  }

  useEffect(() => {
    fetchServices();
  }, []);

  const { services } = useBusinessStore();
  return (
    <GeneralView>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.title}>Services List</Text>
        <Text style={styles.sectionDescription}>Manage the individual cleaning and maintenance services available for customers.</Text>
      </View>
      <FlatList
        data={services}
        renderItem={({ item }) => (
          <ServiceListItem
            id={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            onEdit={handleService}
          />
        )}
      />
      <TouchableOpacity style={styles.addServiceButton} onPress={() => handleService(-1)}>
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
