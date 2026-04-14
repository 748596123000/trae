import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock AI responses
const mockAIResponses = [
  '根据你的预算和兴趣，我推荐你在成都的3天行程中，第一天去熊猫基地和宽窄巷子，第二天去青城山和都江堰，第三天去武侯祠和春熙路。这样可以兼顾自然景观和文化体验。',
  '对于大理的行程，我建议你安排2天时间环洱海骑行，1天游览大理古城和崇圣寺三塔。住宿可以选择在古城附近，方便出行。',
  '厦门的最佳旅行时间是春季和秋季，建议你安排2天时间，一天游览鼓浪屿，一天在市区逛逛沙坡尾和曾厝垵。',
];

const AIAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: '你好！我是你的AI旅行助手，有什么可以帮你的吗？',
      sender: 'ai',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
    };
    setMessages([...messages, userMessage]);
    setInputText('');
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)],
        sender: 'ai',
      };
      setMessages([...messages, userMessage, aiResponse]);
      setLoading(false);
      // Scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1500);
  };

  const renderMessage = (message: { id: string; text: string; sender: 'user' | 'ai' }) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.sender === 'user' ? styles.userMessageContainer : styles.aiMessageContainer,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          message.sender === 'user' ? styles.userMessageBubble : styles.aiMessageBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            message.sender === 'user' ? styles.userMessageText : styles.aiMessageText,
          ]}
        >
          {message.text}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map(renderMessage)}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#3B82F6" />
            <Text style={styles.loadingText}>AI正在思考...</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="输入你的问题，例如：成都3天怎么玩？"
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim() || loading}
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  aiMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
  },
  userMessageBubble: {
    backgroundColor: '#3B82F6',
    borderBottomRightRadius: 4,
  },
  aiMessageBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: 'white',
  },
  aiMessageText: {
    color: '#333',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#3B82F6',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#a3c7ff',
  },
});

export default AIAssistantPage;