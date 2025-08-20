export const userInfos={
  clientid:"",
  nativeLanguage:"FR",
  subscription:"31.12.2025",
  paiementInfos:"",
  data:{
    lesen:{
      A1:{},
      A2:{},
      B1:{},
      B2:{},
      C1:{},
      C2:{},
    },
    hoeren:{
      A1:{},
      A2:{},
      B1:{},
      B2:{},
      C1:{},
      C2:{},
    },
    schreiben:{
      A1:{},
      A2:{},
      B1:{},
      B2:{},
      C1:{},
      C2:{},
    },
    sprechen:{
      A1:{},
      A2:{},
      B1:{},
      B2:{},
      C1:{},
      C2:{},
    },
    vokabeln:{
      A1:{},
      A2:{},
      B1:{},
      B2:{},
      C1:{},
      C2:{},
    },
    grammar:{
      A1:{},
      A2:{},
      B1:{},
      B2:{},
      C1:{},
      C2:{},
    }
  }
}



export const Fahigkeiten = {
  lesen: {
    A1: [
      {
        id: "q1",
        well_Answered: false,
        Text: "Als ich jünger war, habe ich einen sehr großen Fehler gemacht. Ich dachte, dass ich alles wusste und hörte nicht auf die Ratschläge meiner Eltern. Sie warnten mich vor meinen falschen Freunden, aber ich ignorierte ihre Worte. Später musste ich lernen, dass meine Eltern recht hatten.",
        questions: [
          {
            title: "Was dachte die Person, als sie jünger war?",
            options: [
              { id: "a", text: "Dass sie nichts wusste", isCorrect: false },
              { id: "b", text: "Dass sie alles wusste", isCorrect: true },
              { id: "c", text: "Dass sie Hilfe brauchte", isCorrect: false },
              { id: "d", text: "Dass sie studieren sollte", isCorrect: false },
            ],
            explanation:
              "Der Text sagt deutlich 'Ich dachte, dass ich alles wusste'.",
            languages_Explanations: {
              FR: "Le texte dit clairement 'Je pensais que je savais tout'.",
              EN: "The text clearly says 'I thought I knew everything'.",
              ES: "El texto dice claramente 'Pensé que lo sabía todo'.",
              PT: "O texto diz claramente 'Eu pensava que sabia tudo'.",
              PL: "Tekst wyraźnie mówi 'Myślałem, że wszystko wiem'.",
              RU: "В тексте ясно сказано 'Я думал, что знаю всё'.",
              TR: "Metin açıkça 'Her şeyi bildiğimi sanıyordum' diyor.",
              IT: "Il testo dice chiaramente 'Pensavo di sapere tutto'.",
              UK: "У тексті чітко сказано 'Я думав, що знаю все'.",
              VI: "Văn bản nói rõ ràng 'Tôi nghĩ rằng tôi biết tất cả'.",
              TL: "Malinaw na sinasabi ng teksto 'Akala ko alam ko ang lahat'.",
              ZH: '文本清楚地说"我以为我什么都知道"。',
              ID: "Teks dengan jelas mengatakan 'Saya pikir saya tahu segalanya'.",
              TH: "ข้อความระบุอย่างชัดเจนว่า 'ฉันคิดว่าฉันรู้ทุกอย่าง'",
              MS: "Teks dengan jelas menyatakan 'Saya fikir saya tahu segala-galanya'.",
              AR: "النص يقول بوضوح 'كنت أعتقد أنني أعرف كل شيء'.",
            },
          },
        ],
      },
      {
        id: "q2",
        well_Answered: false,
        Text: "Maria arbeitet in einem kleinen Café in der Stadtmitte. Jeden Morgen um 7 Uhr öffnet sie das Café und bereitet den ersten Kaffee vor. Die meisten Kunden kommen zwischen 8 und 9 Uhr, bevor sie zur Arbeit gehen. Maria kennt fast alle ihre Stammkunden und weiß, was sie trinken möchten.",
        questions: [
          {
            title: "Um welche Uhrzeit öffnet Maria das Café?",
            options: [
              { id: "a", text: "Um 6 Uhr", isCorrect: false },
              { id: "b", text: "Um 7 Uhr", isCorrect: true },
              { id: "c", text: "Um 8 Uhr", isCorrect: false },
              { id: "d", text: "Um 9 Uhr", isCorrect: false },
            ],
            explanation:
              "Der Text sagt 'Jeden Morgen um 7 Uhr öffnet sie das Café'.",
            languages_Explanations: {
              FR: "Le texte dit 'Chaque matin à 7 heures, elle ouvre le café'.",
              EN: "The text says 'Every morning at 7 o'clock she opens the café'.",
              ES: "El texto dice 'Cada mañana a las 7 abre el café'.",
              PT: "O texto diz 'Toda manhã às 7 horas ela abre o café'.",
              PL: "Tekst mówi 'Codziennie rano o 7 otwiera kawiarnię'.",
              RU: "В тексте сказано 'Каждое утро в 7 часов она открывает кафе'.",
              TR: "Metin 'Her sabah saat 7'de kafeyi açıyor' diyor.",
              IT: "Il testo dice 'Ogni mattina alle 7 apre il caffè'.",
              UK: "У тексті сказано 'Щоранку о 7 годині вона відкриває кафе'.",
              VI: "Văn bản nói 'Mỗi sáng lúc 7 giờ cô ấy mở quán cà phê'.",
              TL: "Sinasabi ng teksto 'Tuwing umaga ng alas-7 binubuksan niya ang café'.",
              ZH: "文本说'每天早上7点她开咖啡馆'。",
              ID: "Teks mengatakan 'Setiap pagi jam 7 dia membuka kafe'.",
              TH: "ข้อความบอกว่า 'ทุกเช้าตอน 7 โมงเธอเปิดร้านกาแฟ'",
              MS: "Teks berkata 'Setiap pagi pada jam 7 dia membuka kafe'.",
              AR: "يقول النص 'كل صباح في الساعة 7 تفتح المقهى'.",
            },
          },
          {
            title: "Wann kommen die meisten Kunden?",
            options: [
              { id: "a", text: "Zwischen 7 und 8 Uhr", isCorrect: false },
              { id: "b", text: "Zwischen 8 und 9 Uhr", isCorrect: true },
              { id: "c", text: "Zwischen 9 und 10 Uhr", isCorrect: false },
              { id: "d", text: "Nach 10 Uhr", isCorrect: false },
            ],
            explanation:
              "Der Text erklärt 'Die meisten Kunden kommen zwischen 8 und 9 Uhr'.",
            languages_Explanations: {
              FR: "Le texte explique 'La plupart des clients viennent entre 8 et 9 heures'.",
              EN: "The text explains 'Most customers come between 8 and 9 o'clock'.",
              ES: "El texto explica 'La mayoría de los clientes vienen entre las 8 y las 9'.",
              PT: "O texto explica 'A maioria dos clientes vem entre 8 e 9 horas'.",
              PL: "Tekst wyjaśnia 'Większość klientów przychodzi między 8 a 9 rano'.",
              RU: "В тексте объясняется 'Большинство клиентов приходит между 8 и 9 часами'.",
              TR: "Metin 'Müşterilerin çoğu saat 8-9 arası geliyor' diye açıklıyor.",
              IT: "Il testo spiega 'La maggior parte dei clienti viene tra le 8 e le 9'.",
              UK: "У тексті пояснюється 'Більшість клієнтів приходить між 8 і 9 годиною'.",
              VI: "Văn bản giải thích 'Hầu hết khách hàng đến từ 8 đến 9 giờ'.",
              TL: "Ipinaliwanag ng teksto 'Karamihan ng mga customer ay dumarating sa pagitan ng 8 at 9'.",
              ZH: "文本解释说'大多数顾客在8点到9点之间来'。",
              ID: "Teks menjelaskan 'Sebagian besar pelanggan datang antara jam 8 dan 9'.",
              TH: "ข้อความอธิบายว่า 'ลูกค้าส่วนใหญ่มาระหว่าง 8 โมงถึง 9 โมง'",
              MS: "Teks menerangkan 'Kebanyakan pelanggan datang antara jam 8 dan 9'.",
              AR: "يوضح النص 'معظم العملاء يأتون بين الساعة 8 و 9'.",
            },
          },
        ],
      },
      {
        id: "q3",
        well_Answered: false,
        Text: "Der Park in unserer Stadt ist sehr schön. Er hat einen großen See, viele Bäume und bunte Blumen. Im Sommer kommen viele Familien zum Picknick. Kinder spielen auf dem Spielplatz, während ihre Eltern im Schatten sitzen und sich entspannen.",
        questions: [
          {
            title: "Was gibt es im Park?",
            options: [
              { id: "a", text: "Nur Bäume", isCorrect: false },
              { id: "b", text: "Einen See, Bäume und Blumen", isCorrect: true },
              { id: "c", text: "Nur einen Spielplatz", isCorrect: false },
              { id: "d", text: "Nur einen See", isCorrect: false },
            ],
            explanation:
              "Der Text erwähnt 'einen großen See, viele Bäume und bunte Blumen'.",
            languages_Explanations: {
              FR: "Le texte mentionne 'un grand lac, beaucoup d'arbres et des fleurs colorées'.",
              EN: "The text mentions 'a large lake, many trees and colorful flowers'.",
              ES: "El texto menciona 'un gran lago, muchos árboles y flores coloridas'.",
              PT: "O texto menciona 'um grande lago, muitas árvores e flores coloridas'.",
              PL: "Tekst wspomina 'duże jezioro, wiele drzew i kolorowe kwiaty'.",
              RU: "В тексте упоминается 'большое озеро, много деревьев и цветные цветы'.",
              TR: "Metin 'büyük bir göl, çok sayıda ağaç ve renkli çiçekler' den bahsediyor.",
              IT: "Il testo menziona 'un grande lago, molti alberi e fiori colorati'.",
              UK: "У тексті згадується 'велике озеро, багато дерев та барвисті квіти'.",
              VI: "Văn bản đề cập đến 'một hồ lớn, nhiều cây và những bông hoa đầy màu sắc'.",
              TL: "Binabanggit ng teksto ang 'malaking lawa, maraming puno at makulay na bulaklak'.",
              ZH: "文本提到'一个大湖、许多树木和彩色花朵'。",
              ID: "Teks menyebutkan 'sebuah danau besar, banyak pohon dan bunga-bunga berwarna'.",
              TH: "ข้อความกล่าวถึง 'ทะเลสาบใหญ่ ต้นไม้มากมาย และดอกไม้หลากสี'",
              MS: "Teks menyebut 'sebuah tasik besar, banyak pokok dan bunga-bunga berwarna'.",
              AR: "يذكر النص 'بحيرة كبيرة وأشجار كثيرة وزهور ملونة'.",
            },
          },
        ],
      },
      {
        id: "q4",
        well_Answered: false,
        Text: "Thomas ist Lehrer an einer Grundschule. Er unterrichtet Deutsch und Mathematik. Seine Schüler sind zwischen 6 und 10 Jahre alt. Thomas mag seinen Beruf sehr, weil er gerne mit Kindern arbeitet. Nach der Schule hilft er manchmal Schülern bei den Hausaufgaben.",
        questions: [
          {
            title: "Was unterrichtet Thomas?",
            options: [
              { id: "a", text: "Nur Deutsch", isCorrect: false },
              { id: "b", text: "Deutsch und Mathematik", isCorrect: true },
              { id: "c", text: "Nur Mathematik", isCorrect: false },
              { id: "d", text: "Sport und Musik", isCorrect: false },
            ],
            explanation:
              "Der Text sagt klar 'Er unterrichtet Deutsch und Mathematik'.",
            languages_Explanations: {
              FR: "Le texte dit clairement 'Il enseigne l'allemand et les mathématiques'.",
              EN: "The text clearly says 'He teaches German and mathematics'.",
              ES: "El texto dice claramente 'Enseña alemán y matemáticas'.",
              PT: "O texto diz claramente 'Ele ensina alemão e matemática'.",
              PL: "Tekst wyraźnie mówi 'Uczy niemieckiego i matematyki'.",
              RU: "В тексте ясно сказано 'Он преподает немецкий язык и математику'.",
              TR: "Metin açıkça 'Almanca ve matematik öğretiyor' diyor.",
              IT: "Il testo dice chiaramente 'Insegna tedesco e matematica'.",
              UK: "У тексті чітко сказано 'Він викладає німецьку мову та математику'.",
              VI: "Văn bản nói rõ ràng 'Anh ấy dạy tiếng Đức và toán học'.",
              TL: "Malinaw na sinasabi ng teksto 'Nagtuturo siya ng German at matematika'.",
              ZH: "文本清楚地说'他教德语和数学'。",
              ID: "Teks dengan jelas mengatakan 'Dia mengajar bahasa Jerman dan matematika'.",
              TH: "ข้อความระบุอย่างชัดเจนว่า 'เขาสอนภาษาเยอรมันและคณิตศาสตร์'",
              MS: "Teks dengan jelas menyatakan 'Dia mengajar bahasa Jerman dan matematik'.",
              AR: "ينص النص بوضوح 'يدرّس الألمانية والرياضيات'.",
            },
          },
        ],
      },
    ],
    A2: [
      {
        id: "q1",
        well_Answered: false,
        Text: "Lisa plant ihre erste Reise nach Deutschland. Sie möchte drei Wochen bleiben und verschiedene Städte besuchen. Zuerst will sie nach Berlin, dann nach München und zum Schluss nach Hamburg. Sie hat schon ein Hotel in Berlin gebucht, aber für die anderen Städte sucht sie noch Unterkünfte. Lisa lernt seit zwei Jahren Deutsch und hofft, dass sie sich gut verständigen kann.",
        questions: [
          {
            title: "Wie lange möchte Lisa in Deutschland bleiben?",
            options: [
              { id: "a", text: "Zwei Wochen", isCorrect: false },
              { id: "b", text: "Drei Wochen", isCorrect: true },
              { id: "c", text: "Einen Monat", isCorrect: false },
              { id: "d", text: "Zwei Monate", isCorrect: false },
            ],
            explanation: "Der Text sagt 'Sie möchte drei Wochen bleiben'.",
            languages_Explanations: {
              FR: "Le texte dit 'Elle veut rester trois semaines'.",
              EN: "The text says 'She wants to stay three weeks'.",
              ES: "El texto dice 'Quiere quedarse tres semanas'.",
              PT: "O texto diz 'Ela quer ficar três semanas'.",
              PL: "Tekst mówi 'Chce zostać przez trzy tygodnie'.",
              RU: "В тексте сказано 'Она хочет остаться на три недели'.",
              TR: "Metin 'Üç hafta kalmak istiyor' diyor.",
              IT: "Il testo dice 'Vuole rimanere tre settimane'.",
              UK: "У тексті сказано 'Вона хоче залишитися на три тижні'.",
              VI: "Văn bản nói 'Cô ấy muốn ở lại ba tuần'.",
              TL: "Sinasabi ng teksto 'Gustong manatili ng tatlong linggo'.",
              ZH: "文本说'她想待三个星期'。",
              ID: "Teks mengatakan 'Dia ingin tinggal selama tiga minggu'.",
              TH: "ข้อความบอกว่า 'เธออยากอยู่สามสัปดาห์'",
              MS: "Teks berkata 'Dia mahu tinggal selama tiga minggu'.",
              AR: "يقول النص 'تريد البقاء لمدة ثلاثة أسابيع'.",
            },
          },
          {
            title: "Wie lange lernt Lisa schon Deutsch?",
            options: [
              { id: "a", text: "Ein Jahr", isCorrect: false },
              { id: "b", text: "Zwei Jahre", isCorrect: true },
              { id: "c", text: "Drei Jahre", isCorrect: false },
              { id: "d", text: "Vier Jahre", isCorrect: false },
            ],
            explanation:
              "Lisa lernt seit zwei Jahren Deutsch, wie im Text erwähnt.",
            languages_Explanations: {
              FR: "Lisa apprend l'allemand depuis deux ans, comme mentionné dans le texte.",
              EN: "Lisa has been learning German for two years, as mentioned in the text.",
              ES: "Lisa aprende alemán desde hace dos años, como se menciona en el texto.",
              PT: "Lisa aprende alemão há dois anos, como mencionado no texto.",
              PL: "Lisa uczy się niemieckiego od dwóch lat, jak wspomniano w tekście.",
              RU: "Лиза изучает немецкий язык уже два года, как упоминается в тексте.",
              TR: "Lisa iki yıldır Almanca öğreniyor, metinde belirtildiği gibi.",
              IT: "Lisa studia tedesco da due anni, come menzionato nel testo.",
              UK: "Ліза вивчає німецьку мову вже два роки, як зазначено в тексті.",
              VI: "Lisa đã học tiếng Đức được hai năm, như được đề cập trong văn bản.",
              TL: "Nag-aaral si Lisa ng German ng dalawang taon na, tulad ng nabanggit sa teksto.",
              ZH: "正如文本中提到的，丽莎已经学德语两年了。",
              ID: "Lisa telah belajar bahasa Jerman selama dua tahun, seperti disebutkan dalam teks.",
              TH: "ลิซ่าเรียนภาษาเยอรมันมาสองปีแล้ว ตามที่กล่าวไว้ในข้อความ",
              MS: "Lisa telah belajar bahasa Jerman selama dua tahun, seperti yang dinyatakan dalam teks.",
              AR: "تتعلم ليزا الألمانية منذ عامين، كما ذُكر في النص.",
            },
          },
        ],
      },
    ],
    B1: [
      {
        id: "q1",
        well_Answered: false,
        Text: "Die Digitalisierung verändert unsere Arbeitswelt grundlegend. Viele traditionelle Berufe werden durch Automatisierung ersetzt, gleichzeitig entstehen aber auch neue Arbeitsplätze im Technologiebereich. Unternehmen müssen ihre Mitarbeiter weiterbilden, um mit dieser Entwicklung Schritt zu halten. Experten sind sich einig, dass lebenslanges Lernen in Zukunft noch wichtiger wird.",
        questions: [
          {
            title: "Was passiert mit traditionellen Berufen?",
            options: [
              {
                id: "a",
                text: "Sie werden alle verschwinden",
                isCorrect: false,
              },
              {
                id: "b",
                text: "Viele werden durch Automatisierung ersetzt",
                isCorrect: true,
              },
              { id: "c", text: "Sie bleiben unverändert", isCorrect: false },
              { id: "d", text: "Sie werden wichtiger", isCorrect: false },
            ],
            explanation:
              "Der Text erklärt, dass viele traditionelle Berufe durch Automatisierung ersetzt werden.",
            languages_Explanations: {
              FR: "Le texte explique que de nombreux métiers traditionnels sont remplacés par l'automatisation.",
              EN: "The text explains that many traditional jobs are being replaced by automation.",
              ES: "El texto explica que muchos trabajos tradicionales son reemplazados por la automatización.",
              PT: "O texto explica que muitos empregos tradicionais estão sendo substituídos pela automação.",
              PL: "Tekst wyjaśnia, że wiele tradycyjnych zawodów zostaje zastąpionych przez automatyzację.",
              RU: "В тексте объясняется, что многие традиционные профессии заменяются автоматизацией.",
              TR: "Metin, birçok geleneksel mesleğin otomasyon tarafından değiştirildiğini açıklıyor.",
              IT: "Il testo spiega che molti lavori tradizionali vengono sostituiti dall'automazione.",
              UK: "У тексті пояснюється, що багато традиційних професій замінюються автоматизацією.",
              VI: "Văn bản giải thích rằng nhiều nghề truyền thống đang được thay thế bởi tự động hóa.",
              TL: "Ipinaliwanag ng teksto na maraming tradisyonal na trabaho ay napapalitan ng automation.",
              ZH: "文本解释说许多传统职业正被自动化所取代。",
              ID: "Teks menjelaskan bahwa banyak pekerjaan tradisional digantikan oleh otomatisasi.",
              TH: "ข้อความอธิบายว่าอาชีพดั้งเดิมหลายอย่างถูกแทนที่ด้วยระบบอัตโนมัติ",
              MS: "Teks menerangkan bahawa banyak pekerjaan tradisional digantikan oleh automasi.",
              AR: "يوضح النص أن العديد من المهن التقليدية يتم استبدالها بالأتمتة.",
            },
          },
        ],
      },
    ],
    B2: [
      {
        id: "q1",
        well_Answered: false,
        Text: "Der Klimawandel stellt eine der größten Herausforderungen unserer Zeit dar. Wissenschaftler warnen vor irreversiblen Schäden, falls nicht schnell gehandelt wird. Die internationale Gemeinschaft hat sich verpflichtet, die Erderwärmung auf unter 2 Grad Celsius zu begrenzen. Dafür sind drastische Maßnahmen zur Reduktion von Treibhausgasen erforderlich. Gleichzeitig müssen alternative Energiequellen massiv ausgebaut werden.",
        questions: [
          {
            title:
              "Auf welche Temperatur soll die Erderwärmung begrenzt werden?",
            options: [
              { id: "a", text: "Unter 1 Grad Celsius", isCorrect: false },
              { id: "b", text: "Unter 2 Grad Celsius", isCorrect: true },
              { id: "c", text: "Unter 3 Grad Celsius", isCorrect: false },
              { id: "d", text: "Unter 4 Grad Celsius", isCorrect: false },
            ],
            explanation:
              "Der Text erwähnt das Ziel, die Erderwärmung auf unter 2 Grad Celsius zu begrenzen.",
            languages_Explanations: {
              FR: "Le texte mentionne l'objectif de limiter le réchauffement climatique à moins de 2 degrés Celsius.",
              EN: "The text mentions the goal of limiting global warming to under 2 degrees Celsius.",
              ES: "El texto menciona el objetivo de limitar el calentamiento global a menos de 2 grados Celsius.",
              PT: "O texto menciona o objetivo de limitar o aquecimento global a menos de 2 graus Celsius.",
              PL: "Tekst wspomina cel ograniczenia globalnego ocieplenia do poniżej 2 stopni Celsjusza.",
              RU: "В тексте упоминается цель ограничить глобальное потепление до менее 2 градусов Цельсия.",
              TR: "Metin, küresel ısınmanın 2 santigrat derecenin altında sınırlandırılması hedefini belirtiyor.",
              IT: "Il testo menziona l'obiettivo di limitare il riscaldamento globale a meno di 2 gradi Celsius.",
              UK: "У тексті згадується мета обмежити глобальне потепління до менш ніж 2 градусів Цельсія.",
              VI: "Văn bản đề cập đến mục tiêu hạn chế sự nóng lên toàn cầu dưới 2 độ C.",
              TL: "Binabanggit ng teksto ang layuning limitahan ang global warming sa ilalim ng 2 degrees Celsius.",
              ZH: "文本提到了将全球变暖限制在2摄氏度以下的目标。",
              ID: "Teks menyebutkan tujuan membatasi pemanasan global di bawah 2 derajat Celsius.",
              TH: "ข้อความกล่าวถึงเป้าหมายการจำกัดภาวะโลกร้อนให้ต่ำกว่า 2 องศาเซลเซียส",
              MS: "Teks menyebut matlamat untuk mengehadkan pemanasan global kepada bawah 2 darjah Celsius.",
              AR: "يذكر النص هدف الحد من الاحتباس الحراري إلى أقل من درجتين مئويتين.",
            },
          },
        ],
      },
    ],
    C1: [
      {
        id: "q1",
        well_Answered: false,
        Text: "Die Philosophie der Aufklärung prägte das 18. Jahrhundert nachhaltig. Denker wie Kant, Voltaire und Rousseau hinterfragten traditionelle Autoritäten und propagierten die Macht der Vernunft. Ihr Einfluss reichte weit über akademische Kreise hinaus und trug zur Entstehung moderner demokratischer Systeme bei. Die Aufklärung betonte die Wichtigkeit individueller Rechte und stellte das Konzept der Gewaltenteilung vor.",
        questions: [
          {
            title: "Was charakterisierte die Philosophie der Aufklärung?",
            options: [
              {
                id: "a",
                text: "Unterstützung traditioneller Autoritäten",
                isCorrect: false,
              },
              {
                id: "b",
                text: "Hinterfragung traditioneller Autoritäten und Betonung der Vernunft",
                isCorrect: true,
              },
              {
                id: "c",
                text: "Ablehnung individueller Rechte",
                isCorrect: false,
              },
              {
                id: "d",
                text: "Förderung monarchischer Systeme",
                isCorrect: false,
              },
            ],
            explanation:
              "Die Aufklärer hinterfragten traditionelle Autoritäten und propagierten die Macht der Vernunft.",
            languages_Explanations: {
              FR: "Les philosophes des Lumières remettaient en question les autorités traditionnelles et prônaient le pouvoir de la raison.",
              EN: "Enlightenment philosophers questioned traditional authorities and advocated the power of reason.",
              ES: "Los filósofos de la Ilustración cuestionaron las autoridades tradicionales y defendieron el poder de la razón.",
              PT: "Os filósofos do Iluminismo questionaram as autoridades tradicionais e defenderam o poder da razão.",
              PL: "Filozofowie oświecenia kwestionowali tradycyjne autorytety i propagowali moc rozumu.",
              RU: "Философы Просвещения ставили под сомнение традиционные авторитеты и проповедовали силу разума.",
              TR: "Aydınlanma filozofları geleneksel otoriteleri sorguladı ve aklın gücünü savundu.",
              IT: "I filosofi dell'Illuminismo mettevano in discussione le autorità tradizionali e sostenevano il potere della ragione.",
              UK: "Філософи Просвітництва ставили під сумнів традиційні авторитети та проповідували силу розуму.",
              VI: "Các triết gia Khai sáng đặt câu hỏi về các thẩm quyền truyền thống và ủng hộ sức mạnh của lý trí.",
              TL: "Ang mga pilosopong Enlightenment ay nag-tanong sa tradisyonal na mga awtoridad at itinataguyod ang kapangyarihan ng pag-iisip.",
              ZH: "启蒙哲学家质疑传统权威并宣扬理性的力量。",
              ID: "Para filsuf Pencerahan mempertanyakan otoritas tradisional dan memperjuangkan kekuatan akal.",
              TH: "นักปรัชญายุคแสงธรรมตั้งคำถามต่ออำนาจดั้งเดิมและสนับสนุนพลังแห่งเหตุผล",
              MS: "Ahli falsafah Pencerahan mempersoalkan autoriti tradisional dan menyokong kuasa akal.",
              AR: "فلاسفة التنوير شككوا في السلطات التقليدية ودعوا إلى قوة العقل.",
            },
          },
        ],
      },
    ],
    C2: [
      {
        id: "q1",
        well_Answered: false,
        Text: "Die postmoderne Literaturtheorie stellt fundamentale Annahmen über Autorschaft, Textualität und Bedeutung in Frage. Theoretiker wie Derrida und Foucault argumentieren, dass Texte nicht eine einzige, vom Autor intendierte Bedeutung besitzen, sondern durch den Interpretationsprozess des Lesers konstituiert werden. Diese Perspektive unterminiert traditionelle hermeneutische Ansätze und eröffnet neue Möglichkeiten für die Textanalyse.",
        questions: [
          {
            title:
              "Was argumentieren postmoderne Theoretiker über Textbedeutung?",
            options: [
              {
                id: "a",
                text: "Texte haben eine einzige, vom Autor bestimmte Bedeutung",
                isCorrect: false,
              },
              {
                id: "b",
                text: "Bedeutung wird durch den Interpretationsprozess des Lesers konstituiert",
                isCorrect: true,
              },
              {
                id: "c",
                text: "Nur Experten können Texte richtig interpretieren",
                isCorrect: false,
              },
              {
                id: "d",
                text: "Textbedeutung ist unwichtig",
                isCorrect: false,
              },
            ],
            explanation:
              "Postmoderne Theoretiker argumentieren, dass Bedeutung durch den Interpretationsprozess des Lesers konstituiert wird.",
            languages_Explanations: {
              FR: "Les théoriciens postmodernes soutiennent que le sens est constitué par le processus d'interprétation du lecteur.",
              EN: "Postmodern theorists argue that meaning is constituted through the reader's interpretation process.",
              ES: "Los teóricos posmodernos argumentan que el significado se constituye a través del proceso de interpretación del lector.",
              PT: "Os teóricos pós-modernos argumentam que o significado é constituído através do processo de interpretação do leitor.",
              PL: "Teoretycy postmoderniści argumentują, że znaczenie jest konstituowane przez proces interpretacji czytelnika.",
              RU: "Постмодернистские теоретики утверждают, что смысл составляется через процесс интерпретации читателя.",
              TR: "Postmodern teorisyenler, anlamın okuyucunun yorumlama süreci yoluyla oluşturulduğunu savunuyor.",
              IT: "I teorici postmoderni sostengono che il significato è costituito attraverso il processo di interpretazione del lettore.",
              UK: "Постмодерністські теоретики стверджують, що значення складається через процес інтерпретації читача.",
              VI: "Các nhà lý thuyết hậu hiện đại cho rằng ý nghĩa được cấu thành thông qua quá trình diễn giải của người đọc.",
              TL: "Sinasabi ng mga postmodern na theorist na ang kahulugan ay nabubuo sa pamamagitan ng proseso ng interpretasyon ng mambabasa.",
              ZH: "后现代理论家认为意义是通过读者的解释过程构成的。",
              ID: "Para teoretikus postmodern berargumen bahwa makna dikonstruksi melalui proses interpretasi pembaca.",
              TH: "นักทฤษฎีหลังสมัยใหม่แย้งว่าความหมายถูกสร้างขึ้นผ่านกระบวนการตีความของผู้อ่าน",
              MS: "Ahli teori pascamoden berhujah bahawa makna dibentuk melalui proses tafsiran pembaca.",
              AR: "يحتج المنظرون ما بعد الحداثيون أن المعنى يتشكل من خلال عملية تفسير القارئ.",
            },
          },
        ],
      },
    ],
  },
  hoeren: {
    A1: [
      {
        id: "q1",
        well_Answered: false,
        audioUrl:
          "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
        questions: [
          {
            title: "Was möchte der Kunde trinken?",
            options: [
              { id: "a", text: "Ein Bier", isCorrect: false },
              { id: "b", text: "Einen Kaffee", isCorrect: true },
              { id: "c", text: "Ein Wasser", isCorrect: false },
              { id: "d", text: "Einen Tee", isCorrect: false },
            ],
            explanation:
              "Der Kunde sagt deutlich 'Einen Kaffee, bitte' um 0:15 im Audio.",
            languages_Explanations: {
              FR: "Le client dit clairement 'Un café, s'il vous plaît' à 0:15 dans l'audio.",
              EN: "The customer clearly says 'A coffee, please' at 0:15 in the audio.",
              ES: "El cliente dice claramente 'Un café, por favor' a los 0:15 en el audio.",
              PT: "O cliente diz claramente 'Um café, por favor' aos 0:15 no áudio.",
              PL: "Klient wyraźnie mówi 'Proszę kawę' w 0:15 nagrania.",
              RU: "Клиент четко говорит 'Кофе, пожалуйста' в 0:15 аудио.",
              TR: "Müşteri 0:15'te ses kaydında açıkça 'Bir kahve, lütfen' diyor.",
              IT: "Il cliente dice chiaramente 'Un caffè, per favore' a 0:15 nell'audio.",
              UK: "Клієнт чітко каже 'Каву, будь ласка' на 0:15 аудіо.",
              VI: "Khách hàng nói rõ ràng 'Một ly cà phê, làm ơn' ở 0:15 trong âm thanh.",
              TL: "Malinaw na sinasabi ng customer ang 'Isang kape, pakisuyo' sa 0:15 ng audio.",
              ZH: "顾客在音频0:15处清楚地说'请来一杯咖啡'。",
              ID: "Pelanggan dengan jelas mengatakan 'Satu kopi, tolong' pada 0:15 di audio.",
              TH: "ลูกค้าพูดอย่างชัดเจนว่า 'ขอกาแฟหนึ่งแก้วครับ' ที่ 0:15 ในเสียง",
              MS: "Pelanggan dengan jelas berkata 'Satu kopi, tolong' pada 0:15 dalam audio.",
              AR: "يقول العميل بوضوح 'قهوة واحدة، من فضلك' في 0:15 من الصوت.",
            },
          },
        ],
      },
      {
        id: "q2",
        well_Answered: false,
        audioUrl:
          "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
        questions: [
          {
            title: "Was möchte der Kunde trinken?",
            options: [
              { id: "a", text: "Ein Bier", isCorrect: false },
              { id: "b", text: "Einen Kaffee", isCorrect: true },
              { id: "c", text: "Ein Wasser", isCorrect: false },
              { id: "d", text: "Einen Tee", isCorrect: false },
            ],
            explanation:
              "Der Kunde sagt deutlich 'Einen Kaffee, bitte' um 0:15 im Audio.",
            languages_Explanations: {
              FR: "Le client dit clairement 'Un café, s'il vous plaît' à 0:15 dans l'audio.",
              EN: "The customer clearly says 'A coffee, please' at 0:15 in the audio.",
              ES: "El cliente dice claramente 'Un café, por favor' a los 0:15 en el audio.",
              PT: "O cliente diz claramente 'Um café, por favor' aos 0:15 no áudio.",
              PL: "Klient wyraźnie mówi 'Proszę kawę' w 0:15 nagrania.",
              RU: "Клиент четко говорит 'Кофе, пожалуйста' в 0:15 аудио.",
              TR: "Müşteri 0:15'te ses kaydında açıkça 'Bir kahve, lütfen' diyor.",
              IT: "Il cliente dice chiaramente 'Un caffè, per favore' a 0:15 nell'audio.",
              UK: "Клієнт чітко каже 'Каву, будь ласка' на 0:15 аудіо.",
              VI: "Khách hàng nói rõ ràng 'Một ly cà phê, làm ơn' ở 0:15 trong âm thanh.",
              TL: "Malinaw na sinasabi ng customer ang 'Isang kape, pakisuyo' sa 0:15 ng audio.",
              ZH: "顾客在音频0:15处清楚地说'请来一杯咖啡'。",
              ID: "Pelanggan dengan jelas mengatakan 'Satu kopi, tolong' pada 0:15 di audio.",
              TH: "ลูกค้าพูดอย่างชัดเจนว่า 'ขอกาแฟหนึ่งแก้วครับ' ที่ 0:15 ในเสียง",
              MS: "Pelanggan dengan jelas berkata 'Satu kopi, tolong' pada 0:15 dalam audio.",
              AR: "يقول العميل بوضوح 'قهوة واحدة، من فضلك' في 0:15 من الصوت.",
            },
          },
        ],
      },
      {
        id: "q3",
        well_Answered: false,
        audioUrl:
          "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
        questions: [
          {
            title: "Was möchte der Kunde trinken?",
            options: [
              { id: "a", text: "Ein Bier", isCorrect: false },
              { id: "b", text: "Einen Kaffee", isCorrect: true },
              { id: "c", text: "Ein Wasser", isCorrect: false },
              { id: "d", text: "Einen Tee", isCorrect: false },
            ],
            explanation:
              "Der Kunde sagt deutlich 'Einen Kaffee, bitte' um 0:15 im Audio.",
            languages_Explanations: {
              FR: "Le client dit clairement 'Un café, s'il vous plaît' à 0:15 dans l'audio.",
              EN: "The customer clearly says 'A coffee, please' at 0:15 in the audio.",
              ES: "El cliente dice claramente 'Un café, por favor' a los 0:15 en el audio.",
              PT: "O cliente diz claramente 'Um café, por favor' aos 0:15 no áudio.",
              PL: "Klient wyraźnie mówi 'Proszę kawę' w 0:15 nagrania.",
              RU: "Клиент четко говорит 'Кофе, пожалуйста' в 0:15 аудио.",
              TR: "Müşteri 0:15'te ses kaydında açıkça 'Bir kahve, lütfen' diyor.",
              IT: "Il cliente dice chiaramente 'Un caffè, per favore' a 0:15 nell'audio.",
              UK: "Клієнт чітко каже 'Каву, будь ласка' на 0:15 аудіо.",
              VI: "Khách hàng nói rõ ràng 'Một ly cà phê, làm ơn' ở 0:15 trong âm thanh.",
              TL: "Malinaw na sinasabi ng customer ang 'Isang kape, pakisuyo' sa 0:15 ng audio.",
              ZH: "顾客在音频0:15处清楚地说'请来一杯咖啡'。",
              ID: "Pelanggan dengan jelas mengatakan 'Satu kopi, tolong' pada 0:15 di audio.",
              TH: "ลูกค้าพูดอย่างชัดเจนว่า 'ขอกาแฟหนึ่งแก้วครับ' ที่ 0:15 ในเสียง",
              MS: "Pelanggan dengan jelas berkata 'Satu kopi, tolong' pada 0:15 dalam audio.",
              AR: "يقول العميل بوضوح 'قهوة واحدة، من فضلك' في 0:15 من الصوت.",
            },
          },
        ],
      },
    ],
    A2: [],
    B1: [],
    B2: [],
    C1: [],
    C2: [],
  },
  schreiben: {
    A1: [
      {
        id: "q1",
        well_Answered: false,
        Text: "Sie können heute Abend nicht zum Kino gehen. Schreiben Sie eine SMS an Ihren Freund Tom.",
        Tipps: [
          "Entschuldigen Sie sich höflich für die Absage",
          "Erklären Sie kurz den Grund (krank, Arbeit, Familie)",
          "Schlagen Sie einen neuen Termin vor",
        ],
        questionType: "SMS",
        solution: {
          anrede: "Hallo Tom!",
          hauptteil: [
            "Ich kann heute Abend nicht ins Kino kommen.Ich bin krank. Tut mir leid!Können wir morgen gehen?"],
          grussformel: "Liebe Grüße",
          unterschrift: "Anna",
        },

       
      },
      {
        id: "q2",
        well_Answered: false,
        Text: ["Anmeldeformular - Deutschkurs","Füllen Sie das Formular aus."],
        Tipps: [
          "Schreiben Sie alle persönlichen Informationen vollständig und korrekt",
          "Verwenden Sie die richtige deutsche Schreibweise für Datum und Telefonnummer",
          "Achten Sie auf korrekte Groß- und Kleinschreibung bei Namen und Berufen",
          "Lassen Sie keine Felder leer - wenn nötig, schreiben Sie 'nicht vorhanden'"
        ],
        questionType: "formular",
        formular_grid: {
          "Name": ["Mueller",10],
          "Vorname": ["",10],
          "Alter": ["",10],
          "Wohnort": ["",10],
          "Beruf": ["",30],
          "Telefonnummer": ["",10],
          "E-Mail": ["",10],
        },
        solution: {
          "Name": "Mueller",
          "Vorname": "Thomas",
          "Alter": "31",
          "Wohnort": "Muenchen",
          "Beruf": "Fussbaler",
          "Telefonnummer": "012234321749",
          "E-Mail": "thomasmueller@hotmail.com",
        },

      },
      {
        id: "q3",
        well_Answered: false,
        Text: ["Stellen Sie sich vor!","Schreiben Sie einen kurzen Text über sich selbst (30-40 Wörter)","Schreiben Sie über:","Ihren Namen",
          "Ihr Alter","Woher Sie kommen","Ihre Familie","Was Sie gern machen"],
        Tipps: [
          "Beginnen Sie mit einer freundlichen Begrüßung wie 'Hallo!' oder 'Guten Tag!'",
          "Verwenden Sie einfache Sätze: 'Ich heiße...', 'Ich bin ... Jahre alt'",
          "Erwähnen Sie alle geforderten Punkte: Name, Alter, Herkunft, Familie, Hobbys",
          "Bleiben Sie im Rahmen von 30-40 Wörtern - zählen Sie beim Schreiben mit"
        ],
        questionType: "presentation",
        solution: {
          "hauptteil": ["Hallo! Ich heiße Maria Gonzalez und bin 23 Jahre alt. Ich komme aus Spanien, aus Madrid. Ich habe einen Bruder und eine Schwester. Meine Hobbys sind Lesen und Musik hören. Ich lerne gern Deutsch."],
        },
      },
      {
        id: "q4",
        well_Answered: false,
        Text: ["Sie sind im Urlaub in München. Schreiben Sie eine Postkarte an Ihre Freundin Lisa. Schreiben Sie über:","das Wetter","was Sie machen","wie es Ihnen gefällt"],
        Tipps: [
          "Beginnen Sie mit 'Liebe Lisa,' für eine persönliche Anrede",
          "Beschreiben Sie das Wetter mit einfachen Worten: 'Das Wetter ist schön/warm/kalt'",
          "Erwähnen Sie konkrete Aktivitäten: 'Ich besuche...', 'Ich gehe...'",
          "Beenden Sie freundlich: 'Bis bald!' oder 'Liebe Grüße' + Ihr Name"
        ],
        questionType: "postal_card",
        solution: {
          "anrede": "Liebe Lisa,",           
          "hauptteil": "ich bin in München! Das Wetter ist sehr schön und warm. Ich besuche das Schloss Neuschwanstein und trinke Bier im Biergarten. München gefällt mir sehr gut! Die Stadt ist wunderbar.",                
          "grussformel": "Bis bald!",     
          "unterschrift": "Deine Maria"     
        },
      },
    ],
    A2: [
      {
        id: "srA11",
        well_Answered: false,
        Text: ["Sie kommen zu spät zur Deutschstunde. Schreiben Sie eine Entschuldigung an Ihre Lehrerin."],
        Tipps: [
          "Beginnen Sie höflich mit 'Liebe Frau [Name],' oder 'Sehr geehrte Frau [Name],'",
          "Entschuldigen Sie sich direkt: 'Entschuldigen Sie bitte!' oder 'Es tut mir leid!'",
          "Erklären Sie kurz den Grund: 'Mein Bus hatte Verspätung' oder 'Ich war krank'",
          "Beenden Sie formal: 'Mit freundlichen Grüßen' + Ihr vollständiger Name"
        ],
        questionType: "excuse_word",
        solution: {
          "anrede": "Liebe Frau Schmidt,",          
          "hauptteil": "entschuldigen Sie bitte! Ich komme heute zu spät zum Deutschkurs. Mein Bus hatte Verspätung.Ich bin in 10 Minuten da.",    
          "dank": "Vielen Dank!",            
          "grussformel": "Mit freundlichen Grüßen",    
          "unterschrift": "Peter Weber"     
        },
      },
      {
        id: "srA22",
        well_Answered: false,
        Text: ["Ihre Nachbarin ist nicht zu Hause. Sie haben ein Paket für sie angenommen. Schreiben Sie einen Zettel."],
        Tipps: [
          "Sprechen Sie die Nachbarin freundlich an: 'Liebe Frau [Name],' oder 'Hallo!'",
          "Erklären Sie die Situation: 'Sie waren nicht zu Hause' oder 'Ich habe Ihr Paket angenommen'",
          "Geben Sie Ihren Standort an: 'Es ist bei mir, Wohnung [Nummer]'",
          "Sagen Sie, wann sie es abholen kann und unterschreiben Sie mit Ihrem Namen"
        ],
        questionType: "information_note",
        solution: {
          "anrede": "Liebe Frau Braun,",        
          "hauptteil": "Sie waren nicht zu Hause. Ich habe Ihr Paket angenommen. Es ist bei mir, Wohnung 3B.Sie können es heute Abend abholen.",       
          "unterschrift": ["Ihre Nachbarin","Sandra Hoffmann"]     
        },
      },
    ],
    B1: [
      {
        id: "srB11",
        well_Answered: false,
        Text: ["Sie möchten einen Deutschkurs in einer Sprachschule besuchen.",
          "Schreiben Sie eine E-Mail an die Schule (60-80 Wörter).","Fragen Sie nach:",
          "Kurszeiten","Preisen","Anmeldung","Kursniveau"
        ],
        Tipps: [
          "Schreiben Sie einen klaren Betreff: 'Deutschkurs - Informationen'",
          "Beginnen Sie formal: 'Sehr geehrte Damen und Herren,' (unbekannter Empfänger)",
          "Stellen Sie konkrete Fragen zu allen Punkten: Zeiten, Preise, Anmeldung, Niveau",
          "Beenden Sie höflich: 'Vielen Dank' + 'Mit freundlichen Grüßen' + Name + E-Mail"
        ],
        questionType: "formal_e_mail",
        solution: {
          "betreff": "Betreff: Deutschkurs - Informationen",          
          "anrede": "Sehr geehrte Damen und Herren,",           
          "hauptteil": ["ich interessiere mich für einen Deutschkurs an Ihrer Schule.Können Sie mir bitte Informationen schicken?",
          "Wann finden die Kurse statt? Was kostet ein Kurs? Ich bin Anfänger und spreche nur ein bisschen Deutsch. Gibt es einen Kurs für mein Niveau?",
        "Wie kann ich mich anmelden?"],      
          "hoeflichkeit": "Vielen Dank für Ihre Hilfe.",     
          "grussformel": "Mit freundlichen Grüßen",      
          "unterschrift": ["Thomas Weber","thomas.weber@email.de"],     
        }
      },
      {
        id: "srB12",
        well_Answered: false,
        Text: ["In einem Internet-Forum diskutieren Menschen über das Thema 'Hobbys'.",
          "Schreiben Sie einen Beitrag (60-80 Wörter).",
          "Schreiben Sie über:","Ihre Hobbys","Warum Sie das gern machen","Fragen Sie andere nach ihren Hobbys"
        ],
        Tipps: [
          "Beginnen Sie freundlich: 'Hallo zusammen!' oder 'Hi alle!'",
          "Nennen Sie Ihre Hobbys und erklären Sie warum: 'Ich ... gern, weil...'",
          "Teilen Sie eine persönliche Erfahrung: 'Letzten Monat war ich...'",
          "Stellen Sie Fragen an die Community: 'Was sind eure Hobbys?' oder 'Macht ihr auch...?'"
        ],
        questionType: "forum",
        solution: {
          "anrede": "Hallo zusammen!",     
          "hauptteil": ["Meine Hobbys sind Fotografieren und Wandern. Ich fotografiere gern, weil ich schöne Momente festhalten möchte. Am Wochenende gehe ich oft in die Berge wandern. Das ist sehr entspannend und gut für die Gesundheit.",
            "Letzten Monat war ich in den Alpen - fantastisch!",
            "Was sind eure Hobbys? Macht ihr auch Sport? Ich suche neue Ideen für meine Freizeit."
          ],       
          "gruss": "Liebe Grüße",     
          "unterschrift": "Max_2024",     
        },
      },
      {
  id: "srB13",
  well_Answered: false,
  Text: ["Sie haben lange nichts von Ihrer deutschen Freundin gehört. Sie möchten wissen, wie es ihr geht.",
    "Schreiben Sie eine persönliche E-Mail oder einen Brief (100-120 Wörter).",
    "Schreiben Sie über:","Warum Sie schreiben","Was bei Ihnen passiert ist","Fragen über ihr Leben","Vorschlag für ein Treffen"
  ],
  Tipps: [
    "Beginnen Sie herzlich: 'Liebe [Name]' oder 'Hallo [Name]!'",
    "Erklären Sie, warum Sie nach langer Zeit schreiben",
    "Erzählen Sie von Ihrem Leben: Arbeit, Familie, Hobbys, Neuigkeiten",
    "Stellen Sie persönliche Fragen und schlagen Sie ein Treffen vor"
  ],
  questionType: "informal_letter",
  solution: {
    "anrede": "Liebe Sarah,",
    "hauptteil": ["wie geht es dir denn? Ich weiß, es ist schon ewig her, dass wir uns geschrieben haben! Mir geht es gut, aber ich vermisse unsere Gespräche.",
      "Bei mir ist viel passiert: Ich habe einen neuen Job angefangen und bin letzten Monat umgezogen. Die neue Wohnung ist wunderschön! Außerdem lerne ich jetzt Gitarre spielen – das macht total Spaß.",
      "Und wie läuft es bei dir? Arbeitest du noch in derselben Firma? Wie geht es deiner Familie? Hast du neue Hobbys entdeckt?",
      "Ich würde dich so gerne mal wieder sehen! Hast du Lust, nächsten Monat einen Kaffee zu trinken? Ich könnte nach München kommen."
    ],
    "grussformel": "Ich freue mich auf deine Antwort!",
    "unterschrift": "Deine Anna"
  }
},
{
  id: "SrB14",
  well_Answered: false,
  Text: [
    "Sie haben einen neuen Job gefunden und möchten Ihrem besten Freund/Ihrer besten Freundin davon erzählen.",
    "Schreiben Sie eine E-Mail (60-80 Wörter).",
    "Schreiben Sie über:",
    "Ihren neuen Job",
    "Ihre Gefühle",
    "Wann Sie anfangen",
    "Vorschlag für ein Treffen zum Feiern"
  ],
  Tipps: [
    "Verwenden Sie eine lockere Anrede: 'Hallo [Name]!' oder 'Hi [Name]!'",
    "Schreiben Sie persönlich und emotional: 'Ich bin so glücklich!'",
    "Benutzen Sie einfache, direkte Sprache wie im Gespräch",
    "Beenden Sie freundschaftlich: 'Bis bald!' oder 'Liebe Grüße' + Vorname"
  ],
  questionType: "informal_e_mail",
  solution: {
    "betreff": "Betreff: Große Neuigkeiten! ",
    "anrede": "Hallo Lisa!",
    "hauptteil": [
      "rate mal was passiert ist! Ich habe den Job bekommen, für den ich mich beworben hatte!",
      "Ich bin so aufgeregt und kann es kaum glauben. Es ist genau das, was ich immer machen wollte. Ich fange am 1. September an.",
      "Hast du Lust, heute Abend mit mir zu feiern? Wir könnten ins Restaurant gehen oder einfach zu mir kommen."
    ],
    "grussformel": "Bis bald!",
    "unterschrift": ["Max"]
  }
},
{
  id: "SrB15",
  well_Answered: false,
  Text: [
    "Sie haben an einem Seminar zum Thema 'Digitalisierung am Arbeitsplatz' teilgenommen.",
    "Schreiben Sie einen Bericht für Ihre Kollegen (200-250 Wörter).",
    "Gehen Sie auf folgende Punkte ein:",
    "Thema und Dauer des Seminars",
    "Die wichtigsten Inhalte",
    "Ihre persönliche Bewertung",
    "Empfehlungen für das Unternehmen"
  ],
  Tipps: [
    "Beginnen Sie mit einer klaren Einleitung: Datum, Titel und Organisator des Seminars",
    "Strukturieren Sie die Inhalte logisch: Grundlagen, praktische Anwendungen, Fallbeispiele",
    "Bewerten Sie objektiv: Positive und negative Aspekte des Seminars",
    "Geben Sie konkrete, umsetzbare Empfehlungen für das Unternehmen"
  ],
  questionType: "rapport_long",
  solution: {
    'einleitung': "Am 15. März 2024 habe ich an einem ganztägigen Seminar zum Thema 'Digitalisierung am Arbeitsplatz' teilgenommen, das vom Institut für berufliche Weiterbildung organisiert wurde.",
    "hauptteil": ["Das Seminar behandelte verschiedene Aspekte der digitalen Transformation in Unternehmen. Zunächst wurden die Grundlagen der Digitalisierung erklärt, einschließlich Cloud-Computing und künstlicher Intelligenz. Anschließend diskutierten wir konkrete Anwendungen wie digitale Projektmanagement-Tools und automatisierte Arbeitsabläufe. Besonders interessant war der Vortrag über die Herausforderungen beim Wandel, wie Mitarbeiterwiderstand und Datenschutz.In praktischen Übungen lernten wir den Umgang mit neuen Software-Lösungen kennen. Die Referentin, Dr. Schmidt, präsentierte erfolgreiche Fallbeispiele aus verschiedenen Branchen und zeigte, wie andere Unternehmen die Digitalisierung erfolgreich umgesetzt haben.",
      "Das Seminar war sehr informativ und praxisnah gestaltet. Die Kombination aus Theorie und praktischen Übungen war ausgewogen. Ich empfehle, dass weitere Kollegen an ähnlichen Schulungen teilnehmen, insbesondere die Führungskräfte. Außerdem sollten wir die vorgestellten Tools in unserem Unternehmen testen.",
    ],       
    "schluss":"Schliesslich war die Investition in dieser Weiterbildung sehr wertvoll und wird uns bei der Modernisierung unserer Arbeitsprozesse helfen."
  },
}
    
    ],
    B2: [
      {
        id: "srB21",
        well_Answered: false,
        Text: ["Sie schreiben für die Zeitung Ihres Stadtteils einen Artikel über ein neues Restaurant. Sie waren dort essen.",
          "Schreiben Sie einen Artikel (100-120 Wörter).",
          "Schreiben Sie über:","Wo ist das Restaurant?","Wie ist das Essen?","Wie ist der Service?","Würden Sie es empfehlen?"
        ],
        Tipps: [
          "Beginnen Sie mit einem informativen Titel und der Adresse des Restaurants",
          "Beschreiben Sie das Essen objektiv: Qualität, Preise, Spezialitäten",
          "Bewerten Sie den Service ehrlich: freundlich, schnell, Atmosphäre",
          "Geben Sie am Ende eine klare Empfehlung für die Leser"
        ],
        questionType: "article",
        solution: {
          'titel': "Neues italienisches Restaurant 'La Bella Vita' eröffnet",
          "hauptteil": ["In der Hauptstraße 15 hat vor zwei Wochen das italienische Restaurant 'La Bella Vita' eröffnet. Das kleine, gemütliche Lokal bietet Platz für etwa 40 Gäste.",
            "Die Speisekarte konzentriert sich auf traditionelle italienische Gerichte. Besonders die hausgemachte Pizza und die frischen Pasta sind empfehlenswert. Die Zutaten sind frisch und von guter Qualität. Die Preise sind angemessen: ein Hauptgericht kostet zwischen 12 und 18 Euro.",
            "Der Service ist freundlich und aufmerksam, auch wenn man manchmal etwas länger auf das Essen warten muss. Die Atmosphäre ist entspannt und familienfreundlich.",
            "Insgesamt ist 'La Bella Vita' eine Bereicherung für unseren Stadtteil. Ich kann es für einen gemütlichen Abend mit der Familie empfehlen."
          ],       
        },
      },
      {
        id: "srB22",
        well_Answered: false,
        Text: ["Sie arbeiten in einer Firma und haben ein Problem mit Ihrem Arbeitsplatz.Die Heizung funktioniert nicht gut und es ist sehr kalt.",
          "Schreiben Sie eine Beschwerde an Ihren Chef (100-120 Wörter).",
          "Schreiben Sie über:","Das Problem","Wie lange das Problem schon besteht","Welche Konsequenzen das hat","Was Sie vorschlagen"
        ],
        Tipps: [
          "Beginnen Sie respektvoll: 'Sehr geehrter Herr/Frau [Name]'",
          "Beschreiben Sie das Problem sachlich mit konkreten Details (Dauer, Ort)",
          "Erklären Sie die Auswirkungen auf Arbeit und Gesundheit",
          "Machen Sie höfliche, konstruktive Lösungsvorschläge"
        ],
        questionType: "formal_letter",
        solution: {
          "anrede":"Sehr geehrter Herr Müller,",                      
          "hauptteil": ["ich wende mich an Sie, weil ich ein dringendes Problem in unserem Büro ansprechen möchte. Seit drei Wochen funktioniert die Heizung in Raum 204 nicht richtig. Die Temperatur liegt konstant unter 16 Grad, was sehr unkomfortabel ist.",
            "Diese Situation beeinträchtigt nicht nur mein Wohlbefinden, sondern auch meine Arbeitsleistung. Außerdem befürchte ich, dass meine Kollegen und ich krank werden könnten.",
            "Ich schlage vor, dass wir schnellstmöglich einen Techniker beauftragen. Alternativ könnten wir vorübergehend mobile Heizkörper aufstellen."
          ],                  
          "hoeflichkeit": "Ich wäre Ihnen sehr dankbar, wenn Sie sich um diese Angelegenheit kümmern könnten.",                
          "grussformel": "Mit freundlichen Grüßen",                 
          "unterschrift": "Anna Weber",              
        },
      },
      {
        id: "srB23",
        well_Answered: false,
        Text: ["Sie haben lange nichts von Ihrer deutschen Freundin gehört. Sie möchten wissen, wie es ihr geht.",
          "Schreiben Sie eine persönliche E-Mail oder einen Brief (100-120 Wörter).",
          "Schreiben Sie über:","Warum Sie schreiben","Was bei Ihnen passiert ist","Fragen über ihr Leben","Vorschlag für ein Treffen"
        ],
        Tipps: [
          "Beginnen Sie herzlich: 'Liebe [Name]' oder 'Hallo [Name]!'",
          "Erklären Sie, warum Sie nach langer Zeit schreiben",
          "Erzählen Sie von Ihrem Leben: Arbeit, Familie, Hobbys, Neuigkeiten",
          "Stellen Sie persönliche Fragen und schlagen Sie ein Treffen vor"
        ],
        questionType: "informal_letter",
        solution: {
          "anrede": "Liebe Sarah,",
          "hauptteil": ["wie geht es dir denn? Ich weiß, es ist schon ewig her, dass wir uns geschrieben haben! Mir geht es gut, aber ich vermisse unsere Gespräche.",
            "Bei mir ist viel passiert: Ich habe einen neuen Job angefangen und bin letzten Monat umgezogen. Die neue Wohnung ist wunderschön! Außerdem lerne ich jetzt Gitarre spielen – das macht total Spaß.",
            "Und wie läuft es bei dir? Arbeitest du noch in derselben Firma? Wie geht es deiner Familie? Hast du neue Hobbys entdeckt?",
            "Ich würde dich so gerne mal wieder sehen! Hast du Lust, nächsten Monat einen Kaffee zu trinken? Ich könnte nach München kommen."
          ],
          "grussformel": "Ich freue mich auf deine Antwort!",
          "unterschrift": "Deine Anna"
        }
      },
      {
        id: "srB24",
        well_Answered: false,
        Text: ["Sie haben an einem besonderen Ereignis teilgenommen, das Ihnen sehr gut gefallen hat. Schreiben Sie einen Bericht für die Website Ihrer Sprachschule über dieses Erlebnis.",
          "Gehen Sie dabei auf folgende Punkte ein:",
          "-Was für ein Ereignis war es und wo hat es stattgefunden?","-Warum haben Sie sich dafür entschieden, daran teilzunehmen?","-Was hat Ihnen besonders gut gefallen?","-Würden Sie anderen empfehlen, an einem ähnlichen Ereignis teilzunehmen? Warum?"
        ],
        Tipps: [
          "Beginnen Sie mit einer interessanten Einleitung, die Neugier weckt",
          "Beschreiben Sie das Ereignis konkret: Was, wo, wann, warum Sie hingegangen sind",
          "Schildern Sie lebhaft Ihre persönlichen Eindrücke und Highlights",
          "Beenden Sie mit einer klaren Empfehlung für andere Sprachschüler"
        ],
        questionType: "ereignis_description",
        solution: {
          'einleitung': "Letzten September hatte ich die wunderbare Gelegenheit, am berühmten Oktoberfest in München teilzunehmen – ein Erlebnis, das ich niemals vergessen werde.",
          "hauptteil": ["Das weltbekannte Volksfest findet jedes Jahr auf der Theresienwiese statt und zieht Millionen von Besuchern aus aller Welt an. Ursprünglich wollte ich mehr über die bayerische Kultur erfahren und meine Deutschkenntnisse in einer authentischen Umgebung verbessern. Deshalb entschied ich mich, gemeinsam mit Freunden aus meinem Deutschkurs diese besondere Veranstaltung zu besuchen.",
            "Was mich am meisten beeindruckt hat, war die ausgelassene und freundliche Atmosphäre. Überall hörte man traditionelle bayerische Musik, und die Menschen trugen wunderschöne Trachten – Dirndl und Lederhosen. Besonders faszinierend fand ich die riesigen Bierzelte, in denen Tausende von Menschen zusammenkamen, sangen und feierten. Das Essen war köstlich: Weißwurst, Brezn und Schweinebraten schmeckten einfach authentisch und hervorragend."
          ],       
          "schluss":"Ich kann jedem empfehlen, einmal das Oktoberfest zu erleben, denn es bietet eine einmalige Gelegenheit, die bayerische Kultur hautnah kennenzulernen und gleichzeitig viel Spaß zu haben. Es ist definitiv mehr als nur ein Bierfest – es ist ein kulturelles Erlebnis!"
        }
      }
    ],
    C1: [
      {
        id: "srC11",
        well_Answered: false,
        Text: ["'Die Integration von Migranten scheitert oft nicht an deren Unwillen, sondern an strukturellen Hürden.'",
          "Setzen Sie sich mit dieser These auseinander."
        ],
        Tipps: [
          "Analysieren Sie die These kritisch und nehmen Sie eine differenzierte Position ein",
          "Strukturieren Sie Ihre Argumentation: Pro-Argumente, Contra-Argumente, eigene Synthese",
          "Verwenden Sie konkrete Beispiele und Belege zur Untermauerung Ihrer Argumente",
          "Entwickeln Sie eine ausgewogene Schlussfolgerung, die verschiedene Aspekte berücksichtigt"
        ],
        questionType: "argumentation",
        solution: {
          'einleitung': "Die These, dass strukturelle Hürden die Hauptursache für gescheiterte Integration darstellen, enthält durchaus berechtigte Aspekte, greift jedoch zu kurz. Eine realistische Betrachtung zeigt, dass sowohl systemische Barrieren als auch individuelle Faktoren eine entscheidende Rolle spielen.",
          "hauptteil": ["Strukturelle Hindernisse sind unbestreitbar vorhanden. Bürokratische Verfahren zur Anerkennung ausländischer Qualifikationen dauern oft Jahre, während Sprachkurse überfüllt und unterfinanziert sind. Diskriminierung auf dem Arbeitsmarkt erschwert zusätzlich den beruflichen Einstieg. Diese systematischen Probleme schaffen objektive Barrieren, die selbst hochmotivierte Migranten nur schwer überwinden können.",
            "Dennoch wäre es vereinfachend, den Integrationserfolg ausschließlich auf externe Faktoren zurückzuführen. Die Bereitschaft zur Anpassung, das Erlernen der Sprache und die Offenheit gegenüber neuen kulturellen Normen variieren erheblich zwischen verschiedenen Gruppen und Individuen. Erfolgreiche Integrationsgeschichten zeigen, dass persönliche Motivation und Eigeninitiative trotz widriger Umstände zum Erfolg führen können.",
            "Die Komplexität des Integrationsprozesses erfordert einen multidimensionalen Ansatz. Während strukturelle Reformen wie vereinfachte Anerkennungsverfahren und bessere Sprachförderung notwendig sind, müssen auch Programme entwickelt werden, die individuelle Unterstützung bieten. Mentoring-Programme, berufliche Orientierung und interkulturelle Begegnungsmöglichkeiten können Brücken zwischen strukturellen Verbesserungen und persönlicher Verantwortung schaffen."
          ],       
          "schluss":"Letztendlich entsteht erfolgreiche Integration durch das Zusammenwirken günstiger struktureller Bedingungen und individueller Bereitschaft. Eine einseitige Fokussierung auf nur einen Aspekt wird der Realität nicht gerecht. Vielmehr sollten Politik und Gesellschaft sowohl die systemischen Barrieren abbauen als auch Anreize für aktive Teilhabe schaffen, um nachhaltige Integrationserfolge zu ermöglichen."
        }
      },
      {
        id: "srC12",
        well_Answered: false,
        Text: ["Beschreiben Sie die Grafik zur Lebenserwartung der Deutschen. Gehen Sie dabei auf folgende Punkte ein:",
          "-Beschreiben Sie die dargestellten Daten und Entwicklungen","-Interpretieren Sie die Trends und erklären Sie mögliche Ursachen",
          "-Bewerten Sie die gesellschaftlichen Auswirkungen dieser Entwicklung"
        ],
        image_url:"https://www.sprachzentrum.com.ar/sites/default/files/inline-images/Lebenserwartung-Grafikbeschreibung_0.jpg",
        Tipps: [
          "Beginnen Sie mit einer präzisen Beschreibung der Grafik und ihrer Hauptaussage",
          "Verwenden Sie spezifische Zahlen und Daten aus der Grafik als Belege",
          "Erklären Sie Trends durch historische, medizinische oder soziale Faktoren",
          "Diskutieren Sie sowohl positive als auch problematische gesellschaftliche Folgen"
        ],
        questionType: "graphik_description",
        solution: {
          'einleitung': "Die vorliegende Grafik veranschaulicht die Entwicklung der Lebenserwartung bei der Geburt in Deutschland über mehrere Zeitperioden hinweg, aufgeteilt nach Geschlecht. Bei näherer Betrachtung der Statistik fällt auf, dass die Lebenserwartung sowohl bei Männern als auch bei Frauen seit Beginn des 20. Jahrhunderts kontinuierlich zugenommen hat.",
          "hauptteil": ["Dem Schaubild ist zu entnehmen, dass die Lebenserwartung in den Jahren 1901/10 bei Männern lediglich 44,8 Jahre und bei Frauen 48,3 Jahre betrug. In der Periode 1932/34 ist bereits ein deutlicher Anstieg zu verzeichnen, wobei Männer durchschnittlich 59,9 Jahre und Frauen 62,8 Jahre alt wurden. Diese Aufwärtsentwicklung setzte sich in den Jahren 1960/62 fort, als die Lebenserwartung bei Männern auf 66,9 Jahre und bei Frauen auf 72,4 Jahre anstieg. Die aktuellen Werte zeigen einen weiteren beachtlichen Zuwachs: Heute können neugeborene Jungen mit einer Lebenserwartung von 76,2 Jahren und Mädchen sogar mit 81,8 Jahren rechnen.",
            "Besonders auffällig ist der sprunghafte Anstieg zwischen der ersten und zweiten dargestellten Periode. Diese Entwicklung lässt sich auf mehrere Faktoren zurückführen, insbesondere auf die Verbesserungen in der medizinischen Versorgung und Hygiene im frühen 20. Jahrhundert. Unter Berücksichtigung der historischen Rahmenbedingungen wird deutlich, dass zwei Weltkriege und wirtschaftlich schwierige Zeiten den demografischen Wandel nicht aufhalten konnten.",
            "Ein weiteres bemerkenswertes Merkmal der Statistik ist der durchgängige Unterschied zwischen den Geschlechtern, wobei Frauen in allen Zeiträumen eine höhere Lebenserwartung aufweisen als Männer. Diese Diskrepanz kann darauf zurückgeführt werden, dass biologische Faktoren, aber auch Unterschiede im Gesundheitsverhalten eine Rolle spielen."
          ],       
          "schluss":"Meines Erachtens ist diese Entwicklung grundsätzlich begrüßenswert, da sie von verbesserten Lebensbedingungen und medizinischem Fortschritt zeugt. Allerdings birgt die steigende Lebenserwartung auch gesellschaftliche Herausforderungen, insbesondere für das Sozial- und Rentensystem. Wenn man diese Entwicklung kritisch betrachtet, kommt man zu dem Schluss, dass tiefgreifende strukturelle Anpassungen notwendig sind, um den demografischen Wandel zu bewältigen. Abschließend lässt sich feststellen, dass erheblicher Handlungsbedarf besteht, um eine nachhaltige Gesellschaftsentwicklung zu gewährleisten."
        }
      },
      {
        id: "srC13",
        well_Answered: false,
        Text: ["Analysieren Sie die vorliegende Karikatur von Gerhard Mester in einem zusammenhängenden Text.",
          "Ihre Analyse soll folgende Aspekte umfassen:","-Beschreiben Sie die dargestellte Szene detailliert",
          "-Analysieren Sie den Generationenkonflikt bezüglich Klimaschutz"
        ],
        image_url:"https://mester-karikaturen.de/wp-content/uploads/2022/02/o13738var-scaled.jpg?v=1644478563",
        Tipps: [
          "Beginnen Sie mit einer präzisen Beschreibung der Grafik und ihrer Hauptaussage",
          "Verwenden Sie spezifische Zahlen und Daten aus der Grafik als Belege",
          "Erklären Sie Trends durch historische, medizinische oder soziale Faktoren",
          "Diskutieren Sie sowohl positive als auch problematische gesellschaftliche Folgen"
        ],
        questionType: "karikatur_description",
        solution: {
          'einleitung': "Die vorliegende Karikatur von Gerhard Mester thematisiert die problematische Diskrepanz zwischen den Prioritäten verschiedener Generationen angesichts der Klimakrise. Der Karikaturist greift ein hochaktuelles gesellschaftliches Phänomen auf: den Konflikt zwischen materiellen Sorgen der älteren Generation und den existenziellen Zukunftsängsten der Jugend.",
          "hauptteil": ["Im Mittelpunkt der satirischen Darstellung steht eine häusliche Szene, in der drei Personen unterschiedlichen Alters in einem gemütlichen Wohnzimmer sitzen. Auffällig ist die bewusst überzeichnete Darstellung des Kontrastes zwischen der behaglichen Inneneinrichtung und der bedrohlichen Industrielandschaft im Hintergrund. Die Komposition wird durch den starken Gegensatz zwischen der idyllischen Familienatmosphäre und den rauchenden Schornsteinen geprägt. Besonders ins Auge fällt die symbolträchtige Verwendung der Fensterfront, die als Grenze zwischen privater Sicherheit und globaler Bedrohung fungiert.",
            "Die überspitzte Darstellung zielt darauf ab, die Widersprüchlichkeit generationsspezifischer Prioritäten zu entlarven. Während die ältere Generation sich Sorgen um Börsencrashs, Vermögenserhalt und Klimaanlagen macht, stehen für die junge Generation existenzielle Fragen im Vordergrund. Der Künstler bedient sich der Ironie, um die Scheinheiligkeit einer Gesellschaft anzuprangern, die kurzfristige materielle Interessen über langfristige Überlebensfragen stellt. Die symbolische Ebene verdeutlicht, dass die Verursacher der Klimakrise sich in sicherer Entfernung von deren Folgen wähnen."
            ],       
          "schluss":"Meines Erachtens trifft die satirische Darstellung den Kern eines fundamentalen Generationenkonflikts. Die pointierte Gesellschaftskritik regt zweifellos zum Nachdenken über unterschiedliche Wertvorstellungen zwischen Alt und Jung an. Trotz der offensichtlichen Übertreibung liegt der Karikatur ein wahrer Kern zugrunde: Die Generation, die hauptsächlich für die Klimakrise verantwortlich ist, beschäftigt sich mit banalen Alltagssorgen, während die nachfolgenden Generationen die Konsequenzen tragen müssen. Abschließend lässt sich konstatieren, dass die Karikatur erfolgreich die Notwendigkeit eines Perspektivenwechsels in der Klimadebatte verdeutlicht."
        }
      }
    ],
    C2: [],
  },
  sprechen: {
    A1: [
      {
        id: "sp_a1_1",
        well_Answered: false,
        Text: ["Sich vorstellen", "Stellen Sie sich vor. Sprechen Sie über:", "• Ihren Namen", "• Ihr Alter", "• Ihre Herkunft", "• Ihre Familie", "• Ihre Hobbys"],
        Tipps: [
          "Sprechen Sie langsam und deutlich",
          "Verwenden Sie einfache Sätze: 'Ich heiße...', 'Ich komme aus...'",
          "Nennen Sie alle geforderten Informationen",
          "Sprechen Sie etwa 1-2 Minuten"
        ],
        questionType: "monologue",
        duration_minutes: 2,
        keywords: ["Name", "Alter", "Herkunft", "Familie", "Hobbys"],
        solution: [
            "Hallo! Ich heiße Maria Gonzalez.",
            "Ich bin 24 Jahre alt.",
            "Ich komme aus Spanien, aus Barcelona.",
            "Ich habe eine kleine Familie: meine Eltern und einen Bruder.",
            "Meine Hobbys sind Musik hören und Bücher lesen.",
            "Ich lerne gern Deutsch, weil es eine interessante Sprache ist.",
            "Vielen Dank!"
          ]
        
      },
      {
        id: "sp_a1_2",
        well_Answered: false,
        Text: ["Gespräch: Einkaufen", "Sie sind in einem Geschäft. Der Verkäufer hilft Ihnen.", "Sprechen Sie über:", "• Was Sie suchen", "• Größe/Farbe", "• Preis", "• Bezahlung"],
        Tipps: [
          "Seien Sie höflich: 'Bitte', 'Danke', 'Entschuldigung'",
          "Fragen Sie nach dem Preis: 'Was kostet das?'",
          "Sagen Sie, was Sie möchten: 'Ich suche...'",
          "Antworten Sie auf die Fragen des Verkäufers"
        ],
        questionType: "dialogue",
        duration_minutes: 3,
        keywords: ["suchen", "Größe", "Farbe", "Preis", "bezahlen"],
        solution:  [
            {"verkäufer": "Guten Tag! Kann ich Ihnen helfen?"},
            {"student": "Ja, bitte. Ich suche ein T-Shirt."},
            {"verkäufer": "Welche Größe haben Sie denn?"},
            {"student": "Größe M, bitte."},
            {"verkäufer": "Und welche Farbe möchten Sie?"},
            {"student": "Blau oder schwarz, bitte."},
            {"verkäufer": "Hier haben wir ein blaues T-Shirt in Größe M. Es kostet 15 Euro."},
            {"student": "Das ist gut. Ich nehme es."},
            {"verkäufer": "Wie möchten Sie bezahlen?"},
            {"student": "Mit Karte, bitte."},
            {"verkäufer": "Sehr gern. Hier ist Ihr T-Shirt."},
            {"student": "Vielen Dank und auf Wiedersehen!"}
          ]
        
      },
      {
        id: "sp_a1_3",
        well_Answered: false,
        Text: ["Monolog: Mein Alltag", "Beschreiben Sie Ihren typischen Tag. Sprechen Sie über:", "• Aufstehen", "• Arbeit/Schule", "• Mittagessen", "• Freizeit", "• Schlafen gehen"],
        Tipps: [
          "Verwenden Sie Uhrzeiten: 'Um 7 Uhr stehe ich auf'",
          "Benutzen Sie einfache Verben: gehen, essen, arbeiten, schlafen",
          "Sprechen Sie chronologisch: zuerst, dann, danach",
          "Beschreiben Sie einen normalen Werktag"
        ],
        questionType: "monologue",
        duration_minutes: 2,
        keywords: ["aufstehen", "arbeiten", "essen", "Freizeit", "schlafen"],
        solution:  [
            "Ich stehe um 7 Uhr auf.",
            "Zuerst dusche ich und frühstücke.",
            "Um 8 Uhr gehe ich zur Arbeit.",
            "Ich arbeite von 9 bis 17 Uhr im Büro.",
            "Um 12 Uhr esse ich Mittagessen mit meinen Kollegen.",
            "Nach der Arbeit gehe ich nach Hause.",
            "Am Abend sehe ich fern oder lese ein Buch.",
            "Um 22 Uhr gehe ich schlafen."
          ]
        
      }
    ],
    
    A2: [
      {
        id: "sp_a2_1",
        well_Answered: false,
        Text: ["Monolog: Reiseerfahrung", "Erzählen Sie von einer Reise. Sprechen Sie über:", "• Wohin Sie gereist sind", "• Mit wem", "• Was Sie gemacht haben", "• Wie es Ihnen gefallen hat"],
        Tipps: [
          "Verwenden Sie Vergangenheitsformen: 'Ich bin gefahren', 'Es war schön'",
          "Beschreiben Sie Ihre Gefühle: 'Es hat mir gefallen'",
          "Erzählen Sie konkrete Aktivitäten",
          "Sprechen Sie etwa 2-3 Minuten"
        ],
        questionType: "monologue",
        duration_minutes: 3,
        keywords: ["Reise", "wohin", "mit wem", "Aktivitäten", "Eindruck"],
        solution: [
            "Letzten Sommer bin ich nach Italien gereist.",
            "Ich war mit meiner Familie dort, mit meinen Eltern und meiner Schwester.",
            "Wir haben eine Woche in Rom verbracht.",
            "Wir haben das Kolosseum und den Vatikan besucht.",
            "Das Essen war fantastisch! Wir haben viel Pizza und Pasta gegessen.",
            "Die Menschen waren sehr freundlich.",
            "Das Wetter war warm und sonnig.",
            "Es war eine wunderbare Reise und ich möchte gerne wieder nach Italien fahren."
          ]
        
      },
      {
        id: "sp_a2_2",
        well_Answered: false,
        Text: ["Gespräch: Beim Arzt", "Sie fühlen sich nicht wohl und gehen zum Arzt.", "Sprechen Sie über:", "• Ihre Beschwerden", "• Seit wann", "• Was Sie schon gemacht haben", "• Fragen zur Behandlung"],
        Tipps: [
          "Beschreiben Sie Ihre Symptome genau",
          "Verwenden Sie Zeitangaben: 'seit drei Tagen'",
          "Fragen Sie nach Rat: 'Was soll ich machen?'",
          "Seien Sie höflich und klar"
        ],
        questionType: "dialogue",
        duration_minutes: 4,
        keywords: ["Beschwerden", "seit wann", "Symptome", "Behandlung"],
        solution:[
            {"arzt": "Guten Tag! Was kann ich für Sie tun?"},
            {"student": "Guten Tag, Herr Doktor. Ich fühle mich nicht gut."},
            {"arzt": "Was für Beschwerden haben Sie denn?"},
            {"student": "Ich habe Kopfschmerzen und Fieber."},
            {"arzt": "Seit wann haben Sie diese Symptome?"},
            {"student": "Seit drei Tagen. Es wird nicht besser."},
            {"arzt": "Haben Sie schon etwas dagegen genommen?"},
            {"student": "Ja, ich habe Aspirin genommen, aber es hilft nicht."},
            {"arzt": "Ich schaue Sie mal an. Machen Sie bitte den Mund auf."},
            {"student": "Ist es etwas Schlimmes?"},
            {"arzt": "Nein, Sie haben nur eine leichte Erkältung. Trinken Sie viel Tee und ruhen Sie sich aus."},
            {"student": "Vielen Dank, Herr Doktor!"}
          ]
        
      },
      {
        id: "sp_a2_3",
        well_Answered: false,
        Text: ["Monolog: Pläne für das Wochenende", "Erzählen Sie von Ihren Wochenendplänen. Sprechen Sie über:", "• Was Sie machen werden", "• Mit wem", "• Warum Sie das machen möchten", "• Alternative Pläne bei schlechtem Wetter"],
        Tipps: [
          "Verwenden Sie Zukunftsformen: 'Ich werde...', 'Ich möchte...'",
          "Begründen Sie Ihre Pläne: 'weil...', 'denn...'",
          "Nennen Sie auch Alternativen",
          "Sprechen Sie enthusiastisch über Ihre Pläne"
        ],
        questionType: "monologue",
        duration_minutes: 3,
        keywords: ["Wochenende", "Pläne", "mit wem", "warum", "Alternativen"],
        solution:  [
            "Am Wochenende habe ich schöne Pläne.",
            "Am Samstag möchte ich mit meinen Freunden wandern gehen.",
            "Wir werden in die Berge fahren, weil das Wetter schön sein soll.",
            "Ich liebe die Natur und wandere sehr gern.",
            "Am Samstagabend werden wir zusammen grillen.",
            "Am Sonntag besuche ich meine Großeltern.",
            "Falls es regnet, gehen wir ins Kino statt wandern.",
            "Ich freue mich schon sehr auf das Wochenende!"
          ]
        
      }
    ],
    
    B1: [
      {
        id: "sp_b1_1",
        well_Answered: false,
        Text: ["Monolog: Arbeit und Beruf", "Sprechen Sie über Ihre berufliche Situation. Sprechen Sie über:", "• Ihren Beruf/Ihre Ausbildung", "• Ihre täglichen Aufgaben", "• Was Ihnen gefällt/nicht gefällt", "• Ihre beruflichen Ziele"],
        Tipps: [
          "Strukturieren Sie Ihre Antwort logisch",
          "Verwenden Sie berufsspezifische Begriffe",
          "Begründen Sie Ihre Meinungen ausführlich",
          "Sprechen Sie etwa 3-4 Minuten"
        ],
        questionType: "monologue",
        duration_minutes: 4,
        keywords: ["Beruf", "Aufgaben", "Vor-/Nachteile", "Ziele"],
        solution:  [
            "Ich arbeite als Marketingassistentin in einem mittelständischen Unternehmen.",
            "Meine täglichen Aufgaben sind sehr vielfältig.",
            "Ich erstelle Präsentationen, organisiere Veranstaltungen und betreue unsere Social-Media-Kanäle.",
            "Besonders gut gefällt mir der kreative Aspekt meiner Arbeit.",
            "Ich kann eigene Ideen einbringen und sehe die Ergebnisse meiner Arbeit direkt.",
            "Weniger gefällt mir, dass ich manchmal unter Zeitdruck stehe.",
            "Mein Ziel ist es, in zwei Jahren Teamleiterin zu werden.",
            "Dafür mache ich gerade eine Weiterbildung im Projektmanagement.",
            "Langfristig möchte ich eine eigene Marketingagentur gründen."
          ]
        
      },
      {
        id: "sp_b1_2",
        well_Answered: false,
        Text: ["Gespräch: Wohnungssuche", "Sie suchen eine neue Wohnung und sprechen mit einem Makler.", "Sprechen Sie über:", "• Ihre Wünsche (Größe, Lage, Preis)", "• Ihre aktuelle Situation", "• Besichtigungstermin", "• Fragen zur Wohnung"],
        Tipps: [
          "Stellen Sie gezielte Fragen",
          "Erklären Sie Ihre Bedürfnisse klar",
          "Verhandeln Sie höflich über Konditionen",
          "Zeigen Sie Interesse, aber bleiben Sie kritisch"
        ],
        questionType: "dialogue",
        duration_minutes: 5,
        keywords: ["Wohnungssuche", "Wünsche", "Besichtigung", "Konditionen"],
        solution:  [
            {"makler": "Guten Tag! Sie interessieren sich für eine Wohnung?"},
            {"student": "Ja, genau. Ich suche eine 2-Zimmer-Wohnung in zentraler Lage."},
            {"makler": "Wie ist denn Ihr Budget?"},
            {"student": "Bis zu 800 Euro warm wäre ideal. Ich arbeite in der Innenstadt und möchte nicht weit fahren."},
            {"makler": "Da hätte ich etwas für Sie. Eine schöne Wohnung, 65 qm, in der Nähe vom Hauptbahnhof."},
            {"student": "Das klingt interessant. Ist sie möbliert?"},
            {"makler": "Nein, sie ist unmöbliert. Dafür hat sie einen Balkon und eine moderne Küche."},
            {"student": "Wann könnte ich sie besichtigen?"},
            {"makler": "Morgen um 15 Uhr wäre möglich."},
            {"student": "Perfect! Gibt es Haustiere-Erlaubnis? Ich habe eine Katze."},
            {"makler": "Das muss ich mit dem Vermieter klären. Ich rufe Sie heute Abend an."},
            {"student": "Vielen Dank! Bis morgen dann."}
          ]
        
      },
      {
        id: "sp_b1_3",
        well_Answered: false,
        Text: ["Monolog: Umweltschutz im Alltag", "Sprechen Sie über Umweltschutz. Sprechen Sie über:", "• Was Sie persönlich für die Umwelt tun", "• Welche Probleme es gibt", "• Was die Gesellschaft ändern sollte", "• Ihre Meinung zu erneuerbaren Energien"],
        Tipps: [
          "Geben Sie konkrete Beispiele aus Ihrem Leben",
          "Argumentieren Sie überzeugend",
          "Verwenden Sie Konnektoren: außerdem, deshalb, trotzdem",
          "Zeigen Sie verschiedene Perspektiven auf"
        ],
        questionType: "monologue",
        duration_minutes: 4,
        keywords: ["Umweltschutz", "persönliche Maßnahmen", "Probleme", "Lösungen"],
        solution:  [
            "Umweltschutz ist für mich ein sehr wichtiges Thema.",
            "Persönlich versuche ich, im Alltag bewusst zu handeln.",
            "Ich fahre hauptsächlich mit dem Fahrrad oder öffentlichen Verkehrsmitteln.",
            "Außerdem kaufe ich regionale Produkte und vermeide Plastikverpackungen.",
            "Trotzdem sehe ich, dass wir als Gesellschaft noch mehr tun müssen.",
            "Das größte Problem ist meiner Meinung nach der hohe CO2-Ausstoß.",
            "Deshalb sollten wir schneller auf erneuerbare Energien umsteigen.",
            "Windkraft und Solarenergie haben großes Potential.",
            "Allerdings müssen auch die Politiker strengere Gesetze machen.",
            "Nur gemeinsam können wir den Klimawandel stoppen."
          ]
        
      }
    ],
    
    B2: [
      {
        id: "sp_b2_1",
        well_Answered: false,
        Text: ["Monolog: Digitalisierung in der Bildung", "Sprechen Sie über die Digitalisierung im Bildungswesen. Sprechen Sie über:", "• Vor- und Nachteile von Online-Lernen", "• Ihre persönlichen Erfahrungen", "• Auswirkungen auf traditionelle Schulen", "• Zukunftsperspektiven"],
        Tipps: [
          "Argumentieren Sie differenziert und ausgewogen",
          "Verwenden Sie komplexere Satzstrukturen",
          "Stützen Sie Ihre Meinungen mit Beispielen",
          "Zeigen Sie verschiedene Blickwinkel auf"
        ],
        questionType: "monologue",
        duration_minutes: 5,
        keywords: ["Digitalisierung", "Online-Lernen", "Vor-/Nachteile", "Zukunft"],
        solution:  [
            "Die Digitalisierung hat das Bildungswesen grundlegend verändert.",
            "Einerseits bietet Online-Lernen viele Vorteile, wie Flexibilität und Zugänglichkeit.",
            "Studenten können von überall lernen und ihr Tempo selbst bestimmen.",
            "Andererseits fehlt oft der persönliche Kontakt zwischen Lehrern und Schülern.",
            "Aus eigener Erfahrung weiß ich, dass die Motivation beim Online-Lernen schwieriger aufrechtzuerhalten ist.",
            "Während der Pandemie mussten wir alle schnell umdenken.",
            "Viele traditionelle Schulen haben jedoch gezeigt, dass sie sich anpassen können.",
            "Meiner Ansicht nach liegt die Zukunft in einem hybriden Modell.",
            "Präsenzunterricht für Diskussionen und soziale Interaktion, digitale Tools für individuelle Übungen.",
            "Wichtig ist, dass wir die Chancen der Technologie nutzen, ohne die menschliche Komponente zu vergessen."
          ]
        
      },
      {
        id: "sp_b2_2",
        well_Answered: false,
        Text: ["Gespräch: Bewerbungsgespräch", "Sie bewerben sich um eine Stelle als Projektmanager/in.", "Sprechen Sie über:", "• Ihre Qualifikationen", "• Motivation für die Stelle", "• Stärken und Schwächen", "• Fragen an das Unternehmen"],
        Tipps: [
          "Seien Sie selbstbewusst, aber nicht arrogant",
          "Bereiten Sie konkrete Beispiele vor",
          "Stellen Sie intelligente Rückfragen",
          "Zeigen Sie echtes Interesse am Unternehmen"
        ],
        questionType: "dialogue",
        duration_minutes: 6,
        keywords: ["Bewerbung", "Qualifikationen", "Motivation", "Stärken/Schwächen"],
        solution:  [
            {"personaler": "Guten Tag! Erzählen Sie uns doch zunächst etwas über sich."},
            {"student": "Guten Tag! Ich bin Wirtschaftsingenieurin mit fünf Jahren Berufserfahrung im Projektmanagement."},
            {"personaler": "Was motiviert Sie, zu unserem Unternehmen zu wechseln?"},
            {"student": "Ihr Unternehmen ist Marktführer in der nachhaltigen Technologie. Das passt perfekt zu meinen Werten."},
            {"personaler": "Welche Stärken bringen Sie mit?"},
            {"student": "Meine größte Stärke ist die Fähigkeit, komplexe Projekte strukturiert anzugehen und Teams zu motivieren."},
            {"personaler": "Und Ihre Schwächen?"},
            {"student": "Manchmal bin ich zu perfektionistisch. Ich arbeite daran, effizienter zu delegieren."},
            {"personaler": "Haben Sie Fragen an uns?"},
            {"student": "Ja, wie sieht die Einarbeitung aus? Und welche Weiterbildungsmöglichkeiten gibt es?"},
            {"personaler": "Wir haben ein strukturiertes Mentoring-Programm und unterstützen externe Fortbildungen."},
            {"student": "Das klingt sehr attraktiv. Vielen Dank für das Gespräch!"}
          ]
        
      },
      {
        id: "sp_b2_3",
        well_Answered: false,
        Text: ["Monolog: Work-Life-Balance", "Sprechen Sie über die Vereinbarkeit von Beruf und Privatleben. Sprechen Sie über:", "• Herausforderungen in der modernen Arbeitswelt", "• Ihre persönliche Strategie", "• Rolle der Arbeitgeber", "• Gesellschaftliche Entwicklungen"],
        Tipps: [
          "Reflektieren Sie über gesellschaftliche Trends",
          "Verwenden Sie abstrakte Begriffe präzise",
          "Argumentieren Sie auf mehreren Ebenen",
          "Ziehen Sie Schlussfolgerungen für die Zukunft"
        ],
        questionType: "monologue",
        duration_minutes: 5,
        keywords: ["Work-Life-Balance", "Herausforderungen", "Strategien", "Gesellschaft"],
        solution:  [
            "Die Work-Life-Balance ist ein zentrales Thema unserer Zeit geworden.",
            "In der modernen Arbeitswelt verschwimmen die Grenzen zwischen Beruf und Freizeit zunehmend.",
            "Ständige Erreichbarkeit durch Smartphones und Homeoffice verstärken diesen Trend.",
            "Persönlich habe ich gelernt, klare Grenzen zu ziehen.",
            "Nach 18 Uhr schalte ich mein Arbeitshandy aus und widme mich bewusst der Familie.",
            "Regelmäßiger Sport und Hobbys helfen mir, den Kopf frei zu bekommen.",
            "Arbeitgeber tragen dabei eine große Verantwortung.",
            "Flexible Arbeitszeiten und die Respektierung der Ruhezeiten sind entscheidend.",
            "Gesellschaftlich sehe ich einen Wandel: Die junge Generation priorisiert Lebensqualität über reinen Karriereerfolg.",
            "Langfristig werden Unternehmen, die Work-Life-Balance ernst nehmen, die besten Talente anziehen."
          ]
        
      }
    ],
    
    C1: [
      {
        id: "sp_c1_1",
        well_Answered: false,
        Text: ["Monolog: Künstliche Intelligenz in der Gesellschaft", "Analysieren Sie die Auswirkungen der KI auf verschiedene Lebensbereiche. Sprechen Sie über:", "• Chancen und Risiken", "• Ethische Fragestellungen", "• Auswirkungen auf den Arbeitsmarkt", "• Notwendige Regulierungsmaßnahmen"],
        Tipps: [
          "Entwickeln Sie komplexe Argumentationsketten",
          "Verwenden Sie präzise Fachterminologie",
          "Zeigen Sie nuancierte Perspektiven auf",
          "Verknüpfen Sie verschiedene Aspekte miteinander"
        ],
        questionType: "monologue",
        duration_minutes: 6,
        keywords: ["KI", "Gesellschaft", "Ethik", "Arbeitsmarkt", "Regulierung"],
        solution:  [
            "Künstliche Intelligenz stellt zweifellos eine der tiefgreifendsten technologischen Revolutionen unserer Zeit dar.",
            "Die Potentiale sind immens: von personalisierten Medikamenten bis hin zu autonomen Verkehrssystemen.",
            "Gleichzeitig müssen wir uns den fundamentalen ethischen Fragen stellen, die diese Technologie aufwirft.",
            "Besonders problematisch ist die Frage algorithmischer Gerechtigkeit und Transparenz.",
            "Wenn KI-Systeme über Kreditvergaben oder Stellenbesetzungen entscheiden, entstehen neue Formen der Diskriminierung.",
            "Der Arbeitsmarkt wird sich radikal wandeln - nicht nur einfache, sondern auch hochqualifizierte Tätigkeiten werden automatisiert.",
            "Während neue Arbeitsplätze entstehen, sind massive Umschulungsprogramme unerlässlich.",
            "Regulatorisch stehen wir vor der Herausforderung, Innovation zu fördern und gleichzeitig Risiken zu minimieren.",
            "Eine internationale Koordinierung ist dabei unabdingbar, da KI-Entwicklung globale Auswirkungen hat.",
            "Letztendlich müssen wir als Gesellschaft bewusst entscheiden, welche Art von Zukunft wir gestalten wollen."
          ]
        
      },
      {
        id: "sp_c1_2",
        well_Answered: false,
        Text: ["Gespräch: Wissenschaftliche Diskussion", "Sie diskutieren mit einem Kollegen über nachhaltige Stadtentwicklung.", "Sprechen Sie über:", "• Konzepte für Smart Cities", "• Bürgerbeteiligung bei Planungsprozessen", "• Finanzierungsmodelle", "• Internationale Best Practices"],
        Tipps: [
          "Argumentieren Sie auf wissenschaftlichem Niveau",
          "Hinterfragen Sie Positionen konstruktiv",
          "Verwenden Sie Fachsprache angemessen",
          "Zeigen Sie Kompromissbereitschaft"
        ],
        questionType: "dialogue",
        duration_minutes: 8,
        keywords: ["Smart Cities", "Nachhaltigkeit", "Bürgerbeteiligung", "Best Practices"],
        solution:  [
            {"kollege": "Die Smart City-Konzepte sind ja sehr technologielastig. Kritiker sagen, die sozialen Aspekte kämen zu kurz."},
            {"student": "Das ist ein berechtigter Einwand. Allerdings sehe ich Technologie als Enabler für soziale Innovation, nicht als Selbstzweck."},
            {"kollege": "Aber wie stellen Sie sicher, dass alle Bevölkerungsgruppen von digitalen Lösungen profitieren?"},
            {"student": "Bürgerbeteiligung ist da der Schlüssel. Partizipative Planungsprozesse müssen von Anfang an mitgedacht werden."},
            {"kollege": "Das klingt theoretisch gut, aber die Finanzierung? Viele Kommunen sind chronisch unterfinanziert."},
            {"student": "Stimmt, hier brauchen wir innovative Finanzierungsmodelle. Public-Private-Partnerships haben in Barcelona sehr gut funktioniert."},
            {"kollege": "Barcelona ist ein interessantes Beispiel. Aber lassen sich solche Modelle auf kleinere Städte übertragen?"},
            {"student": "Nicht eins zu eins, aber die Grundprinzipien schon. Wichtig ist eine schrittweise Implementierung mit klaren Evaluationskriterien."},
            {"kollege": "Das überzeugt mich. Vielleicht sollten wir ein Pilotprojekt in unserer Region vorschlagen."},
            {"student": "Ausgezeichnete Idee! Ich könnte eine erste Machbarkeitsstudie erarbeiten."}
          ]
        
      },
      {
        id: "sp_c1_3",
        well_Answered: false,
        Text: ["Monolog: Kulturelle Identität in der Globalisierung", "Analysieren Sie das Spannungsfeld zwischen Globalisierung und kultureller Identität. Sprechen Sie über:", "• Homogenisierung vs. kulturelle Vielfalt", "• Rolle der Medien und sozialen Netzwerke", "• Generationskonflikte in Migrationsfamilien", "• Zukunft multikultureller Gesellschaften"],
        Tipps: [
          "Reflektieren Sie über abstrakte gesellschaftliche Prozesse",
          "Verwenden Sie soziologische und anthropologische Konzepte",
          "Entwickeln Sie eigenständige Thesen",
          "Verknüpfen Sie globale und lokale Perspektiven"
        ],
        questionType: "monologue",
        duration_minutes: 6,
        keywords: ["Globalisierung", "kulturelle Identität", "Multikulturalität", "Medien"],
        solution:  [
            "Die Dialektik zwischen Globalisierung und kultureller Identität prägt unsere Gegenwart fundamental.",
            "Einerseits erleben wir eine beispiellose kulturelle Homogenisierung durch globale Medienkonzerne und Konsumkulturen.",
            "Andererseits beobachten wir paradoxerweise eine Revitalisierung lokaler Traditionen als Reaktion auf diese Entwicklung.",
            "Soziale Netzwerke verstärken beide Tendenzen: Sie schaffen globale Kommunikationsräume, ermöglichen aber auch die Pflege kultureller Nischenkulturen.",
            "Besonders komplex gestaltet sich die Situation in Migrationsfamilien.",
            "Während die erste Generation oft stark an Herkunftskulturen festhält, entwickeln nachfolgende Generationen hybride Identitäten.",
            "Diese Identitätskonstruktionen sind hochdynamisch und situationsabhängig.",
            "Multikulturelle Gesellschaften stehen vor der Herausforderung, Kohäsion bei gleichzeitiger Diversität zu schaffen.",
            "Der Schlüssel liegt meines Erachtens in der Entwicklung einer 'kosmopolitischen Lokalität'.",
            "Das bedeutet: verwurzelt in lokalen Gemeinschaften, aber offen für globale Einflüsse und Austausch."
          ]
        
      }
    ],
    
    C2: [
      {
        id: "sp_c2_1",
        well_Answered: false,
        Text: ["Monolog: Epistemologie des digitalen Zeitalters", "Reflektieren Sie über Wissen und Wahrheit im digitalen Zeitalter. Sprechen Sie über:", "• Transformation von Wissensproduktion und -verbreitung", "• Herausforderungen durch Desinformation", "• Rolle von Algorithmen bei der Meinungsbildung", "• Konzepte für digitale Aufklärung"],
        Tipps: [
          "Operieren Sie mit philosophischen und erkenntnistheoretischen Konzepten",
          "Entwickeln Sie originelle Gedankengänge",
          "Verwenden Sie präzise wissenschaftliche Terminologie",
          "Zeigen Sie interdisziplinäre Verknüpfungen auf"
        ],
        questionType: "monologue",
        duration_minutes: 7,
        keywords: ["Epistemologie", "Digitalisierung", "Wahrheit", "Desinformation", "Aufklärung"],
        solution:  [
            "Das digitale Zeitalter konfrontiert uns mit fundamentalen epistemologischen Fragen, die das Verhältnis von Wissen, Wahrheit und Gesellschaft neu definieren.",
            "Die Demokratisierung der Wissensproduktion durch digitale Plattformen erodiert traditionelle Gatekeeper-Funktionen.",
            "Während dies prinzipiell emanzipatorisches Potential birgt, entstehen gleichzeitig neue Formen epistemischer Ungerechtigkeit.",
            "Algorithmen kuratieren unsere Realitätserfahrung und schaffen personalisierte Wahrheiten, die Filterblasen verstärken.",
            "Die Proliferation von Desinformation stellt nicht nur ein informationelles, sondern ein fundamentales demokratietheoretisches Problem dar.",
            "Besonders problematisch ist die Instrumentalisierung kognitiver Verzerrungen durch gezielte Manipulationsstrategien.",
            "Eine digitale Aufklärung muss daher sowohl technische als auch kognitive Kompetenzen vermitteln.",
            "Es geht um die Kultivierung einer kritischen digitalen Hermeneutik, die Quellenkritik mit einem Verständnis algorithmischer Prozesse verbindet.",
            "Institutionell benötigen wir neue Formen der Wissensvalidierung, die Geschwindigkeit und Gründlichkeit balancieren.",
            "Letztendlich müssen wir als Gesellschaft entscheiden, ob wir eine pluralistische Wissensordnung oder algorithmische Hegemonie wollen."
          ]
        
      },
      {
        id: "sp_c2_2",
        well_Answered: false,
        Text: ["Gespräch: Akademische Debatte über Bioethik", "Sie debattieren mit Experten über CRISPR-Technologie und Genbearbeitung.", "Sprechen Sie über:", "• Ethische Implikationen von Genome Editing", "• Regulatorische Frameworks", "• Gesellschaftliche Akzeptanz", "• Internationale Governance-Strukturen"],
        Tipps: [
          "Argumentieren Sie auf höchstem wissenschaftlichen Niveau",
          "Antizipieren Sie Gegenargumente und reagieren Sie darauf",
          "Verwenden Sie komplexe rhetorische Strategien",
          "Demonstrieren Sie tiefes Verständnis der Materie"
        ],
        questionType: "dialogue",
        duration_minutes: 10,
        keywords: ["CRISPR", "Bioethik", "Genome Editing", "Regulierung", "Governance"],
        solution: [
            {"experte1": "Die CRISPR-Technologie eröffnet unprecedented therapeutische Möglichkeiten, aber die ethischen Implikationen sind hochkomplex."},
            {"student": "Absolut. Wir müssen zwischen somatischen und Keimbahninterventionen differenzieren. Letztere tangieren fundamentale Fragen menschlicher Dignität."},
            {"experte2": "Aber wo ziehen Sie die Grenze? Enhancement versus Therapie ist oft ein kontinuierliches Spektrum, keine binäre Unterscheidung."},
            {"student": "Ein valider Punkt. Vielleicht sollten wir von einem graduellen Ansatz ausgehen, der Risiko-Nutzen-Abwägungen kontextualisiert."},
            {"experte1": "Die regulatorischen Frameworks hinken der technologischen Entwicklung hinterher. Wie lösen wir dieses Governance-Dilemma?"},
            {"student": "Adaptive Regulierung könnte ein Ansatz sein - iterative Anpassungen basierend auf empirischen Evidenzen und gesellschaftlichem Diskurs."},
            {"experte2": "Aber wie gewährleisten Sie internationale Koordination? Regulatorische Arbitrage könnte zu einem 'Race to the Bottom' führen."},
            {"student": "Hier brauchen wir supranationale Institutionen mit bindenden Standards. Die WHO könnte eine koordinierende Rolle übernehmen."},
            {"experte1": "Interessant. Aber wie berücksichtigen Sie kulturelle Differenzen in bioethischen Urteilen?"},
            {"student": "Durch deliberative Prozesse, die lokale Wertesysteme einbeziehen, aber universelle Menschenrechte als non-negotiable betrachten."},
            {"experte2": "Das ist ein sophisticated Ansatz. Aber practical implementation bleibt eine Herausforderung."},
            {"student": "Stimmt, aber die Alternative - ein ethisches Vakuum - wäre deutlich problematischer für die Menschheit."}
          ]
        
      },
      {
        id: "sp_c2_3",
        well_Answered: false,
        Text: ["Monolog: Metamorphosen des Politischen im 21. Jahrhundert", "Analysieren Sie die Transformation politischer Systeme in der Postmoderne. Sprechen Sie über:", "• Krise der repräsentativen Demokratie", "• Neue Formen politischer Partizipation", "• Rolle von Big Data und Algorithmen in der Politik", "• Vision für demokratische Innovation"],
        Tipps: [
          "Operieren Sie mit politiktheoretischen Konzepten höchster Komplexität",
          "Entwickeln Sie originelle theoretische Synthesen",
          "Demonstrieren Sie umfassende Bildung und Reflexionsfähigkeit",
          "Verknüpfen Sie verschiedene Disziplinen innovativ"
        ],
        questionType: "monologue",
        duration_minutes: 8,
        keywords: ["Demokratie", "Postmoderne", "politische Partizipation", "Big Data", "Innovation"],
        solution:  [
            "Die politischen Systeme des 21. Jahrhunderts durchleben eine fundamentale Metamorphose, die klassische demokratietheoretische Kategorien obsolet werden lässt.",
            "Die Krise der repräsentativen Demokratie manifestiert sich nicht nur in sinkender Wahlbeteiligung, sondern in einer grundsätzlichen Legitimationskrise.",
            "Traditionelle Vermittlungsinstanzen - Parteien, Medien, Gewerkschaften - verlieren ihre intermediäre Funktion in zunehmend fragmentierten Gesellschaften.",
            "Gleichzeitig emergieren neue Formen politischer Artikulation: von digitalen Bewegungen bis zu deliberativen Minipublics.",
            "Big Data und algorithmische Governance schaffen neue Machtstrukturen, die demokratische Kontrollmechanismen unterlaufen.",
            "Predictive Policing und Social Scoring etablieren präventive Herrschaftsformen, die Foucaults Gouvernementalitäts-Analyse aktualisieren.",
            "Die Herausforderung besteht darin, technologische Innovation mit demokratischen Prinzipien zu synthetisieren.",
            "Liquid Democracy, Blockchain-basierte Voting-Systeme und AI-assistierte Deliberation könnten neue Partizipationsformen ermöglichen.",
            "Entscheidend ist jedoch die Entwicklung einer digitalen Verfassungsordnung, die algorithmische Transparenz und demokratische Kontrolle gewährleistet.",
            "Letztendlich müssen wir das Politische selbst neu erfinden - jenseits von Nationalstaat und repräsentativer Demokratie, hin zu transnationalen Governance-Netzwerken.",
            "Die Zukunft der Demokratie liegt in ihrer kontinuierlichen Selbsterfindung durch reflexive Institutionalisierung."
          ]
        
      }
    ]
  },
  vokabeln:{
    A1:[
      {
        id: "VokA11",
        word: "Ich",
        text:"___ esse einen Apfel",
        sentence: "Ich esse einen Apfel",
        image_url: "https://www.conservation-nature.fr/wp-content/uploads/visuel/fruit/shutterstock_575378506-1024x901.jpg",
        
        word_languages_explanations: {
          FR: "Je",
          EN: "I",
          ES: "Yo",
          PT: "Eu",
          PL: "Ja",
          RU: "Я",
          TR: "Ben",
          IT: "Io",
          UK: "Я",
          VI: "Tôi",
          TL: "Ako",
          ZH: "我",
          ID: "Saya",
          TH: "ฉัน",
          MS: "Saya",
          AR: "أنا",
        },
        
        sentence_languages_explanations: {
          FR: "Je mange une pomme.",
          EN: "I eat an apple.",
          ES: "Yo como una manzana.",
          PT: "Eu como uma maçã.",
          PL: "Ja jem jabłko.",
          RU: "Я ем яблоко.",
          TR: "Ben bir elma yiyorum.",
          IT: "Io mangio una mela.",
          UK: "Я їм яблуко.",
          VI: "Tôi ăn một quả táo.",
          TL: "Kumakain ako ng mansanas.",
          ZH: "我吃一个苹果。",
          ID: "Saya makan sebuah apel.",
          TH: "ฉันกินแอปเปิ้ล",
          MS: "Saya makan sebiji epal.",
          AR: "أنا آكل تفاحة.",
        },
      },
      {id:"VokA12",
        word:"Apfel",
        text:"ich esse einen _____",
        sentence:"Ich esse einen Apfel",
        image_url:"https://www.conservation-nature.fr/wp-content/uploads/visuel/fruit/shutterstock_575378506-1024x901.jpg",
        word_languages_explanations: {
          FR: "Pomme",
          EN: "Apple",
          ES: "Manzana",
          PT: "Maçã",
          PL: "Jabłko",
          RU: "Яблоко",
          TR: "Elma",
          IT: "Mela",
          UK: "Яблуко",
          VI: "Quả táo",
          TL: "Mansanas",
          ZH: "苹果",
          ID: "Apel",
          TH: "แอปเปิ้ล",
          MS: "Epal",
          AR: "تفاحة",
        },
        
        sentence_languages_explanations: {
          FR: "Je mange une pomme.",
          EN: "I eat an apple.",
          ES: "Yo como una manzana.",
          PT: "Eu como uma maçã.",
          PL: "Ja jem jabłko.",
          RU: "Я ем яблоко.",
          TR: "Ben bir elma yiyorum.",
          IT: "Io mangio una mela.",
          UK: "Я їм яблуко.",
          VI: "Tôi ăn một quả táo.",
          TL: "Kumakain ako ng mansanas.",
          ZH: "我吃一个苹果。",
          ID: "Saya makan sebuah apel.",
          TH: "ฉันกินแอปเปิ้ล",
          MS: "Saya makan sebiji epal.",
          AR: "أنا آكل تفاحة.",
        },
      }
    ],
    A2:[],
    B1:[],
    B2:[],
    C1:[],
    C2:[],
  }
};



export const Vokabeln = {
  A1: {},
  A2: {},
  B1: {},
  B2: {},
  C1: {},
  C2: {},
};

export const Grammatik = {
  A1: {},
  A2: {},
  B1: {},
  B2: {},
  C1: {},
  C2: {},
};



// FR → FR (français - inchangé)
// ENG → EN (anglais)
// SPA → ES (espagnol)
// PORT → PT (portugais)
// POLONAIS → PL (polonais)
// RUSSIAN → RU (russe)
// TURKEI → TR (turc)
// ITALIAN → IT (italien)
// UKRAINISH → UK (ukrainien)
// VIETNAM → VI (vietnamien)
// FILIPINO → TL (tagalog/filipino)
// MANDARIN → ZH (chinois mandarin)
// INDONESIEN → ID (indonésien)
// THAI → TH (thaï)
// MALAISIAN → MS (malais)
// ARAB → AR (arabe)

const Schreiben={
  id:"",
  type:""
}

const ypes=["formular",
  
  "professional_letter","rapport_court",,
  "article_complex",
]


// "postal_card","SMS","excuse_word","information_note","presentation"
//"graphik_description","karikatur_description","argumentation",,"e-mail","forum","article"

const corps={
  "En-tete":"",
  "corps":"",
  "remerciement":"",
  "politesse":"",
  "signature":""
}

// const types={"postal_card":{
//   "En-tete":true,
//   "corps":true,
//   "remerciement":false,
//   "politesse":true,
//   "signature":true
// },
//   "SMS":,
//   "excuse_word":,
// }

const types = {
  "presentation":{
    "hauptteil": true,        // Corps du message
  },
  "postal_card": {
    "anrede": true,           // Formule d'appel 
    "hauptteil": true,        // Corps du message
    "grussformel": true,     // Formule de politesse (Bis bald!)
    "unterschrift": true     // Signature
  },
  
  "SMS": {
    "anrede": false,         // Souvent juste "Hallo Tom!"
    "hauptteil": true,       // Message principal
    "grussformel": false,    // Souvent juste "LG" ou rien
    "unterschrift": false    // Nom souvent omis entre amis
  },
  
  "excuse_word": {
    "anrede": true,          // "Liebe Frau Schmidt,"
    "hauptteil": true,       // Explication + solution
    "dank": true,            // "Vielen Dank!" quasi obligatoire
    "grussformel": true,     // "Mit freundlichen Grüßen"
    "unterschrift": true     // Nom complet important
  },
  
  "information_note": {
    "anrede": true,          // "Liebe/r Nachbar/in"
    "hauptteil": true,       // Information principale
    "dank": false,           // Pas toujours nécessaire
    "grussformel": false,    // Simple "Ihre Nachbarin"
    "unterschrift": true     // Nom pour identification
  },
  "formal_e_mail": {
    "betreff": true,          // Sujet de l'email
    "anrede": true,           // Formule formelle
    "hauptteil": true,       // Information principale
    "hoeflichkeit": true,     // Formules de politesse
    "grussformel": true,      // Formule finale formelle
    "unterschrift": true,     // Nom complet + email
  },
  "informal_e_mail": {
    "betreff": true,          // Sujet de l'email
    "anrede": true,           // Formule formelle
    "hauptteil": true,       // Information principale
    "hoeflichkeit": true,     // Formules de politesse
    "grussformel": true,      // Formule finale formelle
    "unterschrift": true,     // Nom complet + email
  },
  "forum": {
    "anrede": true,      // "Hallo zusammen!"
    "hauptteil": true,       // Information principale
    "gruss": true,      // Formule finale formelle
    "unterschrift": true,     // Nom 
  },
  "article":{
    'titel': true ,
    "hauptteil": true,       // Information principale
  },
  "rapport_simple":{
    'titel': true ,
    "hauptteil": true,       // Information principale
    "schluss":true
  },
  "rapport_long":{
    'einleitung': true ,
    "hauptteil": true,       // Information principale
    "schluss":true
  },
  "formal_letter":{
    "anrede": true,           
    "hauptteil": true,       
    "hoeflichkeit": true,     
    "grussformel": true,      
    "unterschrift": true,     
  },
  "informal_letter":{
    "anrede": true,           
    "hauptteil": true,          
    "grussformel": true,      
    "unterschrift": true,     
  },
  "ereignis_description":{
    'einleitung': true ,
    "hauptteil": true,       
    "schluss":true
  },

  "graphik_description":{
    'einleitung': true ,
    "hauptteil": true,       // Information principale
    "schluss":true
  },
  "karikatur_description":{
    'einleitung': true ,
    "hauptteil": true,       // Information principale
    "schluss":true
  },
  "argumentation":{
    'einleitung': true ,
    "hauptteil": true,       // Information principale
    "schluss":true
  },
  
  "formular": {
    "felder": true,          // Champs à remplir
    "vollstaendigkeit": true, // Tous les champs requis
    "korrektheit": true      // Informations correctes
  }
}


const typologie={
  'simple':["presentation"],
  'adresse':["postal_card","SMS","excuse_word","information_note","forum","SMS","informal_letter"],
  'e_mail':['e_mail'],
  'formulaire':["formulaire"],
  'dissertation':["graphik_description","karikatur_description","argumentation","rapport","ereignis_description"],
  'article':["article"]
}


const A1_schreiben=["presentation","postal_card","SMS","excuse_word","information_note","SMS","formular"]  // 30-40 mots
const A2_schreiben=["informal_e_mail","postal_card","forum","formular","SMS","informal_letter"]  //60-80 mots
const B1_schreiben=["informal_e_mail","formal_e_mail","informal_letter","forum","formal_letter","article","rapport_simple","ereignis_description","SMS"] //100-120 mots
const B2_schreiben=["informal_e_mail","formal_e_mail","informal_letter","forum","formal_letter","argumentation","ereignis_description","article","SMS","rapport_long"] // 150-200 mots
const C1_schreiben=["forum","graphik_description","karikatur_description","argumentation"]  // 200-250 mots
const C2_schreiben=["graphik_description","karikatur_description","argumentation"]  //  250-300+ mots

//Une règle pour les paragraphes des hauptteils : A ajouter quand le paragraphe contient plus de 80 mots
//  Voix IA à utiliser dans le Sprechen, le Vocabulary, et la grammaire /