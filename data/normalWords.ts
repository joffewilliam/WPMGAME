// 500 common English words for the normal typing mode
export const normalWords = [
  "time", "person", "year", "way", "day", "thing", "man", "world", "life", "hand",
  "part", "child", "eye", "woman", "place", "work", "week", "case", "point", "government",
  "company", "number", "group", "problem", "fact", "be", "have", "do", "say", "get",
  "make", "go", "know", "take", "see", "come", "think", "look", "want", "give",
  "use", "find", "tell", "ask", "work", "seem", "feel", "try", "leave", "call",
  "good", "new", "first", "last", "long", "great", "little", "own", "other", "old",
  "right", "big", "high", "different", "small", "large", "next", "early", "young", "important",
  "few", "public", "bad", "same", "able", "to", "of", "in", "for", "on",
  "with", "at", "by", "from", "up", "about", "into", "over", "after", "beneath",
  "under", "above", "the", "and", "a", "that", "I", "it", "not", "he",
  "as", "you", "this", "but", "his", "they", "her", "she", "or", "an",
  "will", "my", "one", "all", "would", "there", "their", "what", "so", "up",
  "out", "if", "about", "who", "get", "which", "go", "me", "when", "make",
  "can", "like", "time", "no", "just", "him", "know", "take", "people", "into",
  "year", "your", "good", "some", "could", "them", "see", "other", "than", "then",
  "now", "look", "only", "come", "its", "over", "think", "also", "back", "after",
  "use", "two", "how", "our", "work", "first", "well", "way", "even", "new",
  "want", "because", "any", "these", "give", "day", "most", "us", "woman", "thank",
  "though", "life", "child", "tell", "keep", "here", "very", "before", "company", "through",
  "where", "why", "men", "much", "should", "such", "product", "both", "between", "city",
  "below", "country", "story", "against", "school", "best", "street", "sun", "students", "study",
  "still", "name", "three", "state", "today", "game", "water", "called", "always", "park",
  "move", "might", "night", "family", "house", "power", "while", "often", "page", "small",
  "since", "example", "heard", "during", "several", "change", "until", "too", "area", "include",
  "food", "begin", "home", "real", "member", "fight", "kind", "office", "system", "never",
  "bring", "case", "most", "certain", "program", "toward", "light", "problem", "interest", "table",
  "need", "end", "care", "community", "idea", "month", "fact", "site", "party", "road",
  "money", "order", "book", "event", "percent", "social", "support", "research", "less", "black",
  "sort", "past", "large", "personal", "something", "morning", "picture", "community", "simple", "music",
  "human", "yourself", "theory", "pretty", "available", "market", "land", "economic", "full", "digital",
  "father", "either", "second", "office", "middle", "already", "across", "although", "present", "quite",
  "mother", "figure", "ability", "international", "rather", "anyone", "position", "century", "student", "someone",
  "however", "success", "history", "effect", "tonight", "voice", "everyone", "future", "paper", "word",
  "without", "control", "action", "together", "image", "center", "building", "medical", "computer", "space",
  "system", "report", "process", "course", "beyond", "project", "activity", "purpose", "strong", "person",
  "nature", "tough", "evening", "single", "common", "message", "simple", "question", "happen", "former",
  "appear", "remember", "defense", "finally", "thought", "region", "society", "measure", "popular", "culture",
  "glass", "plant", "piece", "reach", "sound", "nearly", "model", "movie", "remain", "hotel",
  "provide", "indeed", "result", "health", "station", "final", "speak", "chance", "period", "amount",
  "player", "increase", "answer", "island", "doctor", "animal", "later", "learn", "moment", "summer",
  "plan", "cost", "age", "race", "field", "fish", "value", "key", "oil", "lead",
  "art", "demand", "news", "letter", "artist", "deal", "weight", "soldier", "reason", "test"
];

// Generate a sentence of random normal words
export function generateNormalSentence(wordCount: number = 15): string {
  let sentence = '';
  for (let i = 0; i < wordCount; i++) {
    const randomWord = normalWords[Math.floor(Math.random() * normalWords.length)];
    sentence += randomWord + (i < wordCount - 1 ? ' ' : '');
  }
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
}
