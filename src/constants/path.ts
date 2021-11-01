const PATH = {
  HOME: '/',
  ABOUT: '/about',
  POST: (title: string) => `/posts/${title.trim().replace(/\s+/g, '-')}`,
} as const;

export default PATH;
