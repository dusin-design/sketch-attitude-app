export const PRINCIPLES = [
  {
    id: 1,
    title: 'Draw movement first',
    short: 'Start every character with a gesture or energy line.',
    why: 'Structure without gesture creates stiff, dead figures. The energy line IS the character.',
    mistakes: 'Jumping straight to head construction before establishing the spine curve.',
    task: 'Draw 10 single-line gestures in 5 minutes. No detail. Pure energy.',
  },
  {
    id: 2,
    title: 'Exaggerate the attitude',
    short: 'Characters should rarely stand neutral.',
    why: 'Neutral is forgettable. Hip tilt, forward shoulders, swagger — these tell stories instantly.',
    mistakes: 'Drawing characters straight on, weight evenly distributed, expression blank.',
    task: 'Take a neutral pose sketch and push every angle 30% further.',
  },
  {
    id: 3,
    title: 'The silhouette must read',
    short: 'Recognizable from silhouette alone.',
    why: 'If you fill the character in black and lose the personality, the design has failed.',
    mistakes: 'Relying on details to carry character instead of the underlying shape.',
    task: 'Draw 5 characters as solid black shapes. No interior lines allowed.',
  },
  {
    id: 4,
    title: 'Long and lean proportions',
    short: 'Favor elongated bodies and stylized anatomy.',
    why: 'Realism creates average. Elongation creates distinctive personality.',
    mistakes: 'Drawing heads too large relative to the body, or proportions too grounded.',
    task: 'Redraw a figure with the torso 20% longer and limbs stretched to 8 heads tall.',
  },
  {
    id: 5,
    title: 'Narrow eyes create attitude',
    short: 'Half-lidded eyes, asymmetry, and heavy lids build personality.',
    why: 'Wide open eyes read as innocent or surprised. Heavy lids carry experience, contempt, and cool.',
    mistakes: 'Drawing full circles for irises. Symmetrical eyes that read as cartoonish.',
    task: 'Draw 20 eye pairs varying lid weight, angle, and asymmetry.',
  },
  {
    id: 6,
    title: 'Teeth matter',
    short: 'Mouths and visible teeth carry a lot of character.',
    why: 'A closed mouth hides personality. Stylized teeth convey wildness, menace, and humour.',
    mistakes: 'Avoiding teeth entirely. Drawing teeth as a white rectangle.',
    task: 'Draw 10 different mouth styles: grins, sneers, crooked smiles, open mouths.',
  },
  {
    id: 7,
    title: 'Keep linework messy and alive',
    short: 'Lines should feel energetic, imperfect, layered.',
    why: 'Over-polished lines kill the life in a drawing. Controlled mess is more dynamic.',
    mistakes: "Erasing and redrawing until the line is 'perfect'. Using rulers for organic forms.",
    task: 'Draw a character without lifting the pen. Then draw it again even faster.',
  },
  {
    id: 8,
    title: 'Hands are expressive',
    short: 'Hands should help communicate character and attitude.',
    why: "Limp or hidden hands lose 30% of the character's communicative power.",
    mistakes: 'Drawing fists by default. Hiding hands in pockets on every character.',
    task: 'Draw 10 hand gestures: pointing, gripping, loose dangling, splayed tension.',
  },
  {
    id: 9,
    title: 'Clothing builds identity',
    short: 'Outfit and accessories reveal who the character is.',
    why: 'Clothing is visual shorthand for biography, subculture, class, and personality.',
    mistakes: 'Generic clothes on every character. Not using silhouette-shaping garments.',
    task: 'Design 3 characters you can identify by clothes alone, without faces.',
  },
  {
    id: 10,
    title: 'Contrast simple and detailed',
    short: 'Simple body, detailed face — or vice versa.',
    why: 'Complexity without contrast creates visual noise. The eye needs rest to appreciate detail.',
    mistakes: 'Making every part equally detailed. Every element competing for attention.',
    task: 'Draw a character where 70% is flat shapes and 30% is densely detailed.',
  },
  {
    id: 11,
    title: 'Design characters, not humans',
    short: 'Every figure should imply a backstory and point of view.',
    why: 'Generic humans are boring. Attitude, history, and weirdness make memorable characters.',
    mistakes: "Drawing 'a person standing' instead of 'a specific, particular someone'.",
    task: "Write 3 sentences about a character's life before drawing them.",
  },
  {
    id: 12,
    title: 'Draw fast to preserve energy',
    short: 'Over-polishing kills attitude. Prioritize life over perfection.',
    why: 'Speed bypasses your self-editing brain and accesses raw instinct and energy.',
    mistakes: "Spending 2 hours on a single 'perfect' drawing instead of 20 rough ones.",
    task: 'Set a 2-minute limit per drawing. Complete 10 characters in 20 minutes.',
  },
]

export const PHASES = [
  { days: [1, 2, 3], label: 'GESTURE FOUNDATIONS', desc: '30-second gesture drawings. 20 figures per session. Energy, not detail.', cat: 'gesture', mins: 15 },
  { days: [4, 5, 6], label: 'ATTITUDE POSES', desc: '10 characters per session. Hip tilt, shoulders, weight, and stance.', cat: 'pose', mins: 20 },
  { days: [7, 8, 9], label: 'CHARACTER FACES', desc: 'Draw 20 faces on one page. Cheekbones, eyelids, grin shapes, asymmetry.', cat: 'face', mins: 20 },
  { days: [10, 11, 12], label: 'EYES & EXPRESSION', desc: '20 eye variations. Attitude and expression. Heavy lids, asymmetry.', cat: 'face', mins: 20 },
  { days: [13, 14, 15], label: 'MOUTHS & TEETH', desc: 'Grins, crooked smiles, open mouths. Stylized teeth and mouth character.', cat: 'face', mins: 20 },
  { days: [16, 17, 18], label: 'SILHOUETTE DESIGN', desc: 'Create characters as black shapes first. Details come after.', cat: 'silhouette', mins: 25 },
  { days: [19, 20, 21], label: 'PUNK CHARACTER CREATION', desc: 'Design 10 characters — biker, DJ, mutant, mechanic, antihero.', cat: 'character', mins: 45 },
  { days: [22, 23, 24], label: 'INK MODE', desc: 'No eraser, no undo. Bold confident linework only.', cat: 'ink', mins: 30 },
  { days: [25, 26, 27], label: 'CHARACTER SHEET', desc: 'Front view, side view, action pose, facial expressions.', cat: 'sheet', mins: 45 },
  { days: [28, 29, 30], label: 'BAND CHARACTER FINAL', desc: 'Define role, instrument, attitude, clothing, silhouette. Final concept.', cat: 'final', mins: 45 },
]

export const ACHIEVEMENTS = [
  { id: 'first_sketch', icon: '✏️', title: 'FIRST SKETCH', desc: 'Completed your first exercise' },
  { id: 'streak_3', icon: '🔥', title: '3-DAY STREAK', desc: 'Drew 3 days in a row' },
  { id: 'streak_7', icon: '⚡', title: '7-DAY STREAK', desc: 'A full week of practice' },
  { id: 'face_grinder', icon: '👁️', title: 'FACE GRINDER', desc: 'Completed 20 face exercises' },
  { id: 'ink_survivor', icon: '🖋️', title: 'INK SURVIVOR', desc: 'Finished ink mode without undoing' },
  { id: 'silhouette_king', icon: '💀', title: 'SILHOUETTE KING', desc: '5 solid silhouette sessions' },
  { id: 'char_architect', icon: '🎸', title: 'CHARACTER ARCHITECT', desc: 'Built 5 character cards in studio' },
  { id: 'finisher', icon: '🏆', title: '30-DAY FINISHER', desc: 'Completed the full program' },
]

export const QUOTES = [
  'Start loose. Energy before accuracy.',
  'Push the attitude. Neutral is boring.',
  'Let the line wobble. Life beats polish.',
  'Teeth can carry more character than eyes.',
  'Draw the silhouette first. Personality starts in shape.',
  'Fast drawing bypasses your inner critic.',
  'A stiff pose is a dead character.',
  'Exaggerate until it feels wrong — then go further.',
  'Clothing is biography made visible.',
  'The energy line IS the character.',
]

export const FACE_PROMPTS = [
  { title: 'ARROGANT GRIN', desc: 'Upper lip curled asymmetrically. One eyebrow raised. Heavy upper eyelid. Chin slightly forward. Teeth just showing on one side.', eyes: 'Half-lidded, asymmetric', jaw: 'Sharp, angular', mouth: 'Crooked smirk', energy: 'Cocky, dominant' },
  { title: 'TIRED CONTEMPT', desc: 'Heavy drooping eyelids. Flat mouth, corners down slightly. Cheekbones pronounced. Looks right through you.', eyes: 'Deeply hooded', jaw: 'Relaxed, gaunt', mouth: 'Downturned line', energy: 'Dismissive, exhausted' },
  { title: 'MANIC ENERGY', desc: 'Eyes wide but upper lids still sharp. Teeth fully visible in a tense grin. Eyebrows asymmetric. Tension in the neck.', eyes: 'Wide, electric', jaw: 'Clenched, tense', mouth: 'Strained wide grin', energy: 'Unstable, intense' },
  { title: 'COLD STARE', desc: 'Almost no expression. Eyelids at mid position. Mouth flat and closed. The stillness IS the expression.', eyes: 'Mid-lid, symmetrical', jaw: 'Hard, defined', mouth: 'Closed flat line', energy: 'Controlled menace' },
  { title: 'BITTER SMIRK', desc: 'One side of mouth pulls up. Eye on that side narrows. Brow on opposite side subtly raised.', eyes: 'Uneven, knowing', jaw: 'Strong, slightly tilted', mouth: 'One-sided lift', energy: 'Sardonic, sharp' },
  { title: 'SHARP CONTEMPT', desc: 'Upper lip raised slightly. Eyes looking downward under heavy brows. Head tilted back slightly.', eyes: 'Hooded, looking down', jaw: 'Raised, proud', mouth: 'Slight snarl', energy: 'Superior, disdainful' },
]

export const POSE_PROMPTS = [
  'Slouched figure, hands in pockets, weight on one leg. Feel the gravity.',
  'Leaning against a wall, arms crossed, staring sideways. Barely interested.',
  'Mid-stride, one shoulder forward, head slightly down. Going somewhere fast.',
  'Crouching tension — coiled, ready, hands loose. About to move.',
  'Standing tall with a slight backward lean. Arms away from body. Owns the space.',
  'Sitting on the ground, knees up, arms resting on knees. Watching. Waiting.',
  'One hand pointing, body leaning into the gesture. The finger does the talking.',
  'Turning to look over the shoulder. The body is still, the head is sharp.',
]

export const CHAR_ARCHETYPES = [
  'Antihero', 'Streetwise Musician', 'Rogue Mechanic',
  'Mutant Outsider', 'Underground DJ', 'Biker Ronin',
  'Punk Witch', 'Corporate Dropout',
]

export const CHAR_POSES = [
  'Slouched swagger', 'Tense standoff', 'Mid-motion stride',
  'Leaning against wall', 'Arms crossed, weight shifted', 'Looking over shoulder',
]

export const CHAR_EXPRESSIONS = [
  'Tired contempt', 'Sharp grin', 'Cold stare',
  'Manic energy', 'Bitter smirk', 'Blank intensity',
]
