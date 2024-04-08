import Avatar from '@mui/material/Avatar';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import useAuth from "../../contexts/AuthContext/useAuthContext";


export default function ImageAvatars({ sx }: { sx?: SxProps<Theme> }) {
    const { currentUser } = useAuth();
    return (
                <Avatar alt={currentUser.data?.username || ''} src={currentUser.data?.profilePic || ''} sx={sx} />

    );
}