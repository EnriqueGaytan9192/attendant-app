import { useEffect, useState } from "react";
import CustomAlert from "./CustomAlert";

let addAlertHandler;

export const showAlert = (type, message, duration = 3000) => {
    if (addAlertHandler) {
        addAlertHandler({ id: Date.now(), type, message, duration });
    }
};

const AlertManager = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        addAlertHandler = (alert) => {
            setAlerts((prev) => {
                const updated = [alert, ...prev];

                if (updated.length > 5) {
                    return updated.slice(0, 5);
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

    return (
        <>
            {alerts.map((alert, index) => (
                <CustomAlert
                    key={alert.id}
                    visible={true}
                    type={alert.type}
                    message={alert.message}
                    duration={alert.duration}
                    offsetTop={35 + index * 90} 
                    onDismiss={() =>
                        setAlerts((prev) => prev.filter((a) => a.id !== alert.id))
                    }
                />
            ))}
        </>
    );
};

export default AlertManager;
