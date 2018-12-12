import React from 'react';
import { TextInput, Button, HelperText } from 'react-native-paper';
import  { View, Text, StyleSheet } from 'react-native';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      emailError: false,
      nameError: false,
      passwordError: false
    };
  }

  get validateEmail() {
    return () => {
      this.setState({
        emailError: !this.state.email.includes('@') || this.state.email.substring(this.state.email.length - 4) !== ('.edu')
      })
    }
  }

  get validateName() {
    return () => {
      this.setState({
        nameError: this.state.name.length === 0
      })
    }
  }

  get validatePassword() {
    return () => {
      this.setState({
        passwordError: this.state.password === '' || this.state.password.length <= 8
      })
    }
  }

  get signUp() {
    return () => {
      if(this.state.email !== '' && this.state.password !== '' && this.state.name !== ''){
        this.props.navigation.navigate('home');
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
            label='Name'
            model="outlined"
            value={this.state.name}
            error={this.state.nameError}
            onChangeText={name => this.setState({ name })}
            onBlur={this.validateName}
          />
          <HelperText
            type="error"
            visible={this.state.nameError}
          >
            Name can not be empty
          </HelperText>
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
            error={this.state.passwordError}
            onChangeText={password => this.setState({ password })}
            onBlur={this.validatePassword}
            onSubmitEditing={this.signUp}
          />
          <HelperText
            type="error"
            visible={this.state.passwordError}
          >
            Password should contain at least 8 characters
          </HelperText>
        </View>
        <View style={styles.signUpButton}>
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
        <View style={styles.returnButton}>
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
  signUpButton: {
    paddingHorizontal: 10,
    marginBottom: 15
  },
  common: {
  },
  returnButton: {
    padding: 10,
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