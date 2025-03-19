

# Chat App (Frontend Only)

A simple **Chat App** built with **React Native** and **Expo**. 
This app allows users to switch between different logged-in users and chat individually, storing chat history locally using AsyncStorage.


##  Features

-  **User Selection**: Dropdown in header (top-right) to select the active user.
-  **One-on-One Chat**: Send and receive messages based on the selected user.
-  **Message Persistence**: Chat history stored locally using `AsyncStorage`.
-  **Basic Chat UI**: Chat bubbles, timestamps, and easy-to-use interface.


##  Screenshots




##  Technologies Used

- **React Native**
- **Expo**
- **AsyncStorage**
- **React Navigation**
- **react-native-dropdown-picker**


##  Project Structure

```
ChatApp/
├── App.js
├── components/
│   ├── ChatBubble.js
│   ├── ChatList.js
│   └── UserDropdown.js
├── screens/
│   ├── ChatScreen.js
│   └── HomeScreen.js
└── utils/
    ├── storage.js
    └── users.js
```



##  Installation & Setup

### Step 1: Clone the repository
```bash
git clone <>
cd AssignApp
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Run the app
```bash
npm start
```

- Scan the QR code with your phone’s Expo Go App or use an emulator.



##  Usage

- **Select Active User**: Use the dropdown at the top-right to switch between users.
- **View Chats**: Click on any chat to view or send messages.
- **Send Messages**: Type in the message input and press the Send button.
- **Unread Indicator**: New messages from other users show a green dot in the chat list.



##  Requirements

- Node.js (v14 or above)
- Expo CLI (`npm install -g expo-cli`)
- Expo Go App or Android/iOS emulator



##  Author

- **[Himanshu-0104](https://github.com/Himanshu-0104)**  



