import React from 'react';
import { TextInput, Button, HelperText, Caption } from 'react-native-paper';
import  { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity, StatusBar } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Header } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

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

export default class CreateMeeting extends React.Component {
  constructor(props) {
    super(props);
    navigation = this.props.navigation;
    this.state = {
      title: '',
      description: '',
      dateTime: new Date().toString(),
      descriptionError: false,
      titleError: false,
      dateTimeError: false,
      isDateTimePickerVisible: false,
    };
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
    this.setState({
      dateTime: date.toString()
    })
  };

  get validateDescription() {
    return () => {
      this.setState({
        descriptionError: this.state.description.length === 0
      })
    }
  }

  get validateTitle() {
    return () => {
      this.setState({
        titleError: this.state.title.length === 0
      })
    }
  }

  get validateDateTime() {
    return () => {
      this.setState({
        dateTimeError: this.state.dateTime.length === 0
      })
    }
  }

  get createMeeting() {
    return () => {
      if(this.state.email !== '' && this.state.password !== '' && this.state.title !== ''){
        this.props.navigation.navigate('discussion');
      }
    }
  }

  tConvert(time) {
    let ts = time;
    let H = +ts.substr(0, 2);
    let h = (H % 12) || 12;
    h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
    let ampm = H < 12 ? " AM" : " PM";
    ts = h + ':' + ts.substr(2, 3) + ampm;
    return ts;
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
          <View style={styles.container}>
            <Text style={styles.pageTitle}>
              Group 1
            </Text>
            <Text style={styles.courseText}>
              Course: CS5200
            </Text>
          </View>
          <Text style={styles.subHeading}>
            Enter Meeting Details
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              label='Title'
              model="outlined"
              value={this.state.title}
              error={this.state.titleError}
              onChangeText={title => this.setState({ title })}
              onBlur={this.validateTitle}
            />
            <HelperText
              type="error"
              visible={this.state.titleError}
            >
              Title can not be empty
            </HelperText>
            <TextInput
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
            <View style={styles.searchSection}>
              <TextInput
                style={styles.input}
                placeholder="Meeting Time"
                onChangeText={(searchString) => {this.setState({searchString})}}
                error={this.state.dateTimeError}
                onBlur={this.validateDateTime}
                value={this.state.dateTime.substring(0, 15) + ', ' + this.tConvert(this.state.dateTime.substring(17, 24))}
                underlineColorAndroid="transparent"
              />
              <Icon style={styles.calendarIcon}
                    onPress={this._showDateTimePicker}
                    name="calendar" size={26}
                    color="#4885ed"/>
            </View>
            <HelperText
              type="error"
              visible={this.state.dateTimeError}
            >
              Meeting time can not be empty.
            </HelperText>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              mode='datetime'
              is24Hour={false}
              onCancel={this._hideDateTimePicker}
            />
          </View>
          <View style={styles.createMeetingButton}>
            <Button
              mode="contained"
              disabled={this.state.title === '' || this.state.description === '' || this.state.date === ''}
              onPress={this.createMeeting}>
              Create Meeting
            </Button>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('discussion')}>
            <Text style={styles.cancelText}>
              Cancel
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#3b5b66'
  },
  courseText: {
    fontSize: 10,
    textAlign: 'left',
    color: '#fff'
  },
  inputContainer: {
    padding: 10
  },
  dateButton: {
    padding: 10,
  },
  pageTitle:{
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: '#fff'
  },
  createMeetingButton: {
    paddingHorizontal: 10,
    marginBottom: 15,
    // marginTop: 80
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  calendarIcon: {
    padding: 10,
    height: 45,
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 1,
    }
  },
  input: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 0,
  },
  returnButton: {
    padding: 10,
  },
  meetingTime: {
    marginLeft: 12
  },
  subHeading:{
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold'
  },
  forgotPassword: {
    color: '#666',
    fontSize: 12,
    textAlign: 'right',
    padding: 10,
    width: '100%',
  },
  cancelText: {
    textAlign: 'center',
    color: '#3b5b66',
    fontSize: 12
  }
});