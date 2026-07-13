import GeneralView from '@/components/GeneralView';
import { useUserStore } from '@/store/user.store';
import { StyleSheet, Text, View } from 'react-native';

const UserInformationScreen = () => {
  const user = useUserStore((state) => state.user);
  console.log(user);

  return (
    <GeneralView>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.title}>User Information</Text>
        <Text style={styles.sectionDescription}>Manage your account preferences and business configurations.</Text>
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
})

export default UserInformationScreen;
