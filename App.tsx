import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login } from './components/Login';
import { Journal } from './components/Journal';
import { SingleInputScreen } from './components/SingleInputScreen';



export type StackParams = {
  login: {},
  journal: {},
  newWorkout: {},
  singleInputScreen: {
    heading: string,
    type: 'string' | 'number',
    onSubmit: (result: string) => void
  }
}

export const Stack = createNativeStackNavigator<StackParams>()

export default function App() {

  return (
    
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName='journal'
      >
        <Stack.Screen
          name="login"
          component={Login}
        />
        <Stack.Screen
          name="journal"
          component={Journal}
        />
        <Stack.Screen
          name="singleInputScreen"
          component={SingleInputScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
