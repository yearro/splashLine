import Footer from '@/components/Footer';
import GeneralView from '@/components/GeneralView';
import SettingsButton from '@/components/SettingsButton';
import UserCard from '@/components/UserCard';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

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
        <SettingsButton text='Services' icon='local-car-wash' onPress={() => router.push({ pathname: '/(tabs)/settings/services' })} />
        <View style={styles.divider} />
        <SettingsButton text='Packages' icon='inventory-2' onPress={() => router.push({ pathname: '/(tabs)/settings/packages' })} />
      </View>
      <Text style={styles.smText}>ACCOUNT</Text>
      <View style={styles.buttonsContainer}>
        <SettingsButton text='User Information' icon='person' onPress={() => router.push({ pathname: '/(tabs)/settings/userInformation' })} />
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
  divider: {
    borderBottomColor: '#c4d7f0',
    borderBottomWidth: 1,
  }
})