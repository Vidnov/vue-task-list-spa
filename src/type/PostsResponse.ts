export interface PostsResponse {
  posts: Post[]; // Массив постов
}

export interface Post {
  id: string; // Идентификатор поста
  name: string; // Название или содержание поста
}
