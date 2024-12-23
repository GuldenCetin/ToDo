import React, { useState } from 'react';
import {View, Text, StyleSheet, Modal, TextInput } from 'react-native';
import styles from './Card.styles';
import Button from '../Button/Button';

const Card = ({ item, editTodo, deleteTodo }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [newText, setNewText] = useState(item.text);
  
    const handleEdit = () => {
      editTodo(item.id, newText);
      setModalVisible(false);
    };
  
    return (
      <View style={styles.todoItem}>
        <Text style={styles.todoText}>{item.text}</Text>
        <View style={styles.buttons}>
          <Button title={"Düzenle"} onPress={() => setModalVisible(true)} />
          <Button title={"Sil"} onPress={() => deleteTodo(item.id)} />
        </View>
  
        {/* Modal */}
        <Modal  animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalView}>

            <TextInput style={styles.input} value={newText} onChangeText={setNewText}  />

            <Button title={"Kaydet"} onPress={handleEdit} />
          </View>
        </Modal>
      </View>
    );
  };

export default Card;