export const WORLD_BUBBLES = [
  {
    id: "creation-of-man",
    title: "The Creation of Man",
    teaser: "my first writing in this world from high school!",
    image: "/writing/creation-of-man.png",
    imageAlt:
      "Six gods of creation stand around a forge as the first mortal life steps into the world",
    // Slightly cleaned obvious typos; voice otherwise preserved.
    body: `Once, a barren world was discovered by 6 Gods of Creation who had long ago decided never to again war with each other, for a War between undying Gods too often left worlds ripe for creation in ruins. They began by creating temples, which became cathedrals and palaces. They created gardens that became forests, and ponds that turned all too quickly into oceans. And always they sought greater challenges. Soon they had done all they could on their own, and banded together to create lesser creatures to accompany themselves.

First, the God of Light created a spark, life itself, around which the creature would be formed. In even this smallest creation, this small start, each god was filled with excitement, yet also a dread. Deep down each wondered: What if the new life sought to fight each other? What if they became locked in eternal war? Would it not be cataclysmic for this world? All wondered but the God of Shadow, who waited, unfazed, to bestow his gift.

Next, the God of Fire created within it a spark, a burning flame of his own. He gave it the greatest gifts he can think of: He gave it want, so they might seek of its own will to grow, and he gave it love, so they might seek of their own will to help one another. The congregation approved, but deep down, the Gods began to grow wary. Had he not given them incentive? Passions which could turn to furies, and cause them to war with one another? Would such a war not be cataclysmic to this world? All worried but the God of Shadow, who waited silently to bestow his gift.

The God of Earth would be next to bestow his gift. He crafted the body and all things of it, including the means by which to forge new souls without the aid of the Gods. He gave them freedom, so they might be thankful to their creators, and of their own will abide to their laws. All Gods agreed with this noble gift but also began to fear. Would they not fight to be the most favored of the Gods? Would they not declare war for freedom, wherever it was opposed? And would such a war not be cataclysmic to this world? Each God feared but the God of Shadows, who waited to bestow his gift.

The God of Water chose to fill the empty shell of this first creature, now fully shapen, with his element. A symbol, he said, for the true gift he gave them: purpose, through fulfillment. Each would seek to perfect his craft, to find their way, to spread their influence throughout the world. Each would strive to be as great as its circumstance permitted, and hope to be greater. But on hearing this, there was little celebration from the Gods, who had all began to dread. What if one man chose cruelty as his purpose? What if one chose WAR? Would he bring cataclysm to this world? Each God dreaded the precious thing that lied before them, each but Shadow, who waited, smiling, to bestow his gift.

The God of Air gave them the gift of breath, in so they might speak with each other, and understand and learn and love and help one another. He now believed they had made a mistake, and that war was inevitable, but if their creation could make use of his gift, if they could share openly and perhaps war might be yet avoided. But all others entered a panic. They will use it to shout! They will use it to lie! This 'gift' would surely bring cataclysm to the world! Each thought to destroy their creation, before it was completed, but none would make the move. None but finally, Shadow, who went, smiling, to bestow a final gift.

All were silent. They feared his calmness. Did he seek to defy their ancient treaty? Would he forge life into a means of war?

Would he bring about the end of the world?

The God of Shadow stood over the first life. He softened its flesh. He emptied its stomach. He brittled its bones and thickened its blood, staining it red. His gift would give their children no choice but to use their voice, their freedoms, their minds and hearts. He would force them to make the most of the lives they were given, and he would guarantee that no war — or anything else — would be unending.

Finally his work completed, he watched as the first life, the first child of man stepped forward, slowly, from the forge. He watched as it began to weep, and rot. He watched as it fell, and died. To show what must be done, he had laid his gift thick, though now he stepped aside, so the gods might repeat their work.

Now solemn, each again presented their gift. None smiled.

They pitied the second life as it stepped forth from the forge, unsure what next to do. They pitied the third as well, and each they created after.

They were unsure if they had made a mistake.

They had.

But that is a story for another time.`,
  },
  {
    id: "eras",
    title: "Eras",
    teaser: "Many ages. One world. Magic rewritten between them.",
    image: "/writing/eras.png",
    imageAlt:
      "A panorama of Paragon's ages from divine creation through terrors to scions",
    body: `The story of Paragon unfolds over many eras, between which the dynamics of the world and its magic change dramatically. This allows for many different types of settings and stories to unfold in the same setting!

Age of Gods — A primordial era where the Gods directly shape the lands

Age of Champions — The Gods withdraw, and empower 12 champions to act on their behalf

Age of Terrors — A war between Gods and mortals, with terrors spilling forth from the crucible to destroy mankind so the gods may start anew. Mankind learns to live in the small places.

Age of Hunters — Mankind begins to fight back against the terrors, claiming their souls to empower themselves — but being changed by them.

Age of Scions — Long after the terrors are forgotten, power granting souls are passed down to scions`,
  },
  {
    id: "my-book",
    title: "My book!",
    teaser: "First outline finished. The forge is still hot.",
    image: "/writing/my-book.png",
    imageAlt:
      "An open fantasy manuscript glowing with ember light on a writer's desk",
    body: `I am writing a book in this world, and have finished my first outline! Planning to do a full write and a full re-outline and rewrite. If you want to see the raw work, open the draft below.`,
    link: {
      href: "https://docs.google.com/document/d/1Aii7OGHQzHy5MbG2CCzlP5NyeNnAdU7o_5I36_TW6OY/edit?usp=sharing",
      label: "Seven Souls — raw outline",
    },
  },
] as const;

export type WorldBubble = (typeof WORLD_BUBBLES)[number];
