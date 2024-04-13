import customTheme from '../../styles/customTheme';

import { styled } from '@mui/material/styles';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EmailIcon from '@mui/icons-material/Email';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useMediaQuery } from '@mui/material';
const StyledSpeedDial = styled(SpeedDial)(() => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionDown': {
    top: customTheme.spacing(2),
    left: customTheme.spacing(18),
  },
  '&.MuiSpeedDial-directionRight': {
    top: customTheme.spacing(0.40),
    left: customTheme.spacing(19),
  },
  '& .MuiSpeedDial-actions': {
    padding: 0,
    marginLeft: customTheme.spacing(0.50)
  },
  '& .MuiFab-root': {
    minWidth: 0,
    minHeight: 0,
    width: '24px',
    height: '24px'
  },
  '& .MuiSvgIcon-root': {
    width: '18px',
    height: '18px'
  }
}));

const actions = [
  { icon: <PersonAddIcon />, name: "Demande d'ami" },
  { icon: <EmailIcon />, name: 'Messages' },
  { icon: <Diversity3Icon />, name: 'Inviter dans le groupe' },
  { icon: <GppMaybeIcon />, name: 'Bloquer' },
];

export default function PlaygroundSpeedDial() {
  const isMdUp = useMediaQuery(customTheme.breakpoints.up('md'));
  return (
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          icon={<SpeedDialIcon />}
          direction={isMdUp ? 'right' : 'down'}
          sx={{
            '& .MuiButtonBase-root': {
              backgroundColor: customTheme.palette.orangePV.dark,
              color: customTheme.palette.slate[200],
              '&:hover': {
                backgroundColor: customTheme.palette.orangePV.dark,
              }
            },
            '& .MuiSvgIcon-root': {
              // fontSize: '1.5rem',

            },


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