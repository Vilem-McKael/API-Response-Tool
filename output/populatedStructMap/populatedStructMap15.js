{
  _embedded: {
    events: [
      {
        url: 'String',
        promoters: [ { id: 'String', name: 'String' } ],
        images: [
          {
            height: 'Int',
            width: 'Int',
            url: 'String',
            ratio: 'String?'
          }
        ],
        _embedded: {
          attractions: [
            {
              name: 'String',
              images: [
                {
                  height: 'Int',
                  width: 'Int',
                  url: 'String',
                  ratio: 'String?'
                }
              ],
              externalLinks: {
                homepage: [ { id: 'String?', url: 'String?' } ],
                instagram: [ { id: 'String?', url: 'String?' } ],
                facebook: [ { id: 'String?', url: 'String?' } ],
                twitter: [ { id: 'String?', url: 'String?' } ],
                youtube: [ { id: 'String?', url: 'String?' } ],
                itunes: [ { id: 'String?', url: 'String?' } ],
                spotify: [ { id: 'String?', url: 'String?' } ]
              }
            }
          ],
          venues: [
            {
              country: { name: 'String', countryCode: 'String' },
              images: [
                {
                  height: 'Int',
                  width: 'Int',
                  url: 'String',
                  ratio: 'String?'
                }
              ],
              city: {},
              name: 'String',
              state: {}
            }
          ]
        },
        seatmap: { staticUrl: 'String' },
        priceRanges: [ { currency: 'String?', min: 'Float', max: 'Float' } ],
        name: 'String',
        promoter: { id: 'String', name: 'String' },
        dates: {
          start: {
            localTime: 'String?',
            dateTBD: 'Bool',
            dateTBA: 'Bool',
            localDate: 'String',
            dateTime: 'String?'
          }
        },
        sales: {
          publicSales: {
            startTBD: 'Bool',
            startTBA: 'Bool',
            startDateTime: 'String?',
            endDateTime: 'String?'
          },
          presales: [
            {
              name: 'String',
              startDateTime: 'String',
              endDateTime: 'String'
            }
          ]
        }
      }
    ]
  }
}