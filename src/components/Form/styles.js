import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    padding: 20
  },
  label: {
    color: '#777',
    fontSize: 16
  },
  textbox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bcbcbc',
    paddingVertical: 7,
    paddingHorizontal: 14,
    fontSize: 16
  },
  switch: {
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 5,
      marginBottom: 20
    },
    label: {
      color: '#777',
      fontSize: 16,
      marginRight: 10
    }
  },
  errorMessage: {
    container: {
      backgroundColor: '#fff',
      padding: 10,
      marginBottom: 30,
      borderColor: '#c00',
      borderWidth: 1,
      borderLeftWidth: 8
    },
    label: {
      color: '#c00',
      fontSize: 14,
      fontWeight: 'bold'
    },
    text: {
      color: '#c00',
      fontSize: 16
    }
  }
});

export default styles;