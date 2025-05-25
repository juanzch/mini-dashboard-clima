import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('weather_snapshots')
export class WeatherSnapshot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  temperature: number;

  @Column('float')
  feelsLike: number;

  @Column('int')
  humidity: number;

  @Column()
  condition: string;

  @CreateDateColumn()
  capturedAt: Date;
}
