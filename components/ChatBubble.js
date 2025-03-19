import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChatBubble({ message, isSender, timestamp }) {
  return (
    <View style={[styles.bubble, isSender ? styles.sender : styles.receiver]}>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.timestamp}>{timestamp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
    maxWidth: '80%',
  },
  sender: {
    backgroundColor: '#E1F5FE',
    alignSelf: 'flex-end',
  },
  receiver: {
    backgroundColor: '#FAEBD7',
    alignSelf: 'flex-start',
  },
  message: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 10,
    color: '#555',
    alignSelf: 'flex-end',
  },
});
