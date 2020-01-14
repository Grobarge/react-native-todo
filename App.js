import React from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';

//Components 

import Header from './Components/Header';
import InputBar from './Components/InputBar';
import TodoItem from './Components/TodoItem';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      todoInput: '',
      todos: [
        // Dummy Data
        { id: 0, title: 'Listen to some Jerry Garcia', done: true },
        { id: 1, title: 'Code', done: true },
        { id: 2, title: 'Watch Live PD', done: false },
        { id: 3, title: 'Eat', done: false },
        { id: 4, title: 'Drink Coffee', done: false },
        { id: 5, title: 'Fix the Sink', done: false },
        { id: 6, title: 'Do the dishes', done: true }
      ]
    }
  }

  // Lifecylce method to set the state of a todo item
  addNewTodo() {
    let todos = this.state.todos;
    // unshift will add most recent todo to the beggining
    todos.unshift({
      id: todos.length + 1,
      title: this.state.todoInput,
      done: false
    });

    this.setState({
      todos,
      todoInput: ''
    });
  }

  // Sets an opacity on the item when clicked done
  toggleDone(item) {
    let todos = this.state.todos;


    todos = todos.map((todo) => {
      if (todo.id == item.id) {
        todo.done = !todo.done;
      }

      return todo;
    })

    this.setState({ todos });
  }

  // Removes an item (todo) from the list 
  removeTodo(item) {
    let todos = this.state.todos;

    todos = todos.filter((todo) => todo.id !== item.id);

    this.setState({ todos });
  }


  render() {
    // checking which platform , if ios display the statusbar component
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;


    return (
      <View style={styles.container}>
        {statusbar}

        <Header title="My Todos" />

        <InputBar
          textChange={todoInput => this.setState({ todoInput })}
          addNewtodo={() => this.addNewTodo()}
          todoInput={this.state.todoInput}
        />
        <FlatList
          data={this.state.todos}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <TodoItem todoItem={item}
                toggleDone={() => this.toggleDone(item)}
                removeTodo={() => this.removeTodo(item)}

              />
            )
          }}
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
