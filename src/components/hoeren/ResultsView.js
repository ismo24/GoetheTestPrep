import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';

const ResultsView = ({ 
  selectedUbung, 
  exerciseResults, 
  levelInfo, 
  onBack, 
  onRestart, 
  onNext,
  userNativeLanguage = "FR"
}) => {
  
  // Traductions pour les éléments de l'interface
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
    questionLabel: {
      DE: "Frage",
      FR: "Question",
      EN: "Question",
      ES: "Pregunta",
      PT: "Pergunta",
      PL: "Pytanie",
      RU: "Вопрос",
      TR: "Soru",
      IT: "Domanda",
      UK: "Питання",
      VI: "Câu hỏi",
      TL: "Tanong",
      ZH: "问题",
      ID: "Pertanyaan",
      TH: "คำถาม",
      MS: "Soalan",
      AR: "سؤال"
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
    scoreMessages: {
      excellent: {
        DE: "Hervorragend gehört!",
        FR: "Excellente écoute !",
        EN: "Excellent listening!",
        ES: "¡Excelente escucha!",
        PT: "Excelente audição!",
        PL: "Doskonałe słuchanie!",
        RU: "Отличное прослушивание!",
        TR: "Mükemmel dinleme!",
        IT: "Eccellente ascolto!",
        UK: "Відмінне прослуховування!",
        VI: "Nghe xuất sắc!",
        TL: "Napakagaling na pakikinig!",
        ZH: "优秀的听力！",
        ID: "Mendengar luar biasa!",
        TH: "การฟังที่ยอดเยี่ยม!",
        MS: "Pendengaran cemerlang!",
        AR: "استماع ممتاز!",
      },
      veryGood: {
        DE: "Sehr gut verstanden!",
        FR: "Très bien compris !",
        EN: "Very well understood!",
        ES: "¡Muy bien entendido!",
        PT: "Muito bem compreendido!",
        PL: "Bardzo dobrze zrozumiane!",
        RU: "Очень хорошо понято!",
        TR: "Çok iyi anlaşıldı!",
        IT: "Molto ben capito!",
        UK: "Дуже добре зрозуміло!",
        VI: "Hiểu rất tốt!",
        TL: "Napakagandang pagkakaintindi!",
        ZH: "理解得很好！",
        ID: "Dipahami dengan sangat baik!",
        TH: "เข้าใจได้ดีมาก!",
        MS: "Difahami dengan baik!",
        AR: "مفهوم جيداً جداً!",
      },
      wellDone: {
        DE: "Gut zugehört!",
        FR: "Bien écouté !",
        EN: "Well listened!",
        ES: "¡Bien escuchado!",
        PT: "Bem ouvido!",
        PL: "Dobrze wysłuchane!",
        RU: "Хорошо прослушано!",
        TR: "İyi dinlendi!",
        IT: "Ben sentito!",
        UK: "Добре прослухано!",
        VI: "Nghe tốt!",
        TL: "Mabuting pakikinig!",
        ZH: "听得好！",
        ID: "Didengar dengan baik!",
        TH: "ฟังได้ดี!",
        MS: "Didengar dengan baik!",
        AR: "استُمع جيداً!",
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
        DE: "Mehr üben!",
        FR: "Plus de pratique !",
        EN: "More practice needed!",
        ES: "¡Más práctica!",
        PT: "Mais prática!",
        PL: "Więcej ćwiczeń!",
        RU: "Больше практики!",
        TR: "Daha fazla pratik!",
        IT: "Più pratica!",
        UK: "Більше практики!",
        VI: "Cần luyện tập thêm!",
        TL: "Kailangan ng higit pang pagsasanay!",
        ZH: "需要更多练习！",
        ID: "Perlu lebih banyak latihan!",
        TH: "ต้องฝึกฝนเพิ่มเติม!",
        MS: "Perlu lebih banyak latihan!",
        AR: "يحتاج المزيد من التدريب!",
      },
    },
    improvementTips: {
      tipsTitle: {
        DE: "Tipps zur Verbesserung",
        FR: "Conseils d'amélioration",
        EN: "Improvement tips",
        ES: "Consejos de mejora",
        PT: "Dicas de melhoria",
        PL: "Wskazówki dotyczące poprawy",
        RU: "Советы по улучшению",
        TR: "İyileştirme ipuçları",
        IT: "Consigli per migliorare",
        UK: "Поради щодо покращення",
        VI: "Lời khuyên cải thiện",
        TL: "Mga payo para sa pagpapabuti",
        ZH: "改进建议",
        ID: "Tips perbaikan",
        TH: "เคล็ดลับการปรับปรุง",
        MS: "Petua penambahbaikan",
        AR: "نصائح التحسين",
      },
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
    if (percentage >= 90) return translations.scoreMessages.excellent[userNativeLanguage];
    if (percentage >= 75) return translations.scoreMessages.veryGood[userNativeLanguage];
    if (percentage >= 60) return translations.scoreMessages.wellDone[userNativeLanguage];
    if (percentage >= 50) return translations.scoreMessages.notBad[userNativeLanguage];
    return translations.scoreMessages.keepPracticing[userNativeLanguage];
  };

  // Fonction pour obtenir l'icône basée sur le score
  const getScoreIcon = (percentage) => {
    if (percentage >= 90) return "trophy";
    if (percentage >= 75) return "medal";
    if (percentage >= 60) return "thumbs-up";
    if (percentage >= 50) return "checkmark-circle";
    return "refresh-circle";
  };

  // Conseils d'amélioration selon le niveau de performance
  const getImprovementTips = (percentage) => {
    const tips = {
      low: [
        {
          icon: "volume-high",
          text: {
            DE: "Hören Sie das Audio mehrmals an",
            FR: "Écoutez l'audio plusieurs fois",
            EN: "Listen to the audio several times",
            ES: "Escuche el audio varias veces",
            PT: "Ouça o áudio várias vezes",
            PL: "Posłuchaj nagrania kilka razy",
            RU: "Прослушайте аудио несколько раз",
            TR: "Sesi birkaç kez dinleyin",
            IT: "Ascolta l'audio più volte",
            UK: "Прослухайте аудіо кілька разів",
            VI: "Nghe audio nhiều lần",
            TL: "Pakinggan ang audio ng ilang beses",
            ZH: "多听几遍音频",
            ID: "Dengarkan audio beberapa kali",
            TH: "ฟังเสียงหลายครั้ง",
            MS: "Dengar audio beberapa kali",
            AR: "استمع للصوت عدة مرات",
          }
        },
        {
          icon: "eye",
          text: {
            DE: "Konzentrieren Sie sich auf Schlüsselwörter",
            FR: "Concentrez-vous sur les mots-clés",
            EN: "Focus on keywords",
            ES: "Concéntrese en las palabras clave",
            PT: "Concentre-se nas palavras-chave",
            PL: "Skoncentruj się na słowach kluczowych",
            RU: "Сосредоточьтесь на ключевых словах",
            TR: "Anahtar kelimelere odaklanın",
            IT: "Concentrati sulle parole chiave",
            UK: "Зосередьтеся на ключових словах",
            VI: "Tập trung vào từ khóa",
            TL: "Tumuon sa mga susing salita",
            ZH: "专注于关键词",
            ID: "Fokus pada kata kunci",
            TH: "มุ่งเน้นไปที่คำสำคัญ",
            MS: "Fokus pada kata kunci",
            AR: "ركز على الكلمات المفتاحية",
          }
        },
        {
          icon: "time",
          text: {
            DE: "Pausieren Sie zwischen den Fragen",
            FR: "Faites des pauses entre les questions",
            EN: "Take breaks between questions",
            ES: "Haga pausas entre las preguntas",
            PT: "Faça pausas entre as perguntas",
            PL: "Rób przerwy między pytaniami",
            RU: "Делайте паузы между вопросами",
            TR: "Sorular arasında mola verin",
            IT: "Fai pause tra le domande",
            UK: "Робіть паузи між питаннями",
            VI: "Nghỉ giữa các câu hỏi",
            TL: "Magpahinga sa pagitan ng mga tanong",
            ZH: "在问题之间休息",
            ID: "Istirahat di antara pertanyaan",
            TH: "พักระหว่างคำถาม",
            MS: "Berehat di antara soalan",
            AR: "خذ استراحة بين الأسئلة",
          }
        }
      ],
      medium: [
        {
          icon: "trending-up",
          text: {
            DE: "Üben Sie regelmäßig mit verschiedenen Audioquellen",
            FR: "Pratiquez régulièrement avec différentes sources audio",
            EN: "Practice regularly with different audio sources",
            ES: "Practique regularmente con diferentes fuentes de audio",
            PT: "Pratique regularmente com diferentes fontes de áudio",
            PL: "Ćwicz regularnie z różnymi źródłami audio",
            RU: "Регулярно практикуйтесь с разными аудиоисточниками",
            TR: "Farklı ses kaynaklarıyla düzenli pratik yapın",
            IT: "Pratica regolarmente con diverse fonti audio",
            UK: "Регулярно практикуйтеся з різними аудіоджерелами",
            VI: "Luyện tập thường xuyên với các nguồn âm thanh khác nhau",
            TL: "Mag-ensayo nang regular sa iba't ibang audio sources",
            ZH: "定期用不同的音频来源练习",
            ID: "Berlatih secara teratur dengan berbagai sumber audio",
            TH: "ฝึกฝนเป็นประจำกับแหล่งเสียงที่หลากหลาย",
            MS: "Berlatih secara kerap dengan pelbagai sumber audio",
            AR: "تدرب بانتظام مع مصادر صوتية مختلفة",
          }
        },
        {
          icon: "book",
          text: {
            DE: "Erweitern Sie Ihren Wortschatz",
            FR: "Élargissez votre vocabulaire",
            EN: "Expand your vocabulary",
            ES: "Amplíe su vocabulario",
            PT: "Expanda seu vocabulário",
            PL: "Poszerzaj swoje słownictwo",
            RU: "Расширяйте свой словарный запас",
            TR: "Kelime dağarcığınızı genişletin",
            IT: "Espandi il tuo vocabolario",
            UK: "Розширюйте свій словниковий запас",
            VI: "Mở rộng từ vựng của bạn",
            TL: "Palawakin ang inyong bokabularyo",
            ZH: "扩大你的词汇量",
            ID: "Perluas kosakata Anda",
            TH: "ขยายคำศัพท์ของคุณ",
            MS: "Kembangkan perbendaharaan kata anda",
            AR: "وسع مفرداتك",
          }
        },
        {
          icon: "musical-notes",
          text: {
            DE: "Achten Sie auf Intonation und Betonung",
            FR: "Faites attention à l'intonation et à l'accent",
            EN: "Pay attention to intonation and stress",
            ES: "Preste atención a la entonación y el acento",
            PT: "Preste atenção à entonação e ao acento",
            PL: "Zwracaj uwagę na intonację i akcent",
            RU: "Обращайте внимание на интонацию и ударение",
            TR: "Tonlama ve vurguya dikkat edin",
            IT: "Fai attenzione all'intonazione e all'accento",
            UK: "Звертайте увагу на інтонацію та наголос",
            VI: "Chú ý đến ngữ điệu và trọng âm",
            TL: "Bigyang pansin ang intonasyon at diin",
            ZH: "注意语调和重音",
            ID: "Perhatikan intonasi dan penekanan",
            TH: "ให้ความสำคัญกับการออกเสียงและการเน้นเสียง",
            MS: "Beri perhatian kepada intonasi dan tekanan",
            AR: "انتبه للنبرة والتشديد",
          }
        }
      ],
      high: [
        {
          icon: "trophy",
          text: {
            DE: "Ausgezeichnet! Versuchen Sie das nächste Niveau.",
            FR: "Excellent ! Essayez le niveau suivant.",
            EN: "Excellent! Try the next level.",
            ES: "¡Excelente! Pruebe el siguiente nivel.",
            PT: "Excelente! Tente o próximo nível.",
            PL: "Doskonale! Spróbuj następnego poziomu.",
            RU: "Отлично! Попробуйте следующий уровень.",
            TR: "Mükemmel! Bir sonraki seviyeyi deneyin.",
            IT: "Eccellente! Prova il livello successivo.",
            UK: "Відмінно! Спробуйте наступний рівень.",
            VI: "Xuất sắc! Thử cấp độ tiếp theo.",
            TL: "Napakagaling! Subukan ang susunod na antas.",
            ZH: "太棒了！试试下一个级别。",
            ID: "Luar biasa! Coba level berikutnya.",
            TH: "ยอดเยี่ยม! ลองระดับถัดไป",
            MS: "Cemerlang! Cuba tahap seterusnya.",
            AR: "ممتاز! جرب المستوى التالي.",
          }
        },
        {
          icon: "globe",
          text: {
            DE: "Hören Sie authentische deutsche Medien",
            FR: "Écoutez des médias allemands authentiques",
            EN: "Listen to authentic German media",
            ES: "Escuche medios alemanes auténticos",
            PT: "Ouça mídia alemã autêntica",
            PL: "Słuchaj autentycznych niemieckich mediów",
            RU: "Слушайте аутентичные немецкие медиа",
            TR: "Otantik Alman medyasını dinleyin",
            IT: "Ascolta media tedeschi autentici",
            UK: "Слухайте автентичні німецькі медіа",
            VI: "Nghe phương tiện truyền thông Đức chính thống",
            TL: "Makinig sa tunay na German media",
            ZH: "听真正的德国媒体",
            ID: "Dengarkan media Jerman yang autentik",
            TH: "ฟังสื่อเยอรมันที่แท้จริง",
            MS: "Dengar media Jerman yang tulen",
            AR: "استمع لوسائل الإعلام الألمانية الأصيلة",
          }
        }
      ]
    };

    if (percentage < 60) return tips.low;
    if (percentage < 80) return tips.medium;
    return tips.high;
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.closeButton}>
          <Ionicons name="close" size={20} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          {/* <Text style={styles.title}>
            {translations.results[userNativeLanguage]} 
          </Text> */}
        </View>
        <TouchableOpacity>
          {/* Espace pour équilibrer le header */}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.resultsContent} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Score principal */}
        <View style={[styles.scoreCard, { backgroundColor: 'white' }]}>
          <View style={styles.scoreHeader}>
            <Ionicons name={getScoreIcon(exerciseResults.percentage)} size={32} color={'black'} />
            <Text style={styles.scoreTitle}>{getScoreMessage(exerciseResults.percentage)}</Text>
          </View>
          <Text style={styles.scorePercentage}>{exerciseResults.percentage}%</Text>
          
          
          {/* Indicateur de performance */}
          <View style={styles.performanceIndicator}>
            {exerciseResults.percentage >= 70 ? (
              <View style={styles.passedIndicator}>
                <Ionicons name="checkmark-circle" size={20} color={colors.white} />
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
          {/* <Text style={styles.detailsTitle}>
            {translations.detailedEvaluation[userNativeLanguage]}
          </Text> */}
          
          {exerciseResults.detailedResults[0].questions.map((questionResult, qIndex) => (
            <View key={qIndex} style={styles.questionResult}>
              <View style={styles.questionResultHeader}>
                <Text style={styles.questionResultTitle}>
                  {translations.questionLabel[userNativeLanguage]}{" "}
                  {exerciseResults.detailedResults[0].questions.length !== 1 ? questionResult.questionIndex : ""}
                </Text>
                <View style={[
                  styles.resultBadge,
                  { backgroundColor: colors.primary
                    // questionResult.isCorrect ? colors.success : colors.error
                   }
                ]}>
                  <Ionicons 
                    name={questionResult.isCorrect ? "checkmark" : "close"} 
                    size={16} 
                    color={colors.white} 
                  />
                </View>
              </View>
              
              <Text style={styles.questionText}>{questionResult.questionText}</Text>
              
              <View style={styles.answersComparison}>
                <View style={styles.answerRow}>
                  <Text style={styles.answerLabel}>
                    {translations.yourAnswer[userNativeLanguage]}
                  </Text>
                  <Text style={[
                    styles.answerText,
                    { color:'black'
                      // questionResult.isCorrect ? colors.success : colors.error 
                    }
                  ]}>
                    {questionResult.selectedAnswer}
                  </Text>
                </View>
                
                {!questionResult.isCorrect && (
                  <View style={styles.answerRow}>
                    <Text style={styles.answerLabel}>
                      {translations.correctAnswer[userNativeLanguage]}
                    </Text>
                    <Text style={[styles.answerText, { color: 'black' }]}>
                      {questionResult.correctAnswer}
                    </Text>
                  </View>
                )}
              </View>

              {questionResult.explanation && (
                <View style={styles.explanationBox}>
                  <View style={styles.explanationHeader}>
                    <Ionicons name="bulb-outline" size={16} color={colors.primary} />
                    <Text style={styles.explanationTitle}>
                      {translations.explanation[userNativeLanguage]}
                    </Text>
                  </View>
                  
                  {/* Explication en allemand */}
                  <Text style={styles.explanationText}>
                    {questionResult.explanation}
                  </Text>
                  
                  {/* Explication en langue natale */}
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
          ))}
        </View>

        
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
            {/* <Ionicons name="arrow-forward" size={20} color={colors.white} /> */}
            <Text style={styles.actionButtonText}>
              {translations.buttons.continue[userNativeLanguage]}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: 'black' }]} 
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6D6DB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  resultsContent: {
    backgroundColor: colors.background,
  },
  scoreCard: {
    margin: 16,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  scoreHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  scorePercentage: {
    color: 'black',
    fontSize: 48,
    fontWeight: 'bold',
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  failedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  performanceText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  detailsSection: {
    margin: 16,
    marginTop: 0,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  questionResult: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionResultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionResultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  resultBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
  explanationText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  // Styles pour l'explication native
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
  tipsSection: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  tipText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
    lineHeight: 18,
  },
  stickyButtons: {
    position: 'absolute',
    bottom: '8%',
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
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
    fontWeight: 'bold',
  },
});

export default ResultsView;