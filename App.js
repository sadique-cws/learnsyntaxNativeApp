import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/_tabs/Home';
import Course from './screens/_tabs/Course';
import Contact from './screens/_tabs/Contact';
import About from './screens/_tabs/About';
import { NavigationContainer } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';


const Tabs = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const TabNav = () => {
  return (
      
      <Tabs.Navigator initialRouteName='home'>
      <Tabs.Screen name="home" component={Home} options={{
        tabBarIcon: (focused) => <Feather name="home" size={25}/>,
        headerShown:false
      }}/>
      <Tabs.Screen name='course' component={Course} options={{
        tabBarIcon:(focused) => <SimpleLineIcons name="graduation" size={24} />
      }}/>
      <Tabs.Screen name='contact' component={Contact} options={{
        tabBarIcon: (focused) => <Feather name="phone-call" size={24} color="black" />
      }}/>
      <Tabs.Screen name='about' component={About} options={{
        tabBarIcon:(focused) =>  <Feather name="user" size={24} color="black" />
      }}/>
    </Tabs.Navigator>
  )
}

const StackNav = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='login'>
            <Stack.Screen name="login" component={LoginScreen} options={{
              headerShown:false
            }}/>
            <Stack.Screen name="main" component={TabNav} options={{
              headerShown:false,
            }}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return ( 
    <>
    <StackNav/>
    </>
  
  );
}
