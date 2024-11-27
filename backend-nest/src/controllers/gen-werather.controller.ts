import { Controller, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { GerminiService } from '../services/germini.service';
import { GenWeatherDto } from '../dto/gen-werather.dto';
import { WeatherPresenter } from 'src/presenters/weather.presenter';

@Controller()
export class GenWeatherDtoController {
  constructor(private readonly germiniSerbice: GerminiService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getHello(@Param() params: GenWeatherDto): Promise<WeatherPresenter> {
    const { language, style, date, latitude, longitude } = params;
    const generated = await this.germiniSerbice.getWeatherArticle(language, style, date, latitude, longitude);
    return generated;
  }
}