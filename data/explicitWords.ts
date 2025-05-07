export const explicitWords = [
    "fuck", "shit", "ass", "damn", "bitch", "cunt", "whore",
    "hell", "jerk", "piss", "tits", "bastard", "motherfucker", "cocksucker",
    "dick", "prick", "twat", "faggot", "slut", "douche", "cock", "pussy",
    "arse", "bugger", "bollocks", "wanker", "shithead", "asshole", "dickhead",
    "fucker", "crap", "bullshit", "pisshead", "shite", "tosser", "sod",
    "knob", "chode", "skank", "ho", "cum", "jizz", "spunk", "turd",
    "boner", "hardon", "schlong", "muff", "snatch", "clit", "dildo",
    "shitface", "fuckface", "arsehole", "cockhead", "prickhead", "douchebag",
    "fuckwit", "dipshit", "jackass", "moron", "idiot", "dumbass", "shitbag",
    "pissflap", "fucknut", "shitstain", "cockwomble", "twatwaffle", "cuntface",
    "fucktard", "asswipe", "shitforbrains", "cumstain", "wankstain", "bitchface",
    "dickweed", "fuckstick", "assclown", "pisswipe", "shitweasel", "cockmunch",
    "fartknocker", "dickbag", "cuntbag", "shitstick", "fuckbucket", "asshat",
    "pissbucket", "cockface", "shitnugget", "fucknugget", "cuntnugget", "dickface"
  ];
  
  export const explicitWordsTriggers = [
    "fuck", "shit", "ass", "damn", "bitch", "cunt", "whore",
    "hell", "jerk", "piss", "tits", "bastard", "motherfucker", "cocksucker",
    "dick", "prick", "twat", "faggot", "slut", "douche", "cock", "pussy",
    "arse", "bugger", "bollocks", "wanker", "shithead", "asshole", "dickhead",
    "fucker", "crap", "bullshit", "pisshead", "shite", "tosser", "sod",
    "knob", "chode", "skank", "ho", "cum", "jizz", "spunk", "turd",
    "boner", "hardon", "schlong", "muff", "snatch", "clit", "dildo",
    "shitface", "fuckface", "arsehole", "cockhead", "prickhead", "douchebag",
    "fuckwit", "dipshit", "jackass", "moron", "idiot", "dumbass", "shitbag",
    "pissflap", "fucknut", "shitstain", "cockwomble", "twatwaffle", "cuntface",
    "fucktard", "asswipe", "shitforbrains", "cumstain", "wankstain", "bitchface",
    "dickweed", "fuckstick", "assclown", "pisswipe", "shitweasel", "cockmunch",
    "fartknocker", "dickbag", "cuntbag", "shitstick", "fuckbucket", "asshat",
    "pissbucket", "cockface", "shitnugget", "fucknugget", "cuntnugget", "dickface"
  ];
  
  const commonWords = [
    "the", "and", "that", "have", "for", "not", "with", "you", "this", "but",
    "his", "they", "say", "she", "use", "from", "about", "get", "who", "make", 
    "like", "time", "just", "know", "take", "into", "year", "some", "them", "than",
    "then", "look", "only", "come", "over", "also", "back", "after", "work", "first"
  ];
  
  export function generateExplicitSentence(wordCount: number = 15, explicitRatio: number = 0.4): string {
    let sentence = '';
    
    for (let i = 0; i < wordCount; i++) {
      const useExplicit = Math.random() < explicitRatio;
      
      const wordPool = useExplicit ? explicitWords : commonWords;
      const randomWord = wordPool[Math.floor(Math.random() * wordPool.length)];
      
      sentence += randomWord + (i < wordCount - 1 ? ' ' : '');
    }
    
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
  }