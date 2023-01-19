import PropTypes from 'prop-types';
import {
  ContactItem,
  ContactListWrp,
  ContactItemButton,
} from './ContactList.styled';
const ContactList = ({ contacts, onDeleteContact }) => (
  <ContactListWrp>
    {contacts.map(({ name, number, id }) => (
      <ContactItem key={id}>
        <p>
          {name}: <span>{number}</span>
        </p>
        <ContactItemButton onClick={() => onDeleteContact(id)}>
          delete
        </ContactItemButton>
      </ContactItem>
    ))}
  </ContactListWrp>
);

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
export default ContactList;
