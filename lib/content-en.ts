/**
 * ENGLISH VERSION CONTENT
 * All texts for the English version of the site.
 */

export type Block = string | { list: string[] }

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Practices', href: '#directions' },
  { label: 'Formats', href: '#formats' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export const ui = {
  wordmark: 'KSENIA AURUM',
  menu: 'Menu',
  close: 'Close',
  book: 'Book a Session',
  writeKsenia: 'Contact Ksenia',
  swipeHint: 'Swipe',
}

export const hero = {
  title: 'KSENIA AURUM',
  tagline: 'BODY • ART • SENSUALITY • CONSCIOUSNESS',
  lead: 'Your body knows the way.',
  text: 'Allow yourself to feel. To desire. To enjoy. To be. To express.',
  primaryCta: { label: 'LEARN MORE', href: '#about' },
  secondaryCta: { label: 'EXPLORE PRACTICES', href: '#directions' },
  imageAlt: 'Ksenia Aurum dancing in a green dress in a field under evening sky',
}

export const manifesto = {
  lines: [
    'I create spaces for deep connection with yourself — with your body, desires, sensuality, and creative nature.',
  ],
  verbs: ['To feel more.', 'To desire freely.', 'To enjoy deeply.', 'To live your nature fully.'],
  closing: ['Not to become someone else.', 'But to reveal what is already inside —', 'your Truth.'],
}

export const about = {
  label: '02 — ABOUT',
  headline: 'I AM KSENIA AURUM',
  subheadline: 'Guide of somatic and creative practices, researcher of sensuality and human potential.',
  intro: 'Ksenia Aurum',
  paragraphs: [
    'For over 8 years, I have been exploring the body, consciousness, and creativity through dance, tantra, art, meditation, and various spiritual traditions.',
    'I hold a degree in arts and design and have extensive experience facilitating individual practices, workshops, cacao ceremonies, and retreats.',
    'In my work, I integrate different approaches, creating space for deeper self-connection, sensuality awakening, inner freedom, and creative expression.',
  ],
  closing: '',
  portrait: { src: '/images/portrait.webp', alt: 'Portrait of Ksenia Aurum in soft warm light' },
  detail: { src: '/images/art.webp', alt: "Ksenia's hand with brush over round canvas with portrait" },
}

export const philosophy = {
  label: '03 — MY PHILOSOPHY',
  headline: 'WHOLENESS INSTEAD OF TEMPLATES.',
  intro: [
    'I see a person as a unified living system, where body, mind, sensuality, creativity, and spirit interact and reveal each other.',
    'My path is deep exploration of the human through:',
  ],
  keywords: ['body', 'movement', 'sensuality', 'creativity', 'consciousness', 'sound', 'spiritual practices'],
  paragraphs: [
    'I believe in the knowledge that lives within and reveals itself through the body, sensations, awareness, and creative impulse.',
    'Sometimes one precise tool opens the path. Sometimes an entire system emerges.',
    'I sense the person and create space where their power, essence, and inner knowledge become manifest.',
  ],
  highlight: 'Sometimes one precise tool opens the path. Sometimes an entire system emerges.',
}

export type Direction = {
  id: string
  label: string
  title: string
  body: Block[]
  cta?: string
}

export const directions = {
  label: '04 — MY PRACTICES',
  heading: 'My Practices',
  defaultCta: 'Contact Ksenia',
  items: [
    {
      id: 'art-therapy',
      label: 'ART',
      title: 'Art Therapy',
      body: [
        'Working with inner states through creativity and visual expression.',
        'Explore emotions, desires, inner states, and what is difficult to express in words.',
      ],
      cta: 'LEARN MORE',
    },
    {
      id: 'dance-movement',
      label: 'BODY',
      title: 'Dance Movement Therapy',
      body: [
        'Individual and group sessions.',
        'Free intuitive dance • somatic intelligence • movement • body sensing',
        'Returning from the head to the body, feeling your inner impulse, and allowing yourself to move more freely.',
      ],
      cta: 'BOOK A SESSION',
    },
    {
      id: 'sound-healing',
      label: 'SOUND',
      title: 'Sound Healing',
      body: [
        'Sound as a tool for relaxation, immersion into state, and somatic experience.',
      ],
    },
    {
      id: 'rape',
      label: 'RITUAL',
      title: 'Rapé Ceremony',
      body: [
        'Sacred Amazonian medicine. A space for grounding, clarity, and connection.',
      ],
    },
    {
      id: 'tantra-session',
      label: 'TANTRA',
      title: 'Tantra Healing Session',
      body: [
        'Working with embodiment, attention, presence, sensitivity, contact, and trust.',
        'Format, boundaries, and content are discussed in advance for each session.',
      ],
      cta: 'LEARN ABOUT TANTRA',
    },
    {
      id: 'tantra-training',
      label: 'TANTRA',
      title: 'Tantra Massage & Tantra Practices Training',
      body: [
        'Training for couples in tantra massage and tantric practices.',
        'Learn to create sacred space, deepen connection, and explore conscious touch.',
      ],
      cta: 'INQUIRE ABOUT TRAINING',
    },
    {
      id: 'tea',
      label: 'RITUAL',
      title: 'Tea Ceremony',
      body: [
        'Space for slowness, presence, and self-connection through tea, attention, and ritual.',
      ],
    },
    {
      id: 'cacao',
      label: 'CACAO',
      title: 'Cacao Ceremony',
      body: [
        'Creating space for slowness, presence, and self-connection through cacao, attention, body, and ritual.',
      ],
    },
  ] satisfies Direction[],
}

export const formats = {
  label: '05 — FORMATS',
  heading: 'Formats',
  online: {
    title: 'ONLINE',
    items: ['Art Therapy', 'Consultations'],
  },
  offline: {
    title: 'OFFLINE',
    items: [
      'Tantra',
      'Dance Movement Therapy',
      'Art Therapy',
      'Sound Healing',
      'Cacao Ceremonies',
      'Tea Ceremonies',
      'Rapé Ceremonies',
      'Tantra Massage Training',
    ],
  },
}

export const galleryCategories = ['ALL', 'ME', 'BODY', 'ART', 'DANCE', 'RITUAL', 'NATURE', 'BALI'] as const
export type GalleryCategory = (typeof galleryCategories)[number]

export type GalleryItem = {
  type: 'image' | 'video'
  src: string
  poster?: string
  alt: string
  categories: GalleryCategory[]
  aspect: 'portrait' | 'tall' | 'square' | 'landscape'
}

export const gallery = {
  label: '06 — GALLERY',
  heading: 'Gallery',
  allLabel: 'ALL',
  items: [
    { type: 'image', src: '/images/hero.webp', alt: 'Dancing in a green field under evening sky', categories: ['ME', 'DANCE', 'NATURE'], aspect: 'tall' },
    { type: 'image', src: '/images/body.webp', alt: 'Ksenia embracing herself in garden shadows', categories: ['BODY', 'ME'], aspect: 'portrait' },
    { type: 'image', src: '/images/art.webp', alt: 'Hand with brush over round canvas', categories: ['ART'], aspect: 'square' },
    { type: 'image', src: '/images/ritual.webp', alt: 'Cacao ceremony: cacao bowls, candles and drum', categories: ['RITUAL'], aspect: 'landscape' },
    { type: 'image', src: '/images/prayer.webp', alt: 'Ksenia with prayer hands against Tibetan flags', categories: ['ME'], aspect: 'portrait' },
    { type: 'image', src: '/images/dance.webp', alt: 'Free dance under warm lights', categories: ['DANCE', 'BODY'], aspect: 'portrait' },
    { type: 'image', src: '/images/portrait.webp', alt: 'Portrait of Ksenia in warm light', categories: ['ME'], aspect: 'portrait' },
    { type: 'image', src: '/images/nature.webp', alt: 'Banana leaves and rice fields after rain', categories: ['NATURE', 'BALI'], aspect: 'tall' },
    { type: 'image', src: '/images/place-bali.webp', alt: 'Rice terraces and Bali jungle', categories: ['BALI', 'NATURE'], aspect: 'portrait' },
    { type: 'image', src: '/images/final.webp', alt: 'Sunset over ocean, silhouette on sand', categories: ['BALI', 'NATURE', 'ME'], aspect: 'landscape' },
    { type: 'image', src: '/images/artist.webp', alt: 'Ksenia with palette and face painting', categories: ['ART', 'ME'], aspect: 'portrait' },
    { type: 'image', src: '/images/dance-field.webp', alt: 'Dance with outstretched arms in field', categories: ['DANCE', 'NATURE'], aspect: 'tall' },
  ] satisfies GalleryItem[] as GalleryItem[],
}

export const finalCta = {
  label: '07 — CONTACT',
  headline: 'READY TO GO DEEPER?',
  paragraphs: [
    'You don\'t need to know exactly which practice you need.',
    'Sometimes it\'s enough to feel that you want something more.',
    'Write to me about yourself and what\'s happening in your life right now.',
  ],
  button: 'CONTACT KSENIA',
  image: { src: '/images/final.webp', alt: 'Woman sitting with back to camera on dark sand by ocean at sunset' },
}

export const footer = {
  name: 'Ksenia Aurum',
  location: 'Bali',
}
