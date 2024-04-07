import { Button, Stack, Typography, alpha, styled } from '@mui/material';
import ImageAvatars from '../ImageAvatars/ImageAvatars.tsx';
import { StyledBadge } from './../BadgeRipple/BadgeRipple.tsx';
import { users } from './../../data/userData.ts';
import customTheme from '../../styles/customTheme';
import { ColorPicker } from '../ColorPicker/ColorPicker.tsx';
import React from 'react';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import { StyledIconButton } from '../IconButton/IconButton.tsx';

export default function HeaderProfil() {

   const [modification, setModification] = React.useState(false)
   const isOnline = users[0].isOnline;

   const VisuallyHiddenInput = styled('input')({
      display: 'none',

   });

   return (
      <Stack
         sx={{
            width: '100%',
            position: 'static',
         }} >
         <Stack
            component={'article'}
            flexDirection={'row'}
            flexWrap={'wrap'}
            sx={{
               display: modification ? 'flex' : 'none',
            }}
         >
            <ColorPicker element={'Bordures'} />
            <ColorPicker element={'Textes'} />
            <ColorPicker element={'Ombres'} />
            <ColorPicker element={'Arrière-plans'} />
         </Stack>
         <Stack
            sx={{
               backgroundColor: alpha(customTheme.palette.slate[800], 0.1),
               padding: customTheme.spacing(1),
               display: 'flex',
               flexDirection: 'row',
               justifyContent: 'space-between',
               alignItems: 'center',
               boxShadow: customTheme.shadows[1],
            }}
         >
            <Stack
               sx={{
                  flexDirection: 'row',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',

               }}
            >
               <Stack
                  sx={{
                     position: 'relative',
                     width: 64,
                     height: 64,
                     '&:hover': {
                        '& img': {
                           filter: { md: 'blur(1px)' },
                        },
                     },
                  }}
               >
                  <ImageAvatars
                     username={users[0].username}
                     profilePic={users[0].profilePic}
                     sx={{
                        width: 58,
                        height: 58,
                     }}
                  />
                  <Button
                     component="label"
                     role={undefined}
                     variant="contained"
                     tabIndex={-1}
                     sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        padding: 1,
                        fontSize: '0.7rem',

                        '&.MuiButtonBase-root': {
                           backgroundColor: 'transparent',
                           border: 'none',
                           boxShadow: 'none',
                           borderRadius: '9999px',
                           height: 64,
                           oppacity: 0,
                           color: 'transparent',

                           '&.MuiButtonBase-root:hover': {
                              oppacity: { md: '1' },
                              backgroundColor: { md: customTheme.palette.bluePV.main },
                              color: { md: customTheme.palette.slate[100] },
                           }
                        },
                     }}
                  >
                     Modifier
                     <VisuallyHiddenInput type="file" />
                  </Button>
               </Stack>

               <Stack>
                  <Typography
                     color={customTheme.palette.slate[200]}
                     variant="body1"
                  >
                     {users[0].username}
                  </Typography>
                  {isOnline ? (
                     <Stack>
                        <Typography
                           component="span"
                           variant="body2"
                           color={customTheme.palette.slate[200]}
                        >
                           En ligne
                           <StyledBadge
                              overlap="circular"
                              variant="dot"
                              isOnline={isOnline}
                              sx={{ ml: 1, mb: 1 }}
                           />
                        </Typography>
                     </Stack>
                  ) : (
                     <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color={customTheme.palette.slate[200]}
                     >
                        Déconnecté
                     </Typography>
                  )}
               </Stack>
            </Stack>
            <Stack>

               {!modification ? (
                  <Stack direction={'row'} alignItems={'center'} >
                     <StyledIconButton title="Ajout d'image" >
                        <AddPhotoAlternateRoundedIcon
                           sx={{
                              color: customTheme.palette.slate[200],
                              '&:hover': {
                                 cursor: 'pointer',
                              },
                           }}
                        />
                        <VisuallyHiddenInput type="file" />
                     </StyledIconButton>
                     <StyledIconButton title="Modifier le profil"
                        sx={{
                           padding: 1,
                           backgroundColor: 'transparent',
                           fontSize: '1rem',
                           '&.MuiButtonBase-root': {
                              backgroundColor: 'transparent',
                              border: 'none',
                              boxShadow: 'none',
                              color: customTheme.palette.slate[200],
                           },
                        }}
                        onClick={() => setModification(!modification)}
                     >
                        Modifier
                     </StyledIconButton>
                  </Stack>
               ) :
                  <Stack
                     direction={'row'}
                  >
                     <StyledIconButton title='Annuler les modifications'
                        sx={{
                           marginRight: 2,
                           padding: 1,
                           backgroundColor: 'transparent',
                           fontSize: '1rem',

                           '&.MuiButtonBase-root': {
                              backgroundColor: 'transparent',
                              border: 'none',
                              boxShadow: 'none',
                              color: customTheme.palette.slate[200],
                           },
                        }}
                        onClick={() => setModification(!modification)}
                     >
                        Annuler
                     </StyledIconButton>
                     <StyledIconButton title='Enregistrer les modifications'
                        sx={{
                           marginRight: 2,
                           padding: 1,
                           backgroundColor: 'transparent',
                           '&.MuiButtonBase-root': {
                              backgroundColor: 'transparent',
                              fontSize: '1rem',

                              border: 'none',
                              boxShadow: 'none',
                              color: customTheme.palette.slate[200],
                           },
                        }}
                        onClick={() => setModification(!modification)}
                     >
                        Enregistrer
                     </StyledIconButton>
                  </Stack>
               }
            </Stack>
         </Stack>
      </Stack >
   )
}
