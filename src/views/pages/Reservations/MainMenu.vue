<script setup>
import { ref , watch } from 'vue';
import { useRouter } from 'vue-router';

const calendarValue = ref(null);
const departure = ref('Tunis Carthage Airport');
const destination = ref(null);
const loading = ref([false, false]);
const interacted = ref(false); // Track if the user has interacted with the fields

const dropdownValues = [
  'Hammamet',
  'Tunis',
  'Tunis Carthage Airport',
  'Monastir Airport',
  'Sousse',
  'Monastir',
  'Enfidha Hammamet Airport',
  'Zaghouan',
  'Nabeul',
  'Korba',
  'Kélibia',
  'El Haouaria',
  'Borj Cédria',
  'Kairouan',
  'Tozeur',
  'El Jem',
  'Zarzis',
  'Djerba',
  'Beja',
  'Tabarka',
  'Sfax',
  'Port La Goulette'
];

const filteredDepartures = ref([]);


const searchDeparture = (event) => {
  const query = event.query.toLowerCase();
  filteredDepartures.value = dropdownValues.filter((item) =>
    item.toLowerCase().includes(query)
  );
};

// Check if the selected departure is valid when the autocomplete is blurred
const checkDepartureValidity = () => {
  if (departure.value && !dropdownValues.includes(departure.value)) {
      departure.value = ''; // Clear the value if the user confirms
  }
};

const checkDestinationValidity = () => {
  if (destination.value && !dropdownValues.includes(destination.value)) {
      destination.value = ''; // Clear the value if the user confirms
  }
};
const filteredDestinations = ref([]);
const search = (event) => {
  const query = event.query.toLowerCase();
  filteredDestinations.value = dropdownValues.filter((item) =>
    item.toLowerCase().includes(query)
  );
};


const inputNumberAdults = ref(1);
const inputNumberChildren = ref(0);
const inputNumberBabies = ref(0);

const hours = ref(null);
const minutes = ref(null);

const transfers = ref([
  // From Tunis Carthage Airport
  { id: 1, start: 'Tunis Carthage Airport', destination: 'Hammamet', price4Seater: 40, price8Seater: 50 },
  { id: 2, start: 'Tunis Carthage Airport', destination: 'Enfidha Airport', price4Seater: 60, price8Seater: 70 },
  { id: 3, start: 'Tunis Carthage Airport', destination: 'Sousse', price4Seater: 65, price8Seater: 75 },
  { id: 4, start: 'Tunis Carthage Airport', destination: 'Monastir Airport', price4Seater: 55, price8Seater: 70 },
  { id: 5, start: 'Tunis Carthage Airport', destination: 'Gammarth', price4Seater: 20, price8Seater: 30 },
  { id: 6, start: 'Tunis Carthage Airport', destination: 'Sidi Bou Said', price4Seater: 20, price8Seater: 30 },
  { id: 7, start: 'Tunis Carthage Airport', destination: 'La Marsa', price4Seater: 20, price8Seater: 30 },
  { id: 8, start: 'Tunis Carthage Airport', destination: 'Zaghouan', price4Seater: 40, price8Seater: 50 },
  { id: 9, start: 'Tunis Carthage Airport', destination: 'Korba', price4Seater: 60, price8Seater: 70 },
  { id: 10, start: 'Tunis Carthage Airport', destination: 'Kélibia', price4Seater: 70, price8Seater: 80 },
  { id: 11, start: 'Tunis Carthage Airport', destination: 'El Haouaria', price4Seater: 85, price8Seater: 95 },
  { id: 12, start: 'Tunis Carthage Airport', destination: 'Borj Cédria', price4Seater: 30, price8Seater: 40 },
  { id: 13, start: 'Tunis Carthage Airport', destination: 'Kairouan', price4Seater: 80, price8Seater: 90 },
  { id: 14, start: 'Tunis Carthage Airport', destination: 'Tunis City Center', price4Seater: 17, price8Seater: 20 },
  { id: 15, start: 'Tunis Carthage Airport', destination: 'Tozeur', price4Seater: 150, price8Seater: 180 },
  { id: 16, start: 'Tunis Carthage Airport', destination: 'El Jem', price4Seater: 100, price8Seater: 120 },
  { id: 17, start: 'Tunis Carthage Airport', destination: 'Zarzis', price4Seater: 170, price8Seater: 200 },
  { id: 18, start: 'Tunis Carthage Airport', destination: 'Djerba', price4Seater: 200, price8Seater: 230 },
  { id: 19, start: 'Tunis Carthage Airport', destination: 'Nabeul', price4Seater: 45, price8Seater: 55 },
  { id: 20, start: 'Tunis Carthage Airport', destination: 'Mahdia', price4Seater: 100, price8Seater: 120 },
  { id: 21, start: 'Tunis Carthage Airport', destination: 'Beja', price4Seater: 100, price8Seater: 120 },
  { id: 22, start: 'Tunis Carthage Airport', destination: 'Tabarka', price4Seater: 140, price8Seater: 160 },
  { id: 23, start: 'Tunis Carthage Airport', destination: 'Sfax', price4Seater: 120, price8Seater: 140 },
  { id: 24, start: 'Tunis Carthage Airport', destination: 'Port La Goulette', price4Seater: 25, price8Seater: 35 },
  
  // From Enfidha Airport
  { id: 25, start: 'Enfidha Hammamet Airport', destination: 'Hammamet', price4Seater: 30, price8Seater: 40 },
  { id: 26, start: 'Enfidha Hammamet Airport', destination: 'Sousse', price4Seater: 35, price8Seater: 45 },
  { id: 27, start: 'Enfidha Hammamet Airport', destination: 'Tunis City Center', price4Seater: 60, price8Seater: 70 },
  { id: 28, start: 'Enfidha Hammamet Airport', destination: 'Nabeul', price4Seater: 40, price8Seater: 50 },
  { id: 29, start: 'Enfidha Hammamet Airport', destination: 'Monastir Airport', price4Seater: 40, price8Seater: 50 },
  { id: 30, start: 'Enfidha Hammamet Airport', destination: 'Zaghouan', price4Seater: 40, price8Seater: 50 },
  { id: 31, start: 'Enfidha Hammamet Airport', destination: 'Mahdia', price4Seater: 70, price8Seater: 80 },
  { id: 32, start: 'Enfidha Hammamet Airport', destination: 'Korba', price4Seater: 60, price8Seater: 70 },
  { id: 33, start: 'Enfidha Hammamet Airport', destination: 'Kélibia', price4Seater: 70, price8Seater: 80 },
  { id: 34, start: 'Enfidha Hammamet Airport', destination: 'El Haouaria', price4Seater: 85, price8Seater: 95 },
  { id: 35, start: 'Enfidha Hammamet Airport', destination: 'Djerba', price4Seater: 180, price8Seater: 200 },
  { id: 36, start: 'Enfidha Hammamet Airport', destination: 'Kairouan', price4Seater: 60, price8Seater: 70 },
  { id: 37, start: 'Enfidha Hammamet Airport', destination: 'Borj Cédria', price4Seater: 55, price8Seater: 65 },
  { id: 38, start: 'Enfidha Hammamet Airport', destination: 'Tabarka', price4Seater: 160, price8Seater: 180 },
  { id: 39, start: 'Enfidha Hammamet Airport', destination: 'Beja', price4Seater: 140, price8Seater: 160 },
  { id: 40, start: 'Enfidha Hammamet Airport', destination: 'Tozeur', price4Seater: 145, price8Seater: 175 },
  { id: 41, start: 'Enfidha Hammamet Airport', destination: 'Zarzis', price4Seater: 170, price8Seater: 190 },
  { id: 42, start: 'Enfidha Hammamet Airport', destination: 'El Jem', price4Seater: 90, price8Seater: 110 },
  { id: 43, start: 'Enfidha Hammamet Airport', destination: 'Sfax', price4Seater: 100, price8Seater: 130 },

  // From Monastir Airport
  { id: 44, start: 'Monastir Airport', destination: 'Hammamet', price4Seater: 42, price8Seater: 50 },
  { id: 45, start: 'Monastir Airport', destination: 'Nabeul', price4Seater: 55, price8Seater: 65 },
  { id: 46, start: 'Monastir Airport', destination: 'Mahdia', price4Seater: 40, price8Seater: 50 },
  { id: 47, start: 'Monastir Airport', destination: 'Tunis City Center', price4Seater: 70, price8Seater: 80 },
  { id: 48, start: 'Monastir Airport', destination: 'Djerba', price4Seater: 180, price8Seater: 200 },
  { id: 49, start: 'Monastir Airport', destination: 'Kairouan', price4Seater: 50, price8Seater: 60 },
  { id: 50, start: 'Monastir Airport', destination: 'Sousse', price4Seater: 30, price8Seater: 40 },
  { id: 51, start: 'Monastir Airport', destination: 'Borj Cédria', price4Seater: 70, price8Seater: 80 },
  { id: 52, start: 'Monastir Airport', destination: 'Tozeur', price4Seater: 150, price8Seater: 170 },
  { id: 53, start: 'Monastir Airport', destination: 'Korba', price4Seater: 80, price8Seater: 90 },
  { id: 54, start: 'Monastir Airport', destination: 'Tabarka', price4Seater: 170, price8Seater: 190 },
  { id: 55, start: 'Monastir Airport', destination: 'Kélibia', price4Seater: 100, price8Seater: 120 },
  { id: 56, start: 'Monastir Airport', destination: 'Zarzis', price4Seater: 170, price8Seater: 190 },
  { id: 57, start: 'Monastir Airport', destination: 'Sfax', price4Seater: 90, price8Seater: 110 },
 // New transfers from Tunis 
  { id: 58, start: 'Tunis', destination: 'Hammamet', price4Seater: 40, price8Seater: 50 },
  { id: 59, start: 'Tunis', destination: 'Enfidha Airport', price4Seater: 60, price8Seater: 70 },
  { id: 60, start: 'Tunis', destination: 'Sousse', price4Seater: 65, price8Seater: 75 },
  { id: 61, start: 'Tunis', destination: 'Monastir Airport', price4Seater: 55, price8Seater: 70 },
  { id: 62, start: 'Tunis', destination: 'Gammarth', price4Seater: 20, price8Seater: 30 },
  { id: 63, start: 'Tunis', destination: 'Sidi Bou Said', price4Seater: 20, price8Seater: 30 },
  { id: 64, start: 'Tunis', destination: 'La Marsa', price4Seater: 20, price8Seater: 30 },
  { id: 65, start: 'Tunis', destination: 'Zaghouan', price4Seater: 40, price8Seater: 50 },
  { id: 66, start: 'Tunis', destination: 'Korba', price4Seater: 60, price8Seater: 70 },
  { id: 67, start: 'Tunis', destination: 'Kélibia', price4Seater: 70, price8Seater: 80 },
  { id: 68, start: 'Tunis', destination: 'El Haouaria', price4Seater: 85, price8Seater: 95 },
  { id: 69, start: 'Tunis', destination: 'Borj Cédria', price4Seater: 30, price8Seater: 40 },
  { id: 70, start: 'Tunis', destination: 'Kairouan', price4Seater: 80, price8Seater: 90 },
  { id: 71, start: 'Tunis', destination: 'Tunis City Center', price4Seater: 17, price8Seater: 20 },
  { id: 72, start: 'Tunis', destination: 'Tozeur', price4Seater: 150, price8Seater: 180 },
  { id: 73, start: 'Tunis', destination: 'El Jem', price4Seater: 100, price8Seater: 120 },
  { id: 74, start: 'Tunis', destination: 'Zarzis', price4Seater: 170, price8Seater: 200 },
  { id: 75, start: 'Tunis', destination: 'Djerba', price4Seater: 200, price8Seater: 230 },
  { id: 76, start: 'Tunis', destination: 'Nabeul', price4Seater: 45, price8Seater: 55 },
  { id: 77, start: 'Tunis', destination: 'Mahdia', price4Seater: 100, price8Seater: 120 },
  { id: 78, start: 'Tunis', destination: 'Beja', price4Seater: 100, price8Seater: 120 },
  { id: 79, start: 'Tunis', destination: 'Tabarka', price4Seater: 140, price8Seater: 160 },
  { id: 80, start: 'Tunis', destination: 'Sfax', price4Seater: 120, price8Seater: 140 },
  { id: 81, start: 'Tunis', destination: 'Port La Goulette', price4Seater: 25, price8Seater: 35 },
]);

const filters1 = ref({
  global: { value: null }
});

// Use the router for navigation
const router = useRouter();

const validateFields = () => {
  return calendarValue.value && departure.value && destination.value &&
         (inputNumberAdults.value > 0 || inputNumberChildren.value > 0 || inputNumberBabies.value > 0) &&
         (hours.value >= 0 && minutes.value >= 0); // Ensure hours and minutes are non-negative
};

const load = (index) => {
  interacted.value = true; // Set interacted to true on button click

  if (!validateFields()) {
    // Handle validation failure (e.g., show a message)
    alert("Please fill in all fields before searching.");
    return;
  }
  const price4Seater = ref(null);
const price8Seater = ref(null);

function getPrice4Seater(departure, destination) {
  // Attempt to find the transfer from departure to destination
  let transfer = transfers.value.find(
    (t) => t.start === departure && t.destination === destination
  );

  // If no transfer is found, check the inverse route
  if (!transfer) {
    transfer = transfers.value.find(
      (t) => t.start === destination && t.destination === departure
    );
  }

  // If a transfer is found, update the price4Seater value; otherwise, set it to 0
  if (transfer) {
    price4Seater.value = transfer.price4Seater; // Update ref with found price
    return transfer.price4Seater;
  } else {
    price4Seater.value = 0; // Update ref to default price
    return 0; // Default price if no transfer is found
  }
}


function getPrice8Seater(departure, destination) {
  // Attempt to find the transfer from departure to destination
  let transfer = transfers.value.find(
    (t) => t.start === departure && t.destination === destination
  );

  // If no transfer is found, check the inverse route
  if (!transfer) {
    transfer = transfers.value.find(
      (t) => t.start === destination && t.destination === departure
    );
  }

  // If a transfer is found, update the price8Seater value; otherwise, set it to 0
  if (transfer) {
    price8Seater.value = transfer.price8Seater; // Update ref with found price
    return transfer.price8Seater;
  } else {
    price8Seater.value = 0; // Update ref to default price
    return 0; // Default price if no transfer is found
  }
}



// Create an object with all the reservation data
const reservationData = {
  calendarValue: calendarValue.value,
  departure: departure.value, // send the name instead of the object
  destination: destination.value, // send the name instead of the object
  inputNumberAdults: inputNumberAdults.value,
  inputNumberChildren: inputNumberChildren.value,
  inputNumberBabies: inputNumberBabies.value,
  hours: hours.value,
  minutes: minutes.value,
  price4Seater: getPrice4Seater(departure.value, destination.value),
  price8Seater:getPrice8Seater(departure.value, destination.value)
};

  loading.value[index] = true;
  setTimeout(() => {
    loading.value[index] = false;
    // Navigate to /ReservationDetails route with query parameters
    router.push({
      path: '/ReservationDetails',
      query: reservationData
    });
  }, 1000);
};


// Compute validation states
const isCalendarInvalid = () => interacted.value && !calendarValue.value;
const isDepartureInvalid = () => interacted.value && !departure.value;
const isDestinationInvalid = () => interacted.value && !destination.value;
const arePassengersInvalid = () => interacted.value && inputNumberAdults.value <= 0 && inputNumberChildren.value <= 0 && inputNumberBabies.value <= 0;
const areTimeInvalid = () => interacted.value && (hours.value < 0 || minutes.value < 0);
</script>

<template>
  <Fluid class="flex flex-col gap-8">
    <div class="custom-card relative w-full flex-grow mb-8 ">
      
      <img
  src="/demo/images/autoroute.jpg"
  alt="Background"
  class="rounded-xl absolute inset-0 object-cover w-full h-[calc(100%+4rem)] -top-6 -bottom-2 opacity-90"
/>



  
      <div class="relative z-10 flex flex-col lg:flex-row px-4" >
        <div class="flex-1 flex flex-col justify-center mb-4 lg:mb-0 lg:mr-4 mx-4" >
          <h1 class="text-3xl font-bold mb-2 text-white">Reserve Your Taxi Right Now</h1>
          <h2 class="text-xl font-semibold text-white">We transport all across Tunisia</h2>
        </div>
        
        <div class="relative z-10 card flex flex-col gap-4 p-4 bg-white bg-opacity-90 max-w-md mx-auto rounded-lg shadow-lg mx-4">
          <div class="font-semibold text-xl mb-2">Select Date</div>
<DatePicker
  :showIcon="true"
  :showButtonBar="true"
  v-model="calendarValue"
  placeholder="Pick a date"
  :class="{ 'border-red-500': isCalendarInvalid() }"
  :minDate="new Date()"  
/>


          <div class="font-semibold text-xl mb-2">Select Time</div>
          <div class="flex gap-4">
            <InputNumber 
              v-model="hours" 
              :min=0
              :max=23 
              showButtons 
              placeholder="Hours" 
              class="w-20" 
              :class="{ 'border-red-500': areTimeInvalid() }"  
            />
            <InputNumber 
              v-model="minutes" 
              :min=0 
              :max=59 
              showButtons 
              placeholder="Minutes" 
              class="w-20" 
              :class="{ 'border-red-500': areTimeInvalid() }"  
            />
          </div>

          <div class="font-semibold text-xl mb-2">Select Departure</div>
          <AutoComplete 
  v-model="departure"
  :suggestions="filteredDepartures"
  @complete="searchDeparture"
  @blur="checkDepartureValidity"
  placeholder="Select Departure"
  :class="{ 'border-red-500': isDepartureInvalid() }"
/>
            <!-- Invert button -->
  <div class="flex justify-center my-2">

  </div>
          <div class="font-semibold text-xl mb-2">Select Destination</div>
        
          <AutoComplete 
  v-model="destination"
  :suggestions="filteredDestinations"
  @complete="search"
  @blur="checkDestinationValidity"
    placeholder="Select Destination"
  :class="{ 'border-red-500': isDestinationInvalid() }"
  
/>
          <div class="mb-4">
            <div class="font-semibold text-xl mb-2">Passengers</div>
            <div class="grid grid-cols-3 gap-4">
              <div class="flex flex-col">
                <div class="font-semibold mb-2">Adults</div>
                <InputNumber 
  v-model="inputNumberAdults" 
  showButtons 
  mode="decimal" 
  placeholder="0"
  :min="1"  
  class="w-24" 
  :class="{ 'border-red-500': arePassengersInvalid() }"  
/>

              </div>
              <div class="flex flex-col">
                <div class="font-semibold mb-2">Children</div>
                <InputNumber 
  v-model="inputNumberChildren" 
  showButtons 
  mode="decimal" 
  placeholder="0" 
  :min="0"  
  class="w-24" 
  :class="{ 'border-red-500': arePassengersInvalid() }"  
/>
              </div>
              <div class="flex flex-col">
                <div class="font-semibold mb-2">Babies</div>
                <InputNumber 
  v-model="inputNumberBabies" 
  showButtons 
  mode="decimal" 
  placeholder="0" 
  :min="0"  
  class="w-24" 
  :class="{ 'border-red-500': arePassengersInvalid() }" 
/>
              </div>
            </div>
          </div>

          <Button
            type="button"
            label="Search"
            icon="pi pi-search"
            :loading="loading[0]"
            @click="load(0)"
          />
        </div>
      </div>
    </div>


    <!-- Transfers Table -->
    <div class="custom-card flex flex-col gap-4 p-4 w-full mb-8">
      <h2 class="font-semibold text-xl mb-4">Transfer tarifs</h2>
      <div class="flex justify-between">
        <InputText v-model="filters1['global'].value" placeholder="Search" />
      </div>
      <div class="w-full overflow-y-auto mb-8">
        <DataTable
          :value="transfers"
          :paginator="false"
          :rows="10"
          dataKey="id"
          :rowHover="true"
          v-model:filters="filters1"
          filterDisplay="menu"
          :loading="loading[1]"
          :filters="filters1"
          showGridlines
        >
          <template #empty>No transfers found.</template>
          <template #loading>Loading transfers data. Please wait.</template>
          <Column field="start" header="Start" style="min-width: 12rem">
            <template #body="{ data }">{{ data.start }}</template>
          </Column>
          <Column field="destination" header="Destination" style="min-width: 12rem">
            <template #body="{ data }">{{ data.destination }}</template>
          </Column>
          <Column field="price" header="Price 4 seater" style="min-width: 10rem">
            <template #body="{ data }">{{ data.price4Seater }} €</template>
          </Column>
          <Column field="price" header="Price 8 seater" style="min-width: 10rem">
            <template #body="{ data }">{{ data.price8Seater}} €</template>
          </Column>
        </DataTable>
      </div>
    </div>
  </Fluid>
</template>

<style>
.border-red-500 {
  border: 2px solid red; /* Define red border */
}
.custom-card {
  border-radius: 30px; /* Fully circular corners */

  padding: 1rem; /* Adjust as needed */
  margin-bottom: 2rem; /* Adjust as needed */
  background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white */
  border-radius: 0.5rem; /* Adjust border radius as needed */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Elevation/shadow effect */
}
</style>
