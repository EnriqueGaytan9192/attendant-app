import { useEffect, useState } from "react";
import CustomAlert from "./CustomAlert";

let addAlertHandler;
let removeAlertsHandler;

export const showAlert = (type, message, duration = 3000, options = {}) => {
    if (addAlertHandler) {
        addAlertHandler({
            id: `${Date.now()}-${Math.random()}`,
            type,
            message,
            duration,
            persistent: options.persistent || false,
            onClose: options.onClose || null,
        });
    }
};

export const clearPersistentAlerts = () => {
    if (removeAlertsHandler) {
        removeAlertsHandler();
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

            if (!alert.persistent) {
                setTimeout(() => {
                    setAlerts((prev) => prev.filter((a) => a.id !== alert.id));
                }, alert.duration + 400);
            }
        };

        removeAlertsHandler = () => {
            setAlerts((prev) =>
                prev.filter((a) => !a.persistent)
            );
        };

        return () => {
            addAlertHandler = null;
            removeAlertsHandler = null;
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
                    persistent={alert.persistent}
                    offsetTop={getOffsetTop(index)}
                    onHeight={(height) =>
                        setAlertHeights((prev) => ({
                            ...prev,
                            [alert.id]: height,
                        }))
                    }
                    onDismiss={() => {
                        alert.onClose?.();

                        setAlerts((prev) => prev.filter((a) => a.id !== alert.id))
                    }}
                />
            ))}

        </>
    );
};

export default AlertManager;
