import { useState } from 'react';
import { View, Text, Pressable, Modal, Switch, Alert } from 'react-native';
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function Task(props) {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  }

  const handleStatusChangePress = () => {
    props.onStatusChange(props.task.id);
  }

  const handleRemovePress = () => {
    Alert.alert(
      'Remove Task',
      'This action will permanently delete this task. This action cannot be undone!', [
      {
        text: 'Confirm',
        onPress: () => {
          props.onTaskRemoval(props.task.id);
          setShowModal(false);
        }
      },
      {
        text: 'Cancel'
      }
    ]);
  }

  return (
    <>
      <Pressable onPress={handleModalToggle}>
        <View style={styles.container}>
          <Text style={styles.title}>{props.task.description}</Text>
          <Text style={styles.text}>Id: {props.task.id}</Text>
          <Text style={styles.text}>Status: {props.task.done ? 'Completed' : 'Open'}</Text>
        </View>
      </Pressable>

      <Modal visible={showModal} transparent={true}>
        <View style={styles.modal.container}>
          <View style={styles.modal.box}>

            {/* Close Modal */}
            <Pressable onPress={handleModalToggle}>
              <View style={styles.close.container}>
                <AntDesign name="closesquare" size={25} color="#c00" />
                <Text style={styles.close.text}>Close</Text>
              </View>
            </Pressable>

            {/* Task Description */}
            <Text style={styles.title}>{props.task.description}</Text>

            <View style={styles.options}>

              {/* Change Status */}
              <View style={styles.switch.container}>
                <Switch
                  value={props.task.done}
                  onValueChange={handleStatusChangePress}
                />
                <Pressable onPress={handleStatusChangePress}>
                  <Text style={styles.switch.label}>Toggle Status</Text>
                </Pressable>
              </View>

              {/* Remove Button */}
              <View style={styles.remove.container}>
                <Pressable onPress={handleRemovePress}>
                  <MaterialIcons name='delete-sweep' size={32} style={styles.remove.icon} />
                  <Text style={styles.remove.label}>Remove</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}