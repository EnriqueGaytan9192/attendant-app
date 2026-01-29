import { useEffect, useState } from "react";
import CustomAlert from "./CustomAlert";

let addAlertHandler;

export const showAlert = (type, message, duration = 3000) => {
    if (addAlertHandler) {
        addAlertHandler({
            id: `${Date.now()}-${Math.random()}`,
            type,
            message,
            duration
        });
    }
};

const AlertManager = () => {
    const [alerts, setAlerts] = useState([]);
    const [alertHeights, setAlertHeights] = useState({});

    useEffect(() => {
        addAlertHandler = (alert) => {
            setAlerts((prev) => {
                const updated = [alert, ...prev];

                if (updated.length > 3) {
                    return updated.slice(0, 3);
                }

                return updated;
            })

            setTimeout(() => {
                setAlerts((prev) => prev.filter((a) => a.id !== alert.id));
            }, alert.duration + 400);
        };

        return () => {
            addAlertHandler = null;
        };
    }, []);

    const getOffsetTop = (index) => {
        let offset = 35;

        for (let i = 0; i < index; i++) {
            offset += (alertHeights[alerts[i]?.id] || 105) + 10;
        }

        return offset;
    };


    return (
        <>
            {alerts.map((alert, index) => (
                <CustomAlert
                    key={alert.id}
                    visible
                    type={alert.type}
                    message={alert.message}
                    duration={alert.duration}
                    offsetTop={getOffsetTop(index)}
                    onHeight={(height) =>
                        setAlertHeights((prev) => ({
                            ...prev,
                            [alert.id]: height,
                        }))
                    }
                    onDismiss={() =>
                        setAlerts((prev) => prev.filter((a) => a.id !== alert.id))
                    }
                />
            ))}

        </>
    );
};

export default AlertManager;
