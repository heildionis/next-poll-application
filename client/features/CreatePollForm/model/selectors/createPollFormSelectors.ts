import { Poll } from '#/entities/Poll';
import { buildSelector } from '#/shared/lib/store';

// The reason for naming variables with such long strings:
// When projects grow, it is often necessary to specify specially long names in order to avoid overlapping in the names of variables.

export const [useCreatePollFormTitle, getCreatePollFormTitle] = buildSelector(
    (state) => state.createPollForm?.title || ''
);

export const [useCreatePollFormChoices, getCreatePollFormChoices] =
    buildSelector((state) => state.createPollForm?.choices || []);

export const [
    useCreatePollFormExpirationDuration,
    getCreatePollFormExpirationDuration,
] = buildSelector(
    (state) => state.createPollForm?.expirationDuration || 60 * 100
);

export const [useCreatePollFormIsPollCreated, getCreatePollFormIsPollCreated] =
    buildSelector((state) => state.createPollForm?.isPollCreated || false);

export const [useCreatePollFormData, getCreatePollFormData] = buildSelector(
    (state) => state.createPollForm?.data || ({} as Poll)
);

export const [useCreatePollFormIsLoading, getCreatePollFormIsLoading] =
    buildSelector((state) => state.createPollForm?.isLoading || false);

export const [useCreatePollFormError, getCreatePollFormError] = buildSelector(
    (state) => state.createPollForm?.error || ''
);
