import { Button, Stack, Typography, alpha, styled } from '@mui/material';
import ImageAvatars from '../ImageAvatars/ImageAvatars.tsx';
import customTheme from '../../styles/customTheme';
import { ColorPicker } from '../ColorPicker/ColorPicker.tsx';
import React, { useCallback } from 'react';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import { StyledIconButton } from '../IconButton/IconButton.tsx';
import useAuth from '../../contexts/AuthContext/useAuthContext.ts';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useState } from 'react';
import { Input } from '@mui/material';

export default function HeaderProfil() {
   const { currentUser } = useAuth();
   const [isEditing, setIsEditing] = useState(false);
   const [username, setUsername] = useState(currentUser.data?.username || '');

   const handleIconClick = useCallback(() => {
      setIsEditing(true);
   }, []);

   const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
  }, []);

   const handleInputBlur = useCallback(() => {
      setIsEditing(false);
      // Ici, vous pouvez également ajouter du code pour mettre à jour le nom d'utilisateur dans votre base de données
   }, []);

   const [modification, setModification] = React.useState(false)
   const isOnline = currentUser.data?.lastLogout || false;

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
                  <Stack direction={'row'}>
                     {isEditing ? (
                        <Input
                        value={username}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyDown={(event) => {
                           if (event.key === 'Enter') {
                              handleInputBlur();
                           }
                        }}
                        autoFocus
                        sx={{
                           color: customTheme.palette.slate[200],
                           fontSize: '1rem',
                           '&:focus': {
                              color: customTheme.palette.slate[200],
                           },
                           '&::after': {
                              borderBottom: `1px solid ${customTheme.palette.orangePV.dark}`,
                           },
                        }}
                     />
                     ) : (
                        <Typography
                           color={customTheme.palette.slate[200]}
                           variant="body1"
                        >
                           {username}
                        </Typography>
                     )}
                     <EditRoundedIcon
                        onClick={handleIconClick}
                        sx={{
                           marginLeft: 1,
                           fontSize: '0.8rem',
                           color: customTheme.palette.slate[200],
                           '&:hover': {
                              cursor: 'pointer',
                           },
                        }}
                     />
                  </Stack>


                  {isOnline ? (
                     <Stack>
                        <Typography
                           component="span"
                           variant="body2"
                           color={customTheme.palette.slate[200]}
                        >
                           En ligne
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
