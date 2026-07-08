import { StyleSheet, Text, View } from 'react-native';

const Footer = () => {
  return (
    <View>
      <Text style={styles.footer}>SPLASH LINE V1.0.0</Text>
      <Text style={styles.footerInfo}>Build for precision performance</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
    fontFamily: 'Inter_18pt-Medium'
  },
  footerInfo: {
    fontSize: 12,
    textAlign: 'center',
    color: '#ccc',
    fontFamily: 'Inter_18pt-Medium'
  }
})

export default Footer;
