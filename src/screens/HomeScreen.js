import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SkillCard from '../components/common/SkillCard';
import PrepCard from '../components/common/PrepCard';
import { colors } from '../styles/colors';


const HomeScreen = ({ navigation }) => {
  const userNativeLanguage = "FR";
  
  // États pour gérer l'affichage des titres
  const [showNativeLanguage, setShowNativeLanguage] = useState(true);
  

  // Traductions pour les compétences principales
  const skillTranslations = {
    lesen: {
      "DE": "Lesen",
      "FR": "Lecture",
      "EN": "Reading",
      "ES": "Lectura",
      "PT": "Leitura",
      "PL": "Czytanie",
      "RU": "Чтение",
      "TR": "Okuma",
      "IT": "Lettura",
      "UK": "Читання",
      "VI": "Đọc",
      "TL": "Pagbabasa",
      "ZH": "阅读",
      "ID": "Membaca",
      "TH": "การอ่าน",
      "MS": "Membaca",
      "AR": "القراءة"
    },
    horen: {
      "DE": "Hören",
      "FR": "Écoute",
      "EN": "Listening",
      "ES": "Escucha",
      "PT": "Audição",
      "PL": "Słuchanie",
      "RU": "Аудирование",
      "TR": "Dinleme",
      "IT": "Ascolto",
      "UK": "Аудіювання",
      "VI": "Nghe",
      "TL": "Pakikinig",
      "ZH": "听力",
      "ID": "Mendengar",
      "TH": "การฟัง",
      "MS": "Mendengar",
      "AR": "الاستماع"
    },
    schreiben: {
      "DE": "Schreiben",
      "FR": "Écriture",
      "EN": "Writing",
      "ES": "Escritura",
      "PT": "Escrita",
      "PL": "Pisanie",
      "RU": "Письмо",
      "TR": "Yazma",
      "IT": "Scrittura",
      "UK": "Письмо",
      "VI": "Viết",
      "TL": "Pagsulat",
      "ZH": "写作",
      "ID": "Menulis",
      "TH": "การเขียน",
      "MS": "Menulis",
      "AR": "الكتابة"
    },
    sprechen: {
      "DE": "Sprechen",
      "FR": "Expression orale",
      "EN": "Speaking",
      "ES": "Expresión oral",
      "PT": "Fala",
      "PL": "Mówienie",
      "RU": "Говорение",
      "TR": "Konuşma",
      "IT": "Parlato",
      "UK": "Говоріння",
      "VI": "Nói",
      "TL": "Pagsasalita",
      "ZH": "口语",
      "ID": "Berbicara",
      "TH": "การพูด",
      "MS": "Bertutur",
      "AR": "التحدث"
    }
  };

  // Traductions pour les compétences de préparation
  const prepTranslations = {
    wortschatz: {
      "DE": "Wortschatz",
      "FR": "Vocabulaire",
      "EN": "Vocabulary",
      "ES": "Vocabulario",
      "PT": "Vocabulário",
      "PL": "Słownictwo",
      "RU": "Словарь",
      "TR": "Kelime Hazinesi",
      "IT": "Vocabolario",
      "UK": "Словник",
      "VI": "Từ vựng",
      "TL": "Bokabularyo",
      "ZH": "词汇",
      "ID": "Kosakata",
      "TH": "คำศัพท์",
      "MS": "Perbendaharaan Kata",
      "AR": "المفردات"
    },
    grammatik: {
      "DE": "Grammatik",
      "FR": "Grammaire",
      "EN": "Grammar",
      "ES": "Gramática",
      "PT": "Gramática",
      "PL": "Gramatyka",
      "RU": "Грамматика",
      "TR": "Dilbilgisi",
      "IT": "Grammatica",
      "UK": "Граматика",
      "VI": "Ngữ pháp",
      "TL": "Gramatika",
      "ZH": "语法",
      "ID": "Tata Bahasa",
      "TH": "ไวยากรณ์",
      "MS": "Tatabahasa",
      "AR": "القواعد"
    }
  };

  const subtitleTranslations = {
    questions: {
      "DE": "Fragen",
      "FR": "Questions",
      "EN": "Questions", 
      "ES": "Preguntas",
      "PT": "Perguntas",
      "PL": "Pytania",
      "RU": "Вопросы",
      "TR": "Sorular",
      "IT": "Domande",
      "UK": "Питання",
      "VI": "Câu hỏi",
      "TL": "Mga Tanong",
      "ZH": "问题",
      "ID": "Pertanyaan",
      "TH": "คำถาม",
      "MS": "Soalan",
      "AR": "أسئلة"
    },samples: {
      "DE": "Beispiele",
      "FR": "Exemples",
      "EN": "Samples",
      "ES": "Ejemplos", 
      "PT": "Exemplos",
      "PL": "Przykłady",
      "RU": "Примеры",
      "TR": "Örnekler",
      "IT": "Esempi",
      "UK": "Приклади",
      "VI": "Mẫu",
      "TL": "Mga Halimbawa",
      "ZH": "样本",
      "ID": "Contoh",
      "TH": "ตัวอย่าง",
      "MS": "Contoh",
      "AR": "عينات"
    },topics: {
      "DE": "Themen",
      "FR": "Sujets",
      "EN": "Topics",
      "ES": "Temas",
      "PT": "Tópicos", 
      "PL": "Tematy",
      "RU": "Темы",
      "TR": "Konular",
      "IT": "Argomenti",
      "UK": "Теми",
      "VI": "Chủ đề",
      "TL": "Mga Paksa",
      "ZH": "主题",
      "ID": "Topik",
      "TH": "หัวข้อ",
      "MS": "Topik",
      "AR": "مواضيع"
    },words: {
      "DE": "Wörter",
      "FR": "Mots",
      "EN": "Words",
      "ES": "Palabras",
      "PT": "Palavras",
      "PL": "Słowa", 
      "RU": "Слова",
      "TR": "Kelimeler",
      "IT": "Parole",
      "UK": "Слова",
      "VI": "Từ",
      "TL": "Mga Salita",
      "ZH": "单词",
      "ID": "Kata",
      "TH": "คำ",
      "MS": "Perkataan",
      "AR": "كلمات"
    }};

    const skills = [
      {
        title: skillTranslations.lesen[userNativeLanguage],
        subtitle: `400+ ${subtitleTranslations.questions[userNativeLanguage]}`,
        customImage: require('../../assets/images/lesenImg.png'),
        icon: 'book',
        color: colors.primary,
        onPress: () => navigation.navigate('Lesen')
      },
      {
        title: skillTranslations.horen[userNativeLanguage],
        subtitle: `500+ ${subtitleTranslations.questions[userNativeLanguage]}`,
        customImage: require('../../assets/images/hoerenImg.png'),
        icon: 'headset',
        color: colors.secondary,
        onPress: () => navigation.navigate('Hoeren')
      },
      {
        title: skillTranslations.schreiben[userNativeLanguage],
        subtitle: `100+ ${subtitleTranslations.samples[userNativeLanguage]}`,
        customImage: require('../../assets/images/schreibenImg.png'),
        icon: 'create',
        color: colors.warning,
        onPress: () => navigation.navigate('Schreiben')
      },
      {
        title: skillTranslations.sprechen[userNativeLanguage],
        subtitle: `50+ ${subtitleTranslations.topics[userNativeLanguage]}`,
        customImage: require('../../assets/images/sprechenImg.png'),
        icon: 'mic',
        color: colors.accent,
        onPress: () => navigation.navigate('Sprechen')
      }
    ];
    
    const prepSkills = [
      {
        title: prepTranslations.wortschatz[userNativeLanguage],
        subtitle: `2000+ ${subtitleTranslations.words[userNativeLanguage]}`,
        customImage: require('../../assets/images/vocabularyImg.png'),
        color: '#E91E63',
        onPress: () => navigation.navigate('Vocabulary')
      },
      {
        title: prepTranslations.grammatik[userNativeLanguage],
        subtitle: `2000+ ${subtitleTranslations.questions[userNativeLanguage]}`,
        customImage: require('../../assets/images/grammatikImg.png'),
        color: '#FF9800',
        onPress: () => navigation.navigate('Grammatik')
      }
    ];

    
  const LocalTiles = [
    {
      "DE": "Fähigkeiten",
      "FR": "Compétences",
      "EN": "Skills",
      "ES": "Habilidades",
      "PT": "Competências",
      "PL": "Umiejętności",
      "RU": "Навыки",
      "TR": "Beceriler",
      "IT": "Competenze",
      "UK": "Навички",
      "VI": "Kỹ năng",
      "TL": "Mga Kasanayan",
      "ZH": "技能",
      "ID": "Keterampilan",
      "TH": "ทักษะ",
      "MS": "Kemahiran",
      "AR": "مهارات"
    },
    {
      "DE": "Vorbereitung",
      "FR": "Préparation",
      "EN": "Preparation",
      "ES": "Preparación",
      "PT": "Preparação",
      "PL": "Przygotowanie",
      "RU": "Подготовка",
      "TR": "Hazırlık",
      "IT": "Preparazione",
      "UK": "Підготовка",
      "VI": "Chuẩn bị",
      "TL": "Paghahanda",
      "ZH": "备考",
      "ID": "Persiapan",
      "TH": "การเตรียมตัว",
      "MS": "Persediaan",
      "AR": "تحضير"
    }
  ];

  // Fonction pour obtenir le titre approprié
  const getSectionTitle = (sectionIndex) => {
    return LocalTiles[sectionIndex][userNativeLanguage];
  };





  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView>
      <View style={styles.titleContainer}>
            <Text style={styles.appTitle}>
              <Text style={styles.appTitleOrange}>Goethe </Text>
              <Text style={styles.appTitleBlack}>Expert</Text>
            </Text>
          </View>
        
        <View style={styles.skillsSection}>
          <Text style={[styles.sectionTitle, styles.animatedTitle]}>
            {getSectionTitle(0)}
          </Text>
          <View style={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </View>
        </View>

        <View style={styles.prepSection}>
          <Text style={[styles.sectionTitle, styles.animatedTitle]}>
            {getSectionTitle(1)}
          </Text>
          <View style={styles.prepContainer}>
            {prepSkills.map((skill, index) => (
              <PrepCard 
                key={index} 
                title={skill.title}
                subtitle={skill.subtitle}
                customImage={skill.customImage}
                color={skill.color}
                onPress={skill.onPress}
              />
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
    padding: Platform.OS == "android" ? 15 : 20,
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
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: Platform.OS == "android" ? 10 : 16,
    color: colors.text,
  },
  animatedTitle: {
    // Optionnel: vous pouvez ajouter des styles d'animation ici
    // comme opacity, transform, etc.
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  prepSection: {
    padding: Platform.OS == "android" ? 10 : 15,
  },
  prepContainer: {
    // Container pour les cartes PrepCard (layout vertical)
  },
  titleContainer: {
    padding: Platform.OS == "android" ? 15 : 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    fontWeight: '800',
  },
  appTitleOrange: {
    color: colors.primary,
    
  },
  appTitleBlack: {
    color: '#000',
  },
});

export default HomeScreen;