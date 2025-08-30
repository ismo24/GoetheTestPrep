import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../styles/colors';

const BoldWordText = ({ sentence, boldWord,isRevealed }) => {
  const parts = sentence.split(boldWord);
  
  return (
    <Text style={[styles.germanSentence, !isRevealed && styles.translatedSentenceStyle,
        ,
        sentence.length > 40
        ? { fontSize: 12 , lineHeight:16}
        : null
      ]}>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <Text style={{ fontWeight: 'bold' }}>{boldWord}</Text>
          )}
        </React.Fragment>
      ))}
    </Text>
  );
};


 export default BoldWordText


 const styles = StyleSheet.create({
    sentenceSection: {
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
      },
      germanSentence: {
        fontSize: 18,
        color: colors.text,
        textAlign: 'center',
        fontWeight: '400',
        lineHeight: 24,
      },
      translatedSentenceStyle: {
        color: '#4CAF50',
        fontStyle: 'italic',
      }
 })


// Utilisation :
// const ExampleUsage = () => {
//   return (
//     <View>
//       <BoldWordText 
//         sentence="Apprendre l'allemand demande de la pratique régulière." 
//         boldWord="pratique" 
//       />
//     </View>
//   );
// };