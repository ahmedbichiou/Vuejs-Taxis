// src/search.js
import { ref } from 'vue';
import { dropdownValues } from './data';

export const searchDeparture = (event, filteredDepartures) => {
  const query = event.query.toLowerCase();
  filteredDepartures.value = dropdownValues.filter((item) =>
    item.toLowerCase().includes(query)
  );
};

export const searchDestination = (event, filteredDestinations) => {
  const query = event.query.toLowerCase();
  filteredDestinations.value = dropdownValues.filter((item) =>
    item.toLowerCase().includes(query)
  );
};
