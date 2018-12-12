import React from 'react';
import { Surface, Button } from 'react-native-paper';
import  { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

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
      <ScrollView style={styles.common}>
        <View style={styles.header}>
          <Text style={styles.subHeading}>
            CS5340
          </Text>
          <Text style={styles.courseDescription}>
            Name: Human/Computer Interaction {"\n"}
            Professor: Jorge Toro
          </Text>
        </View>
        <View style={{flexDirection: 'row', margin: 10}}>
          <View style={{backgroundColor: '#444', height: 1, flex: 1, alignSelf: 'center'}} />
          <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 14 }}>  My Groups  </Text>
          <View style={{backgroundColor: '#444', height: 1, flex: 1, alignSelf: 'center'}} />
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('discussion')}}>
            <Surface style={[styles.groupBox, styles.box1]}>
              <Text style={styles.groupName}>
               Group 1
              </Text>
            </Surface>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {this.props.navigation.navigate('discussion')}}>
            <Surface style={[styles.groupBox, styles.box2]}>
              <Text style={styles.groupName}>
                Group 2
              </Text>
            </Surface>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', margin: 10}}>
          <View style={{backgroundColor: '#888', height: 1, flex: 1, alignSelf: 'center'}} />
          <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 14, color: '#555' }}>  Other Groups  </Text>
          <View style={{backgroundColor: '#888', height: 1, flex: 1, alignSelf: 'center'}} />
        </View>

        <View style={{flexDirection: 'row', marginHorizontal: 10, alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={{textAlign: 'left', fontSize: 16, marginTop: 7, color: '#3b5b66'}}>
            Group 3
          </Text>
          <View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
            <Button mode="outlined">
              Join
            </Button>
          </View>
        </View>
        <View style={{flexDirection: 'row', margin: 10, marginTop: 20}}>
          <View style={{backgroundColor: '#999', height: 1, flex: 1, alignSelf: 'center'}} />
        </View>
        <View style={styles.createGroupButton}>
          <Button
            mode="contained"
            onPress={() => this.props.navigation.navigate('createGroup')}>
            Create New Study Group
          </Button>
        </View>
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