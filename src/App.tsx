import React, { useState } from 'react';
import { SafeAreaView,View,Text,FlatList} from 'react-native';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import Card from './components/Card/Card';
import styles from './components/styles'



const App = () => {

  const [text, setText] = useState('');
  const [todos, setTodos] = useState<{ id: string, text: string }[]>([]);

  const addTodo = () => {
    if (text.trim()) {
      setTodos([...todos, { id: Date.now().toString(), text }]);
      setText('');
    }
  };

  const deleteTodo = (id:string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id:string, newText:string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const renderItem = ({ item }: { item: { id: string, text: string } }) => (
    <Card item={item} editTodo={editTodo} deleteTodo={deleteTodo} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>ToDo Listesi</Text>
      <View style={styles.inputContainer}>
      <Input value={text} onType={setText}/>
      <Button onPress={addTodo} title={"Ekle"}/>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};


export default App;
