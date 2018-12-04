import { createStackNavigator , createAppContainer} from 'react-navigation';

import LoginScreen from './screens/Login';
import Home from './screens/Home';

const AppStackNavigator = createStackNavigator({
  login : {screen : LoginScreen} ,
  home : {screen : Home}
});

const Router = createAppContainer(AppStackNavigator);


export default Router;