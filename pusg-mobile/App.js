import * as React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createStackNavigator , createAppContainer} from 'react-navigation';
import Login from './app/screens/Login';
import SignUp from './app/screens/SignUp';


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3b5b66',
    accent: '#e99b44',
  }
};

const AppNavigator = createStackNavigator(
  {
    login: Login,
    signUp: SignUp
  },
  {
    initialRouteName: 'login',
  }
);

const App = createAppContainer(AppNavigator);

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}