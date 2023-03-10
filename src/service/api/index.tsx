import axios from "axios";
import {NLP_METHOD, NLP_URL} from "@/constant";

export async function getData(
    params: {
        searchContent: string;
        type?: string;
    },
    options?: { [key: string]: any },
) {
    return axios(NLP_URL, {
        method: NLP_METHOD,
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
