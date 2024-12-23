import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator, View} from 'react-native';
import styles from './Button.styles';

const Button = ({ title, onPress, theme = 'primary' }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };
  
export default Button;
