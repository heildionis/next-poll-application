import { createSelector } from '@reduxjs/toolkit';

import { buildSelector } from '#/shared/lib/store';

export const [usePollPageChoices, getPollPageChoices] = buildSelector(
    (state) => state.pollPage?.choices || []
);

export const getSomeChoicesSelected = createSelector(
    getPollPageChoices,
    (choices) => !choices.some((choice) => choice.selected === true)
);

export const getSelectedChoices = createSelector(
    getPollPageChoices,
    (choices) =>
        choices
            .filter((choice) => choice.selected === true)
            .map(({ choice }) => choice)
);
