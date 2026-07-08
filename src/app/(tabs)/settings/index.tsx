import Footer from '@/components/Footer';
import GeneralView from '@/components/GeneralView';
import UserCard from '@/components/UserCard';
import { StyleSheet, Text, View } from 'react-native';

const SettingsScreen = () => {
  return (
    <GeneralView>
      <UserCard userName='Carlos Rodríguez' />
      <View>
        <Text style={styles.sectionTitle}>Settings</Text>
        <Text style={styles.sectionDescription}>Manage your account preferences and business configurations.</Text>
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
  }
})