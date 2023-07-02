export class Choice {
    constructor(choiceNames: string[]) {
        const choiceCounter = {};

        for (const choiceName of choiceNames) {
            choiceCounter[choiceName] = 0;
        }

        return choiceCounter;
    }
}
