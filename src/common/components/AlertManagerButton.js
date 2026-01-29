// common/components/AlertManagerButton/AlertManagerButton.js
import { useEffect, useState } from "react";
import CustomAlertButton from "./CustomAlertButton";

let alertHandler = null;

export const showAlertButton = (
    type = "warning",
    message,
    { onConfirm, onCancel } = {}
) => {
    if (alertHandler) {
        alertHandler({ type, message, onConfirm, onCancel });
    }
};

const AlertManagerButton = () => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("warning");
    const [onConfirm, setOnConfirm] = useState(null);
    const [onCancel, setOnCancel] = useState(null);

    useEffect(() => {
        alertHandler = ({ type, message, onConfirm, onCancel }) => {
            setType(type);
            setMessage(message);

            setOnConfirm(() => () => {
                onConfirm?.();
                setVisible(false);
            });

            if (onCancel) {
                setOnCancel(() => () => {
                    onCancel?.();
                    setVisible(false);
                });
            } else {
                setOnCancel(null);
            }

            setVisible(true);
        };

        return () => {
            alertHandler = null;
        };
    }, []);

    return (
        <CustomAlertButton
            visible={visible}
            type={type}
            message={message}
            onConfirm={onConfirm || (() => setVisible(false))}
            onCancel={onCancel}
            onClose={() => setVisible(false)}
        />
    );
};

export default AlertManagerButton;
