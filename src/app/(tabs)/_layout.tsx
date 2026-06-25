import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

import { StyleSheet } from 'react-native'

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary,
      headerShown: false
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Queue',
          tabBarIcon: ({ color }) => <Ionicons size={28} name={'list-outline'} color={color} />
        }}
      />
      <Tabs.Screen
        name="service"
        options={{
          title: 'Service',
          tabBarIcon: ({ color }) => <Ionicons size={28} name={'add-circle-outline'} color={color} />
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <Ionicons size={28} name={'book-outline'} color={color} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Ionicons size={28} name={'settings-outline'} color={color} />
        }}
      />
    </Tabs>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})