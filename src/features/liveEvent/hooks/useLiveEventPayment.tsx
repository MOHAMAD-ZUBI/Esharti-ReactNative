import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { API } from "../../../lib/client";
import { authRoutes } from "../../../routes";

export default function useLiveEventPayment(
  liveEvent_id: number,
  eventType: string,
  errorCallBack?: (error: any) => void
) {
  return useMutation({
    mutationFn: async () => {
      try {
        const { data } = await API.post(authRoutes.buyLiveEvent, {
          liveEvent_id,
        });
        return data.data;
      } catch (error: any) {
        throw new Error(error?.response?.data?.errors);
      }
    },
    onSuccess: (data) => {
      router.push({
        pathname: "/payment",
        params: {
          paymentUri: data?.responseResult?.payment_url,
          navigatedFrom: "liveEvent",
          id: liveEvent_id,
          eventType: eventType,
        },
      });
    },
    onError: (error) => {
      if (errorCallBack) {
        errorCallBack(error);
      }
    },
  });
}
