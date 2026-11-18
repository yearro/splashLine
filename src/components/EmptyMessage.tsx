import Colors from '@/constants/Colors';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import glyphmaps from '@react-native-vector-icons/material-icons/glyphmaps/MaterialIcons.json';
import { StyleSheet, Text, View } from 'react-native';

type MaterialName = keyof typeof glyphmaps;

interface iProps {
  title: string;
  subTitle: string;
  icon: string;
}

const EmptyMessage = ({ title = '', subTitle = '', icon }: iProps) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name={icon as MaterialName} size={48} color={Colors.primary} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingBottom: 80,
  },
  title: {
    fontFamily: 'Inter_18pt-Medium',
    fontSize: 18,
    color: '#333',
  },
  subtitle: {
    fontFamily: 'Inter_18pt-Light',
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
})

export default EmptyMessage;
