export type SendEmailNotificationPayload = {
    html: string;
    subject: string;
    text?: string;
    to: string;
};

export type SendWhatsappNotificationPayload = {
    message: string;
    to: string;
};
