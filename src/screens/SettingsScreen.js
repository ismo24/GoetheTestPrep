import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const colors = {
  primary: '#FF6B47',
  background: '#F8F9FA',
  white: '#FFFFFF',
  text: '#1C1C1E',
  gray: '#8E8E93',
  lightGray: '#F2F2F7',
};

const SettingsScreen = () => {
  const menuItems = [
    {
      title: 'Get Pro',
      subtitle: 'Get Higher Score!',
      icon: 'star',
      hasUpgrade: true,
    },
    {
      title: 'Feedback & Support',
      icon: 'chatbubble-outline',
    },
    {
      title: 'Share Application',
      icon: 'share-outline',
    },
    {
      title: 'Privacy Policy',
      icon: 'shield-outline',
    },
    {
      title: 'Terms and Conditions',
      icon: 'document-text-outline',
    },
    {
      title: 'Sign in',
      icon: 'log-in-outline',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={24} color={colors.gray} />
          </View>
          <Text style={styles.profileTitle}>Profile</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.menuContent}>
              <Ionicons name={item.icon} size={20} color={colors.gray} />
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                {item.subtitle && (
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                )}
              </View>
            </View>
            {item.hasUpgrade && (
              <View style={styles.upgradeButton}>
                <Text style={styles.upgradeText}>UPGRADE</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

        <View style={styles.version}>
          <Text style={styles.versionText}>App version: 3.1.8(+2025061216)</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.white,
    padding: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  menuItem: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuText: {
    marginLeft: 16,
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  menuSubtitle: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 2,
  },
  upgradeButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  upgradeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  version: {
    padding: 20,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: colors.gray,
  },
});

export default SettingsScreen;