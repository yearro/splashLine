import Footer from '@/components/Footer';
import GeneralView from '@/components/GeneralView';
import Colors from '@/constants/Colors';
import { useBusinessStore } from '@/store/business.store';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PackagesListScreen = () => {
  const { packages, services, fetchPackages, removeFromPackages, fetchServices } = useBusinessStore();

  useEffect(() => {
    fetchPackages();
    if (services.length === 0) {
      fetchServices();
    }
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert('Delete', 'Are you sure you want to delete this package?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => removeFromPackages(id) },
    ]);
  };
  const handlePackages = (id: number) => {
    router.push(`/(tabs)/settings/packages/${id}`);
  }

  const getPackageServices = (serviceIds?: number[]) => {
    if (!serviceIds || serviceIds.length === 0) return [];
    return services.filter((s) => serviceIds.includes(s.id));
  };

  const getPackagePrice = (serviceIds?: number[]) => {
    if (!serviceIds || serviceIds.length === 0) return 0;
    return services
      .filter((s) => serviceIds.includes(s.id))
      .reduce((sum, s) => sum + s.price, 0);
  };

  return (
    <GeneralView>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.sectionDescription}>
          Manage the individual cleaning and maintenance services available for customers.
        </Text>
      </View>

      {packages.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialIcons name="inventory-2" size={48} color={Colors.primary} />
          <Text style={styles.emptyTitle}>No packages yet</Text>
          <Text style={styles.emptySubtitle}>
            Tap the + button to create your first service package.
          </Text>
        </View>
      ) : (
        <FlatList
          data={packages}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => {
            const price = getPackagePrice(item.serviceIds);
            const includedServices = getPackageServices(item.serviceIds);
            return (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      onPress={() => handlePackages(item.id)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <MaterialIcons name="edit" size={24} color="#00a896" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDelete(item.id)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <MaterialIcons name="delete-outline" size={24} color="#e53935" />
                    </TouchableOpacity>
                  </View>
                </View>

                {item.description ? (
                  <Text style={styles.cardDescription}>{item.description}</Text>
                ) : null}

                {includedServices.length > 0 && (
                  <View style={styles.servicesListContainer}>
                    {includedServices.map((service) => (
                      <View key={service.id} style={styles.serviceItemRow}>
                        <MaterialIcons name="check" size={20} color="#00a896" style={styles.checkIcon} />
                        <Text style={styles.serviceItemName}>{service.name}</Text>
                      </View>
                    ))}
                  </View>
                )}

                <View style={styles.priceRow}>
                  <Text style={styles.priceSymbol}>$ </Text>
                  <Text style={styles.priceAmount}>{price > 0 ? price : 15}</Text>
                </View>
              </View>
            );
          }}
        />
      )}

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => handlePackages(-1)}
        accessibilityLabel="Add new package"
      >
        <MaterialIcons name="add" size={28} color="white" />
      </TouchableOpacity>

      <Footer />
    </GeneralView>
  );
};

const styles = StyleSheet.create({
  sectionDescription: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
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
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eef4ff',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontFamily: 'Inter_18pt-Black',
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    flex: 1,
    marginRight: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cardDescription: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 15,
    color: '#333333',
    lineHeight: 22,
    marginBottom: 14,
  },
  servicesListContainer: {
    gap: 12,
    marginBottom: 20,
    marginTop: 4,
  },
  serviceItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkIcon: {
    marginRight: 2,
  },
  serviceItemName: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 16,
    color: '#2b3648',
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceSymbol: {
    fontFamily: 'Inter_18pt-Black',
    fontSize: 22,
    fontWeight: '700',
    color: '#00a896',
  },
  priceAmount: {
    fontFamily: 'Inter_18pt-Black',
    fontSize: 22,
    fontWeight: '700',
    color: '#00a896',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
});

export default PackagesListScreen;
