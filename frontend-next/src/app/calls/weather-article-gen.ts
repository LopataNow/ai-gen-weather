import axios from "axios";

export interface WeatherArticel{
    headline: string;
    subtitle: string;
    body: string;
}

export function getArticle(style: string, data: Date){
    return axios.get<WeatherArticel>(process.env.SERVER_URL as string, {
        params: {
            style,
            data
        }
    });
}