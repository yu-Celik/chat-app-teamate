import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import customTheme from "../../../../styles/customTheme.ts";

export default function BasicDateCalendar() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar sx={{
        // Appliquer des styles au calendrier entier
        width: '90%', // Réduire la largeur du calendrier

        color: customTheme.palette.slate[200],

        '& .MuiButtonBase-root': {
          color: customTheme.palette.slate[200],

          '&.Mui-selected': {
            backgroundColor: customTheme.palette.orangePV.dark,
          },
          '&.Mui-selected:hover': {
            backgroundColor: customTheme.palette.orangePV.dark,
          }
        },
        '& .MuiTypography-root': {
          color: customTheme.palette.orangePV.dark,
        },
        // Styles pour les jours
        '& .MuiPickersDay-root': {
          width: 30, // Réduire la largeur des jours
          height: 30, // Réduire la hauteur des jours

          border: customTheme.palette.slate[200],
          '&.Mui-selected': {
            border: 'none',
          }
        },
        // Styles pour les en-têtes de jours

        '& .MuiPickersCalendarHeader-root': {
          marginY: '0',
        },
        '&.MuiDateCalendar-root': {
          borderRadius: customTheme.shape.borderRadius,
        }
      }} />
    </LocalizationProvider>
  );
}