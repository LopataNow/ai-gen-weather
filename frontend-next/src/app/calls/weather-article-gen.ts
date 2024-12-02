import axios from "axios";

export interface WeatherArticel{
    headline: string;
    subtitle: string;
    body: string;
}

export function getArticle(style: string){
    console.log(process.env.SERVE_URL);
    return axios.get<WeatherArticel>(process.env.SERVE_URL as string, {
        params: {
            style,
            data: new Date()
        }
    });
}