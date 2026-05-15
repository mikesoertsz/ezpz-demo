export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
}

export const defaultContacts: Contact[] = [
  {
    id: '1',
    name: 'Mike',
    phoneNumber: '+351912580952',
    email: 'mike@ezpzrecruitment.com',
    address: '123 Mike St, City'
  },
  {
    id: '2',
    name: 'Jordi',
    phoneNumber: '+31641532184',
    email: 'jordi@ezpzrecruitment.com',
    address: '456 Jordi Ave, City'
  },
  {
    id: '3',
    name: 'Andreas',
    phoneNumber: '',
    email: 'andreas.hartl@deliveryhero.com',
    address: ''
  },
  {
    id: '4',
    name: 'Eduard',
    phoneNumber: '',
    email: 'eduard.tatay@foodora.at',
    address: ''
  }
];