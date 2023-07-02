import { Button, ButtonProps } from '@mantine/core';
import { memo } from 'react';

import { GoogleIcon } from '../../../assets/GoogleIcon';

interface GoogleButtonProps extends ButtonProps {
    onClick: () => void;
}

export const GoogleButton = memo((props: GoogleButtonProps) => {
    const { onClick } = props;

    return (
        <Button
            leftIcon={<GoogleIcon />}
            variant='default'
            color='gray'
            onClick={onClick}
            {...props}
        />
    );
});
