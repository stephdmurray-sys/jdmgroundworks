export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://jdmgroundworks.com",
    "name": "JDM Groundworks",
    "alternateName": "JDM Groundworks LLC",
    "description": "Professional land clearing, excavation, building demolition, tree removal, and site preparation services in Kitsap County, Washington. Licensed and insured contractors serving Bremerton, Silverdale, Poulsbo, Port Orchard, Bainbridge Island, and all surrounding areas.",
    "image": "https://jdmgroundworks.com/images/hero-excavator.jpg",
    "logo": "https://jdmgroundworks.com/images/jdm-groundworks-logo.png",
    "url": "https://jdmgroundworks.com",
    "telephone": "(360) 355-7006",
    "email": "info@jdmgroundworks.com",
    "priceRange": "$$",
    "paymentAccepted": "Cash, Check, Credit Card",
    "currenciesAccepted": "USD",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bremerton",
      "addressRegion": "WA",
      "postalCode": "98310",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.5673,
      "longitude": -122.6265
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "16:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/jdmgroundworks",
      "https://www.instagram.com/jdmgroundworks"
    ],
    "areaServed": [
      {
        "@type": "County",
        "name": "Kitsap County",
        "containedIn": {
          "@type": "State",
          "name": "Washington"
        }
      },
      {
        "@type": "City",
        "name": "Bremerton",
        "containedIn": { "@type": "State", "name": "Washington" }
      },
      {
        "@type": "City",
        "name": "Silverdale",
        "containedIn": { "@type": "State", "name": "Washington" }
      },
      {
        "@type": "City",
        "name": "Poulsbo",
        "containedIn": { "@type": "State", "name": "Washington" }
      },
      {
        "@type": "City",
        "name": "Port Orchard",
        "containedIn": { "@type": "State", "name": "Washington" }
      },
      {
        "@type": "City",
        "name": "Bainbridge Island",
        "containedIn": { "@type": "State", "name": "Washington" }
      },
      {
        "@type": "City",
        "name": "Seabeck",
        "containedIn": { "@type": "State", "name": "Washington" }
      },
      {
        "@type": "City",
        "name": "Kingston",
        "containedIn": { "@type": "State", "name": "Washington" }
      },
      {
        "@type": "City",
        "name": "Suquamish",
        "containedIn": { "@type": "State", "name": "Washington" }
      },
      {
        "@type": "City",
        "name": "Indianola",
        "containedIn": { "@type": "State", "name": "Washington" }
      },
      {
        "@type": "City",
        "name": "Gorst",
        "containedIn": { "@type": "State", "name": "Washington" }
      },
      {
        "@type": "City",
        "name": "Olalla",
        "containedIn": { "@type": "State", "name": "Washington" }
      },
      {
        "@type": "City",
        "name": "Manchester",
        "containedIn": { "@type": "State", "name": "Washington" }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Groundworks Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Land Clearing",
            "description": "Professional land clearing services for residential and commercial properties in Kitsap County including brush removal, vegetation clearing, and lot preparation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tree Removal & Stump Grinding",
            "description": "Complete tree removal service including stump grinding and debris removal for construction sites and property development in Bremerton, Silverdale, and Poulsbo"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Building Demolition",
            "description": "Professional demolition of houses, barns, sheds, garages, and old structures with complete debris removal and site cleanup in Kitsap County"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Excavation Services",
            "description": "Expert excavation services including foundation digging, utility trenching, basement excavation, and site grading throughout Kitsap County"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Driveway Construction",
            "description": "Gravel driveway and access road construction with proper drainage and base preparation for residential and commercial properties"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "RV Pad & Parking Area Installation",
            "description": "Custom RV pad, boat parking, and equipment storage pad construction with proper grading and drainage solutions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Site Preparation",
            "description": "Complete site preparation for new construction including clearing, grading, access roads, and utility corridor development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Grading and Leveling",
            "description": "Precision grading and leveling for driveways, building pads, parking areas, and landscaping projects using laser-guided equipment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Drainage & Erosion Control",
            "description": "Drainage system installation including French drains, catch basins, culverts, and retention systems for property protection"
          }
        }
      ]
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
