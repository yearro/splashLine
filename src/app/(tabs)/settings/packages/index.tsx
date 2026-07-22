import Footer from '@/components/Footer';
import GeneralView from '@/components/GeneralView';
import Colors from '@/constants/Colors';
import { useBusinessStore } from '@/store/business.store';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { router } from 'expo-router';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PackagesListScreen = () => {
  const { packages, removeFromPackages } = useBusinessStore();

  const handleDelete = (id: number) => {
    Alert.alert('Eliminar', '¿Estás seguro de eliminar este paquete?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => removeFromPackages(id) },
    ]);
  };

  return (
    <GeneralView>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.title}>Packages ({packages.length})</Text>
        <Text style={styles.subtitle}>
          Manage the bundles of services you offer to your customers.
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
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardBadge}>
                <Text style={styles.cardBadgeText}>PACKAGE</Text>
              </View>
              <View style={styles.cardRow}>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{item.name}</Text>
                  <Text style={styles.cardDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>
                <View style={styles.cardIcon}>
                  <MaterialIcons name="star" size={22} color="white" />
                </View>
              </View>
              <View style={styles.cardFooter}>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => handleDelete(item.id)}
                >
                  <MaterialIcons name="delete-outline" size={18} color={Colors.error} />
                  <Text style={styles.deleteBtnText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/(tabs)/settings/packages/new')}
        accessibilityLabel="Add new package"
      >
        <MaterialIcons name="add" size={28} color="white" />
      </TouchableOpacity>

      <Footer />
    </GeneralView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Inter_18pt-Black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 14,
    color: '#666',
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
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#eef4ff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.chip,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 10,
  },
  cardBadgeText: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 10,
    color: Colors.primaryStrong,
    letterSpacing: 1,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontFamily: 'Inter_18pt-Black',
    fontSize: 18,
    color: '#111',
    marginBottom: 4,
  },
  cardDescription: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 13,
    color: '#666',
  },
  cardIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f4ff',
    paddingTop: 10,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deleteBtnText: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 13,
    color: Colors.error,
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
