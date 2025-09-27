export const environment = {
  production: true,
  apiUrl: (window as any)['env']['apiUrl'] || '' // aquí inyectaremos desde Vercel
};