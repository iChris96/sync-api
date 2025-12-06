import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, PageObjectResponse } from '@notionhq/client';
import { Todo } from './entities/todo.entity';
import { NOTION_CLIENT } from '../notion/notion.module';
import { formatDate, getTodayDateString } from '../common/utils/date.util';
import { NotionTodoPage } from './entities/notion-todo.type';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  private databaseId: string;

  constructor(
    private configService: ConfigService,
    @Inject(NOTION_CLIENT) private readonly notion: Client,
  ) {
    const databaseId = this.configService.get<string>('NOTION_DATABASE_ID');
    if (!databaseId) {
      throw new Error('NOTION_DATABASE_ID is not defined');
    }
    this.databaseId = databaseId;
  }

  private mapPageToTodo(page: NotionTodoPage): Todo {
    const props = page.properties;
    return {
      id: page.id,
      name: props.Name.title[0].plain_text,
      identity: props.Identity.multi_select[0].name,
      status: props.Status.status?.name || '',
      date: formatDate(props.Date.date?.start || ''),
      foodiePoints: props.FoodiePoints.number || 0,
      assignedTo: props['Assigned To'].people
        .map((person) => person.name)
        .join(', '),
    };
  }

  async findAll(dateFilter?: string): Promise<Todo[]> {
    const targetDate = dateFilter || getTodayDateString();

    const response = await this.notion.dataSources.query({
      data_source_id: this.databaseId,
      filter: {
        property: TODO_PROPERTIES.DATE,
        date: {
          equals: targetDate,
        },
      },
      sorts: [
        {
          property: TODO_PROPERTIES.STATUS,
          direction: 'ascending',
        },
      ],
    });

    return response.results.map((page) =>
      this.mapPageToTodo(page as NotionTodoPage),
    );
  }

  async findOne(id: string): Promise<Todo> {
    const response = await this.notion.pages.retrieve({
      page_id: id,
    });
    return this.mapPageToTodo(response as NotionTodoPage);
  }

  async update(id: string, updates: UpdateTodoDto): Promise<Todo> {
    const properties: Record<string, any> = {};

    if (updates.name) {
      properties[TODO_PROPERTIES.NAME] = {
        title: [
          {
            text: {
              content: updates.name,
            },
          },
        ],
      };
    }

    if (updates.date) {
      properties[TODO_PROPERTIES.DATE] = {
        date: {
          start: updates.date,
        },
      };
    }

    if (updates.status) {
      properties[TODO_PROPERTIES.STATUS] = {
        status: {
          name: updates.status,
        },
      };
    }

    if (updates.foodiePoints !== undefined) {
      properties[TODO_PROPERTIES.FOODIE_POINTS] = {
        number: Number(updates.foodiePoints),
      };
    }

    const response = await this.notion.pages.update({
      page_id: id,
      properties: properties,
    });

    return this.mapPageToTodo(response as unknown as NotionTodoPage);
  }
}

const TODO_PROPERTIES = {
  DATE: 'Date',
  NAME: 'Name',
  IDENTITY: 'Identity',
  STATUS: 'Status',
  FOODIE_POINTS: 'FoodiePoints',
  ASSIGNED_TO: 'Assigned To',
} as const;
