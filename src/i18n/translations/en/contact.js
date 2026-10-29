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
    required: 'required',
    optional: 'optional',
    fields: {
      name: 'Your name',
      company: 'Company or institution',
      email: 'Email',
      phone: 'Phone number',
      requirement: 'Testing requirement',
      requirementHint: 'For example: tensile test on aluminium alloy, 5 samples.',
      material: 'Sample or material description',
      message: 'Additional message',
      consent: 'I agree to my details being used to respond to this enquiry, as described in the',
      consentLink: 'Privacy Policy',
    },
    errors: {
      summary: 'Please correct the highlighted fields.',
      name: 'Enter your name.',
      email: 'Enter a valid email address, such as name@example.com.',
      phone: 'Enter a valid phone number with 7 to 15 digits.',
      requirement: 'Describe the test or analysis you need.',
      consent: 'Please confirm that you agree before sending.',
    },
    submit: 'Send Enquiry',
    submitting: 'Sending…',
    // Shown when the enquiry API is configured.
    success: 'Thank you. Your enquiry has been sent and our team will contact you.',
    failure:
      'Your enquiry could not be sent. Please try again, or contact us by phone or email using the details on this page.',
    // Shown when no enquiry API is configured and the form hands over to email.
    emailNote: 'Sending opens your email app with the enquiry filled in, ready for you to send.',
    emailOpened:
      'Your email app should now be open with the enquiry ready to send. If it did not open, please email us at {email}.',
    emailSubject: 'Testing enquiry from {name}',
  },
}
