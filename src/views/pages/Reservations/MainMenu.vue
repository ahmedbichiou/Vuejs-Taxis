<script setup>
import { ref, watch } from 'vue';

const calendarValue = ref(null);
const departure = ref(null);
const destination = ref(null);
const loading = ref([false, false]);

const dropdownValues = ref([
  { name: 'Hammamet', code: 'HMT' },
  { name: 'Tunis', code: 'TNS' },
  { name: 'Carthage Airport', code: 'CAR' },
  { name: 'Monastir Airport', code: 'MSR' },
  { name: 'Sousse', code: 'SSE' },
  { name: 'Monastir', code: 'MON' }
]);

const load = (index) => {
  loading.value[index] = true;
  setTimeout(() => (loading.value[index] = false), 1000);
};

// Initialize pax as refs to ensure they are reactive

const inputNumberAdults = ref(1);
const inputNumberChildren = ref(0);
const inputNumberBabies = ref(0);
// Watchers to ensure values remain above 0
watch(inputNumberAdults, (newValue) => {
  if (newValue < 1) {
    inputNumberAdults.value = 1; // Reset to 1 if below 1
  }
});

watch(inputNumberChildren, (newValue) => {
  if (newValue < 1) {
    inputNumberChildren.value = 1; // Reset to 1 if below 1
  }
});

watch(inputNumberBabies, (newValue) => {
  if (newValue < 1) {
    inputNumberBabies.value = 1; // Reset to 1 if below 1
  }
});

const transfers = ref([
  { id: 1, start: 'Hammamet', destination: 'Tunis', price: 40 },
  { id: 2, start: 'Monastir', destination: 'Sousse', price: 40 },
  { id: 3, start: 'Monastir', destination: 'Sousse', price: 40 },
  { id: 4, start: 'Monastir', destination: 'Sousse', price: 40 },
  { id: 5, start: 'Monastir', destination: 'Sousse', price: 40 },
  { id: 6, start: 'Monastir', destination: 'Sousse', price: 40 }
]);

const filters1 = ref({
  global: { value: null }
});
</script>

<template>
    <Fluid class="flex flex-col h-screen gap-8">
      <div class="relative w-full flex-grow mb-8">
        <img
          src="/demo/images/autoroute.jpg"
          alt="Background"
          class=" rounded-xl absolute inset-0 object-cover w-full h-[calc(100%+4rem)] -top-6 -bottom-2 opacity-90"
        />
        <div class="relative z-10 flex flex-col lg:flex-row px-4"> <!-- Added padding on the left and right -->
          <div class="flex-1 flex flex-col justify-center mb-4 lg:mb-0 lg:mr-4 mx-4"> <!-- Added margin -->
            <h1 class="text-3xl font-bold mb-2 text-white">Reserve Your Taxi Right Now</h1> <!-- Set text color to white -->
            <h2 class="text-xl font-semibold text-white">We transport all across Tunisia</h2> <!-- Set text color to white -->
          </div>
          <div class="relative z-10 card flex flex-col gap-4 p-4 bg-white bg-opacity-90 max-w-md mx-auto rounded-lg shadow-lg mx-4"> <!-- Added margin -->
            <div class="font-semibold text-xl mb-2">Select Date</div>
            <DatePicker
              :showIcon="true"
              :showButtonBar="true"
              v-model="calendarValue"
              placeholder="Pick a date"
            />
            <div class="font-semibold text-xl mb-2">Select Departure</div>
            <Select
              v-model="departure"
              :options="dropdownValues"
              optionLabel="name"
              placeholder="Select Departure"
            />
            <div class="font-semibold text-xl mb-2">Select Destination</div>
            <Select
              v-model="destination"
              :options="dropdownValues"
              optionLabel="name"
              placeholder="Select Destination"
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
                    class="w-24"
                  />
                </div>
                <div class="flex flex-col">
                  <div class="font-semibold mb-2">Children</div>
                  <InputNumber
                    v-model="inputNumberChildren"
                    showButtons
                    mode="decimal"
                    placeholder="0"
                    class="w-24"
                  />
                </div>
                <div class="flex flex-col">
                  <div class="font-semibold mb-2">Babies</div>
                  <InputNumber
                    v-model="inputNumberBabies"
                    showButtons
                    mode="decimal"
                    placeholder="0"
                    class="w-24"
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
      <div class="w-full  mb-8">
        <div class="card flex flex-col gap-4 p-4">
          <h2 class="font-semibold text-xl mb-4">Transfers</h2>
          <DataTable
            :value="transfers"
            :paginator="true"
            :rows="10"
            dataKey="id"
            :rowHover="true"
            v-model:filters="filters1"
            filterDisplay="menu"
            :loading="loading[1]"
            :filters="filters1"
            showGridlines
          >
            <template #header>
              <div class="flex justify-between">
                
                <InputText
                  v-model="filters1['global'].value"
                  placeholder="Keyword Search"
                />
              </div>
            </template>
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
  