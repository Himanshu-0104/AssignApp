import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import UserDropdown from '../components/UserDropdown';
import ChatList from '../components/ChatList';

export default function Home({ navigation, currentUser, setUser }) {

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <Text style={styles.title}>AssignApp</Text>
        <UserDropdown
          user={currentUser}
          setUser={setUser}
        />
      </View>

      <ChatList navigation={navigation} currentUser={currentUser} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: '#fff',
    elevation: 3,
    zIndex: 999,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
