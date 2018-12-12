import React from 'react';
import { Surface } from 'react-native-paper';
import  { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: false
    };
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
            My Courses
          </Text>
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('group')}>
          <Surface style={[styles.courseBox, styles.box1]}>
            <Text style={styles.courseTitle}>
              CS 5340
            </Text>
            <Text style={styles.courseDescription}>
              Name: {"\n"}
              Computer/Human Interaction {"\n"} {"\n"}
              Professor:{"\n"}
              Jorge Toro
            </Text>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('group')}>
          <Surface style={[styles.courseBox, styles.box2]}>
            <Text style={styles.courseTitle}>
              CS 5200
            </Text>
            <Text style={styles.courseDescription}>
              Name: {"\n"}
              Database Management {"\n"} {"\n"}
              Professor:{"\n"}
              Jose Annunziato
            </Text>
          </Surface>
        </TouchableOpacity>
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