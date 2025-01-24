import client from '../apollo/client';
import { gql } from '@apollo/client';

const ADD_IMAGE = gql`
  mutation AddImage($path: String!, $url: String) {
    addImage(path: $path, url: $url) {
      id
      path
      url
    }
  }
`;

export class ImageDatabaseService {
  async saveImage(path: string): Promise<void> {
    try {
      const result = await client.mutate({
        mutation: ADD_IMAGE,
        variables: {
          path,
          url: null
        }
      });
      console.log('Image saved:', result);
    } catch (error) {
      console.error('Save error:', error);
      throw error;
    }
  }
}

export const imageDbService = new ImageDatabaseService();