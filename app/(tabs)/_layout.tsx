import { Link, Tabs } from 'expo-router';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#d9e3e8',
        tabBarInactiveTintColor: '#699fc3',
        tabBarStyle: {
          backgroundColor: '#1d2525',
        },
        headerStyle: {
          backgroundColor: '#1d2525',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Weyland Yutani',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Ar Screen',
          tabBarLabel: 'AR',
          tabBarIcon: ({ color }) => <TabBarIcon name="microchip" color={color} />,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: 'Profile Screen',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
