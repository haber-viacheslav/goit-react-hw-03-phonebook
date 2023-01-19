import ContactItem from 'components/ContactItem';
import PropTypes from 'prop-types';
import { ContactListWrp } from './ContactList.styled';

const ContactList = ({ contacts, onDeleteContact }) => (
  <ContactListWrp>
    {contacts.map(({ name, number, id }) => (
      <li key={id}>
        <ContactItem
          name={name}
          number={number}
          onDeleteContact={() => onDeleteContact(id)}
        />
      </li>
    ))}
  </ContactListWrp>
);

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
export default ContactList;
