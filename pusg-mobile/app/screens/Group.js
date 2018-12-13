import React from 'react';
import { Surface, Button, Dialog, Snackbar, Portal, Paragraph } from 'react-native-paper';
import  { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import constants from '../constants';

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

export default class Group extends React.Component {
  constructor(props) {
    super(props);
    navigation = this.props.navigation;
    this.state = {
      email: '',
      password: '',
      courseId: navigation.getParam('courseId', 'CS5200'),
      emailError: false,
      visible: false,
      snackBarVisible: false,
      course: {},
      groups: [],
      otherGroups: [],
      groupJoining: {}
    };

    AsyncStorage.multiGet(['courses', 'groups', 'email']).then((data) => {
      let course = JSON.parse(data[0][1]).find((item) => item.courseId === this.state.courseId);
      let userEmail = data[2][1];
      let otherGroups = constants["groups"].filter(item => item.course === course.courseId && !item.members.includes(userEmail));
      let groups = JSON.parse(data[1][1]).filter(item => item.course === course.courseId && item.members.includes(userEmail));
      this.setState({
        course: course,
        groups: groups,
        email: userEmail,
        otherGroups: otherGroups
      });
    });
  }

  static navigationOptions = ({navigation}) => ({
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
  });

  _showDialog = (group) => this.setState({
    visible: true,
    groupJoining: group
  });

  _hideDialog = () => {
    this.setState({
      visible: false
    })
  };

  _registerGroup = () => {

    this.setState((prevState) => ({
      visible: false,
      snackBarVisible: true,
      groups: [...prevState.groups, this.state.groupJoining],
      otherGroups: [...prevState.otherGroups.slice(0, prevState.otherGroups.indexOf(this.state.groupJoining)),
        ...prevState.otherGroups.slice(prevState.otherGroups.indexOf(this.state.groupJoining) + 1, prevState.otherGroups.length)]
    }));

    let groupList = constants.groups;

    groupList.map(item => {
      if(item.id === this.state.groupJoining.id) {
        item.members.push(this.state.email);
      }});
    AsyncStorage.setItem("groups", JSON.stringify(groupList)).then((res) => {
      console.log("Added group successfully!")
    });
  };


  render() {
    return(
      <ScrollView style={styles.common}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6a51ae"
        />
        <View style={styles.header}>
          <Text style={styles.subHeading}>
            {this.state.courseId}
          </Text>
          <Text style={styles.courseDescription}>
            {this.state.course.name} {"\n"}
            {this.state.course.prof}
          </Text>
        </View>
        <View style={{flexDirection: 'row', margin: 10}}>
          <View style={{backgroundColor: '#444', height: 1, flex: 1, alignSelf: 'center'}} />
          <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 14 }}>  My Groups  </Text>
          <View style={{backgroundColor: '#444', height: 1, flex: 1, alignSelf: 'center'}} />
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
          {this.state.groups.map((group, index) => (
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('discussion', {'groupId': group.id})}}>
              <Surface style={[styles.groupBox, index%2===0 ? styles.box2 : styles.box1]}>
                <Text style={styles.groupName}>
                  {group.name}
                </Text>
              </Surface>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{flexDirection: 'row', margin: 10}}>
          <View style={{backgroundColor: '#888', height: 1, flex: 1, alignSelf: 'center'}} />
          <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 14, color: '#555' }}>  Other Groups  </Text>
          <View style={{backgroundColor: '#888', height: 1, flex: 1, alignSelf: 'center'}} />
        </View>

          {this.state.otherGroups.map((otherGroup) => (

            <View style={{flexDirection: 'row', marginHorizontal: 10, alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={{textAlign: 'left', fontSize: 16, marginTop: 7, color: '#3b5b66'}}>
                {otherGroup.name}
              </Text>
              <View style={{justifyContent: 'flex-end'}}>
                <Button mode="outlined" onPress={() => this._showDialog(otherGroup)}>
                  Join
                </Button>
              </View>
            </View>
          ))}
        <View style={{flexDirection: 'row', margin: 10, marginTop: 20}}>
          <View style={{backgroundColor: '#999', height: 1, flex: 1, alignSelf: 'center'}} />
        </View>
        <View style={styles.createGroupButton}>
          <Button
            mode="contained"
            onPress={() => this.props.navigation.navigate('createGroup', {courseId: this.state.courseId})}>
            Create New Study Group
          </Button>
        </View>
        <Portal>
          <Dialog
            visible={this.state.visible}
            onDismiss={this._hideDialog}>
            <Dialog.Title>Confirmation</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Are you sure you want to join Group 3?</Paragraph>
            </Dialog.Content>
            <View>
              <Dialog.Actions>
                <Button onPress={this._registerGroup}>Yes</Button>
                <Button onPress={this._hideDialog}>Cancel</Button>
              </Dialog.Actions>
            </View>
          </Dialog>
        </Portal>
        <Snackbar
          visible={this.state.snackBarVisible}
          duration="1500"
          onDismiss={() => this.setState({ snackBarVisible: false })}
        >
          Group Joined Successfully!
        </Snackbar>
      </ScrollView>
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
  header: {
    height: 90,
    backgroundColor: '#3b5b66',
  },
  forgotPassword: {
    color: '#666',
    fontSize: 12,
    textAlign: 'right',
    padding: 10,
    width: '100%',
  },
  subHeading: {
    color: '#ddd',
    marginTop: 15,
    textAlign: 'center',
    width: '100%',
    fontSize: 17
  },
  groupBox: {
    width: 130,
    height: 130,
    borderRadius: 10,
    margin: 15,
    alignSelf: 'center',
    elevation: 4
  },
  groupName: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    padding: 10
  },
  courseDescription: {
    color: '#ccc',
    textAlign: 'left',
    paddingHorizontal: 10,
    marginTop: 15,
    fontSize: 12
  },
  box1: {
    backgroundColor: '#4a90e2'
  },
  box2: {
    backgroundColor: '#F5A623'
  },
  createGroupButton: {
    padding: 10,
    marginTop: 10
  },
});