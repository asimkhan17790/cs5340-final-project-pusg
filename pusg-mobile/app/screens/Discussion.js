import * as React from 'react';
import  { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BottomNavigation, List, Button } from 'react-native-paper';
import { GiftedChat } from 'react-native-gifted-chat'

let navigation = '';

class DiscussionRoute extends React.Component {
  state = {
    messages: []
  };

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "I think we passed the first step of the tutorial. We will now need a Pusher account!",
          createdAt: new Date(),
          user: {
            _id: 1,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
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
      <ScrollView style={styles.chatPage}>
        <Text style={styles.pageTitle}>
          Group 1
        </Text>
        <Text style={styles.courseText}>
          Course: CS5200
        </Text>
        <GiftedChat messages={this.state.messages} />
      </ScrollView>
    )
  }
}

class MeetingsRoute extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      pastMeetings: [],
      upcomingMeetings: [],
    };
  }

  render() {
    return(
      <ScrollView>
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