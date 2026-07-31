import GeneralView from '@/components/GeneralView';
import Colors from '@/constants/Colors';
import { useBusinessStore } from '@/store/business.store';
import { useQueueStore } from '@/store/queue.store';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as yup from 'yup';

interface PackageOption {
  id: number;
  name: string;
  description: string;
  price: number;
  iconName: string;
  isRecommended?: boolean;
}

const serviceRegistrationSchema = yup.object().shape({
  plateNumber: yup
    .string()
    .required('Plate / Vehicle identification is required')
    .min(2, 'Must be at least 2 characters'),
  make: yup.string().optional(),
  model: yup.string().optional(),
  customerPhone: yup
    .string()
    .optional()
    .matches(/^[0-9+\s-()]*$/, 'Invalid phone number format'),
});

const ServiceScreen = () => {
  const { packages, services, fetchPackages, fetchServices } = useBusinessStore();
  const { addToQueue } = useQueueStore();
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(null);

  useEffect(() => {
    fetchPackages();
    if (services.length === 0) {
      fetchServices();
    }
  }, []);

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

  // Build items exclusively from store packages
  const packageOptions: PackageOption[] = packages.map((pkg, idx) => {
    const price = getPackagePrice(pkg.serviceIds);
    const incServices = getPackageServices(pkg.serviceIds);
    const autoDesc =
      incServices.length > 0
        ? incServices.map((s) => s.name).join(' + ')
        : pkg.description || 'Full service bundle';

    const fallbackIcons = ['flash-on', 'local-car-wash', 'diamond', 'verified'];
    return {
      id: pkg.id,
      name: pkg.name,
      description: pkg.description || autoDesc,
      price: price > 0 ? price : 15,
      iconName: pkg.icon || fallbackIcons[idx % fallbackIcons.length],
      isRecommended:
        pkg.name.toLowerCase().includes('ceramic') ||
        pkg.name.toLowerCase().includes('premium'),
    };
  });

  // Set default selection if not selected yet
  useEffect(() => {
    if (selectedPackageId === null && packageOptions.length > 0) {
      setSelectedPackageId(packageOptions[0].id);
    }
  }, [packageOptions, selectedPackageId]);

  return (
    <GeneralView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Formik
          initialValues={{
            plateNumber: '',
            make: '',
            model: '',
            customerPhone: '',
          }}
          validationSchema={serviceRegistrationSchema}
          onSubmit={(values, { resetForm }) => {
            const selectedPackage = packageOptions.find((opt) => opt.id === selectedPackageId);
            if (!selectedPackage) {
              Alert.alert('Select Package', 'Please select a service package before registering.');
              return;
            }

            const newRegistration = {
              id: Date.now(),
              plateNumber: values.plateNumber.toUpperCase(),
              make: values.make,
              model: values.model,
              phone: values.customerPhone,
              tier: selectedPackage.name,
              price: selectedPackage.price,
              status: 'Waiting',
              createdAt: new Date().toISOString(),
            };

            addToQueue(newRegistration);

            Alert.alert(
              'Service Registered',
              `Vehicle ${newRegistration.plateNumber} registered for ${selectedPackage.name} ($${selectedPackage.price}).`,
              [
                {
                  text: 'OK',
                  onPress: () => {
                    resetForm();
                    if (packageOptions.length > 0) {
                      setSelectedPackageId(packageOptions[0].id);
                    }
                    router.push('/(tabs)');
                  },
                },
              ]
            );
          }}
        >
          {(props) => (
            <View style={styles.formContainer}>
              {/* VEHICLE IDENTIFICATION */}
              <Text style={styles.sectionHeader}>VEHICLE IDENTIFICATION</Text>
              <View style={[styles.inputWrapper, styles.plateInputWrapper]}>
                <View style={styles.accentBar} />
                <TextInput
                  style={styles.plateInput}
                  placeholder="ABC-1234"
                  placeholderTextColor="#b0c4de"
                  value={props.values.plateNumber}
                  onChangeText={props.handleChange('plateNumber')}
                  onBlur={props.handleBlur('plateNumber')}
                  autoCapitalize="characters"
                />
                <MaterialIcons name="directions-car" size={24} color="#b0c4de" />
              </View>
              {props.touched.plateNumber && props.errors.plateNumber && (
                <Text style={styles.errorText}>{props.errors.plateNumber}</Text>
              )}

              {/* MAKE */}
              <Text style={styles.sectionHeader}>MAKE</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. BMW"
                  placeholderTextColor="#a0aec0"
                  value={props.values.make}
                  onChangeText={props.handleChange('make')}
                  onBlur={props.handleBlur('make')}
                />
              </View>

              {/* MODEL */}
              <Text style={styles.sectionHeader}>MODEL</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. X5"
                  placeholderTextColor="#a0aec0"
                  value={props.values.model}
                  onChangeText={props.handleChange('model')}
                  onBlur={props.handleBlur('model')}
                />
              </View>

              {/* SELECT SERVICE TIER */}
              <Text style={[styles.sectionHeader, { marginTop: 8 }]}>SELECT SERVICE TIER</Text>

              <View style={styles.tiersContainer}>
                {packageOptions.length === 0 ? (
                  <View style={styles.emptyTiersBox}>
                    <Text style={styles.emptyTiersText}>No packages available. Create one in settings.</Text>
                  </View>
                ) : (
                  packageOptions.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <TouchableOpacity
                        key={pkg.id}
                        activeOpacity={0.85}
                        style={[
                          styles.tierCard,
                          isSelected && styles.tierCardSelected,
                        ]}
                        onPress={() => setSelectedPackageId(pkg.id)}
                      >
                        {pkg.isRecommended && (
                          <View style={styles.recommendedTag}>
                            <Text style={styles.recommendedTagText}>RECOMMENDED</Text>
                          </View>
                        )}

                        <View style={styles.tierContentRow}>
                          <View
                            style={[
                              styles.tierIconContainer,
                              isSelected && styles.tierIconContainerSelected,
                            ]}
                          >
                            <MaterialIcons
                              name={pkg.iconName as any}
                              size={22}
                              color={isSelected ? '#007a87' : Colors.primary}
                            />
                          </View>

                          <View style={styles.tierInfo}>
                            <View style={styles.tierTitleRow}>
                              <Text style={styles.tierName}>{pkg.name}</Text>
                              {isSelected && (
                                <MaterialIcons
                                  name="check-circle"
                                  size={18}
                                  color="#007a87"
                                  style={styles.checkIcon}
                                />
                              )}
                            </View>
                            <Text style={styles.tierDescription} numberOfLines={2}>
                              {pkg.description}
                            </Text>
                          </View>

                          <Text style={styles.tierPrice}>${pkg.price}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                )}
              </View>

              {/* CUSTOMER DETAILS */}
              <View style={styles.customerDetailsBox}>
                <View style={styles.customerHeaderRow}>
                  <View style={styles.customerTitleRow}>
                    <MaterialIcons name="badge" size={20} color="#5a6a85" />
                    <Text style={styles.customerTitleText}>CUSTOMER DETAILS</Text>
                  </View>
                  <View style={styles.optionalBadge}>
                    <Text style={styles.optionalBadgeText}>OPTIONAL</Text>
                  </View>
                </View>

                <View style={styles.customerInputWrapper}>
                  <TextInput
                    style={styles.customerInput}
                    placeholder="+1 (555) 000-0000"
                    placeholderTextColor="#a0aec0"
                    keyboardType="phone-pad"
                    value={props.values.customerPhone}
                    onChangeText={props.handleChange('customerPhone')}
                    onBlur={props.handleBlur('customerPhone')}
                  />
                </View>
                {props.touched.customerPhone && props.errors.customerPhone && (
                  <Text style={styles.errorText}>{props.errors.customerPhone}</Text>
                )}

                <Text style={styles.customerHint}>
                  We'll text when the wash is complete.
                </Text>
              </View>

              {/* REGISTER SERVICE BUTTON */}
              <TouchableOpacity
                style={styles.registerButton}
                activeOpacity={0.9}
                onPress={() => props.handleSubmit()}
              >
                <Text style={styles.registerButtonText}>Register Service</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </GeneralView>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  formContainer: {
    gap: 12,
  },
  sectionHeader: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 13,
    letterSpacing: 0.8,
    color: '#4a5568',
    fontWeight: '700',
    marginTop: 6,
    marginBottom: 4,
  },

  /* Input Wrappers */
  inputWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    height: 54,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  plateInputWrapper: {
    position: 'relative',
    overflow: 'hidden',
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#007a87',
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  plateInput: {
    flex: 1,
    fontFamily: 'Inter_18pt-Black',
    fontSize: 22,
    fontWeight: '800',
    color: '#007a87',
    letterSpacing: 2,
    marginLeft: 6,
  },
  textInput: {
    flex: 1,
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 15,
    color: '#2d3748',
  },
  errorText: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 12,
    color: Colors.error,
    marginTop: -4,
    marginLeft: 4,
  },

  /* Service Tiers */
  tiersContainer: {
    gap: 12,
    marginTop: 2,
    marginBottom: 8,
  },
  emptyTiersBox: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 14,
  },
  emptyTiersText: {
    fontFamily: 'Inter_18pt-Light',
    color: '#a0aec0',
  },
  tierCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    position: 'relative',
  },
  tierCardSelected: {
    borderColor: '#007a87',
    backgroundColor: '#f6fbfb',
  },
  recommendedTag: {
    position: 'absolute',
    top: -10,
    right: 14,
    backgroundColor: '#005f6b',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    zIndex: 1,
  },
  recommendedTagText: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 9,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.8,
  },
  tierContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tierIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#e6f7f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  tierIconContainerSelected: {
    backgroundColor: '#d0f0f3',
  },
  tierInfo: {
    flex: 1,
    marginRight: 10,
  },
  tierTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tierName: {
    fontFamily: 'Inter_18pt-Black',
    fontSize: 16,
    fontWeight: '700',
    color: '#1a202c',
  },
  checkIcon: {
    marginLeft: 2,
  },
  tierDescription: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 13,
    color: '#718096',
    marginTop: 2,
    lineHeight: 17,
  },
  tierPrice: {
    fontFamily: 'Inter_18pt-Black',
    fontSize: 20,
    fontWeight: '800',
    color: '#007a87',
  },

  /* Customer Details */
  customerDetailsBox: {
    backgroundColor: '#edf4fc',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    marginBottom: 10,
  },
  customerHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  customerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  customerTitleText: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    letterSpacing: 0.5,
  },
  optionalBadge: {
    backgroundColor: '#cbd5e1',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  optionalBadgeText: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 9,
    fontWeight: '700',
    color: '#475569',
    letterSpacing: 0.6,
  },
  customerInputWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginBottom: 8,
  },
  customerInput: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 15,
    color: '#1e293b',
  },
  customerHint: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },

  /* Register Button */
  registerButton: {
    backgroundColor: '#007a87',
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#007a87',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  registerButtonText: {
    fontFamily: 'Inter_18pt-Black',
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
});