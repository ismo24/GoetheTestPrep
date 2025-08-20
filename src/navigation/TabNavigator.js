import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { colors } from '../styles/colors';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  // Variable de langue native (à définir selon vos besoins)
  const nativeLanguage = "FR";

  // Traductions pour les noms d'onglets
  const tabTranslations = {
    home: {
      "DE": "Startseite",
      "FR": "Accueil",
      "EN": "Home",
      "ES": "Inicio",
      "PT": "Início",
      "PL": "Główna",
      "RU": "Главная",
      "TR": "Ana Sayfa",
      "IT": "Home",
      "UK": "Головна",
      "VI": "Trang chủ",
      "TL": "Tahanan",
      "ZH": "首页",
      "ID": "Beranda",
      "TH": "หน้าแรก",
      "MS": "Utama",
      "AR": "الرئيسية"
    },
    statistics: {
      "DE": "Statistiken",
      "FR": "Statistiques",
      "EN": "Statistics",
      "ES": "Estadísticas",
      "PT": "Estatísticas",
      "PL": "Statystyki",
      "RU": "Статистика",
      "TR": "İstatistikler",
      "IT": "Statistiche",
      "UK": "Статистика",
      "VI": "Thống kê",
      "TL": "Istatistika",
      "ZH": "统计",
      "ID": "Statistik",
      "TH": "สстатิสติก",
      "MS": "Statistik",
      "AR": "الإحصائيات"
    },
    settings: {
      "DE": "Einstellungen",
      "FR": "Paramètres",
      "EN": "Settings",
      "ES": "Configuración",
      "PT": "Configurações",
      "PL": "Ustawienia",
      "RU": "Настройки",
      "TR": "Ayarlar",
      "IT": "Impostazioni",
      "UK": "Налаштування",
      "VI": "Cài đặt",
      "TL": "Mga Setting",
      "ZH": "设置",
      "ID": "Pengaturan",
      "TH": "การตั้งค่า",
      "MS": "Tetapan",
      "AR": "الإعدادات"
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Statistics') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: tabTranslations.home[nativeLanguage]
        }}
      />
      <Tab.Screen 
        name="Statistics" 
        component={StatisticsScreen}
        options={{
          tabBarLabel: tabTranslations.statistics[nativeLanguage]
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          tabBarLabel: tabTranslations.settings[nativeLanguage]
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;