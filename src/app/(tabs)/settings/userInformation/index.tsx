import GeneralView from '@/components/GeneralView';
import Colors from '@/constants/Colors';
import { useUserStore } from '@/store/user.store';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const UserInformationScreen = () => {
  const { user, getUser, setUser } = useUserStore();

  const [name, setName] = useState(user || '');

  useEffect(() => {
    getUser();
    setName(user || '');
  }, [user]);

  const handleSave = async () => {
    if (name.trim() !== '') {
      const response = await setUser(name);
      if (response) {
        Alert.alert('User saved successfully');
      }
    }
  };

  return (
    <GeneralView>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.title}>User Information</Text>
        <Text style={styles.sectionDescription}>Manage your account preferences and business configurations.</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="User"
          value={name}
          onChangeText={setName}
        />
        <Pressable
          style={styles.button}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
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
  input: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 14,
    color: '#fff',
  },
})

export default UserInformationScreen;
