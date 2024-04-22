// // import React, { useCallback, useEffect, useState, } from "react";
// import { Stack } from '@mui/material';
// import { AnimatePresence, motion } from 'framer-motion';
// import customTheme from "../../../styles/customTheme.ts";
// import { useEffect, useState } from 'react';




// const AnimatedImages = ({ initialImages }) => {
//   const [images, setImages] = useState(initialImages);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newImages = shuffleArray([...images]); // Créer une copie du tableau pour le mélanger
//       setImages(newImages);
//     }, 5000); // Mélange toutes les 3 secondes

//     return () => clearInterval(interval); // Nettoyage du setInterval
//   }, [images]);

//   // Fonction pour mélanger aléatoirement le tableau
//   function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   }

//   return (
//     <Stack flex={1} flexDirection={'row'} gap={customTheme.spacing(2)} flexWrap={'wrap'} ml={6} >
//       <AnimatePresence mode='sync' initial={false}>
//         {images.map((image, index) => ( // l'index permet de faire des transitions aleatoires pour chaque image
//           <motion.img
//             loading='lazy'
//             key={`${image.id}`} // Clé unique basée sur l'id de l'image et le cycle de mise à jour
//             src={image.src}
//             alt={image.alt}
//             layout
//             transition={{ duration: 2 }}
//             style={{
//               flexGrow: 1,
//               borderRadius: customTheme.spacing(1),
//               height: 'auto',
//               objectPosition: 'center',
//               objectFit: 'cover',
//               maxHeight: 160
//             }}
//           />
//         ))}
//       </AnimatePresence>
//     </Stack>
//   );
// };

// export default AnimatedImages;