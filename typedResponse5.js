const typedResponse = {
  _embedded: {
    events: [
      {
        url: 'String',
        ageRestrictions: {
          id: 'String',
          legalAgeEnforced: 'Bool',
          ageRuleDescription: 'String'
        },
        ticketing: {
          safeTix: { enabled: 'Bool', inAppOnlyEnabled: 'Bool' },
          allInclusivePricing: { enabled: 'Bool' },
          id: 'String'
        },
        classifications: {
          segment: { id: 'String', name: 'String' },
          primary: 'Bool',
          subType: { id: 'String', name: 'Nil' },
          family: 'Bool',
          subGenre: { id: 'String', name: 'String' },
          type: { id: 'String', name: 'Nil' },
          genre: { id: 'String', name: 'String' }
        },
        promoters: { id: 'String', name: 'String', description: 'String' },
        pleaseNote: 'String',
        images: {
          height: 'Int',
          fallback: 'Bool',
          ratio: 'String',
          url: 'String',
          width: 'Int',
          attribution: 'String'
        },
        _embedded: {
          attractions: {
            locale: 'String',
            images: {
              height: 'Int',
              fallback: 'Bool',
              attribution: 'String',
              ratio: 'String',
              url: 'String',
              width: 'Int'
            },
            test: 'Bool',
            id: 'String',
            externalLinks: {
              lastfm: { url: 'String' },
              youtube: { url: 'String' },
              twitter: { url: 'String' },
              wiki: { url: 'String' },
              facebook: { url: 'String' },
              musicbrainz: { id: 'String' },
              instagram: { url: 'String' },
              homepage: { url: 'String' },
              itunes: { url: 'String' },
              spotify: { url: 'String' }
            },
            classifications: {
              segment: { id: 'String', name: 'String' },
              primary: 'Bool',
              subType: { id: 'String', name: 'String' },
              family: 'Bool',
              subGenre: { id: 'String', name: 'String' },
              type: { id: 'String', name: 'String' },
              genre: { id: 'String', name: 'String' }
            },
            _links: { self: { href: 'String' } },
            type: 'String',
            upcomingEvents: { ticketmaster: 'Int', _filtered: 'Int', _total: 'Int' },
            name: 'String',
            url: 'String'
          },
          venues: {
            location: { longitude: 'String', latitude: 'String' },
            url: 'String',
            country: { name: 'String', countryCode: 'String' },
            generalInfo: { childRule: 'String', generalRule: 'String' },
            images: {
              height: 'Int',
              fallback: 'Bool',
              ratio: 'String',
              url: 'String',
              width: 'Int'
            },
            parkingDetail: 'String',
            city: { name: 'String' },
            upcomingEvents: {
              _total: 'Int',
              _filtered: 'Int',
              archtics: 'Int',
              ticketmaster: 'Int'
            },
            locale: 'String',
            name: 'String',
            type: 'String',
            state: { name: 'String', stateCode: 'String' },
            boxOfficeInfo: {
              phoneNumberDetail: 'String',
              acceptedPaymentDetail: 'String',
              openHoursDetail: 'String'
            },
            id: 'String',
            timezone: 'String',
            postalCode: 'String',
            dmas: { id: 'Int' },
            _links: { self: { href: 'String' } },
            markets: { name: 'String', id: 'String' },
            address: { line1: 'String' },
            test: 'Bool'
          }
        },
        priceRanges: {
          currency: 'String',
          min: 'Float',
          type: 'String',
          max: 'Float'
        },
        seatmap: { id: 'String', staticUrl: 'String' },
        locale: 'String',
        name: 'String',
        products: {
          classifications: {
            segment: { id: 'String', name: 'String' },
            primary: 'Bool',
            subType: { id: 'String', name: 'String' },
            family: 'Bool',
            subGenre: { id: 'String', name: 'Nil' },
            type: { id: 'String', name: 'String' },
            genre: { id: 'String', name: 'Nil' }
          },
          id: 'String',
          name: 'String',
          url: 'String',
          type: 'String'
        },
        type: 'String',
        promoter: { id: 'String', name: 'String', description: 'String' },
        dates: {
          status: { code: 'String' },
          timezone: 'String',
          spanMultipleDays: 'Bool',
          start: {
            localTime: 'String',
            dateTBD: 'Bool',
            timeTBA: 'Bool',
            dateTBA: 'Bool',
            noSpecificTime: 'Bool',
            localDate: 'String',
            dateTime: 'String'
          },
          access: {
            endApproximate: 'Bool',
            startDateTime: 'String',
            startApproximate: 'Bool'
          },
          end: { noSpecificTime: 'Bool', approximate: 'Bool' }
        },
        id: 'String',
        info: 'String',
        accessibility: {
          ticketLimit: 'Int',
          id: 'String',
          info: 'String',
          url: 'String',
          urlText: 'String'
        },
        ticketLimit: { id: 'String', info: 'String' },
        sales: {
          public: {
            endDateTime: 'String',
            startTBA: 'Bool',
            startTBD: 'Bool',
            startDateTime: 'String'
          },
          presales: {
            name: 'String',
            startDateTime: 'String',
            endDateTime: 'String'
          }
        },
        _links: {
          venues: { href: 'String' },
          self: { href: 'String' },
          attractions: { href: 'String' }
        },
        test: 'Bool',
        doorsTimes: {
          id: 'String',
          localDate: 'String',
          dateTime: 'String',
          localTime: 'String'
        }
      }
    ]
  },
  _links: {
    first: { href: 'String' },
    next: { href: 'String' },
    self: { href: 'String' },
    last: { href: 'String' }
  },
  page: {
    size: 'Int',
    totalPages: 'Int',
    number: 'Int',
    totalElements: 'Int'
  }
}