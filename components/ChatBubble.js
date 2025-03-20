import React from 'react';
import { View, Text, StyleSheet, Linking, Image } from 'react-native';

export default function ChatBubble({ content, type, isSender, timestamp }) {
  if (!content) {
    return null;
  }

  const renderMessage = (text) => {
    const urlRegex = /(https?:\/\/[^\sHh]+)/gi;
    if (typeof text !== 'string') return null; 
    const parts = text.split(urlRegex);

    return parts.map((part, index) =>
      urlRegex.test(part) ? (
        <Text
          key={index}
          style={styles.link}
          onPress={() => Linking.openURL(part)}
        >
          {part}
        </Text>
      ) : (
        <Text key={index} style={styles.message}>
          {part}
        </Text>
      )
    );
  };

  return (
    <View style={[styles.bubble, isSender ? styles.sender : styles.receiver]}>
      {type === 'image' ? (
        <Image source={{ uri: content }} style={styles.sharedImage} />
      ) : (
        <Text>{renderMessage(content)}</Text>
      )}
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
    color: '#000',
  },
  link: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  timestamp: {
    fontSize: 10,
    color: '#555',
    alignSelf: 'flex-end',
  },
  sharedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 5,
  },
});