import { Button, ButtonProps, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { FC, memo, useCallback, useMemo } from 'react';

interface PollCopyButtonProps extends ButtonProps {
    url: string;
}

export const PollCopyButton: FC<PollCopyButtonProps> = memo((props) => {
    const { url, size = 'sm' } = props;
    const clipboard = useClipboard();

    const onCopyClick = useCallback(() => {
        clipboard.copy(url);
    }, [clipboard, url]);

    const renderIcon = useMemo(() => {
        if (clipboard.copied) {
            return <IconCheck size='1.2rem' stroke={1.5} />;
        }
        return <IconCopy size='1.2rem' stroke={1.5} />;
    }, [clipboard.copied]);

    return (
        <Tooltip
            label='Link copied!'
            offset={5}
            position='bottom'
            radius='sm'
            opened={clipboard.copied}
        >
            <Button
                variant='light'
                rightIcon={renderIcon}
                radius='sm'
                size={size}
                onClick={onCopyClick}
                {...props}
            >
                Share link
            </Button>
        </Tooltip>
    );
});
