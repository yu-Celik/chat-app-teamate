import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function formatLastLogin(lastLogin: string): string {
    const date = parseISO(lastLogin);
    if (isToday(date)) {
        return `aujourd'hui à ${format(date, 'HH:mm', { locale: fr })}`;
    } else if (isYesterday(date)) {
        return `hier à ${format(date, 'HH:mm', { locale: fr })}`;
    } else {
        return format(date, "d MMM yyyy 'à' HH:mm", { locale: fr });
    }
}

export const formatDateMessage = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) {
        return format(date, "HH:mm", { locale: fr });
    } else if (isYesterday(date)) {
        return 'Hier';
    } else {
        return format(date, 'd MMMM yyyy', { locale: fr });
    }
};