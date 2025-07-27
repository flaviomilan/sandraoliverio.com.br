import { CONTACT, SITE } from './constants';

export default {
  site: SITE.URL,
  title: SITE.TITLE,

  socialMedia: {
    whatsapp: {
      phoneNumber: CONTACT.WHATSAPP.PHONE_NUMBER,
      defaultMessage: CONTACT.WHATSAPP.DEFAULT_MESSAGE,
    },
  },
};
