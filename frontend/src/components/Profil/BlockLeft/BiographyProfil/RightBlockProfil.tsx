import { Stack, alpha } from "@mui/material";
import customTheme from "../../../../styles/customTheme.ts";
import PlateformConnaxion from "../../../PlateformConnexion/PlateformConnaxion.tsx";
import BasicDateCalendar from './../../BlockRight/Calendar/Calendar.tsx';
import Activity from './../../BlockRight/Activity/Activity.tsx';

export default function RightBlockProfil() {
  return (
    <Stack
      component={'article'}
      // minHeight='560px'
      minWidth='320px'
      marginTop={2}
      borderRadius={1}
      flexGrow={0}
      flexShrink={1}
      flexBasis={'auto'}
      display="flex"
      flexDirection="column"
      gap={2}
      padding={2}
      sx={{
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        backgroundColor: alpha(customTheme.palette.slate[200], 0.1),
      }}
    >
      <BasicDateCalendar />
      <Activity />
      <PlateformConnaxion />

    </Stack>
  )
}