import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { GerminiService } from '../services/germini.service';
import { GenWeatherDto } from '../dtos/gen-werather.dto';
import { WeatherPresenter } from 'src/presenters/weather.presenter';
import { WeatherService } from 'src/services/wether.service';

function createWeatherKey({ latitude, longitude, style, date, language }) {
  return `${language}-${latitude}-${longitude}-${style}-${date}`;
}

@Controller()
export class GenWeatherDtoController {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly germiniSerbice: GerminiService
  ) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getHello(@Query() params: GenWeatherDto): Promise<WeatherPresenter> {
    const { language = 'en', style = 'fantastic', date = new Date().toISOString().split('T')[0], latitude = 48.148, longitude = 17.1077 } = params;
console.log(style);
    const weather = await this.weatherService.getWeather(
      createWeatherKey({ latitude, longitude, style,  date, language })
    );

    if (weather) {
      return weather;
    }

    const generated = await this.germiniSerbice.getWeatherArticle(language, style, date, latitude, longitude);

    await this.weatherService.createWeather({
      _id: createWeatherKey({ latitude, longitude, style, date, language }),
      ...generated
    });

    return generated;
  }
}