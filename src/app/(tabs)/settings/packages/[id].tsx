import GeneralView from '@/components/GeneralView';
import Colors from '@/constants/Colors';
import { useBusinessStore } from '@/store/business.store';
import { descriptionSchema, nameSchema } from '@/validations';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { router, useLocalSearchParams } from 'expo-router';
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

const PACKAGE_ICONS = [
  { name: 'local-car-wash', label: 'Car Wash' },
  { name: 'flash-on', label: 'Express' },
  { name: 'diamond', label: 'Diamond' },
  { name: 'verified', label: 'Verified' },
  { name: 'star', label: 'Star' },
  { name: 'shield', label: 'Shield' },
  { name: 'auto-awesome', label: 'Awesome' },
  { name: 'cleaning-services', label: 'Clean' },
  { name: 'directions-car', label: 'Car' },
  { name: 'water-drop', label: 'Water' },
  { name: 'beach-access', label: 'Beach' },
  { name: 'workspace-premium', label: 'Premium' },
  { name: 'dry-cleaning', label: 'Dry' },
  { name: 'dry', label: 'dry-hand' },
];

const NewPackageScreen = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEditing = Boolean(id);
  const { services, addToPackages, packages } = useBusinessStore();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string>('local-car-wash');
  const [initialValues, setInitialValues] = useState({
    packageName: '',
    packageDescription: '',
  });

  useEffect(() => {
    if (id) {
      const existingPkg = packages.find((p) => p.id === Number(id));
      if (existingPkg) {
        setInitialValues({
          packageName: existingPkg.name,
          packageDescription: existingPkg.description,
        });
        if (existingPkg.icon) {
          setSelectedIcon(existingPkg.icon);
        }
        if (existingPkg.serviceIds) {
          setSelectedIds(existingPkg.serviceIds);
        }
      }
    }
  }, [id, packages]);

  const toggleService = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const selectedServices = services.filter((s) => selectedIds.includes(s.id));
  const calculatedPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

  return (
    <GeneralView>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={20} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{isEditing ? 'Edit Package' : 'Add Package'}</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Hero */}
        <Text style={styles.title}>{isEditing ? 'Edit Package' : 'Create Package'}</Text>
        <Text style={styles.subtitle}>
          {isEditing
            ? 'Modify the service details and included bundle options.'
            : 'Configure a new bundle of services for your customers.'}
        </Text>

        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={yup.object({
            packageName: nameSchema,
            packageDescription: descriptionSchema,
          })}
          onSubmit={async (values, { resetForm }) => {
            if (selectedIds.length === 0) {
              Alert.alert('No services', 'Please select at least one service for this package.');
              return;
            }
            const response = await addToPackages(
              Number(id),
              values.packageName,
              values.packageDescription,
              selectedIds,
              selectedIcon
            );
            if (!!response) {
              if (isEditing && id) {
                Alert.alert('Success', 'Package updated successfully!', [
                  {
                    text: 'OK',
                    onPress: () => {
                      router.back();
                    },
                  },
                ]);
              } else {
                Alert.alert('Success', 'Package created successfully!', [
                  {
                    text: 'OK',
                    onPress: () => {
                      resetForm();
                      setSelectedIds([]);
                      setSelectedIcon('local-car-wash');
                      router.back();
                    },
                  },
                ]);
              }
            }
          }}
        >
          {(props) => (
            <>
              {/* Preview Card */}
              <View style={styles.previewCard}>
                <View style={styles.previewBadge}>
                  <Text style={styles.previewBadgeText}>
                    {isEditing ? 'EDIT PACKAGE' : 'NEW PACKAGE'}
                  </Text>
                </View>
                <View style={styles.previewCardRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.previewName} numberOfLines={1}>
                      {props.values.packageName || 'Package Name...'}
                    </Text>
                    <Text style={styles.previewDesc} numberOfLines={1}>
                      {props.values.packageDescription
                        ? props.values.packageDescription
                        : 'Premium bundle including...'}
                    </Text>
                  </View>
                  <View style={styles.previewIcon}>
                    <MaterialIcons name={selectedIcon as any} size={24} color="white" />
                  </View>
                </View>
                <View style={styles.previewPriceRow}>
                  <Text style={styles.previewPrice}>${calculatedPrice.toFixed(2)}</Text>
                  <View style={styles.previewServicesIcons}>
                    {selectedServices.slice(0, 2).map((s) => (
                      <View key={s.id} style={styles.previewServiceBubble}>
                        <MaterialIcons name="local-car-wash" size={14} color={Colors.primaryStrong} />
                      </View>
                    ))}
                    {selectedIds.length > 2 && (
                      <View style={styles.previewServiceBubble}>
                        <Text style={styles.previewServiceBubbleText}>+{selectedIds.length - 2}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              {/* Package Name */}
              <Text style={styles.label}>Package Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Platinum Ceramic Shield"
                placeholderTextColor="#aaa"
                value={props.values.packageName}
                onChangeText={props.handleChange('packageName')}
                onBlur={props.handleBlur('packageName')}
              />
              {props.touched.packageName && props.errors.packageName && (
                <Text style={styles.error}>{props.errors.packageName}</Text>
              )}

              {/* Icon Selection */}
              <Text style={styles.label}>Package Icon</Text>
              <View style={styles.iconGrid}>
                {PACKAGE_ICONS.map((item) => {
                  const isSelected = selectedIcon === item.name;
                  return (
                    <TouchableOpacity
                      key={item.name}
                      style={[styles.iconChip, isSelected && styles.iconChipSelected]}
                      onPress={() => setSelectedIcon(item.name)}
                      activeOpacity={0.8}
                    >
                      <MaterialIcons
                        name={item.name as any}
                        size={22}
                        color={isSelected ? 'white' : Colors.primaryStrong}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Description */}
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe the premium benefits of this bundle..."
                placeholderTextColor="#aaa"
                value={props.values.packageDescription}
                onChangeText={props.handleChange('packageDescription')}
                onBlur={props.handleBlur('packageDescription')}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              {props.touched.packageDescription && props.errors.packageDescription && (
                <Text style={styles.error}>{props.errors.packageDescription}</Text>
              )}

              {/* Package Price (read-only, auto) */}
              <Text style={styles.label}>Package Price</Text>
              <View style={styles.priceRow}>
                <Text style={styles.priceCurrency}>$</Text>
                <Text style={styles.priceValue}>{calculatedPrice.toFixed(2)}</Text>
              </View>
              <Text style={styles.priceHint}>
                Calculated automatically from selected services
              </Text>

              {/* Included Services */}
              <View style={styles.servicesHeader}>
                <Text style={styles.label}>Included Services</Text>
                {selectedIds.length > 0 && (
                  <View style={styles.selectedChip}>
                    <Text style={styles.selectedChipText}>
                      {selectedIds.length} SELECTED
                    </Text>
                  </View>
                )}
              </View>

              {services.length === 0 ? (
                <View style={styles.noServicesBox}>
                  <MaterialIcons name="local-car-wash" size={28} color="#ccc" />
                  <Text style={styles.noServicesText}>
                    No services available. Add services first.
                  </Text>
                </View>
              ) : (
                services.map((service) => {
                  const isSelected = selectedIds.includes(service.id);
                  return (
                    <TouchableOpacity
                      key={service.id}
                      style={[styles.serviceRow, isSelected && styles.serviceRowSelected]}
                      onPress={() => toggleService(service.id)}
                      activeOpacity={0.8}
                    >
                      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                        {isSelected && (
                          <MaterialIcons name="check" size={14} color="white" />
                        )}
                      </View>
                      <View style={styles.serviceIconBubble}>
                        <MaterialIcons name="local-car-wash" size={20} color={Colors.primaryStrong} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.serviceName}>{service.name}</Text>
                        <Text style={styles.serviceMeta}>
                          ${service.price.toFixed(2)} · {service.description.slice(0, 30)}
                          {service.description.length > 30 ? '...' : ''}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })
              )}

              {/* Submit */}
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => props.handleSubmit()}
              >
                <MaterialIcons name={isEditing ? 'save' : 'add'} size={20} color="white" />
                <Text style={styles.submitBtnText}>{isEditing ? 'Save Package' : 'Create Package'}</Text>
              </TouchableOpacity>

              <View style={{ height: 40 }} />
            </>
          )}
        </Formik>
      </ScrollView>
    </GeneralView>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eef4ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 16,
    color: Colors.primary,
  },
  title: {
    fontFamily: 'Inter_18pt-Black',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },

  /* Preview card */
  previewCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 18,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#eef4ff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  previewBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.chip,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 12,
  },
  previewBadgeText: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 9,
    color: Colors.primaryStrong,
    letterSpacing: 1.2,
  },
  previewCardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 14,
  },
  previewName: {
    fontFamily: 'Inter_18pt-Black',
    fontSize: 18,
    color: '#111',
    marginBottom: 4,
    fontStyle: 'italic',
  },
  previewDesc: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 13,
    color: '#888',
  },
  previewIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f4ff',
    paddingTop: 12,
  },
  previewPrice: {
    fontFamily: 'Inter_18pt-Black',
    fontSize: 22,
    color: '#111',
  },
  previewServicesIcons: {
    flexDirection: 'row',
    gap: 6,
  },
  previewServiceBubble: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: Colors.chip,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewServiceBubbleText: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 10,
    color: Colors.primaryStrong,
  },

  /* Form */
  label: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 14,
    color: Colors.primaryStrong,
    marginBottom: 8,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  iconChip: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dde6f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconChipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  input: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#dde6f5',
    borderRadius: 10,
    padding: 13,
    backgroundColor: 'white',
    marginBottom: 16,
    color: '#111',
  },
  textArea: {
    minHeight: 90,
  },
  error: {
    color: Colors.error,
    fontSize: 12,
    fontFamily: 'Inter_18pt-Light',
    marginTop: -12,
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#dde6f5',
    borderRadius: 10,
    padding: 13,
    backgroundColor: 'white',
    marginBottom: 6,
  },
  priceCurrency: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 16,
    color: Colors.primary,
  },
  priceValue: {
    fontFamily: 'Inter_18pt-Black',
    fontSize: 20,
    color: Colors.primary,
  },
  priceHint: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 12,
    color: '#999',
    marginBottom: 22,
  },
  servicesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  selectedChip: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  selectedChipText: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 11,
    color: 'white',
    letterSpacing: 0.8,
  },
  noServicesBox: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 20,
    borderRadius: 12,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#eef4ff',
    marginBottom: 20,
  },
  noServicesText: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 13,
    color: '#aaa',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eef4ff',
  },
  serviceRowSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#f0fbfc',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  serviceIconBubble: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.chip,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceName: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 15,
    color: '#111',
  },
  serviceMeta: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 24,
  },
  submitBtnText: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 16,
    color: 'white',
  },
});

export default NewPackageScreen;
