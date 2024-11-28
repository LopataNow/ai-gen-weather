import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type WeatherDocument = Weather & Document;

@Schema()
export class Weather {
    @Prop({ type: String, default: () => new Date().toISOString() })
    _id: string;

    @Prop({ required: true })
    headline: string;

    @Prop({ required: true })
    subtitle: string;

    @Prop({ required: true })
    body: string;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);