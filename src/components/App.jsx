import { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import PropTypes from 'prop-types';

// Nanoid---------------------------------------
import { nanoid } from 'nanoid';
export class App extends Component {
  static defaultProps = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }).isRequired
    ),
    filter: PropTypes.string.isRequired,
  };

  state = {
    contacts: [],
    filter: '',
  };

  addContact = values => {
    values.id = nanoid();
    if (this.checkContacts(this.state.contacts, values)) {
      return alert(`${values.name} is already in contacts`);
    }

    this.setState(prevState => ({
      contacts: [values, ...prevState.contacts],
    }));
  };

  checkContacts = (contacts, values) => {
    return contacts.find(contact => contact.name === values.name.trim());
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // componentDidMount() нужен для того что бы взять начальные значения с бекенда (fetch) и по ним сделать setState(), вызывается один раз
  //Проверка (parsedContacts !== null) обязательна, что бы не упало приложение.
  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts !== null) {
      this.setState({ contacts: parsedContacts });
    }
  }

  // componentDidUpdate(prevProps, prevState) вызывается при каждом обновлении состояния или пропсов, нужен что бы записать,
  // что то в localStorage или сделать новый запрос на сервер с другими параметрами
  //(prevState.--- !== this.state.---) проверка обязательна, что бы не зациклить приложение, как при бесконечных циклах

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex-start',
          padding: '40px',
          flexDirection: 'column',
          gap: '40px',
          color: '#ffffff',
        }}
      >
        <div>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />

          <h2>Contacts</h2>
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            onDeleteContact={this.deleteContact}
            contacts={visibleContacts}
          />
        </div>
      </div>
    );
  }
}
