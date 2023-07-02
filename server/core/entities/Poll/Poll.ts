import { Choice } from '../Choice/Choice';

export class Poll {
    constructor(
        readonly title: string,
        readonly choices: Choice,
        readonly expiresAt: number,
        readonly shareableUrl: string
    ) {}
}
