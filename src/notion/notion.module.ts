import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Client } from '@notionhq/client';

export const NOTION_CLIENT = 'NOTION_CLIENT';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: NOTION_CLIENT,
      useFactory: (configService: ConfigService) => {
        return new Client({
          auth: configService.get<string>('NOTION_AUTH_TOKEN'),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [NOTION_CLIENT],
})
export class NotionModule {}
