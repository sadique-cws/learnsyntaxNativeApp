import React, { useContext, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions, ImageBackground } from 'react-native'
import { CartContext } from '../App'
import { COLORS, SIZES } from '../constants/theme'
import Feather from '@expo/vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

const { width } = Dimensions.get('window')

const CourseDetail = ({ route }) => {
  const { course } = route.params
  const { addItem } = useContext(CartContext)
  const navigation = useNavigation()
  const [activeTab, setActiveTab] = useState('About')

  const tabs = ['About', 'Curriculum', 'Reviews']

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Hero Image */}
        <ImageBackground source={{ uri: course.image }} style={{ width: '100%', height: 300, justifyContent: 'flex-end' }}>
          <View style={styles.overlay}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{course.level}</Text>
            </View>
            <Text style={styles.title}>{course.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <Feather name="star" size={16} color={COLORS.warning} />
              <Text style={{ color: COLORS.white, marginLeft: 4, fontWeight: 'bold' }}>{course.rating} (1.2k Reviews)</Text>
            </View>
          </View>
        </ImageBackground>

        {/* Content */}
        <View style={{ padding: 24 }}>
          {/* Instructor */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
            <Image source={{ uri: 'https://i.pravatar.cc/100?img=3' }} style={{ width: 48, height: 48 }} />
            <View style={{ marginLeft: 12 }}>
              <Text style={{ color: COLORS.text, fontWeight: 'bold', fontSize: 16 }}>Dr. Angela Yu</Text>
              <Text style={{ color: COLORS.textSecondary }}>Lead Instructor</Text>
            </View>
          </View>

          {/* Tabs */}
          <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: COLORS.border, marginBottom: 24 }}>
            {tabs.map(tab => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          <View>
            <Text style={{ color: COLORS.textSecondary, lineHeight: 24, fontSize: 15 }}>
              This course is designed to take you from a complete beginner to a professional developer. You will learn everything you need to know to build stunning applications.
              {'\n\n'}
              • Master the fundamentals
              {'\n'}• Build real-world projects
              {'\n'}• Get hired as a developer
            </Text>

            <View style={{ marginTop: 24 }}>
              <Text style={{ color: COLORS.text, fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Course Content</Text>
              {[1, 2, 3, 4].map((item, index) => (
                <View key={index} style={styles.lessonItem}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.lessonNumber}>
                      <Text style={{ color: COLORS.textSecondary, fontWeight: 'bold' }}>0{item}</Text>
                    </View>
                    <View style={{ marginLeft: 16 }}>
                      <Text style={{ color: COLORS.text, fontWeight: '600' }}>Introduction to the Course</Text>
                      <Text style={{ color: COLORS.textSecondary, fontSize: 12 }}>12 mins</Text>
                    </View>
                  </View>
                  <Feather name="play-circle" size={24} color={COLORS.primary} />
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={{ color: COLORS.textSecondary, fontSize: 12 }}>Total Price</Text>
          <Text style={{ color: COLORS.text, fontSize: 24, fontWeight: 'bold' }}>{course.price}</Text>
        </View>
        <TouchableOpacity
          style={styles.enrollBtn}
          onPress={() => {
            addItem(course)
            navigation.navigate('Cart')
          }}
        >
          <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 16 }}>Enroll Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CourseDetail

const styles = StyleSheet.create({
  overlay: {
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%'
  },
  badge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 8
  },
  badgeText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 12
  },
  title: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 34
  },
  tab: {
    marginRight: 24,
    paddingBottom: 12
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary
  },
  tabText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    fontWeight: '600'
  },
  activeTabText: {
    color: COLORS.primary
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    padding: 16,
    marginBottom: 12,
  },
  lessonNumber: {
    width: 32,
    height: 32,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: COLORS.surface,
    padding: 24,
    paddingBottom: 34,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border
  },
  enrollBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
  }
})
