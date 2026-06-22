import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

import { StyleSheet } from 'react-native'

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: 'blue'
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Queue',
          tabBarIcon: ({ color }) => <Ionicons size={28} name={'grid-outline'} color={color} />
        }}
      />
      <Tabs.Screen
        name="service"
        options={{
          title: 'Service',
          tabBarIcon: ({ color }) => <Ionicons size={28} name={'grid-outline'} color={color} />
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <Ionicons size={28} name={'grid-outline'} color={color} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Ionicons size={28} name={'grid-outline'} color={color} />
        }}
      />
    </Tabs>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})