import * as React from 'react';
import  { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { BottomNavigation, List, Button } from 'react-native-paper';
import { GiftedChat } from 'react-native-gifted-chat';
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

class DiscussionRoute extends React.Component {
  state = {
    messages: []
  };

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hey guys can you help me with some doubts?",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Sabrina A.",
          }
        }
      ]
    });
  }


  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return(
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}

class MeetingsRoute extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pastMeetings: [],
      upcomingMeetings: [],
    };
  }

  render() {
    return(
      <ScrollView>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6a51ae"
        />
        <View style={styles.container}>
          <Text style={styles.pageTitle}>
            Group 1
          </Text>
          <Text style={styles.courseText}>
            Course: CS5200
          </Text>
        </View>
        <List.Section>
          <List.Accordion
            title="Past Meetings"
          >
            <List.Item title="First item" />
          </List.Accordion>

          <List.Accordion
            title="Upcoming Meetings"
          >
            <List.Item title="First item" />
          </List.Accordion>
        </List.Section>
        <View style={styles.createMeetingButton}>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('createMeeting')}>
            Create New Meeting
          </Button>
        </View>
      </ScrollView>
    )
  }
}

export default class Discussion extends React.Component {

  constructor(props) {
    super(props);
    navigation = props.navigation;
    this.state = {
      index: 0,
      routes: [
        { key: 'discussion', title: 'Discussion', icon: 'message' },
        { key: 'meeting', title: 'Meetings', icon: 'timer' },
      ],
    };
  }

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    discussion: DiscussionRoute,
    meeting: MeetingsRoute,
  });

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
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#3b5b66'
  },
  chatPage:{
  },
  returnButton: {
    padding: 10,
  },
  courseText: {
    fontSize: 10,
    textAlign: 'left',
    color: '#fff'
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
    padding: 10,
    marginTop: 40
  },
});