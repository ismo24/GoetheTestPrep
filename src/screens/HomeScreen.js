import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SkillCard from '../components/common/SkillCard';
import { colors } from '../styles/colors';

const HomeScreen = ({ navigation }) => {
  const skills = [
    {
      title: 'Lesen',
      subtitle: '400+ Questions',
      customImage: require('../../assets/images/lesenImg.png'),
      icon: 'book',
      color: colors.primary,
      onPress: () => navigation.navigate('Lesen')
    },
    {
      title: 'Hören',
      subtitle: '500+ Questions',
      customImage: require('../../assets/images/hoerenImg.png'),
      icon: 'headset',
      color: colors.secondary,
      onPress: () => navigation.navigate('Hoeren')
    },
    
    {
      title: 'Schreiben',
      subtitle: '100+ Samples',
      customImage: require('../../assets/images/schreibenImg.png'),
      icon: 'create',
      color: colors.warning,
      onPress: () => navigation.navigate('Schreiben')
    },
    {
      title: 'Sprechen',
      subtitle: '50+ Topics',
      customImage: require('../../assets/images/sprechenImg.png'),
      icon: 'mic',
      color: colors.accent,
      onPress: () => navigation.navigate('Sprechen')
    }
  ];

  const prepSkills = [
    {
      title: 'Wortschatz',
      subtitle: '2000+ Wörter',
      customImage: require('../../assets/images/vocabularyImg.png'),
      icon: 'star',
      color: colors.success,
      onPress: () => navigation.navigate('Vocabulary')
    },
    {
      title: 'Grammatik',
      subtitle: '2000+ Questions',
      customImage: require('../../assets/images/grammatikImg.png'),
      icon: 'library',
      color: '#9C27B0', // Couleur violette
      onPress: () => navigation.navigate('Grammatik')
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Willkommen zu Goethe Test Prep</Text>
          <Text style={styles.subtitle}>Clever lernen, Ziele erreichen!</Text>
        </View>
        
        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Goethe Fähigkeiten</Text>
          <View style={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </View>
        </View>

        <View style={styles.prepSection}>
          <Text style={styles.sectionTitle}>Goethe Vorbereitung</Text>
          <View style={styles.prepGrid}>
            {prepSkills.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </View>
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
      padding: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.gray,
    },
    skillsSection: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
      color: colors.text,
    },
    skillsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    prepSection: {
      padding: 20,
    },
    prepGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  });
  

export default HomeScreen;