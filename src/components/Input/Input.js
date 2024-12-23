import React from 'react'
import { TextInput,View } from 'react-native'
import styles from './Input.styles'

const Input = ({value,onType})=>{
    return(
        <View>
            <TextInput
             style={styles.input}
             placeholder="Yeni bir görev ekle..."
             value={value}
             onChangeText={onType}
            />
        </View>
    )
}

export default Input;