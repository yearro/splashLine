import { usePathname } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const IdServiceScreen = () => {
  const pathname = usePathname();
  return (
    <View>
      <Text>{pathname}</Text>
    </View>
  );
}

const styles = StyleSheet.create({})

export default IdServiceScreen;
