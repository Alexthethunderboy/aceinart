import { type SchemaTypeDefinition } from 'sanity'

import artwork from './schemas/artwork'
import exhibition from './schemas/exhibition'
import artist from './schemas/artist'
import category from './schemas/category'
import settings from './schemas/settings'
import home from './schemas/home'
import about from './schemas/about'

import manifesto from './schemas/manifesto'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [artwork, exhibition, artist, category, settings, home, about, manifesto],
}
