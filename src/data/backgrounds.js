// Background photographs, each behind a navy veil (PhotoBackdrop). No photograph
// is used twice: the home hero's video and its What We Offer band keep their
// own, and every image below appears in one place only.
//
// src       full-size image, used from tablet width up
// mobile    a smaller copy for phones (the same file when the source is small)
// position  which part of the photograph stays in view as the band crops it
// veil      optional navy veil strength, 0 to 1 (default 0.72)
//
// PAGE_BACKGROUNDS are the title bands of the main inner pages: the client's
// own lab photographs (about, equipment, contact) and stills of different
// shots from the home hero's footage (design/video/).
//
// SECTION_BACKGROUNDS are the bands below the titles. The client has no more
// lab photographs than the ones above, so these are free-licence photographs
// from Unsplash (Unsplash License) and Pexels (Pexels License); both allow
// commercial use without attribution. Each entry names its source page.
import about from '../assets/images/backgrounds/pages/about.webp'
import contactMobile from '../assets/images/backgrounds/pages/contact-mobile.webp'
import contact from '../assets/images/backgrounds/pages/contact.webp'
import equipment from '../assets/images/backgrounds/pages/equipment.webp'
import industriesMobile from '../assets/images/backgrounds/pages/industries-mobile.webp'
import industries from '../assets/images/backgrounds/pages/industries.webp'
import notFoundMobile from '../assets/images/backgrounds/pages/not-found-mobile.webp'
import notFound from '../assets/images/backgrounds/pages/not-found.webp'
import privacyMobile from '../assets/images/backgrounds/pages/privacy-mobile.webp'
import privacy from '../assets/images/backgrounds/pages/privacy.webp'
import servicesMobile from '../assets/images/backgrounds/pages/services-mobile.webp'
import services from '../assets/images/backgrounds/pages/services.webp'
import sectionAboutApproachMobile from '../assets/images/backgrounds/sections/about-approach-mobile.webp'
import sectionAboutApproach from '../assets/images/backgrounds/sections/about-approach.webp'
import sectionAboutIntroMobile from '../assets/images/backgrounds/sections/about-intro-mobile.webp'
import sectionAboutIntro from '../assets/images/backgrounds/sections/about-intro.webp'
import sectionAboutVisionMobile from '../assets/images/backgrounds/sections/about-vision-mobile.webp'
import sectionAboutVision from '../assets/images/backgrounds/sections/about-vision.webp'
import sectionAboutWhyMobile from '../assets/images/backgrounds/sections/about-why-mobile.webp'
import sectionAboutWhy from '../assets/images/backgrounds/sections/about-why.webp'
import sectionContactMobile from '../assets/images/backgrounds/sections/contact-mobile.webp'
import sectionContact from '../assets/images/backgrounds/sections/contact.webp'
import sectionEquipmentCatalogueMobile from '../assets/images/backgrounds/sections/equipment-catalogue-mobile.webp'
import sectionEquipmentCatalogue from '../assets/images/backgrounds/sections/equipment-catalogue.webp'
import sectionHomeIndustriesMobile from '../assets/images/backgrounds/sections/home-industries-mobile.webp'
import sectionHomeIndustries from '../assets/images/backgrounds/sections/home-industries.webp'
import sectionHomeInstrumentsMobile from '../assets/images/backgrounds/sections/home-instruments-mobile.webp'
import sectionHomeInstruments from '../assets/images/backgrounds/sections/home-instruments.webp'
import sectionHomeProcessMobile from '../assets/images/backgrounds/sections/home-process-mobile.webp'
import sectionHomeProcess from '../assets/images/backgrounds/sections/home-process.webp'
import sectionHomeServicesMobile from '../assets/images/backgrounds/sections/home-services-mobile.webp'
import sectionHomeServices from '../assets/images/backgrounds/sections/home-services.webp'
import sectionHomeWhyMobile from '../assets/images/backgrounds/sections/home-why-mobile.webp'
import sectionHomeWhy from '../assets/images/backgrounds/sections/home-why.webp'
import sectionIndustryAerospaceMobile from '../assets/images/backgrounds/sections/industry-aerospace-mobile.webp'
import sectionIndustryAerospace from '../assets/images/backgrounds/sections/industry-aerospace.webp'
import sectionIndustryAutomotiveMobile from '../assets/images/backgrounds/sections/industry-automotive-mobile.webp'
import sectionIndustryAutomotive from '../assets/images/backgrounds/sections/industry-automotive.webp'
import sectionIndustryEnergyMobile from '../assets/images/backgrounds/sections/industry-energy-mobile.webp'
import sectionIndustryEnergy from '../assets/images/backgrounds/sections/industry-energy.webp'
import sectionIndustryEngineeringMobile from '../assets/images/backgrounds/sections/industry-engineering-mobile.webp'
import sectionIndustryEngineering from '../assets/images/backgrounds/sections/industry-engineering.webp'
import sectionIndustryManufacturingMobile from '../assets/images/backgrounds/sections/industry-manufacturing-mobile.webp'
import sectionIndustryManufacturing from '../assets/images/backgrounds/sections/industry-manufacturing.webp'
import sectionIndustryResearchMobile from '../assets/images/backgrounds/sections/industry-research-mobile.webp'
import sectionIndustryResearch from '../assets/images/backgrounds/sections/industry-research.webp'
import sectionInstrumentBodyMobile from '../assets/images/backgrounds/sections/instrument-body-mobile.webp'
import sectionInstrumentBody from '../assets/images/backgrounds/sections/instrument-body.webp'
import sectionNotFoundMobile from '../assets/images/backgrounds/sections/not-found-mobile.webp'
import sectionNotFound from '../assets/images/backgrounds/sections/not-found.webp'
import sectionPrivacyMobile from '../assets/images/backgrounds/sections/privacy-mobile.webp'
import sectionPrivacy from '../assets/images/backgrounds/sections/privacy.webp'
import sectionServiceBodyMobile from '../assets/images/backgrounds/sections/service-body-mobile.webp'
import sectionServiceBody from '../assets/images/backgrounds/sections/service-body.webp'
import sectionServiceFaqMobile from '../assets/images/backgrounds/sections/service-faq-mobile.webp'
import sectionServiceFaq from '../assets/images/backgrounds/sections/service-faq.webp'
import sectionServiceRelatedMobile from '../assets/images/backgrounds/sections/service-related-mobile.webp'
import sectionServiceRelated from '../assets/images/backgrounds/sections/service-related.webp'
import sectionServicesCategoriesMobile from '../assets/images/backgrounds/sections/services-categories-mobile.webp'
import sectionServicesCategories from '../assets/images/backgrounds/sections/services-categories.webp'
import sectionServicesFocusMobile from '../assets/images/backgrounds/sections/services-focus-mobile.webp'
import sectionServicesFocus from '../assets/images/backgrounds/sections/services-focus.webp'

export const PAGE_BACKGROUNDS = {
  about: { src: about, mobile: about, position: 'center 45%' },
  services: { src: services, mobile: servicesMobile, position: 'center 45%' },
  equipment: { src: equipment, mobile: equipment, position: 'center 55%' },
  industries: { src: industries, mobile: industriesMobile, position: 'center 12%' },
  contact: { src: contact, mobile: contactMobile, position: 'center 35%' },
  privacy: { src: privacy, mobile: privacyMobile, position: 'center 35%' },
  notFound: { src: notFound, mobile: notFoundMobile, position: 'center 65%' },
}

export const SECTION_BACKGROUNDS = {
  // Trnava University, Unsplash: https://unsplash.com/photos/_9xRHrMOjeg
  homeServices: { src: sectionHomeServices, mobile: sectionHomeServicesMobile, position: 'center' },
  // Pexels: https://www.pexels.com/photo/8442037/
  homeInstruments: { src: sectionHomeInstruments, mobile: sectionHomeInstrumentsMobile, position: 'center 40%' },
  // Rolled Alloys, Pexels: https://www.pexels.com/photo/8940223/
  homeIndustries: { src: sectionHomeIndustries, mobile: sectionHomeIndustriesMobile, position: 'center' },
  // ThisIsEngineering, Pexels: https://www.pexels.com/photo/3861438/
  homeWhy: { src: sectionHomeWhy, mobile: sectionHomeWhyMobile, position: 'center 40%' },
  // Pexels: https://www.pexels.com/photo/8851548/
  homeProcess: { src: sectionHomeProcess, mobile: sectionHomeProcessMobile, position: 'center' },
  // Pexels: https://www.pexels.com/photo/18471457/
  aboutIntro: { src: sectionAboutIntro, mobile: sectionAboutIntroMobile, position: 'center' },
  // ThisIsEngineering, Pexels: https://www.pexels.com/photo/3861457/
  aboutVision: { src: sectionAboutVision, mobile: sectionAboutVisionMobile, position: 'center' },
  // Unsplash: https://unsplash.com/photos/JlVqUaGW2A0
  aboutWhy: { src: sectionAboutWhy, mobile: sectionAboutWhyMobile, position: 'center' },
  // Pexels: https://www.pexels.com/photo/8442036/
  aboutApproach: { src: sectionAboutApproach, mobile: sectionAboutApproachMobile, position: 'center' },
  // Supplied for this site (2026-10-26): grinding and polishing machine, not stock
  servicesCategories: { src: sectionServicesCategories, mobile: sectionServicesCategoriesMobile, position: 'center' },
  // Pexels: https://www.pexels.com/photo/5721685/
  servicesFocus: { src: sectionServicesFocus, mobile: sectionServicesFocusMobile, position: 'center 40%' },
  // Pexels: https://www.pexels.com/photo/4031522/
  serviceBody: { src: sectionServiceBody, mobile: sectionServiceBodyMobile, position: 'center' },
  // Pexels: https://www.pexels.com/photo/17046790/
  serviceFaq: { src: sectionServiceFaq, mobile: sectionServiceFaqMobile, position: 'center' },
  // Pexels: https://www.pexels.com/photo/9574397/
  serviceRelated: { src: sectionServiceRelated, mobile: sectionServiceRelatedMobile, position: 'center' },
  // Unsplash: https://unsplash.com/photos/YDLlT9DNOI4
  equipmentCatalogue: { src: sectionEquipmentCatalogue, mobile: sectionEquipmentCatalogueMobile, position: 'center' },
  // Pexels: https://www.pexels.com/photo/5726714/
  instrumentBody: { src: sectionInstrumentBody, mobile: sectionInstrumentBodyMobile, position: 'center 40%' },
  // Simon Kadula, Unsplash: https://unsplash.com/photos/8gr6bObQLOI
  automotive: { src: sectionIndustryAutomotive, mobile: sectionIndustryAutomotiveMobile, position: 'center' },
  // Pexels: https://www.pexels.com/photo/8956313/
  manufacturing: { src: sectionIndustryManufacturing, mobile: sectionIndustryManufacturingMobile, position: 'center' },
  // Pexels: https://www.pexels.com/photo/20640898/
  aerospace: { src: sectionIndustryAerospace, mobile: sectionIndustryAerospaceMobile, position: 'center' },
  // Pexels: https://www.pexels.com/photo/17658153/
  energy: { src: sectionIndustryEnergy, mobile: sectionIndustryEnergyMobile, position: 'center' },
  // ThisIsEngineering, Pexels: https://www.pexels.com/photo/3862632/
  research: { src: sectionIndustryResearch, mobile: sectionIndustryResearchMobile, position: 'center' },
  // Pexels: https://www.pexels.com/photo/8865187/
  engineering: { src: sectionIndustryEngineering, mobile: sectionIndustryEngineeringMobile, position: 'center' },
  // Pexels: https://www.pexels.com/photo/3938022/
  contact: { src: sectionContact, mobile: sectionContactMobile, position: 'center' },
  // Pexels: https://www.pexels.com/photo/8581897/
  privacy: { src: sectionPrivacy, mobile: sectionPrivacyMobile, position: 'center' },
  // Pexels: https://www.pexels.com/photo/12366518/
  notFound: { src: sectionNotFound, mobile: sectionNotFoundMobile, position: 'center' },
}
