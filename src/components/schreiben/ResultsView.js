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
import SolutionCard from "./SolutionCard";

const ResultsView = ({
  selectedUbung,
  levelInfo,
  onBack,
  onRestart,
  onNext,
  userNativeLanguage = "FR",
}) => {
  // Traductions pour les éléments spécifiés
  const translations = {
    results: {
      DE: "Beispiel",
      FR: "Exemple",
      EN: "Example",
      ES: "Ejemplo",
      PT: "Exemplo",
      PL: "Przykład",
      RU: "Пример",
      TR: "Örnek",
      IT: "Esempio",
      UK: "Приклад",
      VI: "Ví dụ",
      TL: "Halimbawa",
      ZH: "例子",
      ID: "Contoh",
      TH: "ตัวอย่าง",
      MS: "Contoh",
      AR: "مثال",
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
      DE: "• Lesen Sie die Aufgabenstellung mehrmals und verstehen Sie das Hauptthema vollständig\n• Planen Sie Ihren Text vor dem Schreiben (Struktur und Hauptpunkte)\n• Verwenden Sie einfache, klare Sätze und vermeiden Sie komplizierte Konstruktionen\n• Achten Sie auf die richtige Textsorte und den passenden Stil (formal/informell)\n• Überprüfen Sie Grammatik, Rechtschreibung und Wortstellung am Ende",
      FR: "• Lisez plusieurs fois la consigne et identifiez clairement le thème principal\n• Planifiez votre texte avant d'écrire (structure et points principaux)\n• Utilisez des phrases simples et claires, évitez les constructions compliquées\n• Respectez le type de texte et le style approprié (formel/informel)\n• Vérifiez la grammaire, l'orthographe et l'ordre des mots à la fin",
      EN: "• Read the instructions several times and clearly identify the main theme\n• Plan your text before writing (structure and main points)\n• Use simple, clear sentences and avoid complicated constructions\n• Respect the text type and appropriate style (formal/informal)\n• Check grammar, spelling and word order at the end",
      ES: "• Lea las instrucciones varias veces e identifique claramente el tema principal\n• Planifique su texto antes de escribir (estructura y puntos principales)\n• Use oraciones simples y claras, evite construcciones complicadas\n• Respete el tipo de texto y el estilo apropiado (formal/informal)\n• Verifique gramática, ortografía y orden de palabras al final",
      PT: "• Leia as instruções várias vezes e identifique claramente o tema principal\n• Planeje seu texto antes de escrever (estrutura e pontos principais)\n• Use frases simples e claras, evite construções complicadas\n• Respeite o tipo de texto e o estilo apropriado (formal/informal)\n• Verifique gramática, ortografia e ordem das palavras no final",
      PL: "• Przeczytaj polecenie kilka razy i jasno zidentyfikuj główny temat\n• Zaplanuj swój tekst przed pisaniem (struktura i główne punkty)\n• Używaj prostych, jasnych zdań i unikaj skomplikowanych konstrukcji\n• Przestrzegaj typu tekstu i odpowiedniego stylu (formalny/nieformalny)\n• Sprawdź gramatykę, ortografię i szyk słów na końcu",
      RU: "• Прочитайте задание несколько раз и четко определите основную тему\n• Планируйте текст перед написанием (структура и основные пункты)\n• Используйте простые, ясные предложения, избегайте сложных конструкций\n• Соблюдайте тип текста и подходящий стиль (формальный/неформальный)\n• Проверьте грамматику, орфографию и порядок слов в конце",
      TR: "• Talimatları birkaç kez okuyun ve ana temayı net bir şekilde belirleyin\n• Yazmadan önce metninizi planlayın (yapı ve ana noktalar)\n• Basit, net cümleler kullanın, karmaşık yapılardan kaçının\n• Metin türüne ve uygun stile saygı gösterin (resmi/gayri resmi)\n• Sonunda dilbilgisi, yazım ve kelime sırasını kontrol edin",
      IT: "• Leggi le istruzioni più volte e identifica chiaramente il tema principale\n• Pianifica il tuo testo prima di scrivere (struttura e punti principali)\n• Usa frasi semplici e chiare, evita costruzioni complicate\n• Rispetta il tipo di testo e lo stile appropriato (formale/informale)\n• Controlla grammatica, ortografia e ordine delle parole alla fine",
      UK: "• Прочитайте інструкції кілька разів і чітко визначте основну тему\n• Плануйте текст перед написанням (структура та основні пункти)\n• Використовуйте прості, зрозумілі речення, уникайте складних конструкцій\n• Дотримуйтеся типу тексту та відповідного стилю (формальний/неформальний)\n• Перевірте граматику, орфографію та порядок слів наприкінці",
      VI: "• Đọc hướng dẫn nhiều lần và xác định rõ chủ đề chính\n• Lập kế hoạch cho văn bản trước khi viết (cấu trúc và điểm chính)\n• Sử dụng câu đơn giản, rõ ràng, tránh cấu trúc phức tạp\n• Tôn trọng loại văn bản và phong cách thích hợp (trang trọng/thân mật)\n• Kiểm tra ngữ pháp, chính tả và trật tự từ ở cuối",
      TL: "• Basahin ang mga tagubilin ng ilang ulit at malinaw na tukuyin ang pangunahing tema\n• Magplano ng inyong teksto bago magsulat (istraktura at mga pangunahing punto)\n• Gumamit ng mga simpleng, malinaw na pangungusap, iwasan ang mga komplikadong pagkakabuo\n• Igalang ang uri ng teksto at naaangkop na istilo (pormal/di-pormal)\n• Suriin ang gramatika, pagbabaybay at pagkakaayos ng mga salita sa dulo",
      ZH: "• 多次阅读说明并清楚识别主题\n• 写作前规划文本（结构和要点）\n• 使用简单明了的句子，避免复杂的结构\n• 遵守文本类型和适当的风格（正式/非正式）\n• 最后检查语法、拼写和词序",
      ID: "• Baca instruksi beberapa kali dan identifikasi tema utama dengan jelas\n• Rencanakan teks Anda sebelum menulis (struktur dan poin utama)\n• Gunakan kalimat sederhana dan jelas, hindari konstruksi rumit\n• Hormati jenis teks dan gaya yang tepat (formal/informal)\n• Periksa tata bahasa, ejaan, dan urutan kata di akhir",
      TH: "• อ่านคำแนะนำหลายครั้งและระบุหัวข้อหลักให้ชัดเจน\n• วางแผนข้อความก่อนเขียน (โครงสร้างและประเด็นหลัก)\n• ใช้ประโยคง่ายๆ ที่ชัดเจน หลีกเลี่ยงโครงสร้างที่ซับซ้อน\n• เคารพประเภทข้อความและสไตล์ที่เหมาะสม (เป็นทางการ/ไม่เป็นทางการ)\n• ตรวจสอบไวยากรณ์ การสะกด และลำดับคำในตอนท้าย",
      MS: "• Baca arahan beberapa kali dan kenal pasti tema utama dengan jelas\n• Rancang teks anda sebelum menulis (struktur dan perkara utama)\n• Gunakan ayat mudah dan jelas, elakkan binaan yang rumit\n• Hormati jenis teks dan gaya yang sesuai (formal/tidak formal)\n• Semak tatabahasa, ejaan dan susunan perkataan di akhir",
      AR: "• اقرأ التعليمات عدة مرات وحدد الموضوع الرئيسي بوضوح\n• خطط لنصك قبل الكتابة (الهيكل والنقاط الرئيسية)\n• استخدم جملاً بسيطة وواضحة، تجنب التراكيب المعقدة\n• احترم نوع النص والأسلوب المناسب (رسمي/غير رسمي)\n• تحقق من القواعد والإملاء وترتيب الكلمات في النهاية",
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
      AR: "سؤال",
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
    },
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
        <SolutionCard selectedUbung={selectedUbung} />

        {/* Détails par question */}
        

        {/* Conseils d'amélioration */}
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
    marginBottom: 16,
  },
  scoreTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  scorePercentage: {
    color: colors.white,
    fontSize: 48,
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
    // borderLeftWidth: 4,
    // borderLeftColor: colors.warning,
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
    fontStyle: "italic",
    opacity: 0.8,
  },
  readingPassage: {
    backgroundColor: colors.white,
    margin: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  passageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  eyeButton: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
  },
  separatorLine: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginBottom: 16,
  },
  passageText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
    marginBottom: 16,
  },
  questionCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  optionCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  optionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  optionText: {
    fontSize: 15,
    color: colors.text,
    flex: 1,
  },
});

export default ResultsView;
