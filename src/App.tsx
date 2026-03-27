/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useEffect } from 'react';
import confetti from 'canvas-confetti';

// --- DATA ---
const STORIES = [
  {
    id: 1,
    title: "Jax's Hat Heist",
    icon: '🐇',
    text: "Listen up, folks! Jax the sneaky rabbit has been up to his tricks again. He crept into the Big Top early this morning and found fifteen shiny red hats stacked near the entrance. He giggled to himself and quickly hid them all behind the big blue curtain at the back of the tent. 'No one will ever find them!' he laughed. But Pomni was watching from the shadows. She saw exactly what Jax did — and now she needs YOUR help! Read this story carefully. Can you spot all the color words hiding inside? Tap every color word you find to collect it. Jax thinks he is so clever. Let's prove him wrong and find every single clue!",
    targets: ['red', 'blue'],
  },
  {
    id: 2,
    title: "Pomni's Garden Mystery",
    icon: '🌿',
    text: "Step right up! Pomni discovered something strange in the circus garden today. A trail of bright green footprints led all the way from the tent entrance to the magic fountain. Along the path she spotted a shiny yellow ribbon tied around every single lamppost. 'Who left all these clues?' she wondered out loud. Kinger overheard her and ran over to help. Together they followed the trail — but the mystery was just getting started! Someone had been here before them and left a secret message behind. Can you help Pomni and Kinger decode the clues? Search the story carefully and tap every color word you find!",
    targets: ['green', 'yellow'],
  },
  {
    id: 3,
    title: "Kinger's Missing Crown",
    icon: '👑',
    text: "Ladies and gentlemen, we have an emergency! Kinger's beloved crown has gone missing from the royal tent. He was wearing it during rehearsal when he spotted a glowing orange lantern swinging outside the window. Distracted, he set the crown down for just one moment — when he looked back, it was gone! The only clue left behind was a smudge of purple paint on the floor near the door. 'Purple paint!' gasped Kinger. 'Only one performer uses purple paint!' Join Kinger on his detective adventure. Read the story carefully and tap every color word you find to reveal the hidden trail of clues!",
    targets: ['orange', 'purple'],
  },
  {
    id: 4,
    title: "Ragatha's Surprise Party",
    icon: '🎀',
    text: "Shh — it's a secret! Ragatha is planning a surprise party for the whole circus crew. She spent all morning decorating the tent with long pink streamers that danced in the breeze. Then she laid out a beautiful white tablecloth on the big round table in the center of the ring. 'Perfect!' she smiled to herself. She arranged cookies, cupcakes, and sparkly treats for everyone. But she still needs one more thing to make the party complete — and she needs YOUR help to find it! Read Ragatha's story very carefully and tap every color word you discover hiding inside the text. Can you find them all?",
    targets: ['pink', 'white'],
  },
  {
    id: 5,
    title: "Gangle's Ribbon Race",
    icon: '🎗️',
    text: "The annual ribbon race is here! Gangle dashed across the sawdust floor of the Big Top, her ribbons trailing behind her like shooting stars. She grabbed a bright red baton from the starting post and sprinted toward the far end of the tent. Sneaky Jax had tied a rope across the track to trip her — but Gangle leaped over it with grace! At the finish line stood a tall green trophy gleaming under the spotlight. The crowd went wild! But Jax tried to swap the trophies when no one was looking. Help Gangle win fair and square by finding all the color words hidden in the story. Tap every one you spot!",
    targets: ['red', 'green'],
  },
  {
    id: 6,
    title: "Bubble's Bath Time",
    icon: '🧼',
    text: "Bubble decided it was time for a bath! He filled a big blue tub with lots of soapy water. The bubbles were bright white and floated all around the room. Caine watched as Bubble splashed around, making a huge mess! 'Be careful!' Caine shouted, but Bubble was having too much fun. He even found a small yellow ducky hiding in the suds. Can you find the color words in Bubble's story? Tap them all!",
    targets: ['blue', 'white'],
  },
  {
    id: 7,
    title: "Caine's Magic Wand",
    icon: '🪄',
    text: "Caine wanted to show off his new magic trick. He held a long black wand in his hand and pointed it at a hat. Suddenly, a shower of gold sparks flew out! Everyone gasped in surprise. 'Watch this!' Caine said, and he turned a red rose into a blue butterfly. The circus was filled with magic and wonder. Can you spot the color words? Tap every one you find!",
    targets: ['black', 'gold'],
  },
  {
    id: 8,
    title: "Zooble's Part Swap",
    icon: '🧩',
    text: "Zooble was feeling a bit bored with her look. She decided to swap her purple arm for a bright orange one. 'Much better!' she said, looking in the mirror. Then she found a green leg and a yellow hat to complete her new outfit. Jax laughed when he saw her. 'You look like a rainbow!' he teased. Zooble didn't mind at all. Help Zooble find all the color words in her story!",
    targets: ['purple', 'orange'],
  },
  {
    id: 9,
    title: "The Circus Parade",
    icon: '🥁',
    text: "It was time for the grand circus parade! Ragatha led the way, waving a big red flag. Behind her, Kinger rode a giant yellow elephant that trumpeted loudly. The crowd cheered as they passed by. Gangle did flips in the air, her pink ribbons flying behind her. Even Jax joined in, wearing a silly green suit. It was the best parade ever! Can you find all the color words? Tap them now!",
    targets: ['red', 'yellow'],
  },
  {
    id: 10,
    title: "Night at the Big Top",
    icon: '⛺',
    text: "The sun went down, and the sky turned a deep black. Inside the Big Top, silver stars hung from the ceiling, glowing in the dark. Pomni sat on a bench, watching the moonlight filter through the tent. It was so peaceful and quiet. Suddenly, a bright white light flashed! It was Caine, ready for the midnight show. 'Welcome, everyone!' he boomed. Can you find the color words in this night story?",
    targets: ['black', 'silver'],
  },
  {
    id: 11,
    title: "Jax's Prank Box",
    icon: '📦',
    text: "Jax found a mysterious green box sitting in the middle of the floor. He couldn't resist opening it! Inside, he found a bunch of brown spiders that jumped out at him. 'Yikes!' Jax yelled, jumping back. It was a prank from Bubble! Jax laughed and decided to hide the box behind a big blue curtain. 'I'll get him back later!' he whispered. Can you find the color words? Tap them all!",
    targets: ['green', 'brown'],
  },
  {
    id: 12,
    title: "Pomni's Lost Jingle",
    icon: '🔔',
    text: "Pomni lost one of the bells from her hat! She searched everywhere, looking for the tiny pink jingle. She checked under a gray rock near the fountain, but it wasn't there. Then she looked inside a yellow bucket, but still no bell. Finally, she found it caught in a green bush. 'Found it!' she cried happily. Can you help Pomni find the color words in her story? Tap them now!",
    targets: ['pink', 'gray'],
  },
  {
    id: 13,
    title: "Kinger's Chess Match",
    icon: '♟️',
    text: "Kinger was playing a serious game of chess. He moved a white pawn forward, thinking carefully about his next move. His opponent, a mysterious black shadow, moved a knight. Kinger scratched his head. 'This is a tough one!' he muttered. He looked at the red timer on the table. Only one minute left! Can you find the color words in Kinger's chess match? Tap them all!",
    targets: ['white', 'black'],
  },
  {
    id: 14,
    title: "Ragatha's Sewing Kit",
    icon: '🧵',
    text: "Ragatha was busy mending a hole in the tent. She used a long red thread to stitch the fabric together. Then she found a patch of blue cloth to cover the spot. 'Good as new!' she said, patting the tent. She put her needle back in her yellow pincushion and smiled. The circus was safe and sound. Can you spot the color words? Tap every one you find!",
    targets: ['red', 'blue'],
  },
  {
    id: 15,
    title: "Gangle's Mask Collection",
    icon: '🎭',
    text: "Gangle had a collection of many different masks. Today she chose a bright yellow one with a big smile. She also had a sad orange mask for when she was feeling blue. She carefully placed them on a purple shelf in her room. 'Which one should I wear tomorrow?' she wondered. Jax walked in and pointed at a green mask. 'That one!' he said. Can you find the color words? Tap them all!",
    targets: ['yellow', 'orange'],
  },
  {
    id: 16,
    title: "The Candy Cannon",
    icon: '🚀',
    text: "Caine brought out his most exciting invention yet: the Candy Cannon! He loaded it with pink marshmallows and green jellybeans. 'Ready, aim, fire!' he shouted. A shower of sweets exploded into the air, and everyone scrambled to catch them. It was a delicious surprise! Pomni found a blue lollipop on the ground. Can you find the color words in this sweet story?",
    targets: ['pink', 'green'],
  },
  {
    id: 17,
    title: "Caine's Floating Hat",
    icon: '🎩',
    text: "Caine's hat started to float all by itself! It was a tall purple hat with a white band around it. It drifted up toward the top of the tent, and Caine had to jump to catch it. 'Come back here!' he laughed. The hat did a loop-de-loop and landed right on Jax's head. Jax looked very silly! Can you spot the color words? Tap every one you find!",
    targets: ['purple', 'white'],
  },
  {
    id: 18,
    title: "Bubble's Soap Suds",
    icon: '🫧',
    text: "Bubble was blowing giant bubbles with a white wand. One bubble was so big it turned a shimmering blue color. It floated over the circus ring and popped right over Kinger's head! Kinger was covered in soap suds. 'Oh my!' he exclaimed. Bubble just giggled and blew another one. Can you find the color words in Bubble's story? Tap them now!",
    targets: ['white', 'blue'],
  },
  {
    id: 19,
    title: "Zooble's New Leg",
    icon: '🦵',
    text: "Zooble found a new part for her body! It was a bright orange leg with black stripes. She snapped it into place and did a little dance. 'I love it!' she said. She even found a yellow shoe to match her new leg. Jax watched her and tried to do a dance too, but he tripped over a red rug. Can you find the color words? Tap them all!",
    targets: ['orange', 'black'],
  },
  {
    id: 20,
    title: "The Grand Finale",
    icon: '🎆',
    text: "It was time for the grand finale of the show! The sky was filled with gold fireworks that sparkled like stars. Silver streamers fell from the ceiling, covering everyone in glitter. Caine stood in the center of the ring, waving his red cape. 'Thank you for coming!' he boomed. It was a night no one would ever forget. Can you find the color words? Tap them all!",
    targets: ['gold', 'silver'],
  },
];

const seniorStoryLibrary = [
  {
    id: 101,
    title: "The Night the Wall Rose",
    icon: '🧱',
    text: "It happened while most of Berlin slept. On a gray August morning in 1961, Greta pressed her face against the cold window and watched soldiers unroll coils of wire across the street below. By dawn the wire stretched as far as she could see, splitting the city in two. Searchlights swept the empty boulevard like silent, accusing eyes. Her father was on the other side. Now guards in gray uniforms paced back and forth, their boots heavy on the cobblestones. She pressed both hands flat against the glass. Someday she would escape this divided city. Someday she and her father would both be free. That small, burning hope was the only thing she had left. Read every word of Greta's story. Tap every Threat word you find, then every Hope word — they are all hiding inside the text!",
    threats: ['soldiers', 'wire', 'guards'],
    hope: ['escape', 'free', 'hope'],
    question: { text: "Who were pacing back and forth outside Greta's window?", answer: "guards" },
  },
  {
    id: 102,
    title: "Beneath the Cobblestones",
    icon: '⛏️',
    text: "Three meters below the cobblestones of East Berlin, a group of students dug in silence. They called it the tunnel. Their hands were raw and bleeding. The clay walls of the tunnel pressed close on every side, and the air smelled of damp earth and fear. Each bucket of soil had to be carried back by hand — one mistake, and the Stasi would find them all. The Stasi used informants everywhere, even among neighbors and childhood friends. Above, a patrol marched back and forth along the border. Ahead in the darkness a tiny candle flickered: a signal from the western side that the coast was clear. One by one, twenty-nine people crawled through the tunnel toward the light. The last to emerge was a grandmother who wept with joy — she was finally free. Search every sentence. Tap every Threat word, then every Hope word!",
    threats: ['stasi', 'patrol', 'informants'],
    hope: ['tunnel', 'signal', 'free'],
    question: { text: "What did the students dig beneath the cobblestones?", answer: "tunnel" },
  },
  {
    id: 103,
    title: "The Man in the Green Coat",
    icon: '🕵️',
    text: "Every morning the man in the green coat stood at the corner pretending to read a newspaper. He was never actually reading. He was watching. The Stasi — the secret police of East Germany — kept files on nearly every family in the city. Anna knew about those files. Her family had learned to speak only in code, turning the radio up loud before whispering anything that mattered. Anna's mother had hidden forged papers beneath the floorboards, along with a secret map and a route that could lead to escape. One cold dawn the man in the green coat knocked on their door. Anna clutched the papers tightly, her heart hammering. Everything depended on the next few seconds. Search every sentence carefully. Tap every Threat word, then every Hope word!",
    threats: ['stasi', 'watching', 'files'],
    hope: ['secret', 'papers', 'escape'],
    question: { text: "Who kept files on every family in the city?", answer: "stasi" },
  },
  // --- NEW STORIES FROM "A NIGHT DIVIDED" ---
  {
    id: 106,
    title: "The Secret Message",
    icon: '✉️',
    text: "Gerta found the drawing in the dirt near the construction site. It was a simple sketch of a building she recognized, but there was a mark on it that didn't belong. She knew it was a secret from her father. The Stasi were always watching, their eyes cold and unblinking. She had to be careful. If the guards caught her with the drawing, she would be arrested. But the sketch gave her hope. It was a sign that her father was still thinking of them, still planning for their escape. She tucked the paper into her boot and walked away, her heart racing. Tap every Threat word, then every Hope word!",
    threats: ['stasi', 'watching', 'guards'],
    hope: ['secret', 'hope', 'escape'],
    question: { text: "Where did Gerta hide the secret drawing?", answer: "boot" },
  },
  {
    id: 107,
    title: "The Air Raid Shelter",
    icon: '🏚️',
    text: "The old air raid shelter was damp and dark, but it was the perfect place to start. Gerta and Fritz began to dig. Every shovel of dirt felt like a step toward freedom. They had to be silent, for the border was only a few meters away. The sound of a patrol could mean the end of everything. They used a bucket to carry the soil to the back of the room, hiding it beneath old crates. The work was exhausting, but the thought of the tunnel kept them going. They were building a bridge to the West, one handful of earth at a time. Tap every Threat word, then every Hope word!",
    threats: ['border', 'patrol', 'hiding'],
    hope: ['freedom', 'tunnel', 'west'],
    question: { text: "What did Gerta and Fritz use to carry the soil?", answer: "bucket" },
  },
  {
    id: 108,
    title: "The Officer's Gaze",
    icon: '👮',
    text: "Officer Muller stood at the edge of the death strip, his binoculars fixed on the apartment building. He was part of the Stasi, the force that kept the city in a grip of fear. Gerta felt his gaze like a physical weight. She continued to plant her garden, pretending to be an ordinary girl with ordinary chores. Beneath the surface, the tunnel was growing. She knew that any mistake, any slip of the tongue, would lead to the interrogation rooms. But she also knew that Muller was human. Sometimes she saw a flicker of doubt in his eyes. Perhaps even a guard could dream of freedom. Tap every Threat word, then every Hope word!",
    threats: ['stasi', 'fear', 'interrogation'],
    hope: ['garden', 'tunnel', 'freedom'],
    question: { text: "What was Gerta pretending to plant to hide her work?", answer: "garden" },
  },
  {
    id: 109,
    title: "The Sound of the Drill",
    icon: '⚙️',
    text: "The sound of the drill was deafening in the small space. Fritz worked feverishly, trying to break through the final layer of rock. On the other side, they could hear the faint sound of music from the West. It was a signal that they were close. But the noise was a threat. If a neighbor heard the vibration, they might call the police. The Stasi rewarded those who turned in their friends. Gerta held her breath, listening for the sound of boots on the stairs. Suddenly, the drill broke through. A sliver of light appeared. It was the light of escape. Tap every Threat word, then every Hope word!",
    threats: ['police', 'stasi', 'vibration'],
    hope: ['signal', 'west', 'escape'],
    question: { text: "What did Fritz use to break through the rock?", answer: "drill" },
  },
  {
    id: 110,
    title: "The Final Dash",
    icon: '🏃',
    text: "The tunnel was collapsing. Dust filled Gerta's lungs as she crawled toward the opening. Behind her, she could hear the shouts of the guards. They had found the entrance. The searchlights cut through the night, searching for any sign of movement. 'Run!' Fritz yelled. They scrambled out of the hole and into the tall grass of the death strip. The wire fence was just ahead. With one final burst of energy, they leaped over the barrier and into the arms of their father. They were finally free. The wall could no longer divide them. Tap every Threat word, then every Hope word!",
    threats: ['guards', 'searchlights', 'wire'],
    hope: ['tunnel', 'free', 'father'],
    question: { text: "Who was waiting for them on the other side of the fence?", answer: "father" },
  },
  {
    id: 111,
    title: "The Secret Tunnel",
    icon: '🚇',
    text: "Deep in the basement of an old bakery, the secret work continued. The Stasi were patrolling the streets above, but they didn't know about the tunnel. Every inch of progress was a victory. The border was guarded by soldiers with dogs, but the hope of freedom kept the diggers strong. They worked in shifts, never stopping. One night, they heard the sound of water. They had hit a pipe! They had to be careful not to flood the tunnel. Tap every Threat word, then every Hope word!",
    threats: ['stasi', 'border', 'soldiers'],
    hope: ['secret', 'tunnel', 'freedom'],
    question: { text: "Where was the secret tunnel being dug?", answer: "bakery" },
  },
  {
    id: 112,
    title: "The Midnight Crossing",
    icon: '🌑',
    text: "The night was pitch black. The guards were changing shifts at the wall. This was the moment. Gerta and her family moved silently through the shadows. The searchlights were scanning the area, but they stayed low. They reached the wire fence and began to cut through. Every snip felt like a thunderclap. Suddenly, a dog barked! They froze. After a long minute, the dog went quiet. They finished the cut and scrambled through. They were free at last. Tap every Threat word, then every Hope word!",
    threats: ['guards', 'searchlights', 'wire'],
    hope: ['midnight', 'escape', 'free'],
    question: { text: "What did they have to cut through to escape?", answer: "fence" },
  },
  {
    id: 113,
    title: "The Hidden Radio",
    icon: '📻',
    text: "In the attic, hidden behind a false wall, was a small radio. It was their only connection to the West. The police were always looking for illegal radios, and informants were everywhere. They had to be very quiet. The signal was weak, but they could hear the news. It gave them hope that the world hadn't forgotten them. One day, the radio broadcast a secret message. It was time to move. Tap every Threat word, then every Hope word!",
    threats: ['police', 'informants', 'watching'],
    hope: ['radio', 'signal', 'secret'],
    question: { text: "Where was the illegal radio hidden?", answer: "attic" },
  },
  {
    id: 114,
    title: "The Wall's Shadow",
    icon: '👤',
    text: "The wall cast a long shadow over the city. Soldiers stood on the towers, watching everything. The wire was sharp and dangerous. Gerta looked out at the garden she had planted. It was a small patch of hope in a gray world. She knew that one day, the wall would fall. But for now, they had to be patient. They had to wait for the right moment to escape. Tap every Threat word, then every Hope word!",
    threats: ['soldiers', 'watching', 'wire'],
    hope: ['shadow', 'hope', 'garden'],
    question: { text: "What did Gerta plant to keep her hope alive?", answer: "garden" },
  },
  {
    id: 115,
    title: "The Forged Passport",
    icon: '🛂',
    text: "The papers were perfect. The Stasi had files on everyone, but they wouldn't find anything wrong with these. The passport was their ticket to freedom. They had to be careful at the checkpoint. The inspection would be thorough. Anna's heart was pounding as she handed over the forged papers. The guard looked at them for a long time. Finally, he stamped them and handed them back. They were one step closer to escape. Tap every Threat word, then every Hope word!",
    threats: ['stasi', 'files', 'inspection'],
    hope: ['passport', 'papers', 'escape'],
    question: { text: "What was forged to help them escape?", answer: "passport" },
  },
  {
    id: 116,
    title: "The Balloon Escape",
    icon: '🎈',
    text: "The balloon was ready. It was made of hundreds of pieces of fabric, sewn together in secret. The guards were patrolling the border, but they weren't looking up. The family climbed into the basket and lit the burner. The balloon rose slowly into the night sky. They floated over the wall and toward the West. It was a daring escape. Suddenly, the wind shifted. They were heading back toward the East! They had to act fast. Tap every Threat word, then every Hope word!",
    threats: ['guards', 'border', 'watching'],
    hope: ['balloon', 'west', 'escape'],
    question: { text: "What was the balloon made of?", answer: "fabric" },
  },
  {
    id: 117,
    title: "The Checkpoint",
    icon: '🚧',
    text: "The checkpoint was crowded. People were waiting in long lines for the inspection. The police were checking every bag and every pocket. Gerta tried to stay calm. She had a secret message hidden in her shoe. When it was her turn, she gave the guard a small smile. He looked at her papers and then at her. 'Move along,' he said. She walked through the gate and felt the first breath of freedom. Tap every Threat word, then every Hope word!",
    threats: ['checkpoint', 'inspection', 'police'],
    hope: ['smile', 'secret', 'freedom'],
    question: { text: "Where did Gerta hide the secret message?", answer: "shoe" },
  },
  {
    id: 118,
    title: "The Letter from the West",
    icon: '📬',
    text: "A letter arrived from the West. It was hidden inside a box of chocolates. The Stasi were always watching the mail, but they missed this one. The letter contained a secret map and a signal for the next crossing. It was the hope they had been waiting for. They read the letter over and over, memorizing every detail. Then they burned it. They couldn't leave any evidence behind. Tap every Threat word, then every Hope word!",
    threats: ['stasi', 'watching', 'files'],
    hope: ['letter', 'west', 'signal'],
    question: { text: "Where was the letter from the West hidden?", answer: "chocolates" },
  },
  {
    id: 119,
    title: "The Silent Protest",
    icon: '🕯️',
    text: "The people gathered in the square. They were silent, but their message was clear. The police were standing by, ready to move in. The fear was palpable, but so was the hope. They held candles that flickered in the wind. It was a peaceful protest for freedom. Suddenly, the lights went out. The square was plunged into darkness. But the candles kept burning. They were a sign that the people would not be silenced. Tap every Threat word, then every Hope word!",
    threats: ['police', 'fear', 'watching'],
    hope: ['protest', 'hope', 'freedom'],
    question: { text: "What did the people hold during the silent protest?", answer: "candles" },
  },
  {
    id: 120,
    title: "The Night of the Escape",
    icon: '🌃',
    text: "The night of the escape had finally arrived. The guards were distracted by a celebration in the city. The wire was unguarded for just a few minutes. They reached the tunnel and began to crawl. It was a long and difficult journey, but they were determined. They could hear the sound of the border patrol above them. They held their breath and kept moving. Finally, they reached the other side. They were free. Tap every Threat word, then every Hope word!",
    threats: ['guards', 'wire', 'patrol'],
    hope: ['escape', 'tunnel', 'free'],
    question: { text: "What were the guards distracted by?", answer: "celebration" },
  },
  {
    id: 121,
    title: "The Informant's Trap",
    icon: '🪤',
    text: "The informant had set a trap. He told the Stasi about the secret meeting. The police were waiting in the shadows. But Gerta had a feeling something was wrong. She saw a signal from a friend and realized it was a setup. She warned the others just in time. They escaped through a back door and into the night. It was a close call, but they were safe. Tap every Threat word, then every Hope word!",
    threats: ['informant', 'stasi', 'police'],
    hope: ['signal', 'secret', 'escape'],
    question: { text: "How did Gerta and her friends escape the trap?", answer: "door" },
  },
  {
    id: 122,
    title: "The Final Reunion",
    icon: '👨‍👩‍👧',
    text: "The wall was finally open. People were streaming across the border in both directions. The searchlights were no longer searching for escapees. Gerta stood at the checkpoint, looking for her father. Suddenly, she saw him. He was running toward her with a huge smile. They hugged each other tightly, tears of joy streaming down their faces. They were finally together, and they were finally free. Tap every Threat word, then every Hope word!",
    threats: ['border', 'searchlights', 'checkpoint'],
    hope: ['reunion', 'father', 'free'],
    question: { text: "Who did Gerta reunite with at the wall?", answer: "father" },
  }
];

const TRANSLATIONS: Record<string, string> = {
  soldiers: '士兵', wire: '铁丝网', guards: '卫兵', stasi: '秘密警察', patrol: '巡逻队', informants: '线人', watching: '监视', files: '档案',
  escape: '逃脱', free: '自由', hope: '希望', tunnel: '地道', signal: '信号', secret: '秘密', papers: '证件',
  border: '边界', checkpoint: '检查站', searchlights: '探照灯', balloon: '气球', west: '西方', freedom: '自由', passport: '护照',
  hiding: '躲藏', police: '警察', vibration: '震动', garden: '花园', inspection: '检查', smile: '微笑', father: '父亲', boot: '靴子', bucket: '水桶', drill: '钻头',
  midnight: '午夜', radio: '收音机', shadow: '阴影', protest: '抗议', reunion: '团聚', fear: '恐惧', letter: '信件', informant: '线人', interrogation: '审讯'
};

// --- HELPERS ---
function stripPunctuation(word: string) {
  return word.toLowerCase().replace(/[^a-z]/g, '');
}

function pickFromLibrary(library: any[], excludeId: number | null = null) {
  const pool = excludeId !== null ? library.filter((s) => s.id !== excludeId) : library;
  return pool[Math.floor(Math.random() * pool.length)];
}

function fireConfetti() {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// --- COMPONENTS ---
function CaineAvatar({ isTalking, isWin, speech }: { isTalking: boolean, isWin: boolean, speech: string }) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="relative flex-shrink-0">
        <div 
          className={`w-16 h-16 rounded-full border-4 border-yellow-500 flex items-center justify-center text-3xl select-none ${isTalking ? 'talk-anim' : ''} ${isWin ? 'win-bounce' : ''}`}
          style={{ background: 'radial-gradient(circle at 40% 35%, #7c2d12, #450a0a)' }}
        >
          🎩
        </div>
        {isTalking && (
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-0.5">
            <span className="dot-1 inline-block w-1.5 h-3 rounded-full bg-yellow-500" />
            <span className="dot-2 inline-block w-1.5 h-3 rounded-full bg-yellow-500" />
            <span className="dot-3 inline-block w-1.5 h-3 rounded-full bg-yellow-500" />
          </div>
        )}
      </div>
      <div className="relative bg-yellow-400 text-amber-900 font-bold text-sm px-4 py-2 rounded-2xl rounded-tl-none max-w-xs shadow-lg mt-1">
        <span className="absolute -left-2.5 top-3 w-3 h-3 bg-yellow-400" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 50%)' }} />
        {speech}
      </div>
    </div>
  );
}

export default function App() {
  const [gameState, setGameState] = useState<'start' | 'reading' | 'question' | 'win'>('start');
  const [mode, setMode] = useState<'junior' | 'senior'>('senior');
  const [currentStory, setCurrentStory] = useState<any>(null);
  const [nextStory, setNextStory] = useState<any>(null);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [isTalking, setIsTalking] = useState(false);
  const [shakeIndex, setShakeIndex] = useState<number | null>(null);
  const [hintUses, setHintUses] = useState(1);
  const [hintWord, setHintWord] = useState<string | null>(null);
  const [returnFlash, setReturnFlash] = useState<string | null>(null);
  const [returnedFromQuestion, setReturnedFromQuestion] = useState(false);

  const effectiveTargets = currentStory ? (
    mode === 'junior' 
      ? (currentStory.targets || []).slice(0, 1) 
      : (currentStory.threats ? [...currentStory.threats, ...currentStory.hope] : currentStory.targets)
  ) : [];

  const allFound = foundWords.length === effectiveTargets.length && effectiveTargets.length > 0;

  const handleStart = (selectedMode: 'junior' | 'senior') => {
    setMode(selectedMode);
    const lib = selectedMode === 'senior' ? seniorStoryLibrary : STORIES;
    const first = pickFromLibrary(lib);
    setCurrentStory(first);
    setNextStory(pickFromLibrary(lib, first.id));
    setFoundWords([]);
    setGameState('reading');
    setHintUses(1);
  };

  const handleWordClick = (cleanWord: string, index: number) => {
    if (allFound) return; // Surgery 1: Disable clicks after all found

    if (effectiveTargets.includes(cleanWord)) {
      if (foundWords.includes(cleanWord)) return;
      setIsTalking(true);
      setTimeout(() => setIsTalking(false), 800);
      setFoundWords(prev => [...prev, cleanWord]);
      // Surgery 1: REMOVED automatic handleNext() call here
    } else {
      setShakeIndex(index);
      setTimeout(() => setShakeIndex(null), 500);
    }
  };

  const handleProceed = () => {
    // Surgery 2: User must click this button to proceed
    if (mode === 'senior' && currentStory.question) {
      setGameState('question');
    } else {
      setGameState('win');
      fireConfetti();
    }
  };

  const handlePlayAgain = () => {
    const lib = mode === 'senior' ? seniorStoryLibrary : STORIES;
    setCurrentStory(nextStory);
    setNextStory(pickFromLibrary(lib, nextStory.id));
    setFoundWords([]);
    setGameState('reading');
    setHintUses(1);
    setReturnedFromQuestion(false);
  };

  const renderContent = () => {
    if (gameState === 'start') {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-[#070d1f]">
          <div className="beige-card p-8 max-w-md w-full text-center">
            <CaineAvatar isTalking={false} isWin={false} speech="Welcome, performer! The show is about to begin! 🎭" />
            <div className="text-5xl mb-1">🎪</div>
            <h1 className="text-amber-800 text-4xl font-black uppercase tracking-widest leading-tight">Caine's</h1>
            <h1 className="text-slate-700 text-3xl font-black uppercase tracking-widest leading-tight mb-4">Digital Quest</h1>
            <div className="w-16 h-1 bg-amber-600 mx-auto mb-6 rounded-full" />
            <div className="flex flex-col gap-4">
              <button onClick={() => handleStart('junior')} className="bg-green-500 hover:bg-green-400 text-white font-black text-xl uppercase tracking-widest px-10 py-4 rounded-2xl shadow-lg transition-transform active:scale-95">🌟 Junior Mode</button>
              <button onClick={() => handleStart('senior')} className="bg-blue-700 hover:bg-blue-600 text-white font-black text-xl uppercase tracking-widest px-10 py-4 rounded-2xl shadow-lg transition-transform active:scale-95">🏆 Senior Mode</button>
            </div>
          </div>
        </div>
      );
    }

    if (gameState === 'reading') {
      const words = currentStory.text.split(' ');
      const isBerlin = mode === 'senior' && !!currentStory.threats;

      return (
        <div className="flex flex-col items-center justify-start min-h-screen px-4 py-8 bg-[#070d1f]">
          <div className="beige-card p-6 max-w-lg w-full">
            <CaineAvatar 
              isTalking={isTalking} 
              isWin={false} 
              speech={allFound ? "Brilliant! You found them all! Click Continue! 🚀" : "Find the hidden words! 🔍"} 
            />
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-xl">{currentStory.icon}</span>
              <span className="text-amber-800 text-sm font-black uppercase tracking-widest">{currentStory.title}</span>
            </div>

            <div className="beige-story-box p-4 mb-4">
              <p className="text-slate-700 text-base leading-loose font-medium select-none">
                {words.map((word: string, index: number) => {
                  const clean = stripPunctuation(word);
                  const isFound = foundWords.includes(clean);
                  const isShake = shakeIndex === index;
                  const isThreat = isFound && isBerlin && currentStory.threats.includes(clean);
                  const isHope = isFound && isBerlin && currentStory.hope.includes(clean);
                  const zhLabel = (isThreat || isHope) ? TRANSLATIONS[clean] : null;
                  const isFlash = !isFound && (hintWord === clean || returnFlash === clean);

                  return (
                    <span 
                      key={index} 
                      onClick={() => handleWordClick(clean, index)}
                      className={`mx-1 py-1 px-2 rounded cursor-pointer transition-colors duration-200 ${zhLabel ? 'inline-flex flex-col items-center leading-none' : 'inline-block'} ${isThreat ? 'text-red-700 font-black bg-red-100 word-pop' : isHope ? 'text-green-700 font-black bg-green-100 word-pop' : isFound ? 'text-amber-700 font-black word-pop' : 'text-slate-700 hover:bg-amber-200/70'} ${isShake ? 'shake-anim' : ''} ${isFlash ? 'flash-key' : ''}`}
                    >
                      <span>{word}</span>
                      {zhLabel && <span className={`text-xs font-bold mt-0.5 ${isThreat ? 'text-red-500' : 'text-green-600'}`}>{zhLabel}</span>}
                    </span>
                  );
                })}
              </p>
            </div>

            {allFound ? (
              <div className="flex justify-center">
                <button 
                  onClick={handleProceed}
                  className="bg-green-600 hover:bg-green-500 text-white font-black text-xl uppercase tracking-widest px-10 py-4 rounded-2xl shadow-xl transition-transform active:scale-95"
                >
                  Continue 🚀
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Found: {foundWords.length}/{effectiveTargets.length}</p>
                {mode === 'senior' && (
                  <button 
                    onClick={() => {
                      if (hintUses > 0) {
                        const unfound = effectiveTargets.find(w => !foundWords.includes(w));
                        setHintWord(unfound);
                        setHintUses(h => h - 1);
                        setTimeout(() => setHintWord(null), 3000);
                      }
                    }} 
                    disabled={hintUses <= 0}
                    className="hint-badge text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-xl disabled:opacity-50"
                  >
                    🔍 Hint ({hintUses})
                  </button>
                )}
              </div>
            )}
          </div>
          {returnedFromQuestion && (
            <button onClick={() => setGameState('question')} className="mt-6 bg-blue-700 text-white font-black px-8 py-3 rounded-2xl shadow-xl">✅ Back to Quiz</button>
          )}
        </div>
      );
    }

    if (gameState === 'question') {
      return (
        <QuestionScreen 
          story={currentStory} 
          onCorrect={() => setGameState('win')} 
          onReturnToStory={(w) => { setReturnFlash(w); setReturnedFromQuestion(true); setGameState('reading'); setTimeout(() => setReturnFlash(null), 3500); }} 
        />
      );
    }

    if (gameState === 'win') {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-[#070d1f]">
          <div className="beige-card p-8 max-w-md w-full text-center">
            <CaineAvatar isTalking={true} isWin={true} speech="YOU ESCAPED THE VOID! 🌟" />
            <div className="text-6xl mb-3 animate-bounce">🏆</div>
            <h2 className="text-amber-800 text-4xl font-black uppercase tracking-widest mb-1">AMAZING!</h2>
            <div className="w-16 h-1 bg-amber-600 mx-auto mb-5 rounded-full" />
            <div className="beige-next-box px-4 py-3 mb-6 text-left">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">🎲 Next story:</p>
              <p className="text-slate-700 text-sm font-bold">{nextStory.icon} {nextStory.title}</p>
            </div>
            <button onClick={handlePlayAgain} className="bg-amber-600 hover:bg-amber-500 text-white font-black text-xl uppercase tracking-widest px-10 py-4 rounded-2xl shadow-lg transition-transform active:scale-95">🎪 NEXT STORY</button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {gameState !== 'start' && (
        <button
          onClick={() => setGameState('start')}
          style={{ position: 'fixed', top: '1rem', left: '1rem', zIndex: 50 }}
          className="bg-amber-600 hover:bg-amber-500 active:scale-95 text-white font-black text-sm uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg transition-transform"
        >
          🏠 Home
        </button>
      )}
      {renderContent()}
    </>
  );
}

function QuestionScreen({ story, onCorrect, onReturnToStory }: { story: any, onCorrect: () => void, onReturnToStory: (w: string) => void }) {
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState<'idle' | 'wrong' | 'right'>('idle');
  const [everWrong, setEverWrong] = useState(false);

  const handleSubmit = () => {
    if (answer.trim().toLowerCase() === story.question.answer.toLowerCase()) {
      setStatus('right');
      fireConfetti();
    } else {
      setStatus('wrong');
      setEverWrong(true);
      setTimeout(() => setStatus('idle'), 1200);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-[#070d1f]">
      <div className="beige-card p-8 max-w-md w-full text-center">
        <CaineAvatar isTalking={status !== 'idle'} isWin={status === 'right'} speech={status === 'right' ? "Excellent — you're free! 🕊️" : (status === 'wrong' ? "Not quite — try again! 🤔" : "Answer to unlock the next chapter! 🔐")} />
        <div className="text-5xl mb-3">{status === 'right' ? '🗝️' : '🔐'}</div>
        <h2 className="text-amber-800 text-2xl font-black uppercase tracking-widest mb-1">Final Challenge</h2>
        <div className="w-16 h-1 bg-amber-600 mx-auto mb-5 rounded-full" />
        <p className="text-slate-700 text-base font-bold mb-1 leading-relaxed">{story.question.text}</p>
        <input 
          type="text" 
          value={answer} 
          onChange={(e) => setAnswer(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Type your answer…" 
          disabled={status === 'right'}
          className={`w-full px-4 py-3 rounded-xl border-2 font-bold text-slate-700 text-base outline-none transition-colors mb-3 ${status === 'right' ? 'border-green-400 bg-green-50' : (status === 'wrong' ? 'border-red-400 bg-red-50 shake-anim' : 'border-amber-400')}`} 
        />
        {everWrong && status !== 'right' && (
          <button onClick={() => onReturnToStory(story.question.answer)} className="text-blue-700 font-black text-sm underline mb-4 block mx-auto">🔙 Back to story for clues</button>
        )}
        <button onClick={handleSubmit} disabled={status === 'right'} className="bg-amber-600 hover:bg-amber-500 text-white font-black text-lg uppercase tracking-widest px-8 py-3 rounded-2xl shadow-lg w-full active:scale-95">Submit</button>
        {status === 'right' && (
          <button onClick={onCorrect} className="mt-3 bg-green-600 hover:bg-green-500 text-white font-black text-lg uppercase tracking-widest px-8 py-3 rounded-2xl shadow-lg w-full animate-pulse">🚀 Next Level</button>
        )}
      </div>
    </div>
  );
}
