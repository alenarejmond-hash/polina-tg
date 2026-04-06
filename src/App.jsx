import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, X, ArrowDown, Share2, BadgeCheck, User, ChevronRight, 
  Sparkles, ArrowLeft, Tent, GraduationCap, Star, Scan, AlertCircle, Heart 
} from 'lucide-react';

// ==========================================
// 👩‍💻 НАСТРОЙКИ РАЗРАБОТЧИКА
// ==========================================
const MY_DEVELOPER_NAME = "design & code by Elena Sotnikova";
const MY_DEVELOPER_LINK = "https://t.me/aicreata";

// ==========================================
// 💬 ШАБЛОНЫ СООБЩЕНИЙ
// ==========================================
const MSG_TRAINING_RU = "Здравствуйте! Расскажите, пожалуйста, подробнее о курсе.";
const MSG_TRAINING_EN = "Hello! Could you please tell me more about the course.";
const MSG_SERVICE_RU = "Здравствуйте! Меня заинтересовала ваша услуга:";
const MSG_SERVICE_EN = "Hello! I am interested in your service:";

// ==========================================
// 🖥️ НАСТРОЙКИ ДЛЯ ПК ВЕРСИИ
// ==========================================
const DESKTOP_TITLE = "";
const DESKTOP_DESC = "Открой Web-app на смартфоне, чтобы почувствовать магию 3D-эффектов, плавных анимаций и тактильного отклика.";
const DESKTOP_QR_LINK = "https://t.me/polishaputeshestvennitsa";

// ==========================================
// 🔗 ИНТЕГРАЦИЯ С GOOGLE ТАБЛИЦАМИ
// ==========================================
const GOOGLE_SHEET_ID = "https://docs.google.com/spreadsheets/d/1Vgx1rjlg_IRJ7Egw2Qke9LMIFjy_mRaC5xxmRC6oz6s/edit?gid=43301387#gid=43301387"; 
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxM1MiLA1eTeDbGRizn-iAU7WXcIqlCoKhLCn7pAS9AW4imJI8Y7vxVNx69zTC9CfhH/exec"; 

const TAB_FIRE = "Огненные";
const TAB_ACRO = "Акробатика";
const TAB_CAMP = "Лагерь";
const TAB_SERVICES = "Услуги";
const TAB_REVIEWS_PUB = "Опубликованные отзывы"; 

// Глобальный объект данных (изменяется при загрузке из таблиц)
let APP_DATA = {
  ru: {
      profile: {
          name: "Полина Чубакина", 
          avatar: "https://i.postimg.cc/L6StxpRR/unnamed-1.jpg", 
          bio: "Зажигаю сердца и сцены. Фаер-шоу, акробатика и жизнь в движении 🔥"
      },
      about: {
          photo: "https://i.postimg.cc/vT8f0F1c/photo-2026-03-13-17-39-13.jpg", 
          photos: [
              "https://i.postimg.cc/yN3jwyG1/P9086197_resized.jpg",
              "https://i.postimg.cc/rwsC6NHW/IMG-2289.jpg",
              "https://i.postimg.cc/x1pYs9rD/IMG-6587.jpg",
              "https://i.postimg.cc/T3dHHsn8/P5251351.jpg",
              "https://i.postimg.cc/SQt08kM5/773A0C43-4070-40AB-9777-1F770E33A1D3-1-201-a.jpg",
              "https://i.postimg.cc/rmmnFRQN/IMG-20250704-170817-590.jpg",
              "https://i.postimg.cc/CMZZbM2t/IMG-20240505-WA0106.jpg",
              "https://i.postimg.cc/SR77qyCZ/2025-11-25-15-09-15.jpg",
              "https://i.postimg.cc/Z5nX5gnS/2026-01-25-20-06-44.jpg"
          ],
          text: "Привет! Меня зовут Полина. И мое имя отлично меня описывает, ведь Полина — значит «многогранная»!<br><br><b>Образование и танцы</b><br>С детства живу танцем: училась в ДШИ им. С.Т. Рихтера и училище им. Л.М. Лавровского. Затем окончила школу-студию при ГААНТ им. Игоря Моисеева (куда берут раз в 5 лет с конкурсом 10 человек на место!) и получила диплом артистки балета и педагога. После этого я поступила сразу в два института — МГАХ и ГИТИС. Выбирала, где именно учиться, уже после поступления: в итоге выбрала ГИТИС и окончила его с красным дипломом.<br><br><b>Тренерская работа</b><br>Еще студенткой стала тренером по хореографии в центре гимнастики «Чемпионы». Мне нравится работать именно со спортсменами: здесь есть четкая цель, упорный труд и здоровая конкуренция. Фитнес-формат — не мое, я привыкла работать исключительно на результат и постоянно ищу новые, более эффективные методики.<br><br><b>Лагерь «Чайка» — дело жизни</b><br>Мой первый опыт работы с детьми случился в семейном лагере «Чайка \"Новая Цивилизация\"». Его девиз «Добро, Здоровье и Созидание» стал моим жизненным кредо. Работаю там вожатой уже 10 лет, и лагерь научил меня всему: от планирования времени и решения конфликтов до умения вести за собой. Сейчас мы делаем зимние театральные интенсивы, программы одного дня (Масленица, фольклор, туризм), а в разработке находится лагерь для взрослых.<br><br><b>Сцена, чир-спорт и огненное шоу</b><br>Чтобы не терять форму после выпуска, я занялась акробатикой и чир-спортом (получила 3-й спортивный разряд!). А затем в моей жизни появилась новая искра — фаер-шоу. Танцы с огненным реквизитом — это опасно, страшно, но безумно красиво. Сейчас я развиваюсь как артистка огненного и светового шоу в потрясающем коллективе The best show (рук. Ксения Сафи) и выступаю на соревнованиях с группой поддержки Project Hollywood (руководителя тоже зовут Ксения 🙃).<br><br><b>Остеопрактика и здоровье</b><br>Танцоры и спортсмены работают на износ, выступая с улыбкой даже через сильную боль. Меня саму в свое время спасали остеопаты. Пройдя через это, я решила помогать другим. В этом году я попала на семинары к А.Е. Смирнову и прошла 3 курса «Остеопрактики». Обучение продолжается, но уже после первого курса я начала успешно применять техники и избавлять людей от боли и дискомфорта.<br><br>Когда меня спрашивают, кто я, ответить действительно сложно. Один хороший человек назвал меня многофункциональной 🤣 — получается, так оно и есть!" 
      },
      categories: [
          { title: "Огненные выступления", icon: "fire", badge: "Хит!", action: "posts", posts: [] },
          { title: "Танцы<br>Спорт", icon: "dance", badge: null, action: "posts", posts: [] },
          { title: "Лагерь", icon: 'tent', subtitle: "Летние смены", badge: "Лето 2026", action: "posts", type: "wide", posts: [] },
          { title: "Обучение", icon: 'cap', subtitle: "Индивидуальные занятия", badge: "Идет набор", action: "training", type: "wide" },
          { title: "Мои услуги", icon: 'sparkle', subtitle: "Путь к совершенству тела", badge: "New!", action: "services", type: "wide" }
      ],
      training: {
          photo: "https://i.postimg.cc/bJ99WHhW/HS6A3814.jpg", 
          text: "Балет для всех — онлайн-курс, который превращает мечту в реальность!<br><br>Всегда хотели почувствовать себя балериной, но думали, что уже поздно? Этот курс докажет обратное.<br><br>Онлайн-курс «Балет для всех» — чтобы начать с нуля и влюбиться в движение.<br><br>Без страшных слов и жёстких рамок:<br>только ты, музыка и красивый процесс.<br><br>Вы получите:<br>+ красивую осанку и подтянутое тело<br>+ гибкость, лёгкость и пластичность<br>+ уверенность в движении и в себе<br>+ базу классического танца, которая пригодится в любом стиле<br><br>Внутри вас ждёт не просто обучение, а целое балетное пространство: видеоуроки, поддержка, живые встречи, творческие задания и атмосфера, в которую хочется возвращаться.<br><br>Начни с одного plié — и не заметишь, как изменится всё тело. Начните свой путь в балете уже сегодня. 💫<br><br>",
          buttonLink: "https://t.me/chupolinka17"
      },
      services: [],
      fortunes: [
          { text: "Сегодня ты горишь ярче дедлайнов. Действуй!" },
          { text: "Искра, буря, безумие! Идеальный план на сегодня." },
          { text: "Если что-то идет не так — сделай сальто. Ситуация не изменится, но выглядеть будет эффектно." },
          { text: "Твой внутренний огонь сегодня согреет даже самых душных коллег." },
          { text: "Выдохни. Даже огню нужен кислород, чтобы гореть ярче." },
          { text: "Сегодня ты магнит для удачи. И для восторженных взглядов!" },
          { text: "Не жди подходящего момента, зажигай прямо сейчас." },
          { text: "Ты сегодня как бенгальский огонь — искришь и создаешь праздник!" },
          { text: "Гибкость — твое главное оружие. Подстройся под ситуацию и забери свое." },
          { text: "Звезды говорят: пора выпить кофе и пойти покорять этот мир." },
          { text: "Баланс — это не только про акробатику. Найди точку опоры и лети!" },
          { text: "Сегодня можно всё. Ну, почти всё. Главное — с улыбкой!" },
          { text: "Если закрывается одна дверь, открой её с ноги. Ты же можешь!" },
          { text: "Твоя энергия сегодня пробьет любой потолок. Осторожнее в помещениях!" },
          { text: "Секрет успеха на сегодня: улыбаемся и пашем. Но красиво!" },
          { text: "Ты не просто искра, ты — целый фейерверк возможностей." },
          { text: "Даже если страшно — шагай вперед. В крайнем случае скажешь, что так и было задумано." },
          { text: "Сегодня отличный день, чтобы стать чьей-то причиной для улыбки." },
          { text: "Оставь сомнения в прошлом. Впереди только свет софитов и аплодисменты." },
          { text: "Гори своим делом, но не выгорай. Водичку пей!" },
          { text: "Пластичность ума сегодня важнее шпагата. Хотя шпагат тоже не помешает." },
          { text: "В любой непонятной ситуации крути пои. Или хотя бы мысленно." },
          { text: "Сегодня твой день. Впрочем, как и всегда." },
          { text: "Риск — дело благородное, особенно когда ты знаешь, как правильно падать." },
          { text: "Спотыкаться можно, главное — делать из этого элегантное танцевальное па." },
          { text: "Зарядись позитивом: съешь вкусняшку и иди менять мир к лучшему." },
          { text: "Ты сегодня просто пушка, петарда, ракета! Лети к целям!" },
          { text: "Не пытайся быть нормальной. Быть уникальной гораздо веселее!" },
          { text: "Твой талант сжигать мосты сегодня не пригодится. А вот зажигать сердца — самое то!" },
          { text: "Сегодня удача на твоей стороне. Держи спину ровно и верь в себя." },
          { text: "Пусть твое настроение сегодня будет таким же горячим, как твое любимое шоу." },
          { text: "Сомнения — в мусорку. Ты всё можешь, я узнавала!" },
          { text: "Включай внутреннюю рок-звезду и иди наводить суету (в хорошем смысле)." },
          { text: "Сегодняшний день создан для твоих побед. Больших и маленьких." },
          { text: "Не бойся выделяться. Серости в этом мире и так хватает, добавь огня!" },
          { text: "Как говорил классик: «Вижу цель, не вижу препятствий». Это твой девиз на сегодня." },
          { text: "Если жизнь подкидывает лимоны — попроси еще текилу и соль." },
          { text: "Твоя харизма сегодня способна растопить ледники." },
          { text: "Помни: ты не странная, ты — лимитированная версия!" },
          { text: "Настрой на сегодня: максимум продуктивности, минимум стресса и чашечка вкусного чая." },
          { text: "Делай то, что любишь. Остальное приложится или отвалится за ненадобностью." },
          { text: "Сегодня ты — режиссер своей жизни. Снимай блокбастер!" },
          { text: "Держи баланс между «хочу» и «надо». И пусть «хочу» перевесит." },
          { text: "Твое призвание — сиять. Не смей выключать этот свет!" },
          { text: "Никаких оправданий. Только действия, только вперед!" },
          { text: "Вселенная шепчет: «У тебя всё получится». Прислушайся!" },
          { text: "Сегодня отличный день, чтобы похвалить себя. Ты молодец!" },
          { text: "Не обращай внимания на хейтеров. Они просто завидуют твоей растяжке и смелости." },
          { text: "Будь как огонь: согревай своих и обжигай тех, кто лезет без спроса." },
          { text: "Этот мир еще не готов к твоей грандиозности, но это его проблемы. Зажигай!" }
      ],
      reviews: [],
      socials: {
          telegram: "https://t.me/polishaputeshestvennitsa", instagram: "https://www.instagram.com/zabava_____?igsh=bDVzbGxqaDU2cTll", tiktok: "https://www.tiktok.com/@polechka177?_r=1&_t=ZS-94jKlT7ylZX", vk: "https://vk.ru/chiipolinka"
      },
      ui: {
          aboutBtnTitle: "Давайте знакомиться", aboutBtnSub: "Моя история и путь",
          reviewsTitle: "Отзывы", writeReview: "Написать отзыв",
          fortuneBtnTitle: "Пожелание дня", fortuneBtnSub: "Получи заряд вдохновения",
          socialsTitle: "Мои социальные сети", servicesPageTitle: "Мои услуги",
          aboutSheetTitle: "Обо мне", trainingSheetTitle: "Обучение",
          enrollBtn: "Записаться", fortuneSheetTitle: "Твое пожелание на день",
          reviewSheetTitle: "Оставить отзыв", reviewNamePlaceholder: "Ваше имя",
          reviewTextPlaceholder: "Поделитесь впечатлениями...", reviewSubmitBtn: "Отправить отзыв",
          moreBtn: "Подробнее", toastSuccess: "Отзыв успешно отправлен! 💖", toastWarning: "Пожалуйста, поставьте оценку"
      }
  },
  en: {
      profile: {
          name: "Polina Chubakina", 
          avatar: "https://i.postimg.cc/L6StxpRR/unnamed-1.jpg", 
          bio: "Igniting hearts and stages. Fire shows, acrobatics, and life in motion 🔥"
      },
      about: {
          photo: "https://i.postimg.cc/vT8f0F1c/photo-2026-03-13-17-39-13.jpg", 
          photos: [
              "https://i.postimg.cc/yN3jwyG1/P9086197_resized.jpg",
              "https://i.postimg.cc/rwsC6NHW/IMG-2289.jpg",
              "https://i.postimg.cc/x1pYs9rD/IMG-6587.jpg",
              "https://i.postimg.cc/T3dHHsn8/P5251351.jpg",
              "https://i.postimg.cc/SQt08kM5/773A0C43-4070-40AB-9777-1F770E33A1D3-1-201-a.jpg",
              "https://i.postimg.cc/rmmnFRQN/IMG-20250704-170817-590.jpg",
              "https://i.postimg.cc/CMZZbM2t/IMG-20240505-WA0106.jpg",
              "https://i.postimg.cc/SR77qyCZ/2025-11-25-15-09-15.jpg",
              "https://i.postimg.cc/Z5nX5gnS/2026-01-25-20-06-44.jpg"
          ],
          text: "Hi! My name is Polina. And my name describes me perfectly, because Polina means \"multifaceted\"!<br><br><b>Education and Dance</b><br>I've lived through dance since childhood: I studied at the S.T. Richter Children's School of Arts and the L.M. Lavrovsky College. Then I graduated from the school-studio at the Igor Moiseyev State Academic Ensemble of Popular Dance (where they only accept students once every 5 years with a competition of 10 people per spot!) and received a diploma as a ballet dancer and teacher. After that, I entered two institutes at once — the Moscow State Academy of Choreography (MGAH) and GITIS. I chose where exactly to study after admission: in the end, I chose GITIS and graduated with honors.<br><br><b>Coaching</b><br>Even as a student, I became a choreography coach at the \"Champions\" gymnastics center. I like working specifically with athletes: there is a clear goal, hard work, and healthy competition here. The fitness format is not for me; I am used to working exclusively for results and am constantly looking for new, more effective methods.<br><br><b>Camp \"Chaika\" — My Life's Work</b><br>My first experience working with children happened at the \"Chaika 'New Civilization'\" family camp. Its motto \"Goodness, Health, and Creation\" became my life credo. I have been working there as a counselor for 10 years, and the camp has taught me everything: from time management and conflict resolution to the ability to lead. Now we make winter theatrical intensives, one-day programs (Maslenitsa, folklore, tourism), and a camp for adults is currently in development.<br><br><b>Stage, Cheerleading, and Fire Show</b><br>To stay in shape after graduation, I took up acrobatics and cheer sports (got the 3rd sports category!). And then a new spark appeared in my life — the fire show. Dancing with fire props is dangerous, scary, but incredibly beautiful. Now I am developing as a fire and light show artist in the amazing collective The Best Show (directed by Ksenia Safi) and perform at competitions with the cheerleading team Project Hollywood (the director is also named Ksenia 🙃).<br><br><b>Osteopractic and Health</b><br>Dancers and athletes work to their limits, performing with a smile even through severe pain. I myself was saved by osteopaths in my time. Having gone through this, I decided to help others. This year I attended seminars by A.E. Smirnov and completed 3 courses of \"Osteopractic\". The training continues, but even after the first course, I successfully started applying techniques and relieving people of pain and discomfort.<br><br>When people ask me who I am, it's really hard to answer. One good person called me multifunctional 🤣 — turns out, it's true!" 
      },
      categories: [
          { title: "Fire Performances", icon: "fire", badge: "Hit!", action: "posts", posts: [] },
          { title: "Dancing<br>Sports", icon: "dance", badge: null, action: "posts", posts: [] },
          { title: "Camp", icon: 'tent', subtitle: "Summer camp", badge: "Summer 2026", action: "posts", type: "wide", posts: [] },
          { title: "Training", icon: 'cap', subtitle: "Individual lessons", badge: "Hiring", action: "training", type: "wide" },
          { title: "My Services", icon: 'sparkle', subtitle: "The path to body perfection", badge: "New!", action: "services", type: "wide" }
      ],
      training: {
          photo: "https://i.postimg.cc/bJ99WHhW/HS6A3814.jpg", 
          text: "Ballet for everyone — an online course that turns dreams into reality!<br><br>Always wanted to feel like a ballerina but thought it was too late? This course proves otherwise.<br><br>Online course \"Ballet for everyone\" — to start from scratch and fall in love with movement.<br><br>No scary words or strict boundaries:<br>just you, music, and a beautiful process.<br><br>You will get:<br>+ beautiful posture and a toned body<br>+ flexibility, lightness, and grace<br>+ confidence in movement and in yourself<br>+ classical dance foundation useful for any style<br><br>Inside, it's not just training, but an entire ballet space: video lessons, support, live meetings, creative tasks, and an atmosphere you'll want to return to.<br><br>Start with one plié — and you won't notice how your whole body changes. Start your ballet journey today. 💫<br><br>",
          buttonLink: "https://t.me/chupolinka17"
      },
      services: [],
      fortunes: [
          { text: "Today you burn brighter than deadlines. Take action!" },
          { text: "Spark, storm, madness! The perfect plan for today." },
          { text: "If something goes wrong, do a backflip. It won't change the situation, but it will look spectacular." },
          { text: "Your inner fire will warm up even the most boring colleagues today." },
          { text: "Exhale. Even fire needs oxygen to burn brighter." },
          { text: "Today you are a magnet for luck. And for admiring glances!" },
          { text: "Don't wait for the right moment, ignite right now." },
          { text: "You are like a sparkler today — sparking and creating a holiday vibe!" },
          { text: "Flexibility is your main weapon. Adapt to the situation and take what's yours." },
          { text: "The stars say: it's time to drink coffee and go conquer this world." },
          { text: "Balance is not only about acrobatics. Find your fulcrum and fly!" },
          { text: "Today you can do anything. Well, almost anything. The main thing is to smile!" },
          { text: "If one door closes, kick it open. You can do it!" },
          { text: "Your energy will break any ceiling today. Be careful indoors!" },
          { text: "The secret of success for today: smile and work hard. But make it look good!" },
          { text: "You are not just a spark, you are a whole fireworks display of opportunities." },
          { text: "Even if you're scared, step forward. In the worst case, say it was intended that way." },
          { text: "Today is a great day to be someone's reason to smile." },
          { text: "Leave doubts in the past. Only spotlights and applause are ahead." },
          { text: "Burn for your work, but don't burn out. Drink some water!" },
          { text: "Mental flexibility is more important than the splits today. Although the splits wouldn't hurt either." },
          { text: "In any incomprehensible situation, spin poi. Or at least mentally." },
          { text: "Today is your day. As always, actually." },
          { text: "Risk is a noble cause, especially when you know how to fall properly." },
          { text: "You can stumble, the main thing is to turn it into an elegant dance step." },
          { text: "Recharge with positivity: eat a yummy treat and go change the world for the better." },
          { text: "You are simply a rocket today! Fly to your goals!" },
          { text: "Don't try to be normal. Being unique is much more fun!" },
          { text: "Your talent for burning bridges won't be needed today. But igniting hearts is exactly it!" },
          { text: "Luck is on your side today. Keep your back straight and believe in yourself." },
          { text: "Let your mood today be as hot as your favorite show." },
          { text: "Throw your doubts in the trash. You can do anything, I checked!" },
          { text: "Turn on your inner rock star and go make some noise (in a good way)." },
          { text: "Today is made for your victories. Big and small." },
          { text: "Don't be afraid to stand out. There is enough grayness in this world, add some fire!" },
          { text: "As the classic said: 'I see the goal, I don't see obstacles'. That's your motto for today." },
          { text: "If life gives you lemons, ask for tequila and salt." },
          { text: "Your charisma today can melt glaciers." },
          { text: "Remember: you are not weird, you are a limited edition!" },
          { text: "Mood for today: maximum productivity, minimum stress, and a cup of delicious tea." },
          { text: "Do what you love. The rest will follow or fall off as unnecessary." },
          { text: "Today you are the director of your life. Shoot a blockbuster!" },
          { text: "Keep the balance between 'I want' and 'I have to'. And let 'I want' outweigh." },
          { text: "Your calling is to shine. Don't you dare turn off this light!" },
          { text: "No excuses. Only actions, only forward!" },
          { text: "The universe whispers: 'You will succeed'. Listen closely!" },
          { text: "Today is a great day to praise yourself. You are doing great!" },
          { text: "Don't pay attention to haters. They are just jealous of your flexibility and courage." },
          { text: "Be like fire: warm your people and burn those who cross the line." },
          { text: "This world is not yet ready for your awesomeness, but that's its problem. Ignite!" }
      ],
      reviews: [],
      socials: {
          telegram: "https://t.me/polishaputeshestvennitsa", instagram: "https://www.instagram.com/zabava_____?igsh=bDVzbGxqaDU2cTll", tiktok: "https://www.tiktok.com/@polechka177?_r=1&_t=ZS-94jKlT7ylZX", vk: "https://vk.ru/chiipolinka"
      },
      ui: {
          aboutBtnTitle: "Let's get acquainted", aboutBtnSub: "My story and journey",
          reviewsTitle: "Reviews", writeReview: "Write a review",
          fortuneBtnTitle: "Wish of the day", fortuneBtnSub: "Get inspired for the day",
          socialsTitle: "My social networks", servicesPageTitle: "My Services",
          aboutSheetTitle: "About Me", trainingSheetTitle: "Training",
          enrollBtn: "Sign up", fortuneSheetTitle: "Your wish for today",
          reviewSheetTitle: "Leave a review", reviewNamePlaceholder: "Your name",
          reviewTextPlaceholder: "Share your impressions...", reviewSubmitBtn: "Submit Review",
          moreBtn: "Details", toastSuccess: "Review sent successfully! 💖", toastWarning: "Please rate us with stars"
      }
  }
};

// ==========================================
// ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ
// ==========================================

const IconResolver = ({ name, className }) => {
  switch (name) {
    case 'fire': return <span className="text-2xl">🔥</span>;
    case 'dance': return <span className="text-2xl">🤸‍♀️</span>;
    case 'tent': return <Tent className={className} size={24} />;
    case 'cap': return <GraduationCap className={className} size={24} />;
    case 'sparkle': return <Sparkles className={className} size={24} />;
    default: return null;
  }
};

const Gallery = ({ photos, containerId }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.clientWidth;
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  if (!photos || photos.length === 0) return null;

  return (
    <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-black/20">
      <div 
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar h-full w-full"
        onScroll={handleScroll}
      >
        {photos.map((p, i) => (
          <img key={i} src={p} className="w-full h-full object-cover shrink-0 snap-center" alt="Gallery item" />
        ))}
      </div>
      {photos.length > 1 && (
        <div className="absolute bottom-4 left-0 w-full flex flex-wrap justify-center gap-2 z-10 px-4">
          {photos.map((_, i) => (
            <div key={i} className={`w-2 h-2 shrink-0 rounded-full bg-white transition-all duration-300 shadow-md ${i === activeIndex ? 'opacity-100 scale-125' : 'opacity-40'}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState('ru');
  const [config, setConfig] = useState(APP_DATA['ru']);
  const [loading, setLoading] = useState(true);
  
  // UI State
  const [activeScreen, setActiveScreen] = useState('main'); // 'main' | 'services'
  const [activeSheet, setActiveSheet] = useState(null); // 'about', 'posts', 'training', 'service', 'fortune', 'review'
  const [sheetData, setSheetData] = useState(null); 
  const [toast, setToast] = useState({ show: false, msg: '', icon: null });
  const [showBlurGuide, setShowBlurGuide] = useState(false);
  const [screenOpacity, setScreenOpacity] = useState(1);
  const [sheetClosing, setSheetClosing] = useState(false);
  const [fortuneText, setFortuneText] = useState('');
  
  // Form State
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');

  // Refs
  const tiltCardRef = useRef(null);
  const scrollPosRef = useRef(0);
  
  const tg = window.Telegram?.WebApp;

  useEffect(() => {
    if (tg) {
      tg.expand();
      tg.ready();
      try { tg.disableVerticalSwipes(); } catch(e) {}
      tg.setHeaderColor('#b000ff');
    }
    
    document.addEventListener('contextmenu', event => event.preventDefault());

    // Фейковая задержка для лоадера + запуск парсинга гугл таблиц
    setTimeout(() => setLoading(false), 500);
    loadDynamicData();
  }, []);

  // Блокировка скролла при открытых шторках
  useEffect(() => {
    if (activeSheet && !sheetClosing) {
      scrollPosRef.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosRef.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'none';
    } else if (!activeSheet) {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.overscrollBehavior = '';
      window.scrollTo(0, scrollPosRef.current);
    }
  }, [activeSheet, sheetClosing]);

  // Загрузка Google Таблиц
  const loadDynamicData = async () => {
    if (!GOOGLE_SHEET_ID) return;
    
    let cleanId = GOOGLE_SHEET_ID;
    const match = cleanId.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (match) cleanId = match[1];

    const fetchSheet = async (sheetName) => {
      try {
        const url = `https://docs.google.com/spreadsheets/d/${cleanId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
        const res = await fetch(url);
        const text = await res.text();
        if (!text.includes('google.visualization.Query.setResponse')) return null;
        const jsonStr = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
        return JSON.parse(jsonStr).table.rows;
      } catch (e) {
        console.error("Ошибка загрузки вкладки: " + sheetName, e);
        return null;
      }
    };

    try {
      const [fireRows, acroRows, campRows, servicesRows, reviewsRows] = await Promise.all([
        fetchSheet(TAB_FIRE), fetchSheet(TAB_ACRO), fetchSheet(TAB_CAMP),
        fetchSheet(TAB_SERVICES), fetchSheet(TAB_REVIEWS_PUB)
      ]);

      const processPosts = (rows, langCode) => {
        if (!rows) return [];
        return rows.map(row => ({
          title: langCode === 'ru' ? (row.c[0] ? String(row.c[0].v) : "") : (row.c[1] ? String(row.c[1].v) : (row.c[0] ? String(row.c[0].v) : "")),
          link: row.c[2] ? String(row.c[2].v) : "#"
        })).filter(p => p.title && !p.title.toLowerCase().includes('название') && !p.title.toLowerCase().includes('title'));
      };

      if (fireRows) {
        APP_DATA.ru.categories[0].posts = processPosts(fireRows, 'ru');
        APP_DATA.en.categories[0].posts = processPosts(fireRows, 'en');
      }
      if (acroRows) {
        APP_DATA.ru.categories[1].posts = processPosts(acroRows, 'ru');
        APP_DATA.en.categories[1].posts = processPosts(acroRows, 'en');
      }
      if (campRows) {
        APP_DATA.ru.categories[2].posts = processPosts(campRows, 'ru');
        APP_DATA.en.categories[2].posts = processPosts(campRows, 'en');
      }

      if (servicesRows) {
        ['ru', 'en'].forEach(l => {
          APP_DATA[l].services = servicesRows.map(row => {
            const photosStr = row.c[9] ? String(row.c[9].v) : "";
            const photosArr = photosStr ? photosStr.split(',').map(s => s.trim()) : [];
            const title = l === 'ru' ? (row.c[0] ? String(row.c[0].v) : "") : (row.c[1] ? String(row.c[1].v) : (row.c[0] ? String(row.c[0].v) : ""));
            const shortDesc = l === 'ru' ? (row.c[2] ? String(row.c[2].v) : "") : (row.c[3] ? String(row.c[3].v) : (row.c[2] ? String(row.c[2].v) : ""));
            const fullDesc = l === 'ru' ? (row.c[4] ? String(row.c[4].v) : "") : (row.c[5] ? String(row.c[5].v) : (row.c[4] ? String(row.c[4].v) : ""));
            return {
              title, shortDesc, fullDesc,
              oldPrice: row.c[6] ? String(row.c[6].v) : "",
              newPrice: row.c[7] ? String(row.c[7].v) : "",
              buttonLink: row.c[8] ? String(row.c[8].v) : "#",
              photo: photosArr.length > 0 ? photosArr[0] : "", photos: photosArr
            };
          }).filter(s => s.title && !s.title.toLowerCase().includes('название') && !s.title.toLowerCase().includes('title'));
        });
      }

      if (reviewsRows) {
         ['ru', 'en'].forEach(l => {
            APP_DATA[l].reviews = reviewsRows.map(row => {
                const name = l === 'ru' ? (row.c[0] ? String(row.c[0].v) : "Гость") : (row.c[1] ? String(row.c[1].v) : (row.c[0] ? String(row.c[0].v) : "Guest"));
                const text = l === 'ru' ? (row.c[4] ? String(row.c[4].v) : "") : (row.c[5] ? String(row.c[5].v) : (row.c[4] ? String(row.c[4].v) : ""));
                return {
                    name, 
                    date: row.c[2] ? (row.c[2].f || String(row.c[2].v)) : (l === 'ru' ? "Недавно" : "Recently"),
                    stars: row.c[3] ? parseInt(row.c[3].v) : 5, 
                    text
                }
            }).filter(r => r.text && !r.name.toLowerCase().includes('имя') && !r.name.toLowerCase().includes('name'));
         });
      }

      // Обновляем текущий стейт с ГЛУБОКИМ клонированием, чтобы React 100% увидел изменения
      setConfig(JSON.parse(JSON.stringify(APP_DATA[lang])));
    } catch (e) {
      console.error(e);
    }
  };

  const handleLanguageToggle = () => {
    if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');
    setScreenOpacity(0);
    setTimeout(() => {
      const newLang = lang === 'ru' ? 'en' : 'ru';
      setLang(newLang);
      setConfig(JSON.parse(JSON.stringify(APP_DATA[newLang])));
      setScreenOpacity(1);
    }, 200);
  };

  const haptic = (type = 'light') => {
    if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred(type);
  };

  const showToastMsg = (message, iconComp) => {
    if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
    setToast({ show: true, msg: message, icon: iconComp });
    setTimeout(() => setToast({ show: false, msg: '', icon: null }), 2500);
  };

  const openSheet = (sheetName, data = null) => {
    haptic();
    if (sheetName === 'fortune') {
      const fortunes = config.fortunes;
      setFortuneText(fortunes[Math.floor(Math.random() * fortunes.length)].text);
    }
    setSheetData(data);
    setSheetClosing(false);
    setActiveSheet(sheetName);
  };

  const closeSheet = () => {
    setSheetClosing(true);
    setTimeout(() => {
      setActiveSheet(null);
      setSheetClosing(false);
      setSheetData(null);
    }, 300);
  };

  const submitReviewForm = () => {
    if (reviewRating === 0) {
      if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred('warning');
      showToastMsg(config.ui.toastWarning, <AlertCircle className="text-orange-400" size={18} />);
      return;
    }
    
    if (GOOGLE_SCRIPT_URL) {
      try {
        const formData = new URLSearchParams();
        formData.append('action', 'addReview');
        formData.append('name', reviewName || "Аноним");
        formData.append('text', reviewText);
        formData.append('rating', reviewRating + ' ⭐');

        fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: formData })
          .catch(err => console.log(err));
      } catch(e) {}
    }

    showToastMsg(config.ui.toastSuccess, <Heart className="text-orange-400" size={18} fill="currentColor" />);
    setReviewRating(0);
    setReviewName('');
    setReviewText('');
    closeSheet();
  };

  const shareProfile = () => {
    haptic('medium');
    const shareUrl = "https://t.me/polinachubakina_bot/polina"; 
    const shareText = "Полина - хореограф, артистка фаер-шоу, педагог... Открой мою визитку здесь! ✨";
    if (tg) tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`);
  };

  const handleTilt = (e) => {
    if (!tiltCardRef.current) return;
    const card = tiltCardRef.current;
    const rect = card.getBoundingClientRect();
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -12; 
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;
    
    card.style.transition = 'none';
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    const glare = card.querySelector('.tilt-glare');
    if (glare) {
      glare.style.transition = 'none';
      glare.style.opacity = '1';
      glare.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255,255,255,0.4) 0%, transparent 60%)`;
    }
  };

  const resetTilt = () => {
    if (!tiltCardRef.current) return;
    const card = tiltCardRef.current;
    card.style.transition = 'transform 0.5s ease-out';
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    const glare = card.querySelector('.tilt-glare');
    if (glare) {
      glare.style.transition = 'opacity 0.5s ease-out';
      glare.style.opacity = '0';
    }
  };

  const openWithBlurGuide = (e, url) => {
    e.preventDefault();
    haptic('medium');
    let finalUrl = String(url).trim();
    if (finalUrl.startsWith('@')) finalUrl = 'https://t.me/' + finalUrl.substring(1);
    else if (finalUrl.includes('t.me') && !finalUrl.startsWith('http')) finalUrl = 'https://' + finalUrl;

    if (tg) {
      if (finalUrl.includes('t.me')) tg.openTelegramLink(finalUrl);
      else tg.openLink(finalUrl);
    } else {
      window.open(finalUrl, '_blank');
    }
    setShowBlurGuide(true);
  };

  // ==========================================
  // RENDER HELPERS
  // ==========================================
  
  const renderSheetContent = () => {
    if (!activeSheet) return null;

    if (activeSheet === 'about') {
      return (
        <div className="overflow-y-auto px-6 pb-12 custom-scrollbar">
          <h2 className="text-2xl font-bold mb-5 tracking-tight text-white">{config.ui.aboutSheetTitle}</h2>
          <Gallery photos={config.about.photos || [config.about.photo]} containerId="about" />
          <div className="text-gray-200 space-y-3 leading-relaxed text-[15px] font-medium" dangerouslySetInnerHTML={{ __html: config.about.text }} />
        </div>
      );
    }

    if (activeSheet === 'posts' && sheetData !== null) {
      const cat = config.categories[sheetData];
      return (
        <div className="overflow-y-auto px-6 pb-12 custom-scrollbar">
          <h2 className="text-2xl font-bold mb-5 tracking-tight text-white text-center" dangerouslySetInnerHTML={{__html: cat.title}}></h2>
          <div className="space-y-3">
            {cat.posts.map((post, i) => (
              <a key={i} href={post.link} onClick={(e) => openWithBlurGuide(e, post.link)} className="block p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 transition-colors flex items-center justify-between active:scale-[0.98]">
                <span className="text-[14px] font-bold text-white text-left">{post.title}</span>
                <ChevronRight className="text-gray-300" size={20} />
              </a>
            ))}
          </div>
        </div>
      );
    }

    if (activeSheet === 'training') {
      let trainLink = config.training.buttonLink;
      const msg = lang === 'ru' ? MSG_TRAINING_RU : MSG_TRAINING_EN;
      if (trainLink.includes('t.me')) trainLink += (trainLink.includes('?') ? '&' : '?') + 'text=' + encodeURIComponent(msg);

      return (
        <>
          <div className="overflow-y-auto px-6 pb-32 custom-scrollbar flex-1 min-h-0">
            <h2 className="text-2xl font-bold mb-5 tracking-tight text-white">{config.ui.trainingSheetTitle}</h2>
            <img src={config.training.photo} alt="Training" className="w-full aspect-square object-contain bg-black/20 rounded-[2rem] mb-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]" />
            <div className="text-gray-200 space-y-3 leading-relaxed text-[15px] font-medium mb-4" dangerouslySetInnerHTML={{ __html: config.training.text }} />
          </div>
          <div className="absolute left-0 w-full px-6 z-20 pointer-events-none" style={{ bottom: 'calc(150px + env(safe-area-inset-bottom, 0px) + 32px)' }}>
            <a href={trainLink} onClick={(e) => openWithBlurGuide(e, trainLink)} className="block w-full text-center bg-white text-black rounded-full py-4 px-6 font-bold text-[15px] shadow-[0_10px_40px_rgba(0,0,0,0.5)] active:scale-[0.98] transition-transform pointer-events-auto">
              {config.ui.enrollBtn}
            </a>
          </div>
        </>
      );
    }

    if (activeSheet === 'service' && sheetData !== null) {
      const s = config.services[sheetData];
      let servLink = s.buttonLink || '#';
      const msg = lang === 'ru' ? MSG_SERVICE_RU : MSG_SERVICE_EN;
      if (servLink.includes('t.me')) servLink += (servLink.includes('?') ? '&' : '?') + 'text=' + encodeURIComponent(msg + ' "' + s.title + '"');

      return (
        <>
          <div className="overflow-y-auto px-6 pb-32 custom-scrollbar flex-1 min-h-0">
            <h2 className="text-2xl font-bold mb-5 tracking-tight text-white leading-tight">{s.title}</h2>
            <Gallery photos={s.photos?.length ? s.photos : [s.photo]} containerId="service" />
            <div className="flex items-baseline gap-3 mb-5 px-1">
              <span className="text-white font-extrabold text-[28px] drop-shadow-md tracking-tight">{s.newPrice}</span>
              <span className="text-gray-400 font-medium text-[16px] line-through">{s.oldPrice}</span>
            </div>
            <div className="text-gray-200 space-y-3 leading-relaxed text-[15px] font-medium mb-4" dangerouslySetInnerHTML={{ __html: s.fullDesc?.replace(/\n/g, '<br>') }} />
          </div>
          <div className="absolute left-0 w-full px-6 z-20 pointer-events-none" style={{ bottom: 'calc(150px + env(safe-area-inset-bottom, 0px) + 32px)' }}>
            <a href={servLink} onClick={(e) => openWithBlurGuide(e, servLink)} className="block w-full text-center bg-white text-black rounded-full py-4 px-6 font-bold text-[15px] shadow-[0_10px_40px_rgba(0,0,0,0.5)] active:scale-[0.98] transition-transform pointer-events-auto">
              {config.ui.enrollBtn}
            </a>
          </div>
        </>
      );
    }

    if (activeSheet === 'fortune') {
      return (
        <div className="overflow-y-auto px-6 pb-12 custom-scrollbar text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-4xl mb-4 shadow-[0_0_30px_rgba(255,255,255,0.1)]">🔮</div>
          <h2 className="text-2xl font-bold mb-4 tracking-tight text-white">{config.ui.fortuneSheetTitle}</h2>
          <p className="text-gray-200 text-[16px] leading-relaxed font-medium mb-6 italic">«{fortuneText}»</p>
        </div>
      );
    }

    if (activeSheet === 'review') {
      return (
        <div className="overflow-y-auto px-6 pb-12 custom-scrollbar text-center">
          <h2 className="text-2xl font-bold mb-6 tracking-tight text-white">{config.ui.reviewSheetTitle}</h2>
          <div className="flex justify-center gap-3 mb-6">
            {[1, 2, 3, 4, 5].map(star => (
              <Star 
                key={star} 
                onClick={() => { haptic('light'); setReviewRating(star); }}
                size={36} 
                className={`transition-colors cursor-pointer ${star <= reviewRating ? 'text-orange-400' : 'text-gray-500'}`}
                fill={star <= reviewRating ? "currentColor" : "none"}
              />
            ))}
          </div>
          <input type="text" value={reviewName} onChange={e => setReviewName(e.target.value)} placeholder={config.ui.reviewNamePlaceholder} className="w-full bg-white/10 text-white placeholder-gray-400 border-none rounded-2xl px-5 py-4 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50 font-medium" />
          <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} placeholder={config.ui.reviewTextPlaceholder} rows="4" className="w-full bg-white/10 text-white placeholder-gray-400 border-none rounded-2xl px-5 py-4 mb-6 focus:outline-none focus:ring-2 focus:ring-orange-500/50 resize-none font-medium"></textarea>
          <button onClick={submitReviewForm} className="block w-full text-center bg-white text-black rounded-full py-4 px-6 font-bold text-[15px] shadow-[0_10px_30px_rgba(255,255,255,0.2)] active:scale-[0.98] transition-transform">
            {config.ui.reviewSubmitBtn}
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <style>{`
        :root {
          --bg-color-1: #ffcf00;
          --bg-color-2: #ff7700;
          --bg-color-3: #b000ff;
        }
        .dynamic-bg {
          background: linear-gradient(-45deg, var(--bg-color-1), var(--bg-color-2), var(--bg-color-3), var(--bg-color-1));
          background-size: 300% 300%;
          animation: gradient-bg 12s ease infinite;
        }
        @keyframes gradient-bg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        html, body { overscroll-behavior-y: none; }
        body {
          color: #1c1c1e;
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
        }
        .floating-shadow { box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3), 0 20px 30px -10px rgba(0, 0, 0, 0.2); }
        .card-shadow {
          background: rgba(20, 20, 24, 0.5) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 25px 40px -15px rgba(0, 0, 0, 0.5), 0 10px 20px -10px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transform: translateZ(0);
        }
        ::-webkit-scrollbar { width: 0px; background: transparent; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .fade-in { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        
        /* Исправленный класс для шторок */
        div[id$="-sheet"]:not(#sheet-overlay) {
          bottom: -150px !important;
          padding-bottom: calc(150px + env(safe-area-inset-bottom, 0px)) !important;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .sheet-hidden { transform: translateY(100%) !important; }
        .custom-scrollbar { overscroll-behavior: contain !important; }
      `}</style>

      <div className="dynamic-bg min-h-screen flex items-center justify-center p-0 md:p-6 overflow-x-hidden font-sans">
        
        {/* Loader */}
        {loading && (
          <div className="fixed inset-0 z-[100] dynamic-bg flex items-center justify-center transition-opacity duration-500">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-orange-500/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 border-r-red-500 border-b-yellow-400 animate-spin shadow-[0_0_30px_rgba(249,115,22,0.6)]"></div>
              <Flame className="text-orange-500 animate-pulse" size={32} />
            </div>
          </div>
        )}

        {/* Blur Guide Overlay */}
        <div className={`fixed inset-0 z-[110] bg-black/60 backdrop-blur-md flex-col items-center justify-center transition-opacity duration-300 ${showBlurGuide ? 'opacity-100 flex' : 'opacity-0 hidden pointer-events-none'}`}>
          <button onClick={() => setShowBlurGuide(false)} className="absolute top-6 right-6 text-white/30 hover:text-white/80 p-4 z-10 active:scale-95 transition-all">
            <X size={20} />
          </button>
          <div className="flex flex-col items-center justify-center text-center px-8 pointer-events-none">
            <ArrowDown className="text-white/80 animate-bounce drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] mb-6" size={60} />
            <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight drop-shadow-md">Пост открыт в фоне!</h3>
            <p className="text-[15px] text-gray-200 font-medium leading-relaxed drop-shadow-md">
                Потяни за самый верх экрана вниз 👇<br/>Канал уже ждет тебя под визиткой.
            </p>
          </div>
        </div>

        {/* Master Desktop Wrapper */}
        <div className="w-full max-w-5xl mx-auto md:bg-black/20 md:backdrop-blur-3xl md:border md:border-white/10 md:rounded-[3rem] md:shadow-[0_30px_80px_rgba(0,0,0,0.5)] md:flex md:h-[90vh] md:overflow-hidden relative z-10">
          
          {/* Mobile App Container */}
          <div className="w-full max-w-md mx-auto md:mx-0 md:w-[420px] md:shrink-0 md:border-r md:border-white/10 relative md:overflow-hidden flex flex-col h-full min-h-screen md:min-h-0 bg-transparent">
            
            {/* Toast */}
            <div className={`fixed md:absolute top-4 left-1/2 -translate-x-1/2 z-[100] bg-white/20 backdrop-blur-xl border border-white/40 text-white px-5 py-3 rounded-full flex items-center gap-2 shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all duration-300 font-medium text-sm w-max ${toast.show ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'}`}>
              {toast.icon}
              <span>{toast.msg}</span>
            </div>

            {/* Scrollable Content */}
            <div className="w-full h-full md:overflow-y-auto hide-scrollbar pb-12 pt-6 px-5 custom-scrollbar relative">
              <div style={{ opacity: screenOpacity, transition: 'opacity 0.2s ease' }} className="w-full max-w-md mx-auto">
                
                {/* Main Screen */}
                {activeScreen === 'main' && (
                  <div className="space-y-6">
                    {/* Top Bar */}
                    <div className="w-full flex justify-end items-center gap-3 px-2 -mt-4 -mb-4 fade-in relative z-10">
                      <button onClick={handleLanguageToggle} className="text-white hover:text-gray-200 font-extrabold text-[11px] uppercase transition-colors active:scale-95 tracking-widest drop-shadow-md">
                        {lang === 'ru' ? 'EN' : 'RU'}
                      </button>
                      <button onClick={shareProfile} className="text-white hover:text-gray-200 transition-colors active:scale-95 drop-shadow-md">
                        <Share2 size={18} />
                      </button>
                    </div>

                    {/* Tilt Card (Исправлены стили аспекта) */}
                    <div className="w-full fade-in">
                      <div 
                        ref={tiltCardRef}
                        onMouseMove={handleTilt} onMouseLeave={resetTilt}
                        onTouchMove={handleTilt} onTouchEnd={resetTilt}
                        className="relative w-full rounded-[2.5rem] overflow-hidden floating-shadow transform-gpu will-change-transform"
                        style={{ aspectRatio: '3.5 / 4' }}
                      >
                        <img src={config.profile.avatar} alt="Avatar" className="absolute inset-0 w-full h-full object-cover z-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                        <div className="tilt-glare absolute inset-0 pointer-events-none opacity-0 z-20 mix-blend-overlay"></div>
                        <div className="absolute bottom-5 left-5 right-5 text-white z-30 flex items-end justify-between gap-3">
                          <h1 className="text-[28px] sm:text-3xl font-serif font-bold flex items-center gap-1.5 tracking-tight min-w-0">
                            <span className="truncate">{config.profile.name}</span>
                            <BadgeCheck size={20} className="text-white/90 shrink-0 mt-1" />
                          </h1>
                        </div>
                      </div>
                    </div>

                    <div className="w-full relative px-2 fade-in delay-1">
                      <p className="text-gray-900 font-bold text-sm leading-relaxed text-center px-4">{config.profile.bio}</p>
                    </div>

                    {/* About Button */}
                    <div className="w-full fade-in delay-2 pt-2">
                      <button onClick={() => openSheet('about')} className="w-full relative rounded-3xl p-5 card-shadow transition-transform active:scale-[0.98] flex items-center justify-between text-left">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shadow-sm bg-black/30 text-white">
                            <User size={20} />
                          </div>
                          <div>
                            <h3 className="text-[16px] font-bold text-white">{config.ui.aboutBtnTitle}</h3>
                            <p className="text-[13px] font-medium text-gray-300">{config.ui.aboutBtnSub}</p>
                          </div>
                        </div>
                        <ChevronRight className="text-gray-400" size={20} />
                      </button>
                    </div>

                    {/* Categories Grid (Исправлен размер иконок) */}
                    <div className="grid grid-cols-2 gap-3 fade-in delay-2 mt-3">
                      {config.categories.map((item, index) => {
                        const isWide = item.type === 'wide';
                        const badgeHtml = item.badge ? (
                          <div className={`absolute ${isWide ? '-top-3 left-6' : '-top-3 left-1/2 -translate-x-1/2'} bg-white text-black text-[10px] font-extrabold px-3 py-1 w-max rounded-full shadow-[0_5px_15px_rgba(255,255,255,0.3)] z-10`}>
                            {item.badge}
                          </div>
                        ) : null;

                        const handleClick = () => {
                          if (item.action === 'training') openSheet('training');
                          else if (item.action === 'services') { haptic('light'); setActiveScreen('services'); window.scrollTo(0,0); }
                          else openSheet('posts', index);
                        };

                        if (isWide) {
                          return (
                            <button key={index} onClick={handleClick} className="col-span-2 block relative rounded-3xl p-5 card-shadow transition-transform active:scale-[0.98] flex items-center justify-between text-left w-full mt-1">
                              {badgeHtml}
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center bg-white/10 text-white text-2xl shadow-sm shrink-0">
                                  <IconResolver name={item.icon} className="text-white" />
                                </div>
                                <div>
                                  <h3 className="text-[16px] font-bold text-white" dangerouslySetInnerHTML={{__html: item.title}}></h3>
                                  {item.subtitle && <p className="text-[13px] font-medium text-gray-300 mt-0.5">{item.subtitle}</p>}
                                </div>
                              </div>
                              <ChevronRight className="text-gray-400" size={20} />
                            </button>
                          );
                        }

                        return (
                          <button key={index} onClick={handleClick} className="block relative rounded-3xl p-4 card-shadow transition-transform active:scale-[0.98] flex flex-col items-center justify-center aspect-square w-full text-center">
                            {badgeHtml}
                            <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center mb-3 bg-white/10 text-white text-2xl">
                              <IconResolver name={item.icon} className="text-white" />
                            </div>
                            <h3 className="text-[14px] font-bold text-white leading-tight" dangerouslySetInnerHTML={{__html: item.title}}></h3>
                          </button>
                        );
                      })}
                    </div>

                    {/* Reviews */}
                    <div className="pt-5 fade-in delay-2">
                      <div className="flex items-center justify-between mb-3 px-1">
                        <h2 className="text-[18px] font-bold text-gray-900">{config.ui.reviewsTitle}</h2>
                        <button onClick={() => openSheet('review')} className="text-[12px] font-bold text-white bg-black/30 px-4 py-2 rounded-full backdrop-blur-md active:scale-95 transition-transform shadow-lg">
                          {config.ui.writeReview}
                        </button>
                      </div>
                      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 hide-scrollbar">
                        {config.reviews.map((r, i) => (
                          <div key={i} className="snap-start shrink-0 w-[85%] bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] p-5 flex flex-col justify-between relative overflow-hidden ml-1 my-2">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="relative z-10">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-xs border border-white/20 shadow-sm">
                                    {r.name.charAt(0)}
                                  </div>
                                  <h4 className="text-white font-bold text-[15px]">{r.name}</h4>
                                </div>
                                <span className="text-gray-300 text-[11px] font-medium opacity-80">{r.date}</span>
                              </div>
                              <div className="flex gap-1 mb-3 text-[14px]">
                                {[1,2,3,4,5].map(s => <Star key={s} size={14} className={s <= r.stars ? "text-orange-400" : "text-gray-500"} fill={s <= r.stars ? "currentColor" : "none"} />)}
                              </div>
                              <p className="text-gray-100 text-[13px] leading-relaxed font-medium italic">"{r.text}"</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Fortune & Socials */}
                    <div className="pt-4 fade-in delay-3">
                      <button onClick={() => openSheet('fortune')} className="w-full relative card-shadow text-white rounded-[2rem] py-4 px-5 flex items-center justify-between transition-transform active:scale-[0.98] overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 opacity-70"></div>
                        <div className="flex items-center gap-4 relative z-10">
                          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]">🔮</div>
                          <div className="text-left">
                            <h3 className="text-[16px] font-bold text-white leading-tight">{config.ui.fortuneBtnTitle}</h3>
                            <p className="text-[13px] font-medium text-gray-300 mt-0.5">{config.ui.fortuneBtnSub}</p>
                          </div>
                        </div>
                        <Sparkles className="text-orange-400 relative z-10 animate-pulse" size={24} />
                      </button>
                      
                      <div className="mt-6 text-center space-y-2">
                        <p className="text-xs text-gray-700 font-bold">{config.ui.socialsTitle}</p>
                        <div className="flex justify-center gap-4 text-xs text-gray-800 font-bold">
                          <a href={config.socials.telegram} target="_blank" rel="noopener noreferrer" onClick={() => haptic('light')} className="hover:text-black transition-colors">Telegram</a>
                          <span>|</span>
                          <a href={config.socials.instagram} target="_blank" rel="noopener noreferrer" onClick={() => haptic('light')} className="hover:text-black transition-colors">Instagram</a>
                          <span>|</span>
                          <a href={config.socials.tiktok} target="_blank" rel="noopener noreferrer" onClick={() => haptic('light')} className="hover:text-black transition-colors">TikTok</a>
                          <span>|</span>
                          <a href={config.socials.vk} target="_blank" rel="noopener noreferrer" onClick={() => haptic('light')} className="hover:text-black transition-colors">ВКонтакте</a>
                        </div>
                        <div className="pt-6 pb-2">
                          <a href={MY_DEVELOPER_LINK} target="_blank" rel="noopener noreferrer" className="text-[10px] text-gray-500/50 font-medium uppercase tracking-widest" style={{ color: 'rgba(107, 114, 128, 0.5) !important', WebkitTapHighlightColor: 'transparent' }}>
                            {MY_DEVELOPER_NAME}
                          </a>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* Services Screen */}
                {activeScreen === 'services' && (
                  <div className="space-y-6 fade-in">
                    <div className="flex items-center gap-4 mb-2">
                      <button onClick={() => { haptic('light'); setActiveScreen('main'); }} className="w-12 h-12 rounded-full border border-white/20 shadow-sm bg-black/30 text-white flex items-center justify-center active:scale-95 transition-transform">
                        <ArrowLeft size={20} />
                      </button>
                      <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{config.ui.servicesPageTitle}</h2>
                    </div>
                    
                    <div className="space-y-3 pb-8">
                      {config.services.map((s, i) => (
                        <div key={i} className="card-shadow rounded-[2rem] p-4 flex flex-col gap-4 active:scale-[0.98] transition-transform text-left cursor-pointer" onClick={() => openSheet('service', i)}>
                          <img src={s.photos?.length ? s.photos[0] : s.photo} className="w-full h-48 md:h-56 rounded-2xl object-cover shadow-lg border border-white/10" alt="Service" />
                          <div className="flex flex-col flex-grow">
                            <h3 className="text-white font-bold text-[16px] mb-2 leading-tight">{s.title}</h3>
                            <p className="text-gray-300 text-[12px] line-clamp-3 leading-relaxed mb-4" dangerouslySetInnerHTML={{__html: s.shortDesc?.replace(/\n/g, '<br>')}}></p>
                            <div className="flex items-end justify-between mt-auto pt-4 border-t border-white/10">
                              <div className="flex flex-col">
                                {s.oldPrice && <span className="text-gray-400 text-[11px] line-through leading-none mb-1">{s.oldPrice}</span>}
                                <span className="text-white font-black text-[18px] leading-none drop-shadow-md">{s.newPrice}</span>
                              </div>
                              <div className="text-[12px] font-bold text-white bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-lg flex items-center gap-1">
                                {config.ui.moreBtn} <ChevronRight size={14} />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Sheets Overlay (Добавлен ID) */}
            <div 
              id="sheet-overlay"
              className={`fixed md:absolute inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${activeSheet && !sheetClosing ? 'opacity-100' : 'opacity-0 pointer-events-none hidden'}`} 
              onClick={closeSheet} 
              onTouchMove={e => e.preventDefault()}
            />

            {/* Bottom Sheets (Исправлен ID для правильной работы CSS шторок) */}
            <div 
              id={`${activeSheet || 'bottom'}-sheet`}
              className={`fixed md:absolute bottom-0 left-0 w-full bg-black/45 backdrop-blur-2xl border-t border-white/10 rounded-t-[2.5rem] z-50 transform transition-transform duration-300 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.4)] ${activeSheet && !sheetClosing ? 'translate-y-0' : 'sheet-hidden'}`}
              style={{
                height: activeSheet === 'posts' ? 'calc(50vh + 150px)' : activeSheet === 'fortune' || activeSheet === 'review' ? 'auto' : 'calc(90vh + 150px)',
                maxHeight: activeSheet === 'fortune' || activeSheet === 'review' ? 'calc(85vh + 150px)' : 'none'
              }}
            >
              <div 
                className="w-full flex justify-center py-4 drag-handle shrink-0 cursor-grab active:cursor-grabbing" 
                onClick={closeSheet}
                onTouchStart={(e) => { e.target.dataset.startY = e.touches[0].clientY; }}
                onTouchMove={(e) => { e.preventDefault(); e.target.dataset.curY = e.touches[0].clientY; }}
                onTouchEnd={(e) => {
                   const startY = Number(e.target.dataset.startY);
                   const curY = Number(e.target.dataset.curY);
                   if (curY > startY + 40) closeSheet();
                }}
              >
                <div className="w-14 h-1.5 bg-white/30 rounded-full pointer-events-none"></div>
              </div>
              <button onClick={closeSheet} className="absolute top-4 right-6 text-white/30 hover:text-white/80 p-2 z-10 active:scale-95 transition-all"><X size={20} /></button>
              
              {renderSheetContent()}
            </div>

          </div>

          {/* Desktop QR Panel */}
          <div className="hidden md:flex flex-1 flex-col items-center justify-center relative p-12 overflow-hidden bg-white/5 rounded-r-[3rem]">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-orange-500/30 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center mt-20">
              <div className="mb-10 relative group cursor-default">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-purple-500 rounded-[2.5rem] blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-700"></div>
                <div className="relative bg-black/40 backdrop-blur-2xl border border-white/20 p-8 rounded-[2rem] shadow-2xl transform transition-transform duration-700 group-hover:scale-105 flex flex-col items-center">
                  <div className="bg-white p-3 rounded-2xl mb-5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]">
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(DESKTOP_QR_LINK)}&bgcolor=ffffff&color=000000&margin=1`} alt="QR" className="w-48 h-48 object-contain" />
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <Scan className="text-orange-400" size={20} />
                    <span className="font-bold tracking-widest uppercase text-[12px] opacity-90">Наведи камеру</span>
                  </div>
                </div>
              </div>
              <h2 className="text-4xl sm:text-[42px] font-black text-white mb-5 tracking-tight text-center drop-shadow-lg leading-tight font-serif" dangerouslySetInnerHTML={{__html: DESKTOP_TITLE}}></h2>
              <p className="text-gray-200 text-center max-w-sm text-[16px] leading-relaxed font-medium drop-shadow-md" dangerouslySetInnerHTML={{__html: DESKTOP_DESC}}></p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}