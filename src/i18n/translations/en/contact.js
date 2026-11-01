export default {
  meta: {
    title: 'Contact Us and Request a Test',
    description:
      'Contact Metmech Analytical Engineers in Ekkattuthangal, Chennai, to discuss a material testing requirement or request a test.',
  },
  hero: {
    title: 'Contact Us',
    lead: 'Discuss your testing requirement with our team.',
  },
  info: {
    detailsHeading: 'Contact Details',
    mapHeading: 'Find Our Laboratory',
    mapTitle: 'Map showing Metmech Analytical Engineers in Ekkattuthangal, Chennai',
    mapArea: 'Balaji Nagar, Ekkattuthangal, Chennai',
    getDirections: 'Get Directions',
    addressLines: [
      '#131/7, Block No. 1, 2nd Floor,',
      'Balaji Nagar, 1st Street,',
      'Ekkattuthangal, Chennai – 600 032,',
      'Tamil Nadu, India.',
    ],
  },
  form: {
    heading: 'Send an Enquiry',
    lead: 'Tell us about your material, sample and what you need to find out.',
    intro: 'Fields marked with an asterisk (*) are required.',
    // Shown when the visitor came from an instrument or service page.
    regarding: 'Enquiry about: {name}',
    required: 'required',
    optional: 'optional',
    fields: {
      name: 'Your name',
      company: 'Company or institution',
      email: 'Email',
      phone: 'Phone number',
      requirement: 'Testing Requirements',
      requirementHint: 'Select the material or application you need testing for.',
      // One or more can be chosen; keys are the ids in src/utils/enquiryRules.js.
      requirementOptions: {
        metal: 'Metal Testing',
        ceramic: 'Ceramic Testing',
        polymer: 'Polymer Testing',
        biofilm: 'Biofilm Testing',
        dental: 'Dental Applications',
      },
      message: 'Additional message',
      consent: 'I agree to my details being used to respond to this enquiry, as described in the',
      consentLink: 'Privacy Policy',
    },
    errors: {
      summary: 'Please correct the highlighted fields.',
      name: 'Enter your name.',
      email: 'Enter a valid email address, such as name@example.com.',
      phone: 'Enter a valid phone number with 7 to 15 digits.',
      requirement: 'Select at least one testing requirement.',
      consent: 'Please confirm that you agree before sending.',
    },
    submit: 'Send Enquiry',
    submitting: 'Sending…',
    // Shown when the enquiry API is configured.
    success: 'Thank you. Your enquiry has been sent and our team will contact you.',
    failure:
      'Your enquiry could not be sent. Please try again, or contact us by phone or email using the details on this page.',
    emailInstead: 'Send it by email instead.',
    // Shown when no enquiry API is configured and the form hands over to
    // WhatsApp. The enquiry only reaches us once the visitor presses Send there.
    whatsappNote:
      'Sending opens WhatsApp with your enquiry filled in. Press Send in WhatsApp to deliver it to us.',
    whatsappOpened:
      'WhatsApp should now be open with your enquiry ready. Press Send in WhatsApp to deliver it to us.',
    whatsappRetry: 'WhatsApp did not open? Open it here.',
    emailSubject: 'Testing enquiry from {name}',
  },
}
