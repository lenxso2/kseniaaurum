import * as contentRu from './content'
import * as contentEn from './content-en'

export type Lang = 'ru' | 'en'

export function getContent(lang: Lang = 'ru') {
  return lang === 'en' ? contentEn : contentRu
}
