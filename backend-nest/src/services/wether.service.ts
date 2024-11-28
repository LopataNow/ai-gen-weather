import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Weather } from 'src/schemas/weather.schema';

@Injectable()
export class WeatherService {
  constructor(@InjectModel(Weather.name) private weatherModel: Model<Weather>) {}
  
  async getWeather(id: string){
    return this.weatherModel.findById(id);
  }

  async createWeather(weather: Weather){
    const createdWeather = new this.weatherModel(weather);
    return createdWeather.save();
  }
}

