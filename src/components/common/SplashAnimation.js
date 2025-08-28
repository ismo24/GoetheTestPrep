import React, { useEffect, useRef } from 'react';
import { View, StatusBar, Platform, Dimensions, Image, Text, StyleSheet,Animated } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const SplashAnimation = () => {
  const { width, height } = Dimensions.get('window');

   // Animations pour l'opacité des cercles
   const opacity1 = useRef(new Animated.Value(0.2)).current;
   const opacity2 = useRef(new Animated.Value(0.2)).current;
   const opacity3 = useRef(new Animated.Value(0.2)).current;
   const logoTranslateY = useRef(new Animated.Value(-height / 10)).current;
 
   useEffect(() => {
     // Animation de l'opacité des cercles de 20% à 100% en 3 secondes
     Animated.parallel([
       Animated.timing(opacity1, {
         toValue: 1,
         duration: 3000,
         useNativeDriver: true,
       }),
       Animated.timing(opacity2, {
         toValue: 1,
         duration: 3000,
         useNativeDriver: true,
       }),
       Animated.timing(opacity3, {
         toValue: 1,
         duration: 3000,
         useNativeDriver: true,
       }),
       Animated.timing(logoTranslateY, {
        toValue: 0, // Final position
        duration: 3000,
        useNativeDriver: true,
      }),
     ]).start();
 
    
   }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
        backgroundColor={Platform.OS === 'android' ? '#FFFFFF' : undefined}
        translucent={false}
      />
      <View style={styles.container}>
        {/* Logo Container */}
        <Animated.View style={[styles.logoContainer, { marginTop: height/5,transform: [{ translateY: logoTranslateY }] }]}>
          <Image 
            source={require('../../../assets/images/logo.png')} // ← Votre logo statique
            style={styles.logoImage}
            resizeMode="contain"
          />
        </Animated.View>

        {/* App Title Container */}
        <Animated.View style={[styles.titleContainer,{transform: [{ translateY: logoTranslateY }]}]}>
          <Text style={styles.appTitle}>
            <Text style={styles.appTitleOrange}>Goethe </Text>
            <Text style={styles.appTitleBlack}>Expert</Text>
          </Text>
        </Animated.View>
        <Animated.View style={[styles.cercle1, { opacity: opacity1 }]}></Animated.View>
<Animated.View style={[styles.cercle2, { opacity: opacity2 }]}></Animated.View>
{/* <Animated.View style={[styles.cercle3, { opacity: opacity3 }]}></Animated.View> */}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: 110,
    height: 110,
  },
  titleContainer: {
    // marginTop: 10,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  appTitleOrange: {
    color: '#FF6B47',
  },
  appTitleBlack: {
    color: '#000',
  },
  cercle1:{
    position:"absolute",
    height:200,
    width:200,
    borderRadius:100,
    top:-30,
    right:-50,
    backgroundColor:"#FFE5DC",
  },
  cercle2:{
    position:"absolute",
    height:150,
    width:150,
    borderRadius:75,
    bottom:40,
    left:-50,
    backgroundColor:"#FFE5DC",
  },
  cercle3:{
    position:"absolute",
    height:300,
    width:300,
    borderRadius:150,
    bottom:100,
    right:-50,
    backgroundColor:"#FFE5DC",
  }
});

export default SplashAnimation;