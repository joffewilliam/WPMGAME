/**
 * Sentence Generation Utilities
 *
 * Contains functions for generating typing content:
 * - Random normal sentences with common words
 * - Game-specific gamer chat lines for gamer mode
 * - Random paragraph selection from famous quotes
 */
import { normalWords } from "./normalWords";
import { quotes, ParagraphQuote } from "./quotes";

export type SentenceStyle = "words" | "sentences";
export type GamerGame =
  | "counter_strike"
  | "siege"
  | "rocket_league"
  | "league_of_legends"
  | "valorant"
  | "overwatch";

export const gamerGameOptions: { key: GamerGame; label: string }[] = [
  { key: "counter_strike", label: "Counter-Strike" },
  { key: "siege", label: "Siege" },
  { key: "rocket_league", label: "Rocket League" },
  { key: "league_of_legends", label: "League of Legends" },
  { key: "valorant", label: "Valorant" },
  { key: "overwatch", label: "Overwatch" },
];

type GamerPhraseBank = {
  gameWords: string[];
  intros: string[];
  issues: string[];
  reactions: string[];
  fixes: string[];
};

const sharedIntros = [
  "Bro",
  "Dude",
  "Yo",
  "No shot",
  "Come on",
  "Seriously",
  "Ayo",
  "Team",
];

const sharedReactions = [
  "that round was rough",
  "we are throwing hard",
  "this is pure chaos",
  "my focus is gone",
  "that was painful to watch",
  "we are making this way harder than needed",
  "this lobby is wild",
  "that play was not it",
];

const gamePhraseBanks: Record<GamerGame, GamerPhraseBank> = {
  counter_strike: {
    gameWords: [
      "eco", "force", "fullbuy", "entry", "retake", "site", "mid", "connector", "catwalk", "smoke",
      "flash", "molly", "crosshair", "spray", "tap", "peek", "jiggle", "trade", "anchor", "clutch",
      "defuse", "save", "awp", "ak", "deagle", "split", "exec", "default", "stack", "timing",
    ],
    intros: sharedIntros,
    issues: [
      "we dry peeked A main three rounds in a row",
      "nobody traded first contact on B",
      "our CT rotates are always late",
      "we burned utility before the execute",
      "we keep giving up mid for free",
      "we had bomb down and still chased kills",
      "we lose man advantage every retake",
      "our anti eco discipline is gone",
    ],
    reactions: sharedReactions,
    fixes: [
      "play contact and trade instantly",
      "save two smokes for the final hit",
      "hold crossfires and stop solo swinging",
      "default for info before committing",
      "play numbers and protect the bomb",
      "retake together on one timer",
    ],
  },
  siege: {
    gameWords: [
      "breach", "hardbreach", "drone", "swing", "crossfire", "roam", "anchor", "plant", "defuse", "intel",
      "vertical", "reinforce", "rotate", "hatch", "utility", "ads", "barbed", "shield", "spawnpeek", "flank",
      "operator", "site", "setup", "prefire", "refrag", "shotgun", "smoke", "nitro", "camera", "callout",
    ],
    intros: sharedIntros,
    issues: [
      "we entered without droning anything",
      "hard breach died with both charges",
      "roam clear took forever and got no control",
      "nobody watched flank cams during plant",
      "we kept swinging one by one into crossfires",
      "we gave up vertical control for free",
      "we lost plant because no one held long angle",
      "everyone ignored callouts and chased kills",
    ],
    reactions: sharedReactions,
    fixes: [
      "drone first then swing together",
      "protect hard breach and play objective",
      "clear utility before the execute",
      "set two flank watches before plant",
      "anchor with crossfires on site",
      "play post plant and stay calm",
    ],
  },
  rocket_league: {
    gameWords: [
      "boost", "aerial", "ceiling", "flip", "demo", "rotation", "challenge", "shadow", "dribble", "flick",
      "pinch", "doubletap", "backboard", "wall", "kickoff", "touch", "recover", "clear", "bump", "fifty",
      "infield", "pass", "goal", "fake", "speedflip", "open", "second", "third", "commit", "whiff",
    ],
    intros: sharedIntros,
    issues: [
      "we double committed every defensive clear",
      "nobody rotated back post on defense",
      "we challenged as third man with no cover",
      "we burned all boost for low value touches",
      "we whiffed two free open nets",
      "kickoff cheats are mistimed every game",
      "we panic touched instead of controlling",
      "our recoveries are too slow",
    ],
    reactions: sharedReactions,
    fixes: [
      "rotate back post and trust teammates",
      "leave if second man has the play",
      "control first touch before booming",
      "call out when you have low boost",
      "stop diving as third man",
      "focus on small pads and positioning",
    ],
  },
  league_of_legends: {
    gameWords: [
      "lane", "wave", "jungle", "gank", "roam", "objective", "dragon", "baron", "herald", "vision",
      "ward", "reset", "tp", "flash", "ult", "cooldown", "skirmish", "teamfight", "dive", "kiting",
      "frontline", "backline", "macro", "cs", "gold", "tempo", "prio", "split", "engage", "peel",
    ],
    intros: sharedIntros,
    issues: [
      "we fought dragon with no vision setup",
      "side waves crashed while everyone chased mid",
      "our engage happened without cooldown tracking",
      "we burned flashes before objective spawn",
      "jungle invades happened with no lane priority",
      "we kept forcing fights down numbers",
      "nobody peeled for backline in teamfights",
      "we over stayed after skirmish",
    ],
    reactions: sharedReactions,
    fixes: [
      "set vision one minute before objective",
      "catch side waves then group",
      "track cooldowns before engaging",
      "play around numbers and prio",
      "peel carries and kite back",
      "reset together and spend gold",
    ],
  },
  valorant: {
    gameWords: [
      "entry", "site", "retake", "rotate", "lurker", "anchor", "utility", "smoke", "flash", "molly",
      "dash", "drone", "trade", "eco", "force", "fullbuy", "default", "exec", "post", "orb",
      "ult", "operator", "crosshair", "angle", "swing", "timing", "comms", "stack", "fake", "clutch",
    ],
    intros: sharedIntros,
    issues: [
      "we hit site before utility even landed",
      "our lurker timing never synced with execute",
      "nobody traded first contact",
      "we lost post plant from ego peeks",
      "we keep giving up map control for free",
      "our retake pathing is disconnected",
      "we over rotate on every fake",
      "we force bought and broke economy again",
    ],
    reactions: sharedReactions,
    fixes: [
      "layer utility before the swing",
      "trade first contact instantly",
      "play post plant from safe lines",
      "retake with one clear countdown",
      "buy together and respect economy",
      "call one primary plan each round",
    ],
  },
  overwatch: {
    gameWords: [
      "payload", "point", "ultimate", "cooldown", "support", "tank", "dps", "flank", "peel", "engage",
      "disengage", "stagger", "touch", "contest", "highground", "los", "focus", "dive", "brawl", "poke",
      "position", "tempo", "combo", "anti", "immortality", "nano", "blade", "shatter", "kit", "reset",
    ],
    intros: sharedIntros,
    issues: [
      "we used three ults to win one easy fight",
      "backline got dove with no peel",
      "we staggered one by one after wipe",
      "nobody contested high ground early",
      "cooldowns got burned before engage",
      "we ignored objective while chasing picks",
      "our supports had no sightlines",
      "target focus switched every few seconds",
    ],
    reactions: sharedReactions,
    fixes: [
      "engage together with one target call",
      "save ults for the next real fight",
      "reset fast and avoid stagger",
      "hold high ground and force angles",
      "peel for supports before chasing",
      "play objective first then cleanup",
    ],
  },
};

const normalSentenceStarts = [
  "The morning train",
  "A quiet library",
  "Our small project",
  "The weekend plan",
  "My favorite notebook",
  "A long walk",
  "The local cafe",
  "This cooking class",
  "The city park",
  "A clear checklist",
  "The reading group",
  "Our science club",
  "The hiking trail",
  "A gentle breeze",
  "The coding workshop",
  "A clean workspace",
  "The neighborhood market",
  "A patient teacher",
  "The art studio",
  "Our study session",
  "The evening routine",
  "A short podcast",
  "The photo album",
  "A rainy afternoon",
  "The community garden",
  "A steady rhythm",
  "The practice schedule",
  "A friendly reminder",
  "The travel guide",
  "A simple recipe",
];

const normalSentenceVerbs = [
  "brings",
  "creates",
  "encourages",
  "inspires",
  "supports",
  "improves",
  "teaches",
  "builds",
  "organizes",
  "explains",
  "records",
  "highlights",
  "strengthens",
  "guides",
  "connects",
  "balances",
  "refreshes",
  "sharpens",
  "expands",
  "clarifies",
  "prepares",
  "simplifies",
  "brightens",
  "motivates",
  "documents",
  "captures",
  "transforms",
  "anchors",
  "maintains",
  "refines",
];

const normalSentenceEnds = [
  "a calm pace for the day ahead",
  "better focus during busy hours",
  "a clearer path through hard tasks",
  "small wins that add up over time",
  "steady progress without extra stress",
  "new ideas for tomorrow's work",
  "confidence in each simple step",
  "space for thoughtful decisions",
  "strong habits for daily practice",
  "a helpful rhythm for long projects",
  "better notes for future review",
  "more room for creative thinking",
  "practical goals with clear checkpoints",
  "consistent quality in each attempt",
  "useful feedback for the next draft",
  "a balanced approach to learning",
  "better timing in each routine",
  "clear communication across the group",
  "better planning before deadlines",
  "more clarity when tasks overlap",
  "steady effort in quiet moments",
  "more patience when solving problems",
  "less friction in everyday workflows",
  "better preparation for upcoming meetings",
  "fresh energy for the next session",
  "simple structure for complex ideas",
  "reliable results after regular practice",
  "an easy way to stay organized",
  "a stronger foundation for future work",
  "a practical routine that feels sustainable",
];

const pick = <T,>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

const countWords = (text: string): number => {
  return text.trim().split(/\s+/).filter(Boolean).length;
};

const buildSentenceBlock = (targetWords: number, makeSentence: () => string): string => {
  const safeTarget = Math.max(5, targetWords);
  const parts: string[] = [];
  let totalWords = 0;

  while (totalWords < safeTarget) {
    const next = makeSentence();
    parts.push(next);
    totalWords += countWords(next);
  }

  return parts.join(" ");
};

const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export function getRandomNormalSentence(wordCount: number = 15, capitalize: boolean = true): string {
  let sentence = "";
  for (let i = 0; i < wordCount; i++) {
    const randomWord = normalWords[Math.floor(Math.random() * normalWords.length)];
    sentence += randomWord + (i < wordCount - 1 ? " " : "");
  }
  return capitalize ? capitalizeFirst(sentence) : sentence;
}

export function getNormalChatSentence(targetWords: number = 25, capitalize: boolean = true): string {
  const text = buildSentenceBlock(targetWords, () => {
    return `${pick(normalSentenceStarts)} ${pick(normalSentenceVerbs)} ${pick(normalSentenceEnds)}.`;
  });

  return capitalize ? capitalizeFirst(text) : text.toLowerCase();
}

export function getGamerChatSentence(game: GamerGame, targetWords: number = 25, capitalize: boolean = true): string {
  const bank = gamePhraseBanks[game];
  const text = buildSentenceBlock(targetWords, () => {
    return `${pick(bank.intros)}, ${pick(bank.issues)}. ${pick(bank.reactions)}, so ${pick(bank.fixes)}.`;
  });

  return capitalize ? capitalizeFirst(text) : text.toLowerCase();
}

export function getRandomGameWordSentence(
  game: GamerGame,
  wordCount: number = 15,
  gamerRatio: number = 0.65,
  capitalize: boolean = true
): string {
  const gameWords = gamePhraseBanks[game].gameWords;
  let sentence = "";
  for (let i = 0; i < wordCount; i++) {
    const useGamerWord = Math.random() < gamerRatio;
    const wordPool = useGamerWord ? gameWords : normalWords;
    const randomWord = wordPool[Math.floor(Math.random() * wordPool.length)];
    sentence += randomWord + (i < wordCount - 1 ? " " : "");
  }
  return capitalize ? capitalizeFirst(sentence) : sentence;
}

export function getRandomParagraph(): ParagraphQuote {
  return quotes[Math.floor(Math.random() * quotes.length)];
}
