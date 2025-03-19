import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { USERS } from '../utils/users';

export default function ChatList({ navigation, currentUser }) {
  const chatList = USERS.filter((u) => u !== currentUser);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={chatList}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ChatScreen', { chatUser: item })}
          >
            <Text style={{ padding: 20, fontSize: 18 }}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
