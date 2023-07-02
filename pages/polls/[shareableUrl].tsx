import { wrapper } from '#/app/providers/StoreProvider';
import { PollPage, fetchPoll } from '#/pages/PollPage';

export const getServerSideProps = wrapper.getServerSideProps(
    ({ dispatch }) =>
        async ({ query }) => {
            const { shareableUrl } = query;

            const response = await dispatch(fetchPoll(shareableUrl as string));

            if (response.meta.requestStatus === 'rejected') {
                return {
                    notFound: true,
                };
            }

            return {
                props: {},
            };
        }
);

export default PollPage;
