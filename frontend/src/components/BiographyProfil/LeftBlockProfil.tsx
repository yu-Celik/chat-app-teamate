import { Box, Stack, Typography, alpha } from "@mui/material";
import customTheme from "../../styles/customTheme.ts";
import { CardBio } from "./CardBio.tsx";
import { TopGame } from "./TopGame.tsx";
import { AnimatedTooltipPreview } from "../FriendsList/FriendsList.tsx";

export default function LeftBlockProfil() {
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
      <CardBio />
      <TopGame />
      <Stack
      className='flex gap-2 justify-between'
      >
        <Typography
        sx={{
          fontSize: '1rem',
          fontWeight: 600,
          color: customTheme.palette.slate[200],
        }}
        >
          Ami(e)s : 152
        </Typography>
        <AnimatedTooltipPreview />
      </Stack>

    </Box>
  )
}