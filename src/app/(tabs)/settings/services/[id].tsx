import GeneralView from '@/components/GeneralView';
import Colors from '@/constants/Colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const IdServiceScreen = () => {
  const { id } = useLocalSearchParams();
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');

  const handleNumericChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setServicePrice(numericValue);
  };

  return (
    <GeneralView>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.title}>{id === '0' ? 'Add service' : 'Edit service'}</Text>
        <Text style={styles.sectionDescription}>Manage your account preferences and business configurations.</Text>
      </View>
      <TextInput
        placeholder="Service name"
        style={styles.input}
        value={serviceName}
        onChangeText={setServiceName}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons style={{ marginBottom: 20 }} name="cash-outline" size={24} color={Colors.primary} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <TextInput
            placeholder="Price"
            keyboardType="numeric"
            style={styles.input}
            value={servicePrice}
            onChangeText={handleNumericChange}
          />
        </View>
      </View>
      <TextInput
        multiline={true}
        numberOfLines={4}
        placeholder="Service description"
        style={[styles.input, { textAlignVertical: 'top', height: 'auto', minHeight: 100 }]}
        value={serviceDescription}
        onChangeText={setServiceDescription}
      />
      <TouchableOpacity style={styles.button} onPress={() => { }}>
        <Text style={styles.buttonText}>{id === '0' ? 'Add service' : 'Save service'}</Text>
      </TouchableOpacity>
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
