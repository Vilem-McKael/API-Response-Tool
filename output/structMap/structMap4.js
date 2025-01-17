const structMap = {
  start: { _embedded: 'DetailedShowEmbeddedHandler' },
  DetailedShowEmbeddedHandler: { events: '[DetailedShowEventHandler]' },
  DetailedShowEventHandler: {
    url: 'String',
    promoters: '[DetailedShowPromoterHandler]?',
    images: '[DetailedShowImageHandler]?',
    _embedded: 'DetailedShowEventEmbeddedHandler',
    seatmap: 'DetailedShowEventSeatmapHandler',
    priceRanges: '[DetailedShowEventPriceRangesHandler]?',
    name: 'String',
    promoter: 'DetailedShowPromoterHandler',
    dates: 'DetailedShowEventDateStartHandler',
    sales: 'DetailedShowEventSalesHandler'
  },
  DetailedShowEventPriceRangesHandler: { currency: 'String?', min: 'Float', max: 'Float' },
  DetailedShowEventSalesHandler: {
    publicSales: 'DetailedShowEventSalesPublicHandler?',
    presales: '[DetailedShowEventSalesPresaleHandler]?'
  },
  DetailedShowEventSalesPublicHandler: {
    startTBD: 'Bool',
    startTBA: 'Bool',
    startDateTime: 'String?',
    endDateTime: 'String?'
  },
  DetailedShowEventSalesPresaleHandler: { name: 'String', startDateTime: 'String', endDateTime: 'String' },
  DetailedShowEventDateStartHandler: { start: 'DetailedShowEventDateHandler' },
  DetailedShowEventDateHandler: {
    localTime: 'String?',
    dateTBD: 'Bool',
    dateTBA: 'Bool',
    localDate: 'String',
    dateTime: 'String?'
  },
  DetailedShowEventSeatmapHandler: { staticUrl: 'String' },
  DetailedShowVenueHandler: {
    country: 'DetailedVenueCountryHandler',
    images: '[DetailedShowImageHandler]',
    city: 'ShowVenueCityHandler',
    name: 'String',
    state: 'ShowVenueStateHandler?'
  },
  DetailedVenueCountryHandler: { name: 'String', countryCode: 'String' },
  DetailedShowPromoterHandler: { id: 'String', name: 'String' },
  DetailedShowImageHandler: { height: 'Int', width: 'Int', url: 'String', ratio: 'String?' },
  DetailedShowEventEmbeddedHandler: {
    attractions: '[DetailedShowAttractionHandler]',
    venues: '[DetailedShowVenueHandler]'
  },
  DetailedShowAttractionHandler: {
    name: 'String',
    images: '[DetailedShowImageHandler]',
    externalLinks: 'DetailedShowAttractionExternalLinksHandler'
  },
  DetailedShowAttractionExternalLinksHandler: {
    homepage: '[DetailedShowAttractionExternalLinksUrlHandler]?',
    instagram: '[DetailedShowAttractionExternalLinksUrlHandler]?',
    facebook: '[DetailedShowAttractionExternalLinksUrlHandler]?',
    twitter: '[DetailedShowAttractionExternalLinksUrlHandler]?',
    youtube: '[DetailedShowAttractionExternalLinksUrlHandler]?',
    itunes: '[DetailedShowAttractionExternalLinksUrlHandler]?',
    spotify: '[DetailedShowAttractionExternalLinksUrlHandler]?'
  },
  DetailedShowAttractionExternalLinksUrlHandler: { id: 'String?', url: 'String?' },
  DetailedShowAttractionUpcomingEventsHandler: { ticketmaster: 'Int', _total: 'Int' }
}