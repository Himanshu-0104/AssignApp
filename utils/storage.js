import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeMessages = async (chatId, messages, currentUser) => {
  const updatedMessages = messages.map(msg => ({
    ...msg,
    unread: msg.sender !== currentUser ? true : false,
  }));

  await AsyncStorage.setItem(`chat-${chatId}`, JSON.stringify(updatedMessages));
};

export const getMessages = async (chatId) => {
  const messages = await AsyncStorage.getItem(`chat-${chatId}`);
  return messages ? JSON.parse(messages) : [];
};
