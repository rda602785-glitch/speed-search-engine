export interface Item {
score: number,
word: string,
id: number,
}
 export const words = Array.from({length: 4000}, (_, i) => ({
    id: i + 1,
    word: `word-${i + 1}`,
    score: Math.floor(Math.random() * 100),
}))