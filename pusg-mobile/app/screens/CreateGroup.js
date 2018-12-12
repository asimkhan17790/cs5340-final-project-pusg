import React from 'react';
import { TextInput, Button, HelperText } from 'react-native-paper';
import  { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import constants from '../constants.json';
import { Header } from 'react-navigation';

export default class CreateGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      memberList: '',
      name: '',
      descriptionError: false,
      nameError: false,
      memberListError: false,
      allStudents: constants.studentList,
      isEnabled: false,
      autoCompleteHeight: 0,
      createGroupButtonMarginTop: 0,
    };
  }

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

  checkIsEnabled(isEnabled) {
    this.setState({ isEnabled });
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

      <KeyboardAvoidingView keyboardShouldPersistTaps="handled"
                            behavior="padding"
                            style={{flex: 1}}
                            keyboardVerticalOffset={Header.HEIGHT + 40}>
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
            <TextInput
              style={styles.input}
              label="Member List"
              placeholder="Comma separated list of emails"
              model="outlined"
              error={this.state.memberListError}
              value={this.state.memberList}
              onChangeText={memberList => this.setState({ memberList })}
              onBlur={this.validateMemberList}
            />
            <HelperText
              type="error"
              visible={this.state.memberListError}
            >
              Member list can not be empty
            </HelperText>

          </View>
          {/*<ScrollView*/}
            {/*onLayout={(event) => {*/}
              {/*const {x, y, width, height} = event.nativeEvent.layout;*/}
              {/*this.state.autoCompleteHeight = height;*/}
              {/*console.log(height);*/}
              {/*this.updateHeight();*/}
            {/*}}*/}
            {/*contentContainerStyle={styles.container}*/}
            {/*style={styles.root}*/}
            {/*keyboardShouldPersistTaps="handled">*/}
            {/*<View>*/}
              {/*<AutocompleteChips*/}
                {/*ref={c => this._emailField = c}*/}
                {/*itemId="name"*/}
                {/*items={this.state.allStudents}*/}
                {/*onSubmitEditing={isEnabled => this.checkIsEnabled(isEnabled)}*/}
                {/*onChipClose={isEnabled => this.checkIsEnabled(isEnabled)}*/}
                {/*onChangeSelectedItems={this.updateHeight()}*/}
              {/*/>*/}
            {/*</View>*/}
          {/*</ScrollView>*/}
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
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  createGroupButton: {
    paddingHorizontal: 10,
    marginBottom: 15,
    // marginTop: 80
  },
  input: {
    backgroundColor: '#fff'
  },
  returnButton: {
    padding: 10,
  },
  root: {
    zIndex: 10,
    position: 'absolute',
    top: 250,
    width: '100%',
    height: '100%',
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
  }
});