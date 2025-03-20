import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Text, StyleSheet, SafeAreaView, StatusBar, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ChatBubble from '../components/ChatBubble';
import { storeMessages, getMessages } from '../utils/storage';

export default function ChatScreen({navigation, route, user }) {
  const chatUser = route.params.chatUser;
  const chatId = [user, chatUser].sort().join('-');

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const msgs = await getMessages(chatId);
    setMessages(msgs);
  };

  const sendMessage = async (content, type = 'text') => {
    if (!content || (!content.trim() && type === 'text')) return; 
  
    const newMessage = {
      sender: user,
      content,
      type,
      timestamp: new Date().toLocaleTimeString(),
    };
  
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    await storeMessages(chatId, updatedMessages);
    setInput('');
  };
   

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
    });

    if (!result.cancelled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      sendMessage(imageUri, 'image');
    }
  };

  const renderMessageItem = ({ item }) => {
    return <ChatBubble content={item.content} type={item.type} isSender={item.sender === user} timestamp={item.timestamp} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.backButtonText}>⬅</Text>
          <Text style={{fontSize:17}}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{chatUser}</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item, index) => ( item.timestamp.toString() + index.toString()) } 
        renderItem={renderMessageItem}
        contentContainerStyle={{ padding: 10 }}
      />


      <View style={styles.inputContainer}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between',maxHeight: 40, borderWidth: 1, borderRadius: 20, paddingHorizontal: 15 }}>
          <TextInput
            style={{ flex: 0.65, paddingVertical: 10 }}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
          />
          <TouchableOpacity  onPress={pickImage}>
            <Text style={{fontSize: 26}}>📎</Text>
          </TouchableOpacity>
        </View>



        <TouchableOpacity onPress={() => sendMessage(input.trim(), 'text')}  style={{ padding: 10, justifyContent: 'center',opacity: input.trim() === '' ? 0.5 : 1, }}  disabled={input.trim() === ''}>
          <Text  style={styles.sendButton}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
  },
  sendButton: {
    color: 'blue',
    fontSize: 18, 
    borderWidth : 2,
    borderRadius: 25, 
    paddingVertical: 5 ,
    paddingHorizontal: 25,
    fontWeight: 'bold',
    backgroundColor: '#808080',
  },
  backButtonText: {
    paddingBottom: 14,
    fontSize: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingRight: 8,
  },
});