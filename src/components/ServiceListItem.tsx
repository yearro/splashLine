import Colors from '@/constants/Colors';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ServiceListItemProps {
  id: number;
  name: string;
  price: number;
  description: string;
  onEdit: (id: number) => void;
}
const ServiceListItem = ({ id, name, price, description, onEdit }: ServiceListItemProps) => {
  return (
    <View>
      <View style={styles.serviceItemContainer}>
        <View style={styles.serviceItemHeader}>
          <Text style={styles.serviceItemTitle}>{name}</Text>
          <Pressable onPress={() => onEdit(id)}>
            <MaterialIcons name="mode-edit" size={24} color={Colors.primary} />
          </Pressable>
        </View>
        <Text style={styles.serviceItemDescription}>{description}</Text>
        <Text style={styles.serviceItemPrice}>{price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  serviceItemContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#eef4ff',
  },
  serviceItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  serviceItemTitle: {
    fontFamily: 'Inter_18pt-Black',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  serviceItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceItemDescription: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Light',
    color: '#000',
  },
  serviceItemPrice: {
    marginVertical: 10,
    fontSize: 20,
    fontFamily: 'Inter_18pt-Medium',
    color: Colors.primary,
  },
})

export default ServiceListItem;
