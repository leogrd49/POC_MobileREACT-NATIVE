import { gql } from '@apollo/client';

export const SYNC_IMAGE = gql`
  mutation SyncImage($path: String!) {
    syncImage(path: $path) {
      id
      path
    }
  }
`;