const isUpperCase = (char : string) : boolean => {
    return char === char.toUpperCase();
}

const splitWords = (words : string[]) : string[] => {
    let possibleUniqueWords: string[] = [];

    for (const word of words) {
        const individualWords = [word];

        for (let index = 1; index < word.length; index++) {
            if (isUpperCase(word[index])) {
                individualWords.push(word.slice(0, index).trim());
                individualWords.push(word.slice(index).trim());
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
    let parsedModelName = modelName.replace(/[<>]/g, "");
    const commaIndex = parsedModelName.indexOf(',');
    if(commaIndex !== -1) {
        parsedModelName = parsedModelName.slice(0, commaIndex);
    }
    if(allUniqueWords(makeName, modelName)) {
        return makeName + ' ' + parsedModelName;
    }
    return parsedModelName;
}