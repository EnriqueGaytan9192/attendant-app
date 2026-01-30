
// Convertir typeProduct a un nombre más amigable
export const getProductType = (typeProduct) => {
    switch (typeProduct) {
        case "0":
            return "Horas";
        case "1":
            return "Mensual";
        case "2":
            return "VIP";
        case "3":
            return "Pasadía";
        default:
            return "--";
    }
}

// Función para calcular la duración en formato "Xh Xm"
export const calculateDuration = (entry, exit) => {
    const entryDate = new Date(entry);
    const exitDate = new Date(exit);
    const diffInMs = exitDate - entryDate;
    const diffInMin = Math.floor(diffInMs / 1000 / 60);
    const hours = Math.floor(diffInMin / 60);
    const minutes = diffInMin % 60;
    return `${hours}h ${minutes}m`;
};

export const formatDate = (dateString, format) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        throw new Error("Fecha inválida");
    }

    if (format === 'fecha') {
        return date.toISOString().split('T')[0]; // YYYY-MM-DD
    } else if (format === 'hora') {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convierte 0 en 12 para el formato 12 horas

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
    } else {
        throw new Error("Formato inválido. Usa 'fecha' o 'hora'.");
    }
}


export const formatDateTime = (dateString) => {
    if (!dateString) return "Fecha no disponible";

    const [datePart, timePart] = dateString.split(" ");
    if (!datePart || !timePart) return "Fecha inválida";

    let [hours, minutes, seconds] = timePart.split(":").map(Number);

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;

    return `${datePart} ${formattedTime}`;
};



