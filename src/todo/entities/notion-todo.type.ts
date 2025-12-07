import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export interface NotionTodoPage extends Omit<PageObjectResponse, 'properties'> {
  properties: {
    Name: {
      type: 'title';
      title: Array<{ plain_text: string }>;
      id: string;
    };
    Identity: {
      type: 'multi_select';
      multi_select: Array<{ name: string }>;
      id: string;
    };
    Status: {
      type: 'status';
      status: { name: string } | null;
      id: string;
    };
    Date: {
      type: 'date';
      date: { start: string } | null;
      id: string;
    };
    FoodiePoints: {
      type: 'number';
      number: number | null;
      id: string;
    };
    'Assigned To': {
      type: 'people';
      people: Array<{ name?: string; person: { email: string } }>;
      id: string;
    };
  };
}
