import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { USERS } from '../utils/users';
import { getMessages } from '../utils/storage';

export default function ChatList({ navigation, currentUser }) {
  const [sortedChatList, setSortedChatList] = useState([]);

  useEffect(() => {
    const sortChatsByRecent = async () => {
      const chatPartners = USERS.filter(u => u !== currentUser);

      const chatsWithTimestamp = await Promise.all(chatPartners.map(async (user) => {
        const chatId = [currentUser, user].sort().join('-');
        const msgs = await getMessages(chatId);

        const latestMessage = msgs[msgs.length - 1];

        return {
          user,
          timestamp: latestMessage ? new Date(latestMessage.timestamp) : new Date(0), // fallback old date if no msgs
        };
      }));

      // Sort chats by timestamp descending (most recent first)
      chatsWithTimestamp.sort((a, b) => b.timestamp - a.timestamp);

      setSortedChatList(chatsWithTimestamp.map(chat => chat.user));
    };

    sortChatsByRecent();

    const unsubscribe = navigation.addListener('focus', sortChatsByRecent);
    return unsubscribe;
  }, [currentUser, navigation]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={sortedChatList}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate('ChatScreen', { chatUser: item })}
          >
            <Text style={styles.chatName}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chatItem: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  chatName: {
    fontSize: 18,
  },
});
