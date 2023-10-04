import { useState } from 'react';
import { View, Text, TextInput, Switch, Button, Keyboard } from 'react-native';
import styles from './styles';

export default function Form(props) {
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDone, setTaskDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleAddPress = () => {
    if (taskDescription) {
      props.onAddTask(taskDescription, taskDone);

      setErrorMessage(null);
      setTaskDescription('');
      setTaskDone(false);

      Keyboard.dismiss();
    }
    else {
      setErrorMessage('The description is required.');
    }
  }

  const handleDescriptionChange = (value) => {
    setTaskDescription(value);
  }

  const handleStatusChange = (value) => {
    setTaskDone(value);
  }

  return (
    <View style={styles.container}>
      {errorMessage && (
        <View style={styles.errorMessage.container}>
          <Text style={styles.errorMessage.label}>Attention:</Text>
          <Text style={styles.errorMessage.text}>{errorMessage}</Text>
        </View>
      )}

      <Text style={styles.label}>Description:</Text>
      <TextInput
        maxLength={150}
        onChangeText={handleDescriptionChange}
        defaultValue={taskDescription}
        style={styles.textbox}
      />

      <View style={styles.switch.container}>
        <Switch
          value={taskDone}
          onValueChange={handleStatusChange}
        />
        <Text style={styles.switch.label}>Completed</Text>
      </View>

      <Button
        title='Add'
        onPress={handleAddPress}
      />
    </View>
  );
}