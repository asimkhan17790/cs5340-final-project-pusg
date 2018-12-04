import React from 'react';
import { Title, TextInput, Button, Appbar, HelperText } from 'react-native-paper';
import  { View, Text, StyleSheet } from 'react-native';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: false
    };
  }

  get validateEmail() {
    return () => {
      this.setState({
        emailError: !this.state.email.includes('@') || this.state.email.substring(this.state.email.length - 4) !== ('.edu')
      })
    }
  }

  get signUp() {
    return () => {
      if(this.state.email !== '' && this.state.password !== ''){
        // this.props.navigation.navigate('home');
      }
    }
  }

  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#3b5b66',
      shadowOpacity: 0,
      borderBottomWidth: 0
    },
    title: 'PUSG',
    headerTitleStyle: {
      color: '#e99b44',
      textAlign: 'center',
      width: '100%',
      fontSize: 24
    },
  };

  render() {
    return(
      <View style={styles.common}>
        <View style={styles.header}>
          <Text style={styles.subHeading}>
            Efficiently Organize Study Groups
          </Text>
        </View>
        <View style={styles.container}>
          <TextInput
            label='University Email'
            model="outlined"
            error={this.state.emailError}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            onBlur={this.validateEmail}
          />
          <HelperText
            type="error"
            visible={this.state.emailError}
          >
            Enter a valid university(.edu) email address
          </HelperText>
          <TextInput
            label='Password'
            model="outlined"
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            onSubmitEditing={this.signUp}
          />
        </View>
        <View style={styles.loginButton}>
          <Button
            mode="contained"
            disabled={this.state.email === '' || this.state.password === ''}
            onPress={this.signUp}>
            Sign Up
          </Button>
        </View>
        <View style={{flexDirection: 'row', margin: 10}}>
          <View style={{backgroundColor: '#444', height: 1, flex: 1, alignSelf: 'center'}} />
          <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 14 }}>  OR  </Text>
          <View style={{backgroundColor: '#444', height: 1, flex: 1, alignSelf: 'center'}} />
        </View>
        <View style={styles.signUpButton}>
          <Button
            mode="outlined"
            onPress={() => this.props.navigation.navigate('login')}>
            Already Have an Account?
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  loginButton: {
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  common: {
  },
  signUpButton: {
    padding: 10,
    marginTop: 15
  },
  header: {
    height: 60,
    backgroundColor: '#3b5b66',
  },
  forgotPassword: {
    color: '#666',
    fontSize: 12,
    textAlign: 'right',
    padding: 10,
    width: '100%',
  },
  exitApp: {
    color: '#3b5b66',
    fontSize: 12,
    textAlign: 'center',
    padding: 20,
    width: '100%',
  },
  subHeading: {
    color: '#ddd',
    marginTop: 15,
    textAlign: 'center',
    width: '100%',
    fontSize: 17
  }
});