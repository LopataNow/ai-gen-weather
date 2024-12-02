import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

const prompt = (style: string, language: string, weatherData: string, city: string) => 
  `Write an article about the weather in the ${style} style. In language ${language}. It must contain a headline, subtitle, and body in JSON format. Body are in one text format. Use the following data: ${JSON.stringify(weatherData)}. The location in city ${city}.`;

@Injectable()
export class GerminiService {
  async getWeatherArticle(
    language: string,
    style: string,
    date: string,
    latitude: number,
    longitude: number
  ): Promise<any> {
    const weatherData = await this.getWeatherData(date, latitude, longitude);

    const genAI = new GoogleGenerativeAI(process.env.GERMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const content = await model.generateContent(prompt(style, language, JSON.stringify(weatherData), this.getCityByCoordinates(latitude, longitude)));

    let result = content.response.candidates[0].content.parts[0].text;
    result = result.replace("```json", '').replace("```", '');

    return JSON.parse(result);
  }

  private async getWeatherData(date: string, latitude: number, longitude: number){
    const result = await axios.get(process.env.WEATHER_API_URL, {
      params: {
        latitude: latitude,
        longitude: longitude,
        'start_date': date,
        'end_date': date
      },
    });
    return result.data;
  }

  private getCityByCoordinates(latitude: number, longitude: number): string {
    // TOTO: Implement reverse geocoding
    return 'Bratislava';
  }
}

