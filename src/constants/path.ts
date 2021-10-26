const PATH = {
  HOME: '/',
  POST: (title: string) => `/post/${title.trim().replace(/\s+/g, '-')}`,
} as const;

export default PATH;
