import React from 'react';
import { Surface } from 'react-native-paper';
import  { View, Text, StyleSheet, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native';
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

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    navigation = this.props.navigation;
    this.state = {
      email: '',
      password: '',
      emailError: false,
      courses: [],
      groups: []
    };
    AsyncStorage.multiGet(['courses', 'groups']).then((data) => {
      // console.log("data", data);
      this.setState({
        courses: JSON.parse(data[0][1]),
        groups: JSON.parse(data[1][1])
      })
    });
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
    headerRight: (<HeaderRight/>)
  };

  render() {
    return(
      <View style={styles.common}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6a51ae"
        />
        <View style={styles.header}>
          <Text style={styles.subHeading}>
            My Courses
          </Text>
        </View>
        {this.state.courses.length === 0 ? (<Text>You are not registered for any courses</Text>): ''}
        {this.state.courses.map((course, index) => (
          <TouchableOpacity onPress={() => this.props.navigation.navigate('group', {courseId: course.courseId})}>
            <Surface style={[styles.courseBox, index%2 === 0 ? styles.box1 : styles.box2]}>
              <Text style={styles.courseTitle}>
                {course.courseId}
              </Text>
              <Text style={styles.courseDescription}>
                Name: {"\n"}
                {course.name} {"\n"} {"\n"}
                Professor:{"\n"}
                {course.prof}
              </Text>
            </Surface>
          </TouchableOpacity>
        ))}
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
  subHeading: {
    color: '#ddd',
    marginTop: 15,
    textAlign: 'center',
    width: '100%',
    fontSize: 17
  },
  courseBox: {
    width: 250,
    height: 150,
    borderRadius: 10,
    margin: 15,
    alignSelf: 'center',
    elevation: 4
  },
  courseTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    padding: 10
  },
  courseDescription: {
    color: '#fff',
    textAlign: 'left',
    paddingHorizontal: 10
  },
  box1: {
    backgroundColor: '#4a90e2'
  },
  box2: {
    backgroundColor: '#F5A623'
  }
});