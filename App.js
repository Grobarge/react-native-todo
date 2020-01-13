import React from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import Header from './Components/Header';
import InputBar from './Components/InputBar';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      todoInput: '',
      todos: [
        { id: 0, title: 'Take Out the trash', done: false },
        { id: 1, title: 'Cook dinner', done: false }
      ]
    }
  }

  addNewTodo() {
    let todos = this.state.todos;

    todos.unshift({
      id: todos.length + 1,
      todo: this.state.todoInput,
      done: false
    });

    this.setState({
      todos,
      todoInput: ''
    });
  }




  render() {
    // checking which platform , if ios display the statusbar component
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;


    return (
      <View style={styles.container}>
        {statusbar}

        <Header title="Shit to do" />

        <InputBar
          textChange={todoInput => this.setState({ todoInput })}
          addNewtodo={() => this.addNewTodo()}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  statusbar: {
    backgroundColor: 'black',
    height: 45
  }
});
