import Footer from '@/components/Footer';
import GeneralView from '@/components/GeneralView';
import ServiceListItem from '@/components/ServiceListItem';
import Colors from '@/constants/Colors';
import { useBusinessStore } from '@/store/business.store';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ServicesListScreen = () => {
  const { fetchServices, removeFromServices } = useBusinessStore();
  const handleService = (id: number) => {
    router.push(`../settings/services/${id}`);
  }
  const handleDelete = (id: number) => {
    Alert.alert('Delete', 'Are you sure you want to delete this service?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => removeFromServices(id)
      },
    ]);
  }

  useEffect(() => {
    fetchServices();
  }, []);

  const { services } = useBusinessStore();
  return (
    <GeneralView>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.title}>Services List ({services.length})</Text>
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
            onDelete={handleDelete}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons name="local-car-wash" size={48} color={Colors.primary} />
            <Text style={styles.emptyTitle}>No services yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap the + button to add your first cleaning or maintenance service.
            </Text>
          </View>
        }
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
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingTop: 60,
    paddingBottom: 80,
  },
  emptyTitle: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 18,
    color: '#333',
  },
  emptySubtitle: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
})

export default ServicesListScreen;
