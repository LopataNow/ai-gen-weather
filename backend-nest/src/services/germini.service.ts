import { GenerateContentResult, GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { env } from 'process';

const prompt = (style: string, language: string, weatherData: string, latitude: number, longitude: number) => 
  `Write an article about the weather in the ${style} style. In language ${language}. It must contain a headline, subtitle, and body in JSON format. Body are in one text format. Use the following data: ${JSON.stringify(weatherData)}. The location is latitude: ${latitude}, longitude: ${longitude}.`;

@Injectable()
export class GerminiService {
  async getWeatherArticle(
    language: string,
    style: string,
    date: string,
    latitude: number = 48.148,
    longitude: number = 17.1077
  ): Promise<any> {
    const weatherData = await this.getWeatherData(date, latitude, longitude);

    const genAI = new GoogleGenerativeAI(process.env.GERMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const content = await model.generateContent(prompt(style, language, JSON.stringify(weatherData), latitude, longitude));

    let retulst = content.response.candidates[0].content.parts[0].text;
    retulst = retulst.replace("```json", '').replace("```", '');

    return JSON.parse(retulst);
  }

  private async getWeatherData(date: string, latitude: number, longitude: number){
    const result = await axios.get(env.WEATHER_API_URL, {
      params: {
        latitude: latitude,
        longitude: longitude,
        'start_date': date,
        'end_date': date
      },
    });
    return result.data;
  }
}

