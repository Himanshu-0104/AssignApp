import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { USERS } from '../utils/users';

export default function UserDropdown({ user, setUser }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.dropdownContainer}>
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        value={user}
        setValue={setUser}
        items={USERS.map((u) => ({ label: u, value: u }))}
        dropDownDirection="BOTTOM"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 130,
    zIndex: 1000,
  },
});
