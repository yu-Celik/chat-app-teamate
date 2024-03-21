
export const useClipboard = () => {
    const copy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error("Erreur lors de la copie du texte: ", err);
        }
    };

    return { copy };
};