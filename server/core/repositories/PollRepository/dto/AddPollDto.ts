import { Choice } from '$/core/entities/Choice/Choice';

export class AddPollDto {
    readonly choices: Choice;

    constructor(
        choices: string[],
        readonly title: string,
        readonly expiresAt: string,
        readonly shareableUrl: string
    ) {
        this.title = title;
        this.choices = new Choice(choices);
        this.expiresAt = expiresAt;
        this.shareableUrl = shareableUrl;
    }
}
