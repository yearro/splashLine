import Footer from '@/components/Footer';
import GeneralView from '@/components/GeneralView';
import UserCard from '@/components/UserCard';
import Colors from '@/constants/Colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const SettingsScreen = () => {
  return (
    <GeneralView>
      <UserCard userName='Carlos Rodríguez' />
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <Text style={styles.sectionDescription}>Manage your account preferences and business configurations.</Text>
      </View>
      <Text style={styles.smText}>BUSINESS</Text>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button}>
          <View style={styles.buttonInformation}>
            <MaterialIcons name='local-car-wash' size={28} color={Colors.primary} style={styles.buttonImage} />
            <Text style={styles.textButton}>Services</Text>
          </View>
          <Ionicons name='chevron-forward-outline' size={24} color='black' />
        </Pressable>
        <View style={styles.divider} />
        <Pressable style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#d6e4f9' : '#eef4ff',
          },
          styles.button,
        ]}>
          <View style={styles.buttonInformation}>
            <MaterialIcons name='inventory-2' size={28} color={Colors.primary} style={styles.buttonImage} />
            <Text style={styles.textButton}>Packages</Text>
          </View>
          <Ionicons name='chevron-forward-outline' size={24} color='black' />
        </Pressable>
      </View>
      <Text style={styles.smText}>ACCOUNT</Text>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button}>
          <View style={styles.buttonInformation}>
            <MaterialIcons name='person' size={28} color={Colors.primary} style={styles.buttonImage} />
            <Text style={styles.textButton}>User Information</Text>
          </View>
          <Ionicons name='chevron-forward-outline' size={24} color='black' />
        </Pressable>
      </View>
      <Footer />
    </GeneralView>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionDescription: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 14,
  },
  smText: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 12,
  },
  buttonsContainer: {
    backgroundColor: '#eef4ff',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginVertical: 10
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 15,
  },
  buttonInformation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonImage: {
    backgroundColor: '#d6e4f9',
    padding: 8,
    borderRadius: 5,
  },
  textButton: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 16,
    color: 'black',
    marginLeft: 10
  },
  divider: {
    borderBottomColor: '#c4d7f0',
    borderBottomWidth: 1,
  }
})