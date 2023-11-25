import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Header from './src/components/Header/Header';
import Tasks from './src/components/Tasks/Tasks';
import Form from './src/components/Form/Form';
import styles from './src/styles/main';
import uuid from 'react-uuid';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { initializeApp } from 'firebase/app'
import { get, getDatabase, ref, set,push,remove,transaction,runTransaction } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBy3C8_iJDxVMSBWnsPgLyw4Dr3SfPoOIo",
  authDomain: "task-management---rn-de8ba.firebaseapp.com",
  databaseURL: "https://task-management---rn-de8ba-default-rtdb.firebaseio.com",
  projectId: "task-management---rn-de8ba",
  storageBucket: "task-management---rn-de8ba.appspot.com",
  messagingSenderId: "743996193593",
  appId: "1:743996193593:web:ecb67d1410f8dde67c06e8"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Creates the tab navigator object.
const Tab = createBottomTabNavigator();

export default function App() {
  const [tasks, setTasks] = useState(
    [
    ]
  );

  useEffect(() => {
    const db = getDatabase();
    const re = ref(db, 'tasks/');
    get(re).then((snapshot) => {
      const data = snapshot.val();
      if(data){
        setTasks(Object.values(data))
      }
    });
  }, []);

  // Include a new task to the list.
  const handleAddTask = (taskDescription, taskDone) => {
    const db = getDatabase();
    const tasksRef = ref(db, 'tasks/');
    const newTaskRef = push(tasksRef);
    set(newTaskRef, {
      id: newTaskRef.key,
      description: taskDescription,
      done: taskDone
    });
    
    get(tasksRef).then((snapshot) => {
      const data = snapshot.val();
      const tasks = Object.values(data);
      setTasks(tasks);
    });
  
  }

  // Toggles the status of a task.
  const handleStatusChange = (id) => {
    const db = getDatabase();
    const re = ref(db, `tasks/${id}`);
    runTransaction(re, (currentData) => {
      if (!currentData) return currentData;
      return { ...currentData, done: !currentData.done };
    }).then(() => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) => {
          if (task.id === id) {
            return { ...task, done: !task.done };
          }
          return task;
        });
        return updatedTasks;
      });
    });
  };
  

  // Remove a task.
  const handleTaskRemoval = (id) => {
    const db = getDatabase();
    const re = ref(db, `tasks/${id}`);
    remove(re).then(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    });
  }

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Header />

        <Tab.Navigator>
          <Tab.Screen name='List' options={{
            headerShown: false,
            title: 'List Tasks',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name='list-ul' size={size} color={color} />
            )
          }}>
            {(props) => (
              <Tasks {...props} tasks={tasks} onStatusChange={handleStatusChange} onTaskRemoval={handleTaskRemoval} />
            )}
          </Tab.Screen>
          <Tab.Screen name='Add' options={{
            title: 'Add Task',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#008080'
            },
            tabBarIcon: ({ color, size }) => (
              <Entypo name='add-to-list' size={size} color={color} />
            )
          }}>
            {(props) => (
              <Form {...props} onAddTask={handleAddTask} />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}
