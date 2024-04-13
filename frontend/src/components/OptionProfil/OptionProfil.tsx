import customTheme from '../../styles/customTheme';

import { styled } from '@mui/material/styles';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EmailIcon from '@mui/icons-material/Email';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import Diversity3Icon from '@mui/icons-material/Diversity3';
const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const actions = [
  { icon: <PersonAddIcon />, name: "Demande d'ami" },
  { icon: <EmailIcon />, name: 'Messages' },
  { icon: <Diversity3Icon />, name: 'Inviter dans le groupe' },
  { icon: <GppMaybeIcon />, name: 'Bloquer' },
];

export default function PlaygroundSpeedDial() {

  return (
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          icon={<SpeedDialIcon />}
          direction={'right'}
          sx={{
            position: 'static',
            '& .MuiButtonBase-root': {
              height: '0rem',
              width: '0rem',
              backgroundColor: customTheme.palette.orangePV.dark,
              color: customTheme.palette.slate[200],
              padding: '1rem',
              direction: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              scale: '0.6',
              margin: '0.2rem',
              '&:hover': {
                backgroundColor: customTheme.palette.orangePV.dark,
              }
            },
            '& .MuiSvgIcon-root': {
              fontSize: '1.5rem',

            },
            '& .MuiSpeedDial-actions': {
              paddingLeft: '30px'
            }

          }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </StyledSpeedDial>
  );
}