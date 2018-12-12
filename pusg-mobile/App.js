import * as React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createStackNavigator , createAppContainer} from 'react-navigation';
import Login from './app/screens/Login';
import SignUp from './app/screens/SignUp';
import Home from './app/screens/Home'
import Group from './app/screens/Group'
import CreateGroup from './app/screens/CreateGroup'
import Discussion from './app/screens/Discussion'
import CreateMeeting from "./app/screens/CreateMeeting"
import Profile from "./app/screens/Profile"


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
    signUp: SignUp,
    home: Home,
    group: Group,
    createGroup: CreateGroup,
    createMeeting: CreateMeeting,
    discussion: Discussion,
    profile: Profile
  },
  {
    initialRouteName: 'createGroup',
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