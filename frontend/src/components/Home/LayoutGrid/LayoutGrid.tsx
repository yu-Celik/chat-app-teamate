import { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, alpha, useMediaQuery } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import customTheme from "../../../styles/customTheme.ts";

const AnimatedImages = ({ initialImages }) => {
  const [images, setImages] = useState(initialImages);
  const [cycle, setCycle] = useState(0);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setImages(currentImages => shuffleArray([...currentImages]));
      setCycle(prevCycle => prevCycle + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleTooltipClose = () => {
    setTooltipOpen(false);
    setSelected(null);
  };

  const handleTooltipOpen = (image) => {
    setSelected(image);
    setTooltipOpen(true);
  };

  const isSmUp = useMediaQuery(customTheme.breakpoints.up('sm'));
  const isMdUp = useMediaQuery(customTheme.breakpoints.up('md'));
  const isLgUp = useMediaQuery(customTheme.breakpoints.up('lg'));
  const isXlUp = useMediaQuery(customTheme.breakpoints.up('xl'));

  let heightImg = 80;
  if (isSmUp) heightImg = 100;
  if (isMdUp) heightImg = 120;
  if (isLgUp) heightImg = 140;
  if (isXlUp) heightImg = 160;

  return (
    <Stack flexDirection={'row'} flexWrap={'wrap'} gap={customTheme.spacing(2)} justifyContent={'center'} position={'relative'}>
      <AnimatePresence mode="popLayout">
        {images.map((image) => (
          <motion.img
            key={`${image.id}-${cycle}`}
            src={image.src}
            alt={image.alt}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{
              damping: 1,
            }}
            onClick={() => handleTooltipOpen(image)}
            className="cursor-pointer"
            style={{
              position: 'relative',
              borderRadius: customTheme.spacing(1),
              flexGrow: 1,
              maxHeight: heightImg,
              objectPosition: 'center',
              objectFit: 'cover',
            }}
          />
        ))}
      </AnimatePresence>
      <Dialog
        open={tooltipOpen}
        onClose={handleTooltipClose}  // Utilisation de onClose pour gérer la fermeture du dialogue
        aria-labelledby="custom-dialog-title"
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: alpha(customTheme.palette.slate[800], 0.3),
            backdropFilter: 'blur(10px)',
            color: customTheme.palette.slate[200],
          },
          '& .MuiDialogTitle-root': {
            color: customTheme.palette.slate[200],
          },
          '& .MuiDialogContent-root': {
            color: customTheme.palette.slate[200],
          },
          '& .MuiDialogContentText-root': {
            color: customTheme.palette.slate[200],
            padding: customTheme.spacing(2, 0)
          },
          '& .MuiButtonBase-root': {
            color: customTheme.palette.slate[200]
          }
        }}
      >
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <DialogTitle id="scroll-dialog-title">{selected?.alt}</DialogTitle>
            <DialogContent>
              <img src={selected?.src} alt={selected?.alt} />
              <DialogContentText
                id="scroll-dialog-description"
                tabIndex={-1}
              >
                Experience breathtaking views and relaxing sounds of the lake at this
                charming lakefront cabin.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleTooltipClose}>Close</Button>
            </DialogActions>
          </motion.div>
        )}
      </Dialog>
    </Stack>
  );
};

export default AnimatedImages;
