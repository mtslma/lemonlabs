type InlineNoticeProps = {
    message: string;
    tone?: "error" | "info" | "success";
};

const toneClasses = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    error: "border-red-200 bg-red-50 text-red-800",
    info: "border-yellow-200 bg-yellow-50 text-yellow-800",
};

export default function InlineNotice({ message, tone = "info" }: InlineNoticeProps) {
    return <p className={`rounded-2xl border px-4 py-3 text-sm font-medium ${toneClasses[tone]}`}>{message}</p>;
}
