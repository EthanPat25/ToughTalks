import { message } from "../components/main";

export const get_message_array = () => {
    let Conv_hist: string | null
    Conv_hist = localStorage.getItem("ConversationHistory")
    if (Conv_hist !==  null) {
        return JSON.parse(Conv_hist) as Array<message>;
    } else {
        return [] as Array<message>;
    }
}
