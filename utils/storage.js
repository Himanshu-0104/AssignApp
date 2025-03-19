import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeMessages = async (chatId, messages) => {
  await AsyncStorage.setItem(`chat-${chatId}`, JSON.stringify(messages));
};

export const getMessages = async (chatId) => {
  const messages = await AsyncStorage.getItem(`chat-${chatId}`);
  return messages ? JSON.parse(messages) : [];
};
