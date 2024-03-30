import { AnimatePresence, motion } from 'framer-motion';


export const generateIconAnimation = (key: string, icon: React.ReactNode) => (
    <AnimatePresence mode="wait">
        <motion.span
            key={key}
            initial={{ rotate: 180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 180, scale: 0 }}
            transition={{
                type: "tween",
                stiffness: 260,
                damping: 20
            }}
        >
            {icon}
        </motion.span>
    </AnimatePresence>
);
