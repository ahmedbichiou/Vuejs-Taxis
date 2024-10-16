<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const calendarValue = ref(null);
const departure = ref(null);
const destination = ref(null);
const loading = ref([false, false]);
const interacted = ref(false); // Track if the user has interacted with the fields

const dropdownValues = ref([
  { name: 'Hammamet', code: 'HMT' },
  { name: 'Tunis', code: 'TNS' },
  { name: 'Carthage Airport', code: 'CAR' },
  { name: 'Monastir Airport', code: 'MSR' },
  { name: 'Sousse', code: 'SSE' },
  { name: 'Monastir', code: 'MON' }
]);

const inputNumberAdults = ref(1);
const inputNumberChildren = ref(0);
const inputNumberBabies = ref(0);

const hours = ref(0);
const minutes = ref(0);

const transfers = ref([
  { id: 1, start: 'Hammamet', destination: 'Tunis', price: 40 },
  { id: 2, start: 'Monastir', destination: 'Sousse', price: 40 },
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

  // Log input values
  console.log("Inputs:", {
    calendarValue: calendarValue.value,
    departure: departure.value,
    destination: destination.value,
    inputNumberAdults: inputNumberAdults.value,
    inputNumberChildren: inputNumberChildren.value,
    inputNumberBabies: inputNumberBabies.value,
    hours: hours.value,
    minutes: minutes.value
  });

  loading.value[index] = true;
  setTimeout(() => {
    loading.value[index] = false;
    // Navigate to /ReservationDetails route
    router.push('/ReservationDetails');
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
    <div class="relative w-full flex-grow mb-8">
      <img
        src="/demo/images/autoroute.jpg"
        alt="Background"
        class=" rounded-xl absolute inset-0 object-cover w-full h-[calc(100%+4rem)] -top-6 -bottom-2 opacity-90"
      />
      <div class="relative z-10 flex flex-col lg:flex-row px-4">
        <div class="flex-1 flex flex-col justify-center mb-4 lg:mb-0 lg:mr-4 mx-4">
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
          <Select
            v-model="departure"
            :options="dropdownValues"
            optionLabel="name"
            placeholder="Select Departure"
            :class="{ 'border-red-500': isDepartureInvalid() }" 
          />
          
          <div class="font-semibold text-xl mb-2">Select Destination</div>
          <Select
            v-model="destination"
            :options="dropdownValues"
            optionLabel="name"
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
    <div class="card flex flex-col gap-4 p-4 w-full mb-8">
      <h2 class="font-semibold text-xl mb-4">Transfers</h2>
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
          <Column field="price" header="Price" style="min-width: 10rem">
            <template #body="{ data }">{{ data.price }} €</template>
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
</style>
