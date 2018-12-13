
import React from 'react';
import { TextInput, Button, HelperText, Portal, Dialog } from 'react-native-paper';
import  { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity, StatusBar } from 'react-native';
import constants from '../constants.json';
import { Header } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectMultiple from 'react-native-select-multiple'


let navigation = '';

class HeaderRight extends React.Component {
  render() {
    return(
      <View style={{flexDirection: 'row', margin: 10}}>
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
          <Icon onPress={() => navigation.navigate('profile')}
                name="user-circle" size={26}
                color="#fff"/>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            flex: 1,
            margin: 5,
            marginTop: 10,
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
      </View>
    )
  };
}

export default class CreateGroup extends React.Component {
  constructor(props) {
    super(props);
    navigation = this.props.navigation;
    this.state = {
      description: '',
      memberList: [],
      name: '',
      descriptionError: false,
      nameError: false,
      memberListError: false,
      allStudents: constants.studentList,
      isEnabled: false,
      autoCompleteHeight: 0,
      createGroupButtonMarginTop: 0,
      visible: false,
    };
  }

  onSelectionsChange = (memberList) => {
    this.setState({ memberList })
  };

  _showDialog = () => this.setState({ visible: true });

  _hideDialog = () => this.setState({ visible: false });

  _addStudents = () => {
    this.setState({
      visible: false,
      snackBarVisible: true
    })
  };

  get validateDescription() {
    return () => {
      this.setState({
        descriptionError: this.state.description.length === 0
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

  get validateMemberList() {
    return () => {
      this.setState({
        memberListError: this.state.memberList.length === 0
      })
    }
  }

  get createGroup() {
    return () => {
      if(this.state.email !== '' && this.state.password !== '' && this.state.name !== ''){
        this.props.navigation.navigate('home');
      }
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
            Enter Group Details
          </Text>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
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
              style={styles.input}
              label='Description'
              model="outlined"
              error={this.state.descriptionError}
              value={this.state.description}
              onChangeText={description => this.setState({ description })}
              onBlur={this.validateDescription}
            />
            <HelperText
              type="error"
              visible={this.state.descriptionError}
            >
              Description can not be empty.
            </HelperText>
            <Button mode="text" onPress={this._showDialog}>
              Select Members to Add
            </Button>
          </View>
          <View style={styles.createGroupButton}>
            <Button
              mode="contained"
              disabled={this.state.email === '' || this.state.password === ''}
              onPress={this.createGroup}>
              Create Group
            </Button>
          </View>
          <Text style={styles.cancelText} onPress={() => this.props.navigation.navigate('group')}>
            Cancel
          </Text>
        </ScrollView>
        <Portal>
          <Dialog
            visible={this.state.visible}
            onDismiss={this._hideDialog}>
            <Dialog.Title>Choose Members</Dialog.Title>
            <Dialog.ScrollArea style={{ maxHeight: 170, paddingHorizontal: 0 }}>
            <ScrollView>
              <View>
                <SelectMultiple
                  items={this.state.allStudents}
                  selectedItems={this.state.memberList}
                  onSelectionsChange={this.onSelectionsChange} />
              </View>
            </ScrollView>
          </Dialog.ScrollArea>
            <View>
              <Dialog.Actions>
                <Button onPress={this._addStudents}>Submit</Button>
                <Button onPress={this._hideDialog}>Cancel</Button>
              </Dialog.Actions>
            </View>
          </Dialog>
        </Portal>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  autoCompleteContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  autoCompleteRoot: {
    flex: 1,
    padding: 20
  },
  createGroupButton: {
    paddingHorizontal: 10,
    marginBottom: 15,
    marginTop: 20
  },
  input: {
    backgroundColor: '#fff'
  },
  returnButton: {
    padding: 10,
  },
  pageTitle:{
    fontSize: 16,
    textAlign: 'left',
    padding: 10,
    fontWeight: 'bold'
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
  },
  cancelText: {
    textAlign: 'center',
    color: '#3b5b66',
    fontSize: 12
  },
  dialogRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});