import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

const SolutionCard = ({ selectedUbung }) => {
  return (
    <View style={styles.container}>
      {selectedUbung.questionType !== "formular" ? (
        selectedUbung.solution && Object.values(selectedUbung.solution)?.map((value, index) => {
          // Si value est un tableau, on mappe ses éléments
          if (Array.isArray(value)) {
            return value
              .filter(item => item !== "") // Filtrer les chaînes vides
              .map((item, subIndex) => (
                <Text key={`${index}-${subIndex}`} style={styles.listItemText}>
                  {item}
                </Text>
              ));
          }
          
          // Pour les chaînes, on vérifie qu'elles ne sont pas vides
          if (value !== "") {
            return (
              <Text key={index} style={styles.paragraphText}>
                {value}
              </Text>
            );
          }
          
          // Si c'est une chaîne vide, on ne retourne rien
          return null;
        })
      ) : selectedUbung.questionType === "formular" ? (
        // Code pour le cas formular
        <View style={styles.formularContainer}>
          {selectedUbung.solution && Object.entries(selectedUbung.solution).map(([key, value]) => {
            // Formatage du label : exactement 10 caractères ou garder tel quel si plus long
            const formattedLabel = key.length <= 10 
              ? `${key}:`.padEnd(10, ' ') 
              : `${key}: `;
            
            return (
              <Text key={key} style={styles.formularRow}>
                <Text style={styles.formularLabel}>
                  {formattedLabel}
                </Text>
                <Text style={styles.formularField}>
                  {value}
                </Text>
              </Text>
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    margin: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden'
  },    
  paragraphText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
    marginBottom: 16,
  },
  listItemText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
    marginBottom: 8,
  },
  // Styles pour le formulaire (repris d'ExerciseView)
  formularContainer: {
    gap: 12,
  },
  formularRow: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.text,
    paddingVertical: 4,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  formularLabel: {
    fontWeight: '500',
    color: colors.text,
    fontFamily: 'monospace', // Important pour l'alignement des espaces
  },
  formularField: {
    fontFamily: 'monospace', // Pour un alignement uniforme
    color: colors.text,
  },
});

export default SolutionCard;