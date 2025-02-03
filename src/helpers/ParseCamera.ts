const isUpperCase = (char : string) : boolean => {
    return char === char.toUpperCase();
}

const splitWords = (words : string[]) : string[] => {
    let possibleUniqueWords: string[] = [];

    for (const word of words) {
        const individualWords = [word];

        for (let index = 1; index < word.length; index++) {
            if (isUpperCase(word[index])) {
                individualWords.push(word.slice(0, index));
                individualWords.push(word.slice(index));
            }
        }

        possibleUniqueWords = [...possibleUniqueWords, ...individualWords];
    }

    return possibleUniqueWords;
}

const allUniqueWords = (...words : string[]) : boolean => {
    const wordMap = new Map();
    for (const word of splitWords(words)) {
        if (wordMap.has(word)) return false;
        wordMap.set(word, 1);
    }

    return true;
}

export default function parseCamera (makeName : string, modelName : string) : string {
    const parsedModelName = modelName.replace(/[<>]/g, "");
    if(allUniqueWords(makeName, modelName)) {
        return makeName + ' ' + parsedModelName;
    }
    return parsedModelName;
}