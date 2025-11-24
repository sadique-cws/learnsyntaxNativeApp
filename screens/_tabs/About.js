import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const About = () => {
  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '700', color: '#7C3AED' }}>About LearnSyntax</Text>
      <Text style={{ marginTop: 8, color: '#666' }}>LearnSyntax is a mobile-first platform where learners and educators meet. We offer high-quality, instructor-led courses aimed at helping you land your next role or build your next product.</Text>
      <Text style={{ marginTop: 12, fontWeight: '600' }}>Our Mission</Text>
      <Text style={{ marginTop: 8, color: '#666' }}>To make technical education accessible and affordable to learners around the world.</Text>
    </ScrollView>
    </SafeAreaView>
  )
}

export default About