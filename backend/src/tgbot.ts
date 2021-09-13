import * as TelegramBot from 'node-telegram-bot-api'
// Сделать константу и вынести ее для Токена бота и айди чата
const TG_BOT_TOKEN = '1936506290:AAFtWaPgXfVYc_hCS4du3R2mfrMVKUXfbJo'
export const CHAT_ID = '-557475479'
export const tgBot = new TelegramBot(TG_BOT_TOKEN, { polling: true })