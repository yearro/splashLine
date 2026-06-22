import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[styles.container, { paddingTop: insets.top + 5 }]}
    >
      <Ionicons name="water-outline" size={24} color="#008190" />
      <Text style={styles.title}>SPLASH-LAB</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    boxShadow: '0px 4px 10px 2px rgba(0, 0, 0, 0.15)',
  },
  title: {
    fontSize: 24,
    marginLeft: 8,
    fontFamily: 'Inter_18pt-Medium'
  }
});

export default Header
