import React from 'react';
import { Title, TextInput, Button, Appbar, HelperText } from 'react-native-paper';
import  { View, Text, StyleSheet } from 'react-native';

export default class Login extends React.Component {
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

  get login() {
    return () => {
      if(this.state.email !== '' && this.state.password !== ''){
        console.log('Navigate')
        // this.props.navigation.navigate('home');
      }
    }
  }

  render() {
    return(
      <View style={styles.common}>
        <View style={styles.header}>
          <Appbar.Header>
            <Title style={styles.brandingText}>
              PUSG
            </Title>
          </Appbar.Header>
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
            onSubmitEditing={this.login}
          />
        </View>
        <Text style={styles.forgotPassword}>
          Forgot Password?
        </Text>
        <View style={styles.loginButton}>
          <Button
            mode="contained"
            disabled={this.state.email === '' || this.state.password === ''}
            onPress={this.login}>
            Login
          </Button>
        </View>
        <Text style={styles.exitApp}>
          Exit Application
        </Text>
        <View style={{flexDirection: 'row', margin: 10}}>
          <View style={{backgroundColor: '#444', height: 1, flex: 1, alignSelf: 'center'}} />
          <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 14 }}>  OR  </Text>
          <View style={{backgroundColor: '#444', height: 1, flex: 1, alignSelf: 'center'}} />
        </View>
        <View style={styles.signUpButton}>
          <Button
            mode="outlined"
            onPress={() => console.log('Pressed', this.state.email)}>
            Create New Account
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
    marginTop: 10
  },
  header: {
    height: 150,
    backgroundColor: '#3b5b66',
  },
  brandingText: {
    color: '#e99b44',
    marginTop: 20,
    textAlign: 'center',
    width: '100%',
    fontSize: 24
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