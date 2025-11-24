import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/_tabs/Home';
import Course from './screens/_tabs/Course';
import Contact from './screens/_tabs/Contact';
import About from './screens/_tabs/About';
import React, { createContext, useMemo, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './screens/LoginScreen';
import CourseDetail from './screens/CourseDetail';
import Search from './screens/Search';
import Cart from './screens/Cart';
import Checkout from './screens/Checkout';
import Payment from './screens/Payment';


const PURPLE = '#7C3AED'
const Tabs = createBottomTabNavigator()
const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

export const CartContext = createContext({ items: [], addItem: () => {}, removeItem: () => {}, clear: () => {} })

const TabNav = () => {
  return (
    <Tabs.Navigator initialRouteName='home' screenOptions={{ headerShown: false, tabBarActiveTintColor: PURPLE }}>
      <Tabs.Screen name="home" component={Home} options={{
        title: 'Home',
        tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />
      }}/>
      <Tabs.Screen name='course' component={Course} options={{
        title: 'Courses',
        tabBarIcon: ({ color, size }) => <SimpleLineIcons name="graduation" size={size} color={color} />
      }}/>
      <Tabs.Screen name='contact' component={Contact} options={{
        title: 'Contact',
        tabBarIcon: ({ color, size }) => <Feather name="phone-call" size={size} color={color} />
      }}/>
      <Tabs.Screen name='about' component={About} options={{
        title: 'About',
        tabBarIcon: ({ color, size }) =>  <Feather name="user" size={size} color={color} />
      }}/>
    </Tabs.Navigator>
  )
}

const DrawerNav = () => (
  <Drawer.Navigator screenOptions={{ headerTintColor: '#fff', headerStyle: { backgroundColor: PURPLE }, drawerActiveTintColor: PURPLE }}>
    <Drawer.Screen name="Explore" component={TabNav} options={{ drawerIcon: ({ color, size }) => <Feather name="compass" size={size} color={color} /> }} />
    <Drawer.Screen name="Search" component={Search} options={{ drawerIcon: ({ color, size }) => <Feather name="search" size={size} color={color} /> }} />
    <Drawer.Screen name="Cart" component={Cart} options={{ drawerIcon: ({ color, size }) => <Feather name="shopping-cart" size={size} color={color} /> }} />
    <Drawer.Screen name="Checkout" component={Checkout} options={{ drawerIcon: ({ color, size }) => <Feather name="credit-card" size={size} color={color} /> }} />
    <Drawer.Screen name="Payment" component={Payment} options={{ drawerIcon: ({ color, size }) => <Feather name="check-circle" size={size} color={color} /> }} />
  </Drawer.Navigator>
)

const AppTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, primary: PURPLE }
}

const StackNav = () => {
  const [items, setItems] = useState([])
  const value = useMemo(() => ({
    items,
    addItem: (course) => setItems(prev => {
      const exists = prev.find(i => i.id === course.id)
      return exists ? prev : [...prev, course]
    }),
    removeItem: (id) => setItems(prev => prev.filter(i => i.id !== id)),
    clear: () => setItems([])
  }), [items])

  return (
    <CartContext.Provider value={value}>
      <NavigationContainer theme={AppTheme}>
        <Stack.Navigator initialRouteName='main'>
          <Stack.Screen name="login" component={LoginScreen} options={{ headerShown:false }}/>
          <Stack.Screen name="main" component={DrawerNav} options={{ headerShown:false }}/>
          <Stack.Screen name="courseDetails" component={CourseDetail} options={{ title: 'Course Details' }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </CartContext.Provider>
  )
}

export default function App() {
  return ( 
    <>
    <StackNav/>
    </>
  
  );
}
