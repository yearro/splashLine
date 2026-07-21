import GeneralView from '@/components/GeneralView';
import Colors from '@/constants/Colors';
import { useBusinessStore } from '@/store/business.store';
import { descriptionSchema, nameSchema, priceSchema } from '@/validations';
import Ionicons from '@react-native-vector-icons/ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { Formik } from 'formik';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as yup from 'yup';

const IdServiceScreen = () => {
  const { id } = useLocalSearchParams();
  const { addToServices } = useBusinessStore();

  return (
    <GeneralView>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.title}>{id === '0' ? 'Add service' : 'Edit service'}</Text>
        <Text style={styles.sectionDescription}>Manage your account preferences and business configurations.</Text>
      </View>
      <Formik
        initialValues={{
          serviceName: '',
          servicePrice: '',
          serviceDescription: '',
        }}
        validationSchema={yup.object({
          serviceName: nameSchema,
          servicePrice: priceSchema,
          serviceDescription: descriptionSchema,
        })}
        onSubmit={async (values) => {
          const response = await addToServices(Number(id), values.serviceName, Number(values.servicePrice), values.serviceDescription);
          if (!!response) {
            Alert.alert('Success', 'Service added successfully', [
              {
                text: 'OK',
                onPress: () => {
                  router.back();
                },
              },
            ]);
          } else {
            Alert.alert('Error', 'Failed to add service');
          }
        }}
      >
        {props => (
          <View>
            <TextInput
              placeholder="Service name"
              style={styles.input}
              value={props.values.serviceName}
              onChangeText={props.handleChange('serviceName')}
            />
            {props.touched.serviceName && props.errors.serviceName && (
              <Text style={{ color: 'red' }}>{props.errors.serviceName}</Text>
            )}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons style={{ marginBottom: 20 }} name="cash-outline" size={24} color={Colors.primary} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <TextInput
                  placeholder="0"
                  keyboardType="numeric"
                  style={styles.input}
                  value={props.values.servicePrice.toString()}
                  onChangeText={props.handleChange('servicePrice')}
                />
              </View>
            </View>
            {props.touched.servicePrice && props.errors.servicePrice && (
              <Text style={{ color: 'red' }}>{props.errors.servicePrice}</Text>
            )}
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder="Service description"
              style={[styles.input, { textAlignVertical: 'top', height: 'auto', minHeight: 100 }]}
              value={props.values.serviceDescription}
              onChangeText={props.handleChange('serviceDescription')}
            />
            {props.touched.serviceDescription && props.errors.serviceDescription && (
              <Text style={{ color: 'red' }}>{props.errors.serviceDescription}</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={() => props.handleSubmit()}>
              <Text style={styles.buttonText}>{id === '0' ? 'Add service' : 'Save service'}</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </GeneralView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionDescription: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 14,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    paddingLeft: 10,
  }
})

export default IdServiceScreen;
