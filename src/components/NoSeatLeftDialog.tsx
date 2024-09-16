import React, { useCallback, useEffect } from "react";

import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { Wrong } from "../components/SvgIcons";
import { Text } from "./custom/Text";

interface Props {
  opened: boolean;
  changeOpenedState: (val: boolean) => void;
  closeAfterTimeout?: number;
}

export default React.memo(NoSeatLeftDialog);

function NoSeatLeftDialog(props: Props) {
  const { changeOpenedState, closeAfterTimeout, opened } = props;

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
            <Wrong width={80} height={80} />

            <Text className="text-[20px] text-gray-700" fontWeight="500">
              عذراً، لا يوجد مقعد متاح
            </Text>
          </View>

          <Text
            className="text-[15px] text-gray-700 mt-2 text-center"
            fontWeight="500"
          >
            فضلًا فعل الاشعارات للدورات القادمة قريبًا
          </Text>

          <View className="flex-row gap-2">
            <View className="flex-1">
              <TouchableOpacity
                onPress={closeDialog}
                className="bg-primary w-full rounded-lg p-2 mt-4"
              >
                <Text className="text-center  text-[15px]" fontWeight="500">
                  العودة
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
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  content: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
  },
});
