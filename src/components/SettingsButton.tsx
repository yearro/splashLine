import Colors from '@/constants/Colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import glyphmaps from '@react-native-vector-icons/material-icons/glyphmaps/MaterialIcons.json';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type MaterialIconsName = keyof typeof glyphmaps;

interface iProps {
  text: string;
  icon: string;
  onPress: () => void;
}

const SettingsButton = ({ text, icon, onPress }: iProps) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [
      styles.button,
      {
        backgroundColor: pressed ? '#d6e4f9' : '#eef4ff',
      },
    ]}>
      <View style={styles.buttonInformation}>
        <MaterialIcons name={icon as MaterialIconsName} size={28} color={Colors.primary} style={styles.buttonImage} />
        <Text style={styles.textButton}>{text}</Text>
      </View>
      <Ionicons name='chevron-forward-outline' size={24} color='black' />
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
})

export default SettingsButton;
