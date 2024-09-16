import React, { useCallback, useEffect } from "react";

import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { PartyPopperIcon } from "./SvgIcons";
import { Text } from "./custom/Text";

interface Props {
  opened: boolean;
  changeOpenedState: (val: boolean) => void;
  closeAfterTimeout?: number;
  message: string;
}

export default React.memo(ContactStepDialog);

function ContactStepDialog(props: Props) {
  const { changeOpenedState, closeAfterTimeout, opened, message } = props;

  useEffect(() => {
    if (closeAfterTimeout && opened) {
      setTimeout(() => {
        changeOpenedState(false);
      }, closeAfterTimeout);
    }
  }, [closeAfterTimeout, opened]);

  const closeDialog = useCallback(() => {
    changeOpenedState(false);
  }, [changeOpenedState]);

  return (
    <Modal visible={opened} transparent onRequestClose={closeDialog}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View className="flex-col justify-center items-center px-8">
            <PartyPopperIcon width={80} height={80} />

            <Text className="text-[20px] text-gray-700 " fontWeight="500">
              تم التسجيل بالدورة بنجاح
            </Text>
          </View>

          <Text className="text-[15px] text-gray-700 my-8" fontWeight="500">
            {message}
          </Text>

          <View className="flex-row gap-2">
            <View className="flex-1">
              <TouchableOpacity
                onPress={closeDialog}
                className="bg-primary w-full rounded-lg p-2 mt-4"
              >
                <Text className="text-center  text-[15px]" fontWeight="500">
                  المتابعة
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
  },
});
