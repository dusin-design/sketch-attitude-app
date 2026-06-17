// All app content, bilingual. Each text field is { en, no }.
// Use localize(field, language) to get the right string.

export function localize(field, language) {
  if (field == null) return ''
  if (typeof field === 'string') return field // already a plain string (e.g. ids)
  return field[language] ?? field.en ?? ''
}

export const PRINCIPLES = [
  {
    id: 1,
    title: { en: 'Draw movement first', no: 'Tegn bevegelse først' },
    short: {
      en: 'Start every character with a gesture or energy line.',
      no: 'Start hver karakter med en gest eller energilinje.',
    },
    why: {
      en: 'Structure without gesture creates stiff, dead figures. The energy line IS the character.',
      no: 'Struktur uten gest skaper stive, livløse figurer. Energilinjen ER karakteren.',
    },
    mistakes: {
      en: 'Jumping straight to head construction before establishing the spine curve.',
      no: 'Å hoppe rett til hodekonstruksjon før ryggradskurven er etablert.',
    },
    task: {
      en: 'Draw 10 single-line gestures in 5 minutes. No detail. Pure energy.',
      no: 'Tegn 10 enkellinje-gester på 5 minutter. Ingen detaljer. Bare energi.',
    },
  },
  {
    id: 2,
    title: { en: 'Exaggerate the attitude', no: 'Eksagerer attitude' },
    short: {
      en: 'Characters should rarely stand neutral.',
      no: 'Karakterer bør sjelden stå neutralt.',
    },
    why: {
      en: 'Neutral is forgettable. Hip tilt, forward shoulders, swagger — these tell stories instantly.',
      no: 'Neutralt er glemmelig. Hoftehelling, fremoverlente skuldre, swagger — dette forteller historier umiddelbart.',
    },
    mistakes: {
      en: 'Drawing characters straight on, weight evenly distributed, expression blank.',
      no: 'Å tegne karakterer rett forfra, med jevnt fordelt vekt og tomt uttrykk.',
    },
    task: {
      en: 'Take a neutral pose sketch and push every angle 30% further.',
      no: 'Ta en neutral poseskisse og press hver vinkel 30% lenger.',
    },
  },
  {
    id: 3,
    title: { en: 'The silhouette must read', no: 'Silhuetten må leses tydelig' },
    short: {
      en: 'Recognizable from silhouette alone.',
      no: 'Gjenkjennelig fra silhuetten alene.',
    },
    why: {
      en: 'If you fill the character in black and lose the personality, the design has failed.',
      no: 'Hvis du fyller karakteren med svart og mister personligheten, har designet mislyktes.',
    },
    mistakes: {
      en: 'Relying on details to carry character instead of the underlying shape.',
      no: 'Å stole på detaljer for å bære karakter i stedet for den underliggende formen.',
    },
    task: {
      en: 'Draw 5 characters as solid black shapes. No interior lines allowed.',
      no: 'Tegn 5 karakterer som solide svarte former. Ingen indre linjer tillatt.',
    },
  },
  {
    id: 4,
    title: { en: 'Long and lean proportions', no: 'Lange og slanke proporsjoner' },
    short: {
      en: 'Favor elongated bodies and stylized anatomy.',
      no: 'Foretrekk forlengede kropper og stilisert anatomi.',
    },
    why: {
      en: 'Realism creates average. Elongation creates distinctive personality.',
      no: 'Realisme skaper gjennomsnitt. Forlengelse skaper distinkt personlighet.',
    },
    mistakes: {
      en: 'Drawing heads too large relative to the body, or proportions too grounded.',
      no: 'Å tegne hoder for store i forhold til kroppen, eller proporsjoner for jordnære.',
    },
    task: {
      en: 'Redraw a figure with the torso 20% longer and limbs stretched to 8 heads tall.',
      no: 'Tegn en figur på nytt med overkroppen 20% lengre og lemmer strukket til 8 hoder høy.',
    },
  },
  {
    id: 5,
    title: { en: 'Narrow eyes create attitude', no: 'Smale øyne skaper attitude' },
    short: {
      en: 'Half-lidded eyes, asymmetry, and heavy lids build personality.',
      no: 'Halvlukkede øyne, asymmetri og tunge øyelokk bygger personlighet.',
    },
    why: {
      en: 'Wide open eyes read as innocent or surprised. Heavy lids carry experience, contempt, and cool.',
      no: 'Vidåpne øyne leses som uskyldige eller overraskede. Tunge øyelokk bærer erfaring, forakt og kulhet.',
    },
    mistakes: {
      en: 'Drawing full circles for irises. Symmetrical eyes that read as cartoonish.',
      no: 'Å tegne fulle sirkler for iris. Symmetriske øyne som leses som tegneserieaktige.',
    },
    task: {
      en: 'Draw 20 eye pairs varying lid weight, angle, and asymmetry.',
      no: 'Tegn 20 øyepar med varierende øyelokktyngde, vinkel og asymmetri.',
    },
  },
  {
    id: 6,
    title: { en: 'Teeth matter', no: 'Tenner betyr noe' },
    short: {
      en: 'Mouths and visible teeth carry a lot of character.',
      no: 'Munner og synlige tenner bærer mye karakter.',
    },
    why: {
      en: 'A closed mouth hides personality. Stylized teeth convey wildness, menace, and humour.',
      no: 'En lukket munn gjemmer personlighet. Stiliserte tenner formidler vildskap, trussel og humor.',
    },
    mistakes: {
      en: 'Avoiding teeth entirely. Drawing teeth as a white rectangle.',
      no: 'Å unngå tenner helt. Å tegne tenner som en hvit rektangel.',
    },
    task: {
      en: 'Draw 10 different mouth styles: grins, sneers, crooked smiles, open mouths.',
      no: 'Tegn 10 forskjellige munnstiler: grin, hånflir, skjeve smil, åpne munner.',
    },
  },
  {
    id: 7,
    title: { en: 'Keep linework messy and alive', no: 'Hold linjearbeidet rotete og levende' },
    short: {
      en: 'Lines should feel energetic, imperfect, layered.',
      no: 'Linjer bør føles energiske, imperfekte, lagdelte.',
    },
    why: {
      en: 'Over-polished lines kill the life in a drawing. Controlled mess is more dynamic.',
      no: 'Overpolerte linjer dreper livet i en tegning. Kontrollert rot er mer dynamisk.',
    },
    mistakes: {
      en: "Erasing and redrawing until the line is 'perfect'. Using rulers for organic forms.",
      no: 'Å viske ut og tegne på nytt til linjen er «perfekt». Å bruke linjal for organiske former.',
    },
    task: {
      en: 'Draw a character without lifting the pen. Then draw it again even faster.',
      no: 'Tegn en karakter uten å lette pennen. Tegn den deretter på nytt, enda raskere.',
    },
  },
  {
    id: 8,
    title: { en: 'Hands are expressive', no: 'Hender er uttrykksfulle' },
    short: {
      en: 'Hands should help communicate character and attitude.',
      no: 'Hender bør bidra til å kommunisere karakter og attitude.',
    },
    why: {
      en: "Limp or hidden hands lose 30% of the character's communicative power.",
      no: 'Slappe eller gjemte hender mister 30% av karakterens kommunikative kraft.',
    },
    mistakes: {
      en: 'Drawing fists by default. Hiding hands in pockets on every character.',
      no: 'Å tegne knyttede never som standard. Å gjemme hender i lommer på hver karakter.',
    },
    task: {
      en: 'Draw 10 hand gestures: pointing, gripping, loose dangling, splayed tension.',
      no: 'Tegn 10 håndgester: peking, grep, løst hengende, spredt spenning.',
    },
  },
  {
    id: 9,
    title: { en: 'Clothing builds identity', no: 'Klær bygger identitet' },
    short: {
      en: 'Outfit and accessories reveal who the character is.',
      no: 'Antrekk og tilbehør avslører hvem karakteren er.',
    },
    why: {
      en: 'Clothing is visual shorthand for biography, subculture, class, and personality.',
      no: 'Klær er en visuell snarvei til biografi, subkultur, klasse og personlighet.',
    },
    mistakes: {
      en: 'Generic clothes on every character. Not using silhouette-shaping garments.',
      no: 'Generiske klær på hver karakter. Å ikke bruke silhuettformende klesplagg.',
    },
    task: {
      en: 'Design 3 characters you can identify by clothes alone, without faces.',
      no: 'Design 3 karakterer du kan identifisere kun ved klærne, uten ansikter.',
    },
  },
  {
    id: 10,
    title: { en: 'Contrast simple and detailed', no: 'Kontrastér enkelt og detaljert' },
    short: {
      en: 'Simple body, detailed face — or vice versa.',
      no: 'Enkel kropp, detaljert ansikt — eller omvendt.',
    },
    why: {
      en: 'Complexity without contrast creates visual noise. The eye needs rest to appreciate detail.',
      no: 'Kompleksitet uten kontrast skaper visuell støy. Øyet trenger ro for å verdsette detalj.',
    },
    mistakes: {
      en: 'Making every part equally detailed. Every element competing for attention.',
      no: 'Å gjøre hver del like detaljert. Hvert element konkurrerer om oppmerksomhet.',
    },
    task: {
      en: 'Draw a character where 70% is flat shapes and 30% is densely detailed.',
      no: 'Tegn en karakter der 70% er flate former og 30% er tett detaljert.',
    },
  },
  {
    id: 11,
    title: { en: 'Design characters, not humans', no: 'Design karakterer, ikke mennesker' },
    short: {
      en: 'Every figure should imply a backstory and point of view.',
      no: 'Hver figur bør antyde en bakgrunnshistorie og et synspunkt.',
    },
    why: {
      en: 'Generic humans are boring. Attitude, history, and weirdness make memorable characters.',
      no: 'Generiske mennesker er kjedelige. Attitude, historie og særegenhet skaper minneverdige karakterer.',
    },
    mistakes: {
      en: "Drawing 'a person standing' instead of 'a specific, particular someone'.",
      no: 'Å tegne «en person som står» i stedet for «en spesifikk, bestemt person».',
    },
    task: {
      en: "Write 3 sentences about a character's life before drawing them.",
      no: 'Skriv 3 setninger om karakterens liv før du tegner dem.',
    },
  },
  {
    id: 12,
    title: { en: 'Draw fast to preserve energy', no: 'Tegn fort for å bevare energien' },
    short: {
      en: 'Over-polishing kills attitude. Prioritize life over perfection.',
      no: 'Overpolering dreper attitude. Prioriter liv over perfeksjon.',
    },
    why: {
      en: 'Speed bypasses your self-editing brain and accesses raw instinct and energy.',
      no: 'Hastighet omgår den selvkritiske hjernen din og gir tilgang til rå instinkt og energi.',
    },
    mistakes: {
      en: "Spending 2 hours on a single 'perfect' drawing instead of 20 rough ones.",
      no: 'Å bruke 2 timer på én «perfekt» tegning i stedet for 20 grove.',
    },
    task: {
      en: 'Set a 2-minute limit per drawing. Complete 10 characters in 20 minutes.',
      no: 'Sett en 2-minutters grense per tegning. Fullfør 10 karakterer på 20 minutter.',
    },
  },
]

export const PHASES = [
  {
    days: [1, 2, 3],
    label: { en: 'GESTURE FOUNDATIONS', no: 'GESTURE-GRUNNLAG' },
    desc: {
      en: '30-second gesture drawings. 20 figures per session. Energy, not detail.',
      no: '30-sekunders gestetegninger. 20 figurer per sesjon. Energi, ikke detaljer.',
    },
    cat: { en: 'gesture', no: 'gesture' },
    mins: 15,
  },
  {
    days: [4, 5, 6],
    label: { en: 'ATTITUDE POSES', no: 'ATTITUDE-POSER' },
    desc: {
      en: '10 characters per session. Hip tilt, shoulders, weight, and stance.',
      no: '10 karakterer per sesjon. Hoftehelling, skuldre, vekt og positur.',
    },
    cat: { en: 'pose', no: 'pose' },
    mins: 20,
  },
  {
    days: [7, 8, 9],
    label: { en: 'CHARACTER FACES', no: 'KARAKTERANSIKTER' },
    desc: {
      en: 'Draw 20 faces on one page. Cheekbones, eyelids, grin shapes, asymmetry.',
      no: 'Tegn 20 ansikter på én side. Kinnbein, øyelokk, grinformer, asymmetri.',
    },
    cat: { en: 'face', no: 'ansikt' },
    mins: 20,
  },
  {
    days: [10, 11, 12],
    label: { en: 'EYES & EXPRESSION', no: 'ØYNE OG UTTRYKK' },
    desc: {
      en: '20 eye variations. Attitude and expression. Heavy lids, asymmetry.',
      no: '20 øyevariasjoner. Attitude og uttrykk. Tunge øyelokk, asymmetri.',
    },
    cat: { en: 'face', no: 'ansikt' },
    mins: 20,
  },
  {
    days: [13, 14, 15],
    label: { en: 'MOUTHS & TEETH', no: 'MUNN OG TENNER' },
    desc: {
      en: 'Grins, crooked smiles, open mouths. Stylized teeth and mouth character.',
      no: 'Grin, skjeve smil, åpne munner. Stiliserte tenner og munnkarakter.',
    },
    cat: { en: 'face', no: 'ansikt' },
    mins: 20,
  },
  {
    days: [16, 17, 18],
    label: { en: 'SILHOUETTE DESIGN', no: 'SILHUETTDESIGN' },
    desc: {
      en: 'Create characters as black shapes first. Details come after.',
      no: 'Skap karakterer som svarte former først. Detaljer kommer etterpå.',
    },
    cat: { en: 'silhouette', no: 'silhuett' },
    mins: 25,
  },
  {
    days: [19, 20, 21],
    label: { en: 'PUNK CHARACTER CREATION', no: 'PUNK-KARAKTERSKAPING' },
    desc: {
      en: 'Design 10 characters — biker, DJ, mutant, mechanic, antihero.',
      no: 'Design 10 karakterer — biker, DJ, mutant, mekaniker, antihelt.',
    },
    cat: { en: 'character', no: 'karakter' },
    mins: 45,
  },
  {
    days: [22, 23, 24],
    label: { en: 'INK MODE', no: 'BLEKKMODUS' },
    desc: {
      en: 'No eraser, no undo. Bold confident linework only.',
      no: 'Ingen viskelær, ingen angre. Kun dristig, selvsikkert linjearbeid.',
    },
    cat: { en: 'ink', no: 'blekk' },
    mins: 30,
  },
  {
    days: [25, 26, 27],
    label: { en: 'CHARACTER SHEET', no: 'KARAKTERARK' },
    desc: {
      en: 'Front view, side view, action pose, facial expressions.',
      no: 'Forfra, fra siden, actionpose, ansiktsuttrykk.',
    },
    cat: { en: 'sheet', no: 'ark' },
    mins: 45,
  },
  {
    days: [28, 29, 30],
    label: { en: 'BAND CHARACTER FINAL', no: 'BAND-KARAKTER FINALE' },
    desc: {
      en: 'Define role, instrument, attitude, clothing, silhouette. Final concept.',
      no: 'Definer rolle, instrument, attitude, klær, silhuett. Endelig konsept.',
    },
    cat: { en: 'final', no: 'finale' },
    mins: 45,
  },
]

export const ACHIEVEMENTS = [
  { id: 'first_sketch', icon: '✏️', title: { en: 'FIRST SKETCH', no: 'FØRSTE SKISSE' }, desc: { en: 'Completed your first exercise', no: 'Fullført din første øvelse' } },
  { id: 'streak_3', icon: '🔥', title: { en: '3-DAY STREAK', no: '3-DAGERS STREAK' }, desc: { en: 'Drew 3 days in a row', no: 'Tegnet 3 dager i rad' } },
  { id: 'streak_7', icon: '⚡', title: { en: '7-DAY STREAK', no: '7-DAGERS STREAK' }, desc: { en: 'A full week of practice', no: 'En hel uke med øving' } },
  { id: 'face_grinder', icon: '👁️', title: { en: 'FACE GRINDER', no: 'ANSIKTSKVERN' }, desc: { en: 'Completed 20 face exercises', no: 'Fullført 20 ansiktsøvelser' } },
  { id: 'ink_survivor', icon: '🖋️', title: { en: 'INK SURVIVOR', no: 'BLEKKOVERLEVER' }, desc: { en: 'Finished ink mode without undoing', no: 'Fullført blekkmodus uten å angre' } },
  { id: 'silhouette_king', icon: '💀', title: { en: 'SILHOUETTE KING', no: 'SILHUETTKONGE' }, desc: { en: '5 solid silhouette sessions', no: '5 solide silhuett-sesjoner' } },
  { id: 'char_architect', icon: '🎸', title: { en: 'CHARACTER ARCHITECT', no: 'KARAKTERARKITEKT' }, desc: { en: 'Built 5 character cards in studio', no: 'Bygget 5 karakterkort i studio' } },
  { id: 'finisher', icon: '🏆', title: { en: '30-DAY FINISHER', no: '30-DAGERS FULLFØRER' }, desc: { en: 'Completed the full program', no: 'Fullført hele programmet' } },
]

export const QUOTES = [
  { en: 'Start loose. Energy before accuracy.', no: 'Start løst. Energi før presisjon.' },
  { en: 'Push the attitude. Neutral is boring.', no: 'Press attitude. Neutralt er kjedelig.' },
  { en: 'Let the line wobble. Life beats polish.', no: 'La linjen vingle. Liv vinner over polering.' },
  { en: 'Teeth can carry more character than eyes.', no: 'Tenner kan bære mer karakter enn øyne.' },
  { en: 'Draw the silhouette first. Personality starts in shape.', no: 'Tegn silhuetten først. Personlighet starter i form.' },
  { en: "Fast drawing bypasses your inner critic.", no: 'Rask tegning omgår din innerste kritiker.' },
  { en: 'A stiff pose is a dead character.', no: 'En stiv pose er en død karakter.' },
  { en: 'Exaggerate until it feels wrong — then go further.', no: 'Eksagerer til det føles feil — og gå lenger.' },
  { en: 'Clothing is biography made visible.', no: 'Klær er biografi gjort synlig.' },
  { en: 'The energy line IS the character.', no: 'Energilinjen ER karakteren.' },
]

export const FACE_PROMPTS = [
  {
    title: { en: 'ARROGANT GRIN', no: 'ARROGANT GRIN' },
    desc: {
      en: 'Upper lip curled asymmetrically. One eyebrow raised. Heavy upper eyelid. Chin slightly forward. Teeth just showing on one side.',
      no: 'Overleppen krøller seg asymmetrisk. Ett øyenbryn hevet. Tungt overøyelokk. Haken litt fremover. Tenner viser litt på én side.',
    },
    eyes: { en: 'Half-lidded, asymmetric', no: 'Halvlukkede, asymmetriske' },
    jaw: { en: 'Sharp, angular', no: 'Skarp, kantet' },
    mouth: { en: 'Crooked smirk', no: 'Skjevt smil' },
    energy: { en: 'Cocky, dominant', no: 'Sikker, dominerende' },
  },
  {
    title: { en: 'TIRED CONTEMPT', no: 'TRØTT FORAKT' },
    desc: {
      en: 'Heavy drooping eyelids. Flat mouth, corners down slightly. Cheekbones pronounced. Looks right through you.',
      no: 'Tunge, hengende øyelokk. Flat munn med litt nedovervendte hjørner. Markerte kinnbein. Ser rett gjennom deg.',
    },
    eyes: { en: 'Deeply hooded', no: 'Dypt hetteformet' },
    jaw: { en: 'Relaxed, gaunt', no: 'Avslappet, hul' },
    mouth: { en: 'Downturned line', no: 'Nedovervendt linje' },
    energy: { en: 'Dismissive, exhausted', no: 'Avvisende, utslitt' },
  },
  {
    title: { en: 'MANIC ENERGY', no: 'MANISK ENERGI' },
    desc: {
      en: 'Eyes wide but upper lids still sharp. Teeth fully visible in a tense grin. Eyebrows asymmetric. Tension in the neck.',
      no: 'Vide øyne, men overøyelokk fortsatt skarpe. Tenner fullt synlige i et spent grin. Asymmetriske øyenbryn. Spenning i nakken.',
    },
    eyes: { en: 'Wide, electric', no: 'Vide, elektriske' },
    jaw: { en: 'Clenched, tense', no: 'Sammenbitt, spent' },
    mouth: { en: 'Strained wide grin', no: 'Anstrengt, vidt grin' },
    energy: { en: 'Unstable, intense', no: 'Ustabil, intens' },
  },
  {
    title: { en: 'COLD STARE', no: 'KALDT BLIKK' },
    desc: {
      en: 'Almost no expression. Eyelids at mid position. Mouth flat and closed. The stillness IS the expression.',
      no: 'Nesten ingen mimikk. Øyelokk i mellomposisjon. Munn flat og lukket. Stillheten ER uttrykket.',
    },
    eyes: { en: 'Mid-lid, symmetrical', no: 'Halvåpne, symmetriske' },
    jaw: { en: 'Hard, defined', no: 'Hard, markert' },
    mouth: { en: 'Closed flat line', no: 'Lukket, flat linje' },
    energy: { en: 'Controlled menace', no: 'Kontrollert trussel' },
  },
  {
    title: { en: 'BITTER SMIRK', no: 'BITTERT SMIL' },
    desc: {
      en: 'One side of mouth pulls up. Eye on that side narrows. Brow on opposite side subtly raised.',
      no: 'Én side av munnen trekkes opp. Øyet på den siden smalner. Øyenbrynet på motsatt side subtilt hevet.',
    },
    eyes: { en: 'Uneven, knowing', no: 'Ujevne, vitende' },
    jaw: { en: 'Strong, slightly tilted', no: 'Sterk, lett vinklet' },
    mouth: { en: 'One-sided lift', no: 'Ensidig heving' },
    energy: { en: 'Sardonic, sharp', no: 'Sarkastisk, skarp' },
  },
  {
    title: { en: 'SHARP CONTEMPT', no: 'SKARP FORAKT' },
    desc: {
      en: 'Upper lip raised slightly. Eyes looking downward under heavy brows. Head tilted back slightly.',
      no: 'Overleppen lett hevet. Øynene ser nedover under tunge bryn. Hodet lett bakoverlent.',
    },
    eyes: { en: 'Hooded, looking down', no: 'Hetteformet, ser nedover' },
    jaw: { en: 'Raised, proud', no: 'Hevet, stolt' },
    mouth: { en: 'Slight snarl', no: 'Lett snerr' },
    energy: { en: 'Superior, disdainful', no: 'Overlegen, hånlig' },
  },
]

export const POSE_PROMPTS = [
  { en: 'Slouched figure, hands in pockets, weight on one leg. Feel the gravity.', no: 'Sammensunket figur, hender i lommene, vekt på ett ben. Føl gravitasjonen.' },
  { en: 'Leaning against a wall, arms crossed, staring sideways. Barely interested.', no: 'Lener seg mot en vegg, armene i kors, stirrer sidelengs. Knapt interessert.' },
  { en: 'Mid-stride, one shoulder forward, head slightly down. Going somewhere fast.', no: 'Midt i et skritt, en skulder fremover, hodet litt nedbøyd. På vei et sted, fort.' },
  { en: 'Crouching tension — coiled, ready, hands loose. About to move.', no: 'Hukende spenning — sammenkrøllet, klar, hender løse. På vei til å bevege seg.' },
  { en: 'Standing tall with a slight backward lean. Arms away from body. Owns the space.', no: 'Står høyt med en lett bakoverlening. Armer bort fra kroppen. Eier rommet.' },
  { en: 'Sitting on the ground, knees up, arms resting on knees. Watching. Waiting.', no: 'Sitter på gulvet, knærne oppe, armene hviler på knærne. Ser. Venter.' },
  { en: 'One hand pointing, body leaning into the gesture. The finger does the talking.', no: 'Én hånd peker, kroppen lener seg inn i gesten. Fingeren gjør pratingen.' },
  { en: 'Turning to look over the shoulder. The body is still, the head is sharp.', no: 'Vrir seg for å se over skulderen. Kroppen er stille, hodet er skarpt.' },
]

export const CHAR_ARCHETYPES = [
  { en: 'Antihero', no: 'Antihelt' },
  { en: 'Streetwise Musician', no: 'Streetwise musiker' },
  { en: 'Rogue Mechanic', no: 'Useriøs mekaniker' },
  { en: 'Mutant Outsider', no: 'Mutant utenforstående' },
  { en: 'Underground DJ', no: 'Undergrunns-DJ' },
  { en: 'Biker Ronin', no: 'Biker-ronin' },
  { en: 'Punk Witch', no: 'Punk-heks' },
  { en: 'Corporate Dropout', no: 'Bedriftsdropout' },
]

export const CHAR_POSES = [
  { en: 'Slouched swagger', no: 'Sammensunket swagger' },
  { en: 'Tense standoff', no: 'Spent konfrontasjon' },
  { en: 'Mid-motion stride', no: 'Skritt i bevegelse' },
  { en: 'Leaning against wall', no: 'Lener mot vegg' },
  { en: 'Arms crossed, weight shifted', no: 'Armer i kors, vekt forskjøvet' },
  { en: 'Looking over shoulder', no: 'Ser over skulderen' },
]

export const CHAR_EXPRESSIONS = [
  { en: 'Tired contempt', no: 'Trøtt forakt' },
  { en: 'Sharp grin', no: 'Skarpt grin' },
  { en: 'Cold stare', no: 'Kaldt blikk' },
  { en: 'Manic energy', no: 'Manisk energi' },
  { en: 'Bitter smirk', no: 'Bittert smil' },
  { en: 'Blank intensity', no: 'Tom intensitet' },
]
