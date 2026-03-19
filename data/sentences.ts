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
export type GamerGame = "counter_strike" | "siege" | "rocket_league" | "league_of_legends" | "valorant" | "overwatch";

export const gamerGameOptions: { key: GamerGame; label: string }[] = [
  { key: "counter_strike", label: "Counter-Strike" },
  { key: "siege", label: "Siege" },
  { key: "rocket_league", label: "Rocket League" },
  { key: "league_of_legends", label: "League of Legends" },
  { key: "valorant", label: "Valorant" },
  { key: "overwatch", label: "Overwatch" },
];

const gamerWords = [
  "gg",
  "lag",
  "ping",
  "carry",
  "throw",
  "rush",
  "clutch",
  "tilted",
  "queue",
  "respawn",
  "damage",
  "focus",
  "rotate",
  "defend",
  "push",
  "teamfight",
  "aim",
  "callout",
  "camping",
  "streak",
  "feed",
  "comms",
  "ranked",
  "sweat",
  "meta",
  "bronze",
  "diamond",
  "damn",
  "bruh",
  "trash",
  "wtf",
  "bro",
  "bricked",
  "diff",
  "boom",
  "unlucky",
  "choke",
  "slow",
  "clean",
  "messy",
  "reset",
  "tilt",
  "focus",
  "lock",
  "frag",
  "swing",
  "anchor",
  "retake",
  "entry",
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
  "WTF",
  "No way",
  "Come on man",
  "Seriously",
  "Ayo",
  "Holy shit",
  "Bruh",
  "What the fuck",
  "Team",
  "Fuck sake",
];

const sharedReactions = [
  "I'm actually tilted as fuck rn",
  "my mental is completely gone",
  "this is actually painful to watch",
  "we are throwing so fucking hard",
  "this team is fucking cooked",
  "I can't even right now",
  "this is the worst fucking game I've ever played",
  "we are griefing ourselves holy shit",
  "how the fuck do we keep doing this",
  "I'm so done with this shit",
  "what the actual fuck",
];

const sharedPureRage = [
  "Why the fuck am I always on this team",
  "Actual braindead fucking plays",
  "Just uninstall at this point",
  "We don't deserve to win this shit",
  "This is actually fucking embarrassing",
  "Everyone is fucking inting",
  "What the fuck are these decisions",
  "We lost because of you fucking idiots",
  "Nice fucking throw",
  "Report this whole fucking team",
  "How the fuck are you this bad",
  "I fucking hate this game",
  "Jesus fucking Christ",
  "What a bunch of fucking idiots",
];

// New array for cuss-heavy rage issues (game-specific below)
const cussWords = ["fuck", "fucking", "shit", "bullshit", "ass", "dumbass", "jackass", "moron", "retard"]; // retard kept mild context only if you want, but it's borderline — can remove

// Then update the gamePhraseBanks — here's the improved version for all games:

const gamePhraseBanks: Record<GamerGame, GamerPhraseBank> = {
  counter_strike: {
    gameWords: [ /* keep your existing CS gameWords */ ],
    intros: sharedIntros,
    rageIssues: [
      "we dry peek the same fucking angle every round",
      "no one trades the entry and we just fucking feed",
      "CT rotates are always late as fuck",
      "we waste all our utility before the fucking exec",
      "giving up mid for free again like idiots",
      "bomb is down and we're still chasing fucking frags",
      "we lose every retake because no one plays together",
      "lurk timing is completely braindead",
      "whiffing every anti-eco like it's our first fucking game",
      "called save and two guys still run it down like morons",
      "we keep peeking like fucking idiots",
    ],
    reactions: sharedReactions,
    fixes: [
      "just fucking trade after contact",
      "save smokes for the last site hit",
      "stop solo swinging and hold crossfires you dumbasses",
      "default for info before we commit",
      "play the numbers and protect the bomb ffs",
      "retake as a unit on one timer",
      "one person calls and we actually fucking listen",
    ],
    pureRage: sharedPureRage,
  },

  siege: {
    gameWords: [ /* keep existing */ ],
    intros: sharedIntros,
    rageIssues: [
      "we push without droning at all like fucking idiots",
      "hard breach dies with both charges again",
      "roam clear takes forever and we get no control",
      "no one watches flank during plant what the fuck",
      "we reinforced the rotate like complete morons",
      "swinging one by one into crossfire bullshit",
      "setup has zero fucking utility denial",
      "we hand over vertical for free every time",
      "plant fails because no one holds long angle",
      "everyone ignores callouts and ego peeks like jackasses",
    ],
    reactions: sharedReactions,
    fixes: [
      "drone before you fucking swing",
      "protect the hard breach you idiots",
      "clear utility then execute",
      "actually set flank watch before plant",
      "anchor with proper crossfires ffs",
    ],
    pureRage: sharedPureRage,
  },

  rocket_league: {
    gameWords: [ /* keep existing */ ],
    intros: sharedIntros,
    rageIssues: [
      "we double commit every single fucking defensive clear",
      "no one rotates back post on defense",
      "third man challenges with zero cover what the fuck",
      "we blow all boost on worthless fucking touches",
      "constantly booming the ball back to them like idiots",
      "whiffing the easiest open nets holy shit",
      "kickoff cheats are always mistimed bullshit",
      "panic touching instead of controlling the play",
      "forcing aerials with no boost like morons",
      "recoveries are painfully fucking slow",
    ],
    reactions: sharedReactions,
    fixes: [
      "rotate back and trust your fucking tm8s",
      "don't commit if second man has it",
      "control the first touch you dumbass",
      "call your boost when it's low ffs",
    ],
    pureRage: sharedPureRage.concat([
      "What a save! (x3) you fucking idiot",
      "Nice shot! (x3) dumbass",
      "Own goal merchant",
    ]),
  },

  league_of_legends: {
    gameWords: [ /* keep existing */ ],
    intros: sharedIntros,
    rageIssues: [
      "we fight dragon with zero fucking vision",
      "everyone chases mid while sides crash what the fuck",
      "engage with no cooldown tracking like braindead",
      "burn flashes before objective again",
      "jungle invades with no prio bullshit",
      "forcing fights when we're down numbers like idiots",
      "no peel for backline in teamfights",
      "giving baron for one random fucking tower",
      "overstaying on 100 hp like morons",
      "reset timings are completely fucked",
    ],
    reactions: sharedReactions,
    fixes: [
      "set vision before objective ffs",
      "catch waves then group you idiots",
      "track cooldowns before going in",
      "play around numbers and prio",
      "peel your fucking carries",
    ],
    pureRage: sharedPureRage.concat([
      "jg diff",
      "bot gap fucking hell",
      "mid is running it down",
      "report jungle this idiot",
      "ff 15 this shit is over",
    ]),
  },

  valorant: {
    gameWords: [ /* keep existing */ ],
    intros: sharedIntros,
    rageIssues: [
      "we hit site before any utility even fucking lands",
      "lurker timing never matches the exec what the fuck",
      "no one trades first contact again",
      "post plant lost to ego peeks bullshit",
      "giving up map control for nothing like idiots",
      "retake paths are completely disconnected",
      "over rotating on every fake like morons",
      "force buy and ruin economy again",
      "everyone calls a different fucking plan",
      "ignoring spike to chase kills what the fuck",
    ],
    reactions: sharedReactions,
    fixes: [
      "layer utility before swinging you dumbasses",
      "trade first contact ffs",
      "play post plant safely",
      "hold map control you idiots",
      "buy together and respect eco",
    ],
    pureRage: sharedPureRage,
  },

  overwatch: {
    gameWords: [ /* keep existing */ ],
    intros: sharedIntros,
    rageIssues: [
      "we burn three ults for one fucking fight",
      "backline dove with zero peel what the fuck",
      "we stagger in one by one like idiots",
      "no one contests high ground",
      "cooldowns wasted before engage bullshit",
      "chasing picks instead of objective",
      "supports have no sightlines at all",
      "dive with zero follow up damage",
      "touching point super late every defense",
      "target focus switches every two fucking seconds",
    ],
    reactions: sharedReactions,
    fixes: [
      "engage with one clear target ffs",
      "save ults for the next fight",
      "reset fast and avoid stagger you morons",
      "hold high ground",
      "peel supports first you dumbasses",
    ],
    pureRage: sharedPureRage.concat([
      "Tank diff",
      "Supports are throwing hard",
      "DPS ego peeking again",
    ]),
  },
};

// Updated rage templates to allow more natural swearing
const rageTemplates = [
  "{intro}, {rageIssue}. {reaction}.",
  "{intro} {rageIssue} again?? {reaction} so {fix}.",
  "{rageIssue}... {reaction}. Just {fix} ffs.",
  "{intro}, why the fuck do we always {rageIssue.toLowerCase()}?",
  "{pureRage}.",
  "{rageIssue}. {pureRage}.",
  "We are so fucking {reaction.split(' ').pop()}. {rageIssue}.",
  "{intro} this is fucking {reaction.split(' ').slice(-3).join(' ')}.",
];

const pick = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

const capitalizeFirst = (text: string): string => 
  text.charAt(0).toUpperCase() + text.slice(1);

// Updated main function
export function getGamerChatSentence(game: GamerGame, capitalize: boolean = true): string {
  const bank = gamePhraseBanks[game];
  
  // 35% chance for pure short rage (very common when tilted)
  if (Math.random() < 0.35) {
    let rageLine = pick(bank.pureRage);
    if (Math.random() < 0.4) rageLine += ".";
    if (Math.random() < 0.25) rageLine = rageLine.toUpperCase();
    return capitalize ? capitalizeFirst(rageLine) : rageLine.toLowerCase();
  }

  const template = pick(rageTemplates);
  let sentence = template
    .replace("{intro}", pick(bank.intros))
    .replace("{rageIssue}", pick(bank.rageIssues))
    .replace("{reaction}", pick(bank.reactions))
    .replace("{fix}", pick(bank.fixes))
    .replace("{pureRage}", pick(bank.pureRage));

  // Occasional typing quirks for realism
  if (Math.random() < 0.3) sentence += " ...";
  if (Math.random() < 0.2) sentence += "!!!!";
  if (Math.random() < 0.15) sentence = sentence.toUpperCase();

  return capitalize ? capitalizeFirst(sentence) : sentence.toLowerCase();
}
