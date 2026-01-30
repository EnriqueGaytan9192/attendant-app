import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { View, StyleSheet } from "react-native";
import SignatureScreen from "react-native-signature-canvas";
import { useDispatch } from "react-redux";
import { setFirmaSignature } from "../../../../../state/slices/movementsSlice";

const ElectronicSignature = forwardRef((props ,ref) => {

  const dispatch = useDispatch();
  const { onOK } = props;
  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature) => {
    const base64String = signature.split(",")[1];
    dispatch(setFirmaSignature(base64String));
    if (onOK) onOK(base64String); // Callback from Component props
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log("Empty");
  };

  // Called after end of stroke
  const handleEnd = () => {
    ref.current.readSignature();
  };

  // Called after ref.current.getData()
  const handleData = (data) => {
    console.log(" Me llame ",data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.signatureBox}>
        <SignatureScreen
          ref={ref}
          onEnd={handleEnd}
          onOK={handleOK}
          onEmpty={handleEmpty}
          onGetData={handleData}
          descriptionText={""}
          webStyle={`
            .m-signature-pad {
              box-shadow: none; border: none;
            }
            .m-signature-pad--footer {display: none;}
          `}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
  },
  signatureBox: {
    width: "100%",
    height: 150,
    borderWidth: 1,
    borderColor: "#00788D",
    borderRadius: 10,
    backgroundColor: "#FFF",
    overflow: "hidden",
  },
});

export default ElectronicSignature;
