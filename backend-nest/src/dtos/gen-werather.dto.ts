import { Transform } from "class-transformer";
import { IsIn, IsNumber, IsOptional, IsString } from "class-validator";

export class GenWeatherDto {
    @IsString()
    @IsOptional()
    @Transform(({ value }) => value || 'en')
    @IsIn(['en', 'sk',])
    language?: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value || 'fantastic')
    @IsIn(['fantastic', 'tabloids'])
    style: string;

    @IsNumber()
    @IsOptional()
    latitude: number;

    @IsNumber()
    @IsOptional()
    longitude: number;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value || new Date().toISOString())
    date: string;
}