import type { Email } from '../types';
import email1 from '../../../assets/email1.jpg';
import email2 from '../../../assets/email2.jpg';
import email3 from '../../../assets/email3.jpg';
import email4 from '../../../assets/email4.jpg';
import email5 from '../../../assets/email5.jpg';

export const phishingEmails: Email[] = [
  { id: 1, imageSrc: email1, isPhishing: true },
  { id: 2, imageSrc: email2, isPhishing: false },
  { id: 3, imageSrc: email3, isPhishing: false },
  { id: 4, imageSrc: email4, isPhishing: true },
  { id: 5, imageSrc: email5, isPhishing: false },
];