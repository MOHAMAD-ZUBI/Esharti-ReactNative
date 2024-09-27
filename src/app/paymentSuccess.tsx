import { AntDesign } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import Container from "../components/Container";
import { Text } from "../components/custom/Text";
import { View } from "../components/custom/View";

import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import ContactStepDialog from "../components/ContactStepDialog";
import { useSettingsList } from "../features/account";

export type SearchParamsProps = {
  navigateTo: string;
  paymentType:
    | "course"
    | "plans"
    | "liveEvent"
    | "Dictionaries"
    | "freeDictionaries"
    | "freeLiveEvent";
  eventType: "essentials" | "advanced" | "null";
  liveEventId: string;
};

export default function paymentSuccess() {
  const animation = useRef(null);
  const { paymentType, eventType } = useLocalSearchParams<SearchParamsProps>();


  const showDialogPaymentTypes = ["liveEvent", "freeLiveEvent"];

  const showDialog =
    showDialogPaymentTypes.includes(paymentType) && eventType !== "null";

  const [showContactDialog, setShowContactDialog] =
    useState<boolean>(showDialog);

  const { data: settings } = useSettingsList();

  useEffect(() => {
    //@ts-ignore
    Platform.OS === "ios" && animation.current?.play();
  }, []);

  const message = settings?.find(
    (item) => item.key === eventType + "_respon"
  )?.value;

  return (
    <Container
      showBottomTabs={false}
      topSafeAreaViewColor="#F5F5F5"
      bottomSafeAreaViewColor="#F5F5F5"
    >
      <View className="flex-1 justify-center items-center">
        {Platform.OS === "ios" && (
          <LottieView
            autoPlay
            ref={animation}
            source={require("../assets/lottieFireworks.json")}
          />
        )}
        <View className=" bg-primary my-3 rounded-full w-20 h-20 justify-center items-center">
          <AntDesign name="check" size={35} color="white" />
        </View>
        {paymentType === "freeDictionaries" ||
        paymentType === "freeLiveEvent" ? (
          <Text className="text-lg">لقد أتممت الاشتراك!</Text>
        ) : (
          <Text className="text-lg">لقد أتممت الدفع!</Text>
        )}

        <Text className="text-sm text-gray-500 mt-2" fontWeight="400">
          {paymentType === "course" &&
            "مبروك لقد أتممت عملية شراء الدورة بنجاح!"}
          {paymentType === "Dictionaries" &&
            "مبروك لقد أتممت عملية شراء القاموس بنجاح!"}
          {paymentType === "liveEvent" &&
            "مبروك لقد أتممت عملية شراء الدورة بنجاح!"}
          {paymentType === "plans" &&
            "مبروك لقد أتممت عملية شراء باقة الدعم الفني بنجاح!"}
          {paymentType === "freeDictionaries" &&
            "مبروك لقد تم الاشتراك في القاموس المجاني بنجاح!"}
          {paymentType === "freeLiveEvent" &&
            "مبروك لقد تم الاشتراك في الدورة المجانية بنجاح"}
        </Text>
        <TouchableOpacity
          onPress={() => router.replace("/")}
          className="bg-primary rounded-3xl px-6 py-2 mt-8"
        >
          <Text className="text-white text-md">متابعة</Text>
        </TouchableOpacity>

        {showContactDialog && (
          <ContactStepDialog
            opened={showContactDialog}
            changeOpenedState={setShowContactDialog}
            message={message || ""}
          />
        )}
      </View>
    </Container>
  );
}
