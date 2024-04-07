import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

export default function ImageAvatars({ username, profilePic, sx }: { profilePic: string, username: string, sx?: SxProps<Theme> }) {
    return (
        <Stack>
            <Avatar alt={`Image de ${username}`} src={profilePic} sx={sx} />
        </Stack>
    );
}