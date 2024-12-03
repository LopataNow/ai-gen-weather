import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { GerminiService } from '../services/germini.service';
import { GenWeatherDto } from '../dtos/gen-weather.dto';
import { WeatherPresenter } from 'src/presenters/weather.presenter';
import { WeatherService } from 'src/services/weather.service';

function createWeatherKey({ latitude, longitude, style, date, language }) {
  return `${language}-${latitude}-${longitude}-${style}-${date}`;
}

@Controller()
export class GenWeatherDtoController {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly germiniService: GerminiService
  ) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getHello(@Query() params: GenWeatherDto): Promise<WeatherPresenter> {
    const { language = 'en', style = 'fantastic', date = new Date().toISOString().split('T')[0], latitude = 48.148, longitude = 17.1077 } = params;

    const weather = await this.weatherService.getWeather(
      createWeatherKey({ latitude, longitude, style, date, language })
    );

    if (weather) {
      return weather;
    }

    const generated = await this.germiniService.getWeatherArticle(language, style, date, latitude, longitude);

    if (!generated || 
      typeof generated?.headline !== 'string' || 
      typeof generated?.subtitle !== 'string' || 
      typeof generated?.body !== 'string'
    ) {
      throw new Error('Unknown error occurred while generating weather article.');
    }

    const response = await this.weatherService.createWeather({
      _id: createWeatherKey({ latitude, longitude, style, date, language }),
      ...generated
    });

    return response;
  }
}