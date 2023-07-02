import {
    VoteRepository,
    voteRepository,
} from '$/core/repositories/VoteRepository/VoteRepository';

export class VoteService {
    constructor(readonly voteRepository: VoteRepository) {}

    public async isVoteExist(ipAddress: string, poll: object) {
        const isVoteExist = this.voteRepository.isVoteExist(ipAddress, poll);

        return isVoteExist;
    }

    public async addVoteByIp(ipAddress: string, poll: object) {
        this.voteRepository.addVoteByIp(ipAddress, poll);
    }
}

export const voteService = new VoteService(voteRepository);
