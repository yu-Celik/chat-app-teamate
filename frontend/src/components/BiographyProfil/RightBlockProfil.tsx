import { Box, alpha } from "@mui/material";
import customTheme from "../../styles/customTheme.ts";
import BasicDateCalendar from "../Calendar/Calendar.tsx";
import Activity from "../Activity/Activity.tsx";
import { AnimatedTooltipPreview } from "../FriendsList/FriendsList.tsx";

export default function RightBlockProfil() {
  return (
    <Box
      component={'article'}
      // minHeight='100%'
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
        backgroundColor: alpha(customTheme.palette.slate[200], 0.1),
      }}
    >
      <BasicDateCalendar />
      <Activity />

    </Box>
  )
}