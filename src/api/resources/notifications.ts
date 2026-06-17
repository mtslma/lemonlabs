import { apiRequestData } from "../core/client";
import type { SendEmailNotificationPayload, SendWhatsappNotificationPayload } from "../types/notifications";

export async function sendEmailNotification(token: string, payload: SendEmailNotificationPayload) {
    return apiRequestData<unknown>("/notifications/email", {
        method: "POST",
        token,
        body: payload,
    });
}

export async function sendWhatsappNotification(token: string, payload: SendWhatsappNotificationPayload) {
    return apiRequestData<unknown>("/notifications/whatsapp", {
        method: "POST",
        token,
        body: payload,
    });
}
