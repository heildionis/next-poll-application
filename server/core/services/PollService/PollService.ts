import {
    PollRepository,
    pollRepository,
} from '$/core/repositories/PollRepository/PollRepository';
import { AddPollDto } from '$/core/repositories/PollRepository/dto/AddPollDto';
import { calcExpiresTime } from '$/lib/calcExpiresTime';
import { generateUrl } from '$/lib/generateUrl';

export class PollService {
    constructor(readonly pollRepository: PollRepository) {}

    public async add({ title, choices, expirationDuration }) {
        const shareableUrl = generateUrl();
        const expiresAt = calcExpiresTime(expirationDuration);

        const dto = new AddPollDto(choices, title, expiresAt, shareableUrl);

        const addedPoll = await this.pollRepository.add(dto);

        return addedPoll;
    }

    public async addVote(url: string, choices: string[]) {
        const updatedPoll = await this.pollRepository.addVote(url, choices);

        return updatedPoll;
    }

    public async getByUrl(url: string) {
        const poll = await this.pollRepository.getByUrl(url);

        return poll;
    }
}

export const pollService = new PollService(pollRepository);
