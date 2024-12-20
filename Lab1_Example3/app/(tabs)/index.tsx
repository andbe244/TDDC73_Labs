import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}></View>

      <View style={styles.headerContainer}>
        <Text style={styles.header}>Example 3: React-Native</Text>
      </View>

      <View style={styles.iconCircle}>
        <Image source={require('../../assets/images/image1.png')} style={styles.icon} />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>BUTTON</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>BUTTON</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>BUTTON</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>BUTTON</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.emailContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          placeholderTextColor="#cccccc"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer: {
    backgroundColor: '#008080',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  headerContainer: {
    backgroundColor: '#20b2aa',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  iconCircle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 60,
  },
  icon: {
    width: 100,
    height: 100,
    margin: 5,
  },
  buttonContainer: {
    marginBottom: 30,
    paddingHorizontal: 60,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ddd',
    padding: 10,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  phText:{
    color: '#999999'
  },
  input: {
    width: '80%',
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
});
