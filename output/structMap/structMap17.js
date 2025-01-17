const structMap17 = {
  DetailedShowResponse: { _embedded: 'DetailedShowEmbeddedHandler' },
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
  DetailedShowAttractionUpcomingEventsHandler: { ticketmaster: 'Int', _total: 'Int' },
  ShowResultResponse: { _embedded: 'ShowEmbeddedResponse' },
  ShowEmbeddedResponse: { events: '[ShowEventResponse]' },
  ShowEventResponse: {
    name: 'String',
    id: 'String',
    images: '[ShowImageHandler]',
    dates: 'ShowDateHandler',
    _embedded: 'ShowEventEmbeddedResponse'
  },
  ShowEventEmbeddedResponse: { venues: '[ShowVenueHandler]' },
  ShowVenueHandler: {
    name: 'String',
    city: 'ShowVenueCityHandler',
    state: 'ShowVenueStateHandler'
  },
  ShowVenueCityHandler: { name: 'String' },
  ShowVenueStateHandler: { name: 'String', stateCode: 'String' },
  ShowImageHandler: { ratio: 'String', url: 'String', width: 'Int', height: 'Int' },
  ShowDateHandler: {
    start: 'ShowDateStartHandler',
    timezone: 'String',
    status: 'ShowDateStatusHandler'
  },
  ShowDateStatusHandler: { code: 'String' },
  ShowDateStartHandler: { localDate: 'String' }
}