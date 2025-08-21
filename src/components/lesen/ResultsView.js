import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";

const ResultsView = ({
  selectedUbung,
  exerciseResults,
  levelInfo,
  onBack,
  onRestart,
  onNext,
  userNativeLanguage = "FR",
}) => {
  // Traductions pour les éléments spécifiés
  const translations = {
    results: {
      DE: "Ergebnisse",
      FR: "Résultats",
      EN: "Results",
      ES: "Resultados",
      PT: "Resultados",
      PL: "Wyniki",
      RU: "Результаты",
      TR: "Sonuçlar",
      IT: "Risultati",
      UK: "Результати",
      VI: "Kết quả",
      TL: "Mga Resulta",
      ZH: "结果",
      ID: "Hasil",
      TH: "ผลลัพธ์",
      MS: "Keputusan",
      AR: "النتائج",
    },
    detailedEvaluation: {
      DE: "Detaillierte Auswertung",
      FR: "Évaluation détaillée",
      EN: "Detailed evaluation",
      ES: "Evaluación detallada",
      PT: "Avaliação detalhada",
      PL: "Szczegółowa ocena",
      RU: "Подробная оценка",
      TR: "Ayrıntılı değerlendirme",
      IT: "Valutazione dettagliata",
      UK: "Детальна оцінка",
      VI: "Đánh giá chi tiết",
      TL: "Detalyadong pagsusuri",
      ZH: "详细评估",
      ID: "Evaluasi terperinci",
      TH: "การประเมินรายละเอียด",
      MS: "Penilaian terperinci",
      AR: "التقييم المفصل",
    },
    yourAnswer: {
      DE: "Ihre Antwort:",
      FR: "Votre réponse :",
      EN: "Your answer:",
      ES: "Su respuesta:",
      PT: "Sua resposta:",
      PL: "Twoja odpowiedź:",
      RU: "Ваш ответ:",
      TR: "Cevabınız:",
      IT: "La tua risposta:",
      UK: "Ваша відповідь:",
      VI: "Câu trả lời của bạn:",
      TL: "Inyong sagot:",
      ZH: "您的答案：",
      ID: "Jawaban Anda:",
      TH: "คำตอบของคุณ:",
      MS: "Jawapan anda:",
      AR: "إجابتك:",
    },
    correctAnswer: {
      DE: "Richtige Antwort:",
      FR: "Bonne réponse :",
      EN: "Correct answer:",
      ES: "Respuesta correcta:",
      PT: "Resposta correta:",
      PL: "Prawidłowa odpowiedź:",
      RU: "Правильный ответ:",
      TR: "Doğru cevap:",
      IT: "Risposta corretta:",
      UK: "Правильна відповідь:",
      VI: "Câu trả lời đúng:",
      TL: "Tamang sagot:",
      ZH: "正确答案：",
      ID: "Jawaban yang benar:",
      TH: "คำตอบที่ถูกต้อง:",
      MS: "Jawapan yang betul:",
      AR: "الإجابة الصحيحة:",
    },
    explanation: {
      DE: "Erklärung:",
      FR: "Explication :",
      EN: "Explanation:",
      ES: "Explicación:",
      PT: "Explicação:",
      PL: "Wyjaśnienie:",
      RU: "Объяснение:",
      TR: "Açıklama:",
      IT: "Spiegazione:",
      UK: "Пояснення:",
      VI: "Giải thích:",
      TL: "Paliwanag:",
      ZH: "解释：",
      ID: "Penjelasan:",
      TH: "คำอธิบาย:",
      MS: "Penjelasan:",
      AR: "التفسير:",
    },
    improvementSuggestions: {
      DE: "Verbesserungsvorschläge",
      FR: "Suggestions d'amélioration",
      EN: "Improvement suggestions",
      ES: "Sugerencias de mejora",
      PT: "Sugestões de melhoria",
      PL: "Sugestie poprawy",
      RU: "Предложения по улучшению",
      TR: "İyileştirme önerileri",
      IT: "Suggerimenti per migliorare",
      UK: "Пропозиції щодо покращення",
      VI: "Gợi ý cải thiện",
      TL: "Mga mungkahi para sa pagpapabuti",
      ZH: "改进建议",
      ID: "Saran perbaikan",
      TH: "ข้อเสนอแนะเพื่อการปรับปรุง",
      MS: "Cadangan penambahbaikan",
      AR: "اقتراحات التحسين",
    },
    improvementTips: {
      DE: "• Lesen Sie den Text noch einmal aufmerksam durch\n• Achten Sie auf Schlüsselwörter in den Fragen\n• Versuchen Sie, die Antworten im Text zu finden\n• Wiederholen Sie die Übung zur Festigung",
      FR: "• Relisez le texte attentivement\n• Portez attention aux mots-clés dans les questions\n• Essayez de trouver les réponses dans le texte\n• Répétez l'exercice pour consolider",
      EN: "• Read the text carefully again\n• Pay attention to keywords in the questions\n• Try to find the answers in the text\n• Repeat the exercise to consolidate",
      ES: "• Lea el texto nuevamente con atención\n• Preste atención a las palabras clave en las preguntas\n• Trate de encontrar las respuestas en el texto\n• Repita el ejercicio para consolidar",
      PT: "• Leia o texto novamente com atenção\n• Preste atenção às palavras-chave nas perguntas\n• Tente encontrar as respostas no texto\n• Repita o exercício para consolidar",
      PL: "• Przeczytaj tekst ponownie uważnie\n• Zwróć uwagę na słowa kluczowe w pytaniach\n• Spróbuj znaleźć odpowiedzi w tekście\n• Powtórz ćwiczenie dla utrwalenia",
      RU: "• Внимательно перечитайте текст еще раз\n• Обратите внимание на ключевые слова в вопросах\n• Попробуйте найти ответы в тексте\n• Повторите упражнение для закрепления",
      TR: "• Metni tekrar dikkatli okuyun\n• Sorulardaki anahtar kelimelere dikkat edin\n• Cevapları metinde bulmaya çalışın\n• Pekiştirmek için alıştırmayı tekrarlayın",
      IT: "• Rileggi il testo attentamente\n• Fai attenzione alle parole chiave nelle domande\n• Cerca di trovare le risposte nel testo\n• Ripeti l'esercizio per consolidare",
      UK: "• Уважно перечитайте текст ще раз\n• Зверніть увагу на ключові слова в питаннях\n• Спробуйте знайти відповіді в тексті\n• Повторіть вправу для закріплення",
      VI: "• Đọc lại văn bản một cách cẩn thận\n• Chú ý đến từ khóa trong câu hỏi\n• Cố gắng tìm câu trả lời trong văn bản\n• Lặp lại bài tập để củng cố",
      TL: "• Basahin muli ang teksto nang maingat\n• Bigyang pansin ang mga susing salita sa mga tanong\n• Subukang hanapin ang mga sagot sa teksto\n• Ulitin ang ehersisyo para sa pagpapatibay",
      ZH: "• 仔细重读文本\n• 注意问题中的关键词\n• 尝试在文本中找到答案\n• 重复练习以巩固",
      ID: "• Baca teks dengan cermat lagi\n• Perhatikan kata kunci dalam pertanyaan\n• Coba temukan jawaban dalam teks\n• Ulangi latihan untuk memperkuat",
      TH: "• อ่านข้อความอย่างระมัดระวังอีกครั้ง\n• ให้ความสำคัญกับคำสำคัญในคำถาม\n• พยายามหาคำตอบในข้อความ\n• ทำแบบฝึกหัดซ้ำเพื่อเสริมความแข็งแกร่ง",
      MS: "• Baca teks dengan teliti sekali lagi\n• Beri perhatian kepada kata kunci dalam soalan\n• Cuba cari jawapan dalam teks\n• Ulang latihan untuk memantapkan",
      AR: "• اقرأ النص بعناية مرة أخرى\n• انتبه للكلمات المفتاحية في الأسئلة\n• حاول العثور على الإجابات في النص\n• كرر التمرين للتعزيز",
    },
    scoreMessages: {
      excellent: {
        DE: "Ausgezeichnet!",
        FR: "Excellent !",
        EN: "Excellent!",
        ES: "¡Excelente!",
        PT: "Excelente!",
        PL: "Doskonale!",
        RU: "Отлично!",
        TR: "Mükemmel!",
        IT: "Eccellente!",
        UK: "Відмінно!",
        VI: "Xuất sắc!",
        TL: "Napakagaling!",
        ZH: "优秀！",
        ID: "Luar biasa!",
        TH: "ยอดเยี่ยม!",
        MS: "Cemerlang!",
        AR: "ممتاز!",
      },
      veryGood: {
        DE: "Sehr gut!",
        FR: "Très bien !",
        EN: "Very good!",
        ES: "¡Muy bien!",
        PT: "Muito bom!",
        PL: "Bardzo dobrze!",
        RU: "Очень хорошо!",
        TR: "Çok iyi!",
        IT: "Molto bene!",
        UK: "Дуже добре!",
        VI: "Rất tốt!",
        TL: "Napakaganda!",
        ZH: "很好！",
        ID: "Sangat bagus!",
        TH: "ดีมาก!",
        MS: "Sangat baik!",
        AR: "جيد جداً!",
      },
      wellDone: {
        DE: "Gut gemacht!",
        FR: "Bien joué !",
        EN: "Well done!",
        ES: "¡Bien hecho!",
        PT: "Bem feito!",
        PL: "Dobrze zrobione!",
        RU: "Хорошо сделано!",
        TR: "Aferin!",
        IT: "Ben fatto!",
        UK: "Молодець!",
        VI: "Làm tốt lắm!",
        TL: "Magaling!",
        ZH: "做得好！",
        ID: "Bagus sekali!",
        TH: "ทำได้ดี!",
        MS: "Bagus!",
        AR: "أحسنت!",
      },
      notBad: {
        DE: "Nicht schlecht!",
        FR: "Pas mal !",
        EN: "Not bad!",
        ES: "¡No está mal!",
        PT: "Nada mal!",
        PL: "Nieźle!",
        RU: "Неплохо!",
        TR: "Fena değil!",
        IT: "Non male!",
        UK: "Непогано!",
        VI: "Không tệ!",
        TL: "Hindi masama!",
        ZH: "不错！",
        ID: "Lumayan!",
        TH: "ไม่เลว!",
        MS: "Tidak teruk!",
        AR: "ليس سيئاً!",
      },
      keepPracticing: {
        DE: "Weiter üben!",
        FR: "Continuez à vous entraîner !",
        EN: "Keep practicing!",
        ES: "¡Sigue practicando!",
        PT: "Continue praticando!",
        PL: "Ćwicz dalej!",
        RU: "Продолжайте практиковаться!",
        TR: "Pratik yapmaya devam et!",
        IT: "Continua a esercitarti!",
        UK: "Продовжуйте практикуватися!",
        VI: "Tiếp tục luyện tập!",
        TL: "Magpatuloy sa pag-ensayo!",
        ZH: "继续练习！",
        ID: "Terus berlatih!",
        TH: "ฝึกต่อไป!",
        MS: "Terus berlatih!",
        AR: "استمر في التدريب!",
      },
    },

    passedFailed: {
      passed: {
        DE: "Bestanden!",
        FR: "Réussi !",
        EN: "Passed!",
        ES: "¡Aprobado!",
        PT: "Aprovado!",
        PL: "Zdany!",
        RU: "Сдано!",
        TR: "Geçti!",
        IT: "Superato!",
        UK: "Здано!",
        VI: "Đạt!",
        TL: "Nakapasa!",
        ZH: "通过！",
        ID: "Lulus!",
        TH: "ผ่าน!",
        MS: "Lulus!",
        AR: "نجح!",
      },
      failed: {
        DE: "Nicht bestanden",
        FR: "Échoué",
        EN: "Failed",
        ES: "Reprobado",
        PT: "Reprovado",
        PL: "Niezaliczony",
        RU: "Не сдано",
        TR: "Başarısız",
        IT: "Bocciato",
        UK: "Не здано",
        VI: "Không đạt",
        TL: "Hindi nakapasa",
        ZH: "不通过",
        ID: "Tidak lulus",
        TH: "ไม่ผ่าน",
        MS: "Tidak lulus",
        AR: "فشل",
      },
    },

    scoreDetails: {
      DE: "{correct} von {total} Fragen richtig",
      FR: "{correct} sur {total} questions correctes",
      EN: "{correct} out of {total} questions correct",
      ES: "{correct} de {total} preguntas correctas",
      PT: "{correct} de {total} perguntas corretas",
      PL: "{correct} z {total} pytań poprawnych",
      RU: "{correct} из {total} вопросов правильно",
      TR: "{total} sorudan {correct} tanesi doğru",
      IT: "{correct} su {total} domande corrette",
      UK: "{correct} з {total} питань правильно",
      VI: "{correct} trên {total} câu hỏi đúng",
      TL: "{correct} sa {total} na tanong ay tama",
      ZH: "{total}题中{correct}题正确",
      ID: "{correct} dari {total} pertanyaan benar",
      TH: "ตอบถูก {correct} จาก {total} ข้อ",
      MS: "{correct} daripada {total} soalan betul",
      AR: "{correct} من أصل {total} أسئلة صحيحة",
    },
    questionLabel: {
        "DE": "Frage",
        "FR": "Question",
        "EN": "Question",
        "ES": "Pregunta",
        "PT": "Pergunta",
        "PL": "Pytanie",
        "RU": "Вопрос",
        "TR": "Soru",
        "IT": "Domanda",
        "UK": "Питання",
        "VI": "Câu hỏi",
        "TL": "Tanong",
        "ZH": "问题",
        "ID": "Pertanyaan",
        "TH": "คำถาม",
        "MS": "Soalan",
        "AR": "سؤال"
      },
      buttons: {
        repeat: {
          DE: "Wiederholen",
          FR: "Répéter",
          EN: "Repeat",
          ES: "Repetir",
          PT: "Repetir",
          PL: "Powtórz",
          RU: "Повторить",
          TR: "Tekrarla",
          IT: "Ripeti",
          UK: "Повторити",
          VI: "Lặp lại",
          TL: "Ulitin",
          ZH: "重复",
          ID: "Ulangi",
          TH: "ทำซ้ำ",
          MS: "Ulang",
          AR: "كرر",
        },
        continue: {
          DE: "Weiter",
          FR: "Continuer",
          EN: "Continue",
          ES: "Continuar",
          PT: "Continuar",
          PL: "Kontynuuj",
          RU: "Продолжить",
          TR: "Devam et",
          IT: "Continua",
          UK: "Продовжити",
          VI: "Tiếp tục",
          TL: "Magpatuloy",
          ZH: "继续",
          ID: "Lanjutkan",
          TH: "ต่อไป",
          MS: "Teruskan",
          AR: "استمر",
        },
        exercises: {
          DE: "Übungen",
          FR: "Exercices",
          EN: "Exercises",
          ES: "Ejercicios",
          PT: "Exercícios",
          PL: "Ćwiczenia",
          RU: "Упражнения",
          TR: "Egzersizler",
          IT: "Esercizi",
          UK: "Вправи",
          VI: "Bài tập",
          TL: "Mga ehersisyo",
          ZH: "练习",
          ID: "Latihan",
          TH: "แบบฝึกหัด",
          MS: "Latihan",
          AR: "التمارين",
        },
      }
  };

  // Fonction pour obtenir un message de félicitation basé sur le score
  const getScoreMessage = (percentage) => {
    if (percentage >= 90)
      return translations.scoreMessages.excellent[userNativeLanguage];
    if (percentage >= 75)
      return translations.scoreMessages.veryGood[userNativeLanguage];
    if (percentage >= 60)
      return translations.scoreMessages.wellDone[userNativeLanguage];
    if (percentage >= 50)
      return translations.scoreMessages.notBad[userNativeLanguage];
    return translations.scoreMessages.keepPracticing[userNativeLanguage];
  };

  // Fonction pour obtenir l'icône basée sur le score
  const getScoreIcon = (percentage) => {
    if (percentage >= 90) return "trophy";
    if (percentage >= 75) return "ribbon";
    if (percentage >= 60) return "thumbs-up";
    if (percentage >= 50) return "checkmark-circle";
    return "refresh-circle";
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.closeButton}>
          <Ionicons name="close" size={20} color="#000" />
        </TouchableOpacity>
        {/* <Text style={styles.title}>
          {translations.results[userNativeLanguage]} 
        </Text> */}
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.resultsContent}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Score principal */}
        <View style={[styles.scoreCard, { backgroundColor: colors.white }]}>
          <View style={styles.scoreHeader}>
            <Ionicons
              name={getScoreIcon(exerciseResults.percentage)}
              size={32}
              color={'white'}
            />
            <Text style={styles.scoreTitle}>
              {getScoreMessage(exerciseResults.percentage)}
            </Text>
            <Text style={styles.scorePercentage}>
            {exerciseResults.percentage}%
          </Text>
          </View>
          
         

          {/* Indicateur de performance */}
          <View style={styles.performanceIndicator}>
            {exerciseResults.percentage >= 70 ? (
              <View style={styles.passedIndicator}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={colors.white}
                />
                <Text style={styles.performanceText}>
                  {translations.passedFailed.passed[userNativeLanguage]}
                </Text>
              </View>
            ) : (
              <View style={styles.failedIndicator}>
                <Ionicons name="close-circle" size={20} color={colors.white} />
                <Text style={styles.performanceText}>
                  {translations.passedFailed.failed[userNativeLanguage]}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Détails par question */}
        <View style={styles.detailsSection}>
         

          {exerciseResults.detailedResults[0].questions.map(
            (questionResult, qIndex) => (
              <View key={qIndex} style={styles.questionResult}>
                <View style={styles.questionResultHeader}>
                  <Text style={styles.questionResultTitle}>
                    {translations.questionLabel[userNativeLanguage]}{" "}
                    {exerciseResults.detailedResults[0].questions.length!==1?questionResult.questionIndex:""}
                  </Text>
                  <View
                    style={[
                      styles.resultBadge,
                      {
                        backgroundColor: colors.primary
                        // questionResult.isCorrect
                        //   ? colors.success
                        //   : colors.error,
                      },
                    ]}
                  >
                    <Ionicons
                      name={questionResult.isCorrect ? "checkmark" : "close"}
                      size={16}
                      color={colors.white}
                    />
                  </View>
                </View>

                <Text style={styles.questionText}>
                  {questionResult.questionText}
                </Text>

                <View style={styles.answersComparison}>
                  <View style={styles.answerRow}>
                    <Text style={styles.answerLabel}>
                      {translations.yourAnswer[userNativeLanguage]}
                    </Text>
                    <Text
                      style={[
                        styles.answerText,
                        {
                          color: 'black'
                          // questionResult.isCorrect
                          //   ? colors.success
                          //   : colors.error,
                        },
                      ]}
                    >
                      {questionResult.selectedAnswer}
                    </Text>
                  </View>

                  {!questionResult.isCorrect && (
                    <View style={styles.answerRow}>
                      <Text style={styles.answerLabel}>
                        {translations.correctAnswer[userNativeLanguage]}
                      </Text>
                      <Text
                        style={[styles.answerText, { color: 'black' }]}
                      >
                        {questionResult.correctAnswer}
                      </Text>
                    </View>
                  )}
                </View>

                {questionResult.explanation && (
  <View style={styles.explanationBox}>
    <View style={styles.explanationHeader}>
      <Ionicons
        name="bulb-outline"
        size={16}
        color={colors.primary}
      />
      <Text style={styles.explanationTitle}>
        {translations.explanation[userNativeLanguage]}
      </Text>
    </View>
    
    {/* Explication en allemand */}
    <Text style={styles.explanationText}>
      {questionResult.explanation}
    </Text>
    
    {/* Explication en langue natale - AJOUT */}
    {userNativeLanguage !== "DE" && questionResult.nativeExplanation && (
      <View style={styles.nativeExplanationContainer}>
        <View style={styles.nativeExplanationSeparator} />
        <Text style={styles.nativeExplanationText}>
          {questionResult.nativeExplanation}
        </Text>
      </View>
    )}
  </View>
)}
              </View>
            )
          )}
        </View>

        {/* Conseils d'amélioration */}
       
      </ScrollView>

      {/* Boutons d'action sticky */}
      <View style={styles.stickyButtons}>
  <TouchableOpacity
    style={[styles.actionButton, styles.restartButton]}
    onPress={onRestart}
  >
    {/* <Ionicons name="refresh" size={20} color={colors.white} /> */}
    <Text style={styles.restartButtonText}>
      {translations.buttons.repeat[userNativeLanguage]}
    </Text>
  </TouchableOpacity>

  {onNext ? (
    <TouchableOpacity
      style={[styles.actionButton, { backgroundColor: 'black' }]}
      onPress={onNext}
    >
      
      <Text style={styles.actionButtonText}>
        {translations.buttons.continue[userNativeLanguage]}
      </Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[styles.actionButton, { backgroundColor: colors.primary }]}
      onPress={onBack}
    >
      {/* <Ionicons name="list" size={20} color={colors.white} /> */}
      <Text style={styles.actionButtonText}>
        {translations.buttons.exercises[userNativeLanguage]}
      </Text>
    </TouchableOpacity>
  )}
</View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    flex: 1,
    textAlign: "center",
  },
  resultsContent: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scoreCard: {
    margin: 16,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  scoreHeader: {
    alignItems: "center",
    width:150,
    height:150,
    borderRadius:75,
    marginBottom: 16,
    backgroundColor:colors.primary
  },
  scoreTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  scorePercentage: {
    color: 'white',
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  scoreDetails: {
    color: colors.white,
    fontSize: 16,
    opacity: 0.9,
    marginBottom: 12,
  },
  performanceIndicator: {
    marginTop: 8,
  },
  passedIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  failedIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  performanceText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  detailsSection: {
    margin: 16,
    marginTop: 0,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
  },
  questionResult: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionResultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  questionResultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  resultBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 12,
    lineHeight: 22,
  },
  answersComparison: {
    marginTop: 8,
    marginBottom: 12,
  },
  answerRow: {
    marginBottom: 6,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    padding: 12,
  },
  answerLabel: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 2,
  },
  answerText: {
    fontSize: 15,
    fontWeight: "700",
  },
  explanationBox: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  explanationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
  },
  explanationText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  improvementCard: {
    backgroundColor: colors.white,
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  improvementHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  improvementTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  improvementText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
  stickyButtons: {
    position: "absolute",
    bottom: "8%",
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  restartButton: {
    backgroundColor: colors.lightGray,
  },
  restartButtonText:{
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D6D6DB",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  nativeExplanationContainer: {
    marginTop: 12,
    paddingTop: 12,
  },
  nativeExplanationSeparator: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginBottom: 12,
    opacity: 0.5,
  },
  nativeExplanationText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    fontStyle: 'italic',
    opacity: 0.8,
  },
});

export default ResultsView;
