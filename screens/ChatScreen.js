import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Text } from 'react-native';
import ChatBubble from '../components/ChatBubble';
import { storeMessages, getMessages } from '../utils/storage';

export default function ChatScreen({ route, user }) {
  const { chatUser } = route.params;
  const chatId = [user, chatUser].sort().join('-');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const loadMessages = async () => {
      const msgs = await getMessages(chatId);
      setMessages(msgs);
    };
    loadMessages();
  }, [chatId]);

  const sendMessage = async () => {
    if (input.trim() === '') return;
    const newMessage = { sender: user, text: input, timestamp: new Date().toISOString() };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    await storeMessages(chatId, updatedMessages);
    setInput('');
  };

  return (
    <View style={{ flex: 1, marginVertical: 10 }}>
      <FlatList
        data={messages}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <ChatBubble
            message={item.text}
            isSender={item.sender === user}
            timestamp={item.timestamp}
          />
        )}
      />
      <View style={{ flexDirection: 'row', padding: 10,justifyContent: 'space-between'  }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderRadius: 20, paddingHorizontal: 15 }}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={sendMessage} style={{ padding: 10, justifyContent: 'center',opacity: input.trim() === '' ? 0.5 : 1, }}  disabled={input.trim() === ''}>
          <Text style={{ color: 'blue',fontSize: 18, borderWidth : 2, borderRadius: 25, paddingVertical: 5 ,paddingHorizontal: 25,fontWeight: 'bold', backgroundColor: '#808080', }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
