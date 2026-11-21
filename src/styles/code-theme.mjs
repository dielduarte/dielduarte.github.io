// Syntax colours drawn from the site palette, on a paper tone one step darker than the page.
// Every colour clears 4.5:1 contrast against the background.
export default {
  name: 'paper',
  type: 'light',
  colors: {
    'editor.background': '#E2E2DC',
    'editor.foreground': '#111111',
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#5F5F5A', fontStyle: 'italic' },
    },
    {
      scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.control', 'keyword.operator.new'],
      settings: { foreground: '#1E3BD8' },
    },
    {
      scope: ['constant.numeric', 'constant.language', 'constant.character', 'support.constant', 'entity.other.attribute-name'],
      settings: { foreground: '#1E3BD8' },
    },
    {
      scope: ['string', 'string.quoted', 'string.template', 'punctuation.definition.string', 'markup.inserted'],
      settings: { foreground: '#176446' },
    },
    {
      scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class', 'entity.name.tag'],
      settings: { foreground: '#000000', fontStyle: 'bold' },
    },
    {
      scope: ['entity.name.function', 'support.function', 'meta.function-call', 'variable', 'meta.object-literal.key'],
      settings: { foreground: '#111111' },
    },
    {
      scope: ['punctuation', 'keyword.operator', 'meta.brace'],
      settings: { foreground: '#55554F' },
    },
    {
      scope: ['markup.deleted'],
      settings: { foreground: '#B3261E' },
    },
  ],
};
