import { gql } from "apollo-angular";

export const GET_MEDIA = gql`
query ($page: Int, $perPage: Int, $statusIn: [MediaStatus], $search: String, $format: MediaFormat) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
      lastPage
      hasNextPage
      currentPage
    }
    media(status_in: $statusIn, search: $search, format: $format) {
      title {
        english
        romaji
      }
      status
      coverImage {
        large
      }
      format
      id
    }
  }
}`;

export const GET_MEDIA_BY_ID = gql`
query($mediaId: Int)  {
  Media(id: $mediaId) {
    id
    title {
      romaji
      english
    }
    format
    status
    coverImage {
      extraLarge
    }
    averageScore
    genres
    description
  }
}`;