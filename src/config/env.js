// Cấu hình đọc từ biến môi trường của Vite (file .env.* ở thư mục gốc ProLaptop-client).
// - yarn dev   -> .env.development
// - yarn build -> .env.production
// - .env.local / .env.development.local để ghi đè riêng trên máy bạn (không commit)
const trimSlash = (url) => (url || '').replace(/\/+$/, '');

export const SERVER_URL = trimSlash(import.meta.env.VITE_SERVER_URL) || 'http://localhost:5003';
export const API_URL = `${SERVER_URL}/api`;
