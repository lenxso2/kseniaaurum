/**
 * КОНТАКТЫ И НАСТРОЙКИ САЙТА
 * Чтобы изменить ссылку, просто замените текст в кавычках и сохраните файл.
 * Например: telegram: 'https://t.me/ваш_ник'
 * heroVideo — путь к видео для первого экрана (например '/video/hero.mp4'
 * в папке public). Оставьте null, чтобы показывать только фото.
 */

export const siteConfig = {
  name: 'Ксения Аурум',
  url: 'https://kseniaaurum.com',
  location: 'Бали',

  links: {
    telegram: 'https://t.me/kseniaaurum',
    whatsapp: 'https://wa.me/6280000000000',
    instagram: 'https://www.instagram.com/ksenia__aurum',
  },

  hero: {
    video: null as string | null,
    poster: '/images/hero.png',
  },
}

export const contactLinks = [
  { label: 'Telegram', href: siteConfig.links.telegram },
  { label: 'WhatsApp', href: siteConfig.links.whatsapp },
  { label: 'Instagram', href: siteConfig.links.instagram },
]
