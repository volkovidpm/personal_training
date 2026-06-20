// Стартовая библиотека упражнений. Это seed-данные: они зашиты в сборку и
// помечены custom: false. Пользовательские упражнения хранятся отдельно в
// localStorage и мержатся со стартовыми при инициализации стора.
import type { Exercise } from "../types";

export const SEED_EXERCISES: Exercise[] = [
  // ── Грудь ───────────────────────────────────────────────────────────────
  {
    id: "bench-press",
    name: "Жим штанги лёжа",
    type: "strength",
    description:
      "Лягте на скамью, лопатки сведены, ноги упираются в пол. Опускайте штангу к середине груди, локти под углом ~45° к корпусу. Выжимайте вверх до полного выпрямления рук, не отрывая таз.",
    equipment: ["Штанга", "Горизонтальная скамья", "Стойки"],
    muscles: { primary: ["chest"], secondary: ["triceps", "shoulders"] },
    custom: false,
  },
  {
    id: "incline-db-press",
    name: "Жим гантелей на наклонной скамье",
    type: "strength",
    description:
      "Скамья под углом 30–45°. Гантели у плеч, ладони вперёд. Выжимайте вверх и слегка сводите, опускайте под контролем до растяжения верха груди.",
    equipment: ["Гантели", "Наклонная скамья"],
    muscles: { primary: ["chest"], secondary: ["shoulders", "triceps"] },
    custom: false,
  },
  {
    id: "push-ups",
    name: "Отжимания от пола",
    type: "strength",
    description:
      "Упор лёжа, тело прямой линией от головы до пят, кор напряжён. Опускайтесь, сгибая локти под ~45°, грудью почти до пола, затем выжмите вверх.",
    equipment: ["Коврик"],
    muscles: {
      primary: ["chest"],
      secondary: ["triceps", "shoulders", "abs"],
    },
    custom: false,
  },
  {
    id: "db-fly",
    name: "Разведение гантелей лёжа",
    type: "strength",
    description:
      "Лёжа на скамье, руки с гантелями над грудью, локти слегка согнуты. Разводите руки в стороны по дуге до растяжения груди, затем сводите тем же движением.",
    equipment: ["Гантели", "Горизонтальная скамья"],
    muscles: { primary: ["chest"], secondary: ["shoulders"] },
    custom: false,
  },

  // ── Спина ───────────────────────────────────────────────────────────────
  {
    id: "pull-ups",
    name: "Подтягивания",
    type: "strength",
    description:
      "Вис на турнике хватом чуть шире плеч. Сводя лопатки, подтягивайтесь до подбородка над перекладиной, опускайтесь под контролем до полного выпрямления рук.",
    equipment: ["Турник"],
    muscles: { primary: ["back"], secondary: ["biceps", "forearms"] },
    custom: false,
  },
  {
    id: "barbell-row",
    name: "Тяга штанги в наклоне",
    type: "strength",
    description:
      "Наклон корпуса ~45°, спина прямая, штанга в опущенных руках. Тяните штангу к низу живота, сводя лопатки, затем опускайте под контролем.",
    equipment: ["Штанга"],
    muscles: { primary: ["back"], secondary: ["biceps", "forearms"] },
    custom: false,
  },
  {
    id: "lat-pulldown",
    name: "Тяга верхнего блока",
    type: "strength",
    description:
      "Сидя, хват шире плеч. Тяните рукоять к верху груди, сводя лопатки и не отклоняя корпус назад, затем плавно отпускайте.",
    equipment: ["Блочный тренажёр", "Широкая рукоять"],
    muscles: { primary: ["back"], secondary: ["biceps"] },
    custom: false,
  },
  {
    id: "deadlift",
    name: "Становая тяга",
    type: "strength",
    description:
      "Штанга у голеней, спина прямая, лопатки сведены. Поднимайте штангу вдоль ног за счёт разгибания таза и коленей, в верхней точке выпрямитесь полностью.",
    equipment: ["Штанга"],
    muscles: {
      primary: ["back"],
      secondary: ["hamstrings", "glutes", "forearms"],
    },
    custom: false,
  },
  {
    id: "one-arm-db-row",
    name: "Тяга гантели одной рукой",
    type: "strength",
    description:
      "Упор коленом и рукой в скамью, спина параллельна полу. Тяните гантель к поясу, сводя лопатку, опускайте под контролем. Повторите на другую сторону.",
    equipment: ["Гантель", "Скамья"],
    muscles: { primary: ["back"], secondary: ["biceps"] },
    custom: false,
  },

  // ── Плечи ───────────────────────────────────────────────────────────────
  {
    id: "overhead-press",
    name: "Жим штанги стоя",
    type: "strength",
    description:
      "Штанга на уровне ключиц, хват чуть шире плеч, кор напряжён. Выжимайте штангу над головой до выпрямления рук, опускайте под контролем.",
    equipment: ["Штанга", "Стойки"],
    muscles: { primary: ["shoulders"], secondary: ["triceps"] },
    custom: false,
  },
  {
    id: "seated-db-press",
    name: "Жим гантелей сидя",
    type: "strength",
    description:
      "Сидя со спинкой, гантели у плеч, ладони вперёд. Выжимайте вверх, не до полного смыкания, опускайте до уровня ушей.",
    equipment: ["Гантели", "Скамья со спинкой"],
    muscles: { primary: ["shoulders"], secondary: ["triceps"] },
    custom: false,
  },
  {
    id: "lateral-raise",
    name: "Махи гантелями в стороны",
    type: "strength",
    description:
      "Стоя, гантели по бокам, локти слегка согнуты. Поднимайте руки в стороны до уровня плеч, без рывка, опускайте под контролем.",
    equipment: ["Гантели"],
    muscles: { primary: ["shoulders"], secondary: [] },
    custom: false,
  },

  // ── Бицепс ──────────────────────────────────────────────────────────────
  {
    id: "barbell-curl",
    name: "Подъём штанги на бицепс",
    type: "strength",
    description:
      "Стоя, штанга в опущенных руках, локти прижаты к корпусу. Сгибайте руки, поднимая штангу к груди, опускайте под контролем без раскачки.",
    equipment: ["Штанга", "EZ-гриф"],
    muscles: { primary: ["biceps"], secondary: ["forearms"] },
    custom: false,
  },
  {
    id: "hammer-curl",
    name: "Подъём гантелей «молоток»",
    type: "strength",
    description:
      "Стоя, гантели нейтральным хватом (ладони друг к другу). Сгибайте руки, не разворачивая кисть, опускайте медленно.",
    equipment: ["Гантели"],
    muscles: { primary: ["biceps", "forearms"], secondary: [] },
    custom: false,
  },

  // ── Трицепс ─────────────────────────────────────────────────────────────
  {
    id: "skull-crusher",
    name: "Французский жим лёжа",
    type: "strength",
    description:
      "Лёжа, руки со штангой вертикально вверх. Сгибая локти, опускайте гриф ко лбу, плечи неподвижны, затем разгибайте руки.",
    equipment: ["EZ-гриф", "Скамья"],
    muscles: { primary: ["triceps"], secondary: [] },
    custom: false,
  },
  {
    id: "triceps-pushdown",
    name: "Разгибание на блоке",
    type: "strength",
    description:
      "Стоя у верхнего блока, локти прижаты к корпусу. Разгибайте руки вниз до полного выпрямления, плавно возвращайте.",
    equipment: ["Блочный тренажёр", "Прямая рукоять"],
    muscles: { primary: ["triceps"], secondary: [] },
    custom: false,
  },
  {
    id: "dips",
    name: "Отжимания на брусьях",
    type: "strength",
    description:
      "Упор на брусьях, корпус вертикально для трицепса (наклон вперёд — больше грудь). Опускайтесь до угла ~90° в локтях, выжимайте вверх.",
    equipment: ["Брусья"],
    muscles: { primary: ["triceps", "chest"], secondary: ["shoulders"] },
    custom: false,
  },

  // ── Ноги ────────────────────────────────────────────────────────────────
  {
    id: "back-squat",
    name: "Приседания со штангой",
    type: "strength",
    description:
      "Штанга на трапециях, ноги на ширине плеч. Приседайте, отводя таз назад, спина прямая, до бедра параллельно полу, затем встаньте.",
    equipment: ["Штанга", "Стойки"],
    muscles: {
      primary: ["quads", "glutes"],
      secondary: ["hamstrings", "abs"],
    },
    custom: false,
  },
  {
    id: "leg-press",
    name: "Жим ногами",
    type: "strength",
    description:
      "В тренажёре стопы на платформе на ширине плеч. Опускайте платформу, сгибая колени до ~90°, не отрывая таз, выжимайте без полного выпрямления коленей.",
    equipment: ["Тренажёр для жима ногами"],
    muscles: { primary: ["quads", "glutes"], secondary: ["hamstrings"] },
    custom: false,
  },
  {
    id: "lunges",
    name: "Выпады с гантелями",
    type: "strength",
    description:
      "Гантели в руках. Шаг вперёд, опускайтесь до угла ~90° в обоих коленях, заднее колено почти касается пола, вернитесь и смените ногу.",
    equipment: ["Гантели"],
    muscles: { primary: ["quads", "glutes"], secondary: ["hamstrings"] },
    custom: false,
  },
  {
    id: "romanian-deadlift",
    name: "Румынская тяга",
    type: "strength",
    description:
      "Штанга в руках, ноги слегка согнуты. Отводя таз назад, опускайте штангу вдоль ног до растяжения задней поверхности бедра, спина прямая, затем выпрямитесь.",
    equipment: ["Штанга"],
    muscles: { primary: ["hamstrings", "glutes"], secondary: ["back"] },
    custom: false,
  },
  {
    id: "leg-curl",
    name: "Сгибание ног в тренажёре",
    type: "strength",
    description:
      "Лёжа в тренажёре, валик над ахиллом. Сгибайте ноги, подтягивая валик к ягодицам, опускайте под контролем.",
    equipment: ["Тренажёр сгибания ног"],
    muscles: { primary: ["hamstrings"], secondary: [] },
    custom: false,
  },
  {
    id: "leg-extension",
    name: "Разгибание ног в тренажёре",
    type: "strength",
    description:
      "Сидя в тренажёре, валик над стопами. Разгибайте ноги до полного выпрямления, задержка в верхней точке, плавно опускайте.",
    equipment: ["Тренажёр разгибания ног"],
    muscles: { primary: ["quads"], secondary: [] },
    custom: false,
  },
  {
    id: "glute-bridge",
    name: "Ягодичный мост",
    type: "strength",
    description:
      "Лёжа на спине, стопы у таза. Поднимайте таз, сжимая ягодицы, до прямой линии плечи-таз-колени, опускайте под контролем.",
    equipment: ["Коврик", "Штанга"],
    muscles: { primary: ["glutes"], secondary: ["hamstrings"] },
    custom: false,
  },
  {
    id: "calf-raise",
    name: "Подъём на носки",
    type: "strength",
    description:
      "Носки на платформе, пятки свободны. Поднимайтесь на носки максимально высоко, задержка, медленно опускайте пятки ниже уровня платформы.",
    equipment: ["Тренажёр для икр", "Платформа"],
    muscles: { primary: ["calves"], secondary: [] },
    custom: false,
  },

  // ── Пресс / кор и предплечья ────────────────────────────────────────────
  {
    id: "crunch",
    name: "Скручивания",
    type: "strength",
    description:
      "Лёжа, колени согнуты, руки у головы. Скручивайте корпус, отрывая лопатки за счёт пресса, не тяните шею, опускайтесь под контролем.",
    equipment: ["Коврик"],
    muscles: { primary: ["abs"], secondary: [] },
    custom: false,
  },
  {
    id: "plank",
    name: "Планка",
    type: "strength",
    description:
      "Упор на предплечья и носки, тело прямой линией, кор и ягодицы напряжены. Удерживайте позицию заданное время, не прогибая поясницу.",
    equipment: ["Коврик"],
    muscles: { primary: ["abs"], secondary: ["shoulders"] },
    custom: false,
  },
  {
    id: "hanging-leg-raise",
    name: "Подъём ног в висе",
    type: "strength",
    description:
      "Вис на турнике. Поднимайте прямые или согнутые ноги до уровня таза за счёт пресса, без раскачки, опускайте под контролем.",
    equipment: ["Турник"],
    muscles: { primary: ["abs"], secondary: ["forearms"] },
    custom: false,
  },
  {
    id: "wrist-curl",
    name: "Сгибание запястий",
    type: "strength",
    description:
      "Предплечья на бёдрах или скамье, кисти свисают с гантелями. Сгибайте запястья вверх и медленно опускайте, работают только кисти.",
    equipment: ["Гантели", "Штанга"],
    muscles: { primary: ["forearms"], secondary: [] },
    custom: false,
  },

  // ── Кардио ──────────────────────────────────────────────────────────────
  {
    id: "running",
    name: "Бег",
    type: "cardio",
    description:
      "Равномерный или интервальный бег. Держите корпус прямо, приземляйтесь на среднюю часть стопы, дышите ритмично. Контролируйте пульс по зонам.",
    equipment: ["Беговая дорожка", "Улица"],
    muscles: { primary: [], secondary: [] },
    custom: false,
  },
  {
    id: "cycling",
    name: "Велотренажёр",
    type: "cardio",
    description:
      "Настройте высоту седла так, чтобы колено было слегка согнуто в нижней точке. Поддерживайте ровный каденс, регулируйте нагрузку под целевой пульс.",
    equipment: ["Велотренажёр"],
    muscles: { primary: [], secondary: [] },
    custom: false,
  },
  {
    id: "rowing",
    name: "Гребной тренажёр",
    type: "cardio",
    description:
      "Толчок ногами, затем подключение корпуса и рук. Возврат в обратном порядке: руки, корпус, ноги. Спина прямая на протяжении всего движения.",
    equipment: ["Гребной тренажёр"],
    muscles: { primary: [], secondary: [] },
    custom: false,
  },
  {
    id: "jump-rope",
    name: "Прыжки на скакалке",
    type: "cardio",
    description:
      "Прыжки на носках, невысоко, вращение скакалки кистями. Держите ритм, корпус прямой, локти у корпуса.",
    equipment: ["Скакалка"],
    muscles: { primary: [], secondary: [] },
    custom: false,
  },
  {
    id: "elliptical",
    name: "Эллиптический тренажёр",
    type: "cardio",
    description:
      "Плавные движения по эллипсу с задействованием рук и ног. Держите корпус прямо, не заваливайтесь на поручни, поддерживайте целевой пульс.",
    equipment: ["Эллиптический тренажёр"],
    muscles: { primary: [], secondary: [] },
    custom: false,
  },
];
