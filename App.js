
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView
} from 'react-native';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [business, setBusiness] = useState('');
  const [services, setServices] = useState('');
  const [price, setPrice] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [savedBusiness, setSavedBusiness] = useState('');
  const [savedServices, setSavedServices] = useState('');
  const [savedPrice, setSavedPrice] = useState('');
  const [data, setData] = useState([]);

  const btn = (label, action) => (
    <TouchableOpacity style={styles.button} onPress={action}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  const field = (value, change, placeholder) => (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={change}
      placeholder={placeholder}
      placeholderTextColor="#999"
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.logo}>🤖 Meggi AI</Text>
          <Text style={styles.tagline}>Business Assistant</Text>
        </View>

        <View style={styles.content}>
          {screen === 'home' && (
            <>
              <Text style={styles.title}>Welcome to Meggi AI!</Text>
              <Text style={styles.subtitle}>
                Your Smart Business Assistant
              </Text>
              {btn('🎙️ AI Assistant', () => setScreen('assistant'))}
              {btn('⚙️ Admin Panel', () => setScreen('admin'))}
              {btn('🏢 My Business', () => setScreen('business'))}
              {btn('💬 Questions & Answers', () => setScreen('answers'))}
              {btn('⭐ Premium ₹111/month', () => setScreen('premium'))}
            </>
          )}

          {screen === 'admin' && (
            <>
              <Text style={styles.title}>⚙️ Admin Panel</Text>
              <Text style={styles.subtitle}>
                Manage your own business
              </Text>
              {btn('🏢 Business Details', () => setScreen('business'))}
              {btn('💬 Add Questions & Answers', () => setScreen('answers'))}
              {btn('📋 View Saved Information', () => setScreen('saved'))}
              {btn('← Home', () => setScreen('home'))}
            </>
          )}

          {screen === 'business' && (
            <>
              <Text style={styles.title}>🏢 My Business</Text>
              <Text style={styles.label}>Business Name</Text>
              {field(business, setBusiness, 'Enter business name')}
              <Text style={styles.label}>Services</Text>
              {field(services, setServices, 'Enter your services')}
              <Text style={styles.label}>Price / Charges</Text>
              {field(price, setPrice, 'Enter your prices')}
              {btn('💾 Save Business Details', () => {
                if (!business.trim()) return alert('Enter business name');
                setSavedBusiness(business);
                setSavedServices(services);
                setSavedPrice(price);
                alert('Business details saved!');
              })}
              {btn('← Back', () => setScreen('admin'))}
            </>
          )}

          {screen === 'answers' && (
            <>
              <Text style={styles.title}>💬 Questions & Answers</Text>
              <Text style={styles.label}>Customer Question</Text>
              {field(question, setQuestion, 'What does customer ask?')}
              <Text style={styles.label}>Your Professional Answer</Text>
              <TextInput
                style={[styles.input, {height: 110}]}
                value={answer}
                onChangeText={setAnswer}
                placeholder="Enter your professional answer"
                placeholderTextColor="#999"
                multiline
              />
              {btn('💾 Save Answer', () => {
                if (!question.trim() || !answer.trim()) {
                  return alert('Fill both fields');
                }
                setData([...data, {question, answer}]);
                setQuestion('');
                setAnswer('');
                alert('Answer saved successfully!');
              })}
              {btn('📋 View All Answers', () => setScreen('saved'))}
              {btn('← Back', () => setScreen('admin'))}
            </>
          )}

          {screen === 'saved' && (
            <>
              <Text style={styles.title}>📋 Saved Information</Text>
              <Text style={styles.label}>Business: {savedBusiness || 'Not added'}</Text>
              <Text style={styles.label}>Services: {savedServices || 'Not added'}</Text>
              <Text style={styles.label}>Prices: {savedPrice || 'Not added'}</Text>
              <Text style={styles.subtitle}>Your Questions & Answers:</Text>
              {data.length === 0 ? (
                <Text style={styles.label}>No answers added yet.</Text>
              ) : data.map((item, index) => (
                <View key={index} style={styles.savedCard}>
                  <Text style={styles.label}>Q: {item.question}</Text>
                  <Text style={styles.subtitle}>A: {item.answer}</Text>
                </View>
              ))}
              {btn('← Back', () => setScreen('admin'))}
            </>
          )}

          {(screen === 'assistant' || screen === 'premium') && (
            <>
              <Text style={styles.title}>
                {screen === 'assistant' ? '🎙️ AI Assistant' : '⭐ Premium Plan'}
              </Text>
              <Text style={styles.subtitle}>
                {screen === 'assistant'
                  ? 'Voice AI integration is our next step.'
                  : '7 Days Free Trial | ₹111/month'}
              </Text>
              {btn('← Home', () => setScreen('home'))}
            </>
          )}
        </View>
      </ScrollView>
      <Text style={styles.footer}>Powered by Meggi AI ❤️</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#101329' },
  header: {
    backgroundColor: '#25265B',
    padding: 25,
    paddingTop: 40,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },
  logo: { color: 'white', fontSize: 30, fontWeight: 'bold' },
  tagline: { color: '#C8C9FF', marginTop: 8 },
  content: { padding: 20 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold', marginVertical: 15 },
  subtitle: { color: '#C0C2D8', marginVertical: 12 },
  label: { color: 'white', fontSize: 15, marginTop: 12 },
  input: {
    backgroundColor: 'white',
    color: '#111',
    borderRadius: 10,
    padding: 14,
    marginTop: 10,
    fontSize: 15
  },
  button: {
    backgroundColor: '#755BFF',
    padding: 17,
    borderRadius: 12,
    marginVertical: 8
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  savedCard: {
    backgroundColor: '#252744',
    padding: 15,
    borderRadius: 12,
    marginVertical: 8
  },
  footer: { color: '#999', textAlign: 'center', padding: 15 }
});
