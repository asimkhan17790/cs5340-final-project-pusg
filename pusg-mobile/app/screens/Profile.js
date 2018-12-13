import React from 'react';
import { TextInput, Button, HelperText, Snackbar } from 'react-native-paper';
import  { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity, StatusBar } from 'react-native';
import { Header } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

let navigation = '';

class HeaderRight extends React.Component {
  render() {
    return(
      <TouchableOpacity
        style={{
          height: 45,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          flex: 1,
          margin: 5,
          marginTop: 10,
          marginRight: 10,
          shadowColor: 'black',
          shadowOpacity: 0.5,
          shadowOffset: {
            width: 2,
            height: 2,
          }
        }}
      >
        <Icon onPress={() => navigation.navigate('login')}
              name="sign-out" size={26}
              color="#fff"/>
      </TouchableOpacity>
    )
  };
}

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    navigation = this.props.navigation;
    this.state = {
      email: '',
      password: '',
      name: '',
      passwordError: false,
      nameError: false,
      emailError: false,
    };
  }

  get validateEmail() {
    return () => {
      this.setState({
        emailError: this.state.email.length === 0
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
        passwordError: this.state.password.length === 0
      })
    }
  }

  get updateProfile() {
    return () => {
      this.setState({
        visible: true
      })
    }
  }

  static navigationOptions = {
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
    headerBackTitleStyle: {
      color: 'white',
    },
    headerRight: (<HeaderRight/>)
  };

  render() {
    return(
      <KeyboardAvoidingView keyboardShouldPersistTaps="handled"
                            behavior="padding"
                            style={{flex: 1}}
                            keyboardVerticalOffset={Header.HEIGHT + 20}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6a51ae"
        />
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.subHeading}>
              Efficiently Organize Study Groups
            </Text>
          </View>
          <Text style={styles.pageTitle}>
            Edit Profile
          </Text>
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
              label='Email'
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
              Description can not be empty.
            </HelperText>
            <TextInput
              placeholder="Password"
              model="outlined"
              secureTextEntry={true}
              error={this.state.passwordError}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              onBlur={this.validatePassword}
            />
            <HelperText
              type="error"
              visible={this.state.passwordError}
            >
              Password cannot be empty.
            </HelperText>
          </View>
          <View style={styles.updateButton}>
            <Button
              mode="contained"
              disabled={this.state.email === '' || this.state.password === ''}
              onPress={this.updateProfile}>
              Save
            </Button>
          </View>
          <Text style={styles.cancelText} onPress={() => this.props.navigation.goBack()}>
            Cancel
          </Text>
        </ScrollView>
        <Snackbar
          visible={this.state.visible}
          duration="1500"
          onDismiss={() => this.setState({ visible: false })}
        >
          Profile Updated Successfully!
        </Snackbar>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  updateButton: {
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff'
  },
  returnButton: {
    padding: 10,
  },
  pageTitle:{
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold'
  },
  header: {
    height: 60,
    backgroundColor: '#3b5b66',
  },
  cancelText: {
    textAlign: 'center',
    color: '#3b5b66',
    fontSize: 12
  },
  subHeading: {
    color: '#ddd',
    marginTop: 15,
    textAlign: 'center',
    width: '100%',
    fontSize: 17
  },
  headerLeftText: {
    color: '#fff',
  },
  headerLeft: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  backIcon: {
  }
});