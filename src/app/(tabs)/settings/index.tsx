import Footer from '@/components/Footer';
import GeneralView from '@/components/GeneralView';
import UserCard from '@/components/UserCard';
import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';
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
        <Pressable style={styles.button}></Pressable>
        <Pressable style={styles.button}></Pressable>
      </View>
      <Text style={styles.smText}>ACCOUNT</Text>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button}>
          <MaterialIcons name='local-car-wash' size={24} color='black' />
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
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    height: 150,
  }
})