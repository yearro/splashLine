import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

interface iProps {
  userName: string;
}

const UserCard = ({ userName = 'User Name' }: iProps) => {
  return (
    <View style={styles.container}>
      <Ionicons style={styles.icon} name="person-sharp" size={40} color={Colors.primary} />
      <View>
        <Text style={styles.name}>{userName}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.statusDot} />
          <Text style={styles.role}>Application Owner</Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "white",
    borderRadius: 18,
    padding: 20,
    shadowColor: '#eee',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 20,
  },
  icon: {
    borderWidth: 3,
    borderRadius: 12,
    padding: 8,
    borderColor: Colors.primary,
    marginRight: 16
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryStrong,
    marginBottom: 4
  },
  role: {
    fontSize: 14,
    color: Colors.primary,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primaryLight,
    marginRight: 6
  },
})

export default UserCard;
