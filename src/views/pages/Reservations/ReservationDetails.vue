<template>
  <div class="multi-step-form">
    <div class="progress-indicator">
      <div
        class="step"
        :class="{ active: currentStep === 1, completed: currentStep > 1 }"
        @click="goToStep(1)"
      >
        <span>✔️</span> Step 1: Choose Car and Price
      </div>
      <div
        class="step"
        :class="{ active: currentStep === 2, completed: currentStep > 2 }"
        @click="goToStep(2)"
      >
        <span>✔️</span> Step 2: Complete Details
      </div>
      <div
        class="step"
        :class="{ active: currentStep === 3, completed: currentStep > 3 }"
        @click="goToStep(3)"
      >
        <span>✔️</span>  Step 3: Confirm Details
      </div>
    </div>

    <div class="form-content">
      <div v-if="currentStep === 3" class="step-content">
        <!-- Reservation Details Section -->
        <div class="card reservation-details">
          <div class="font-semibold text-xl mb-4">Reservation Details</div>
          <div class="mb-4">
            <p><strong>Date:</strong> {{ reservationData.calendarValue }}</p>
            <p><strong>Departure:</strong> {{ reservationData.departure }}</p>
            <p><strong>Destination:</strong> {{ reservationData.destination }}</p>
            <p><strong>Adults:</strong> {{ reservationData.inputNumberAdults }}</p>
            <p><strong>Children:</strong> {{ reservationData.inputNumberChildren }}</p>
            <p><strong>Babies:</strong> {{ reservationData.inputNumberBabies }}</p>
            <p><strong>Time:</strong> {{ reservationData.hours }}:{{ reservationData.minutes }}</p>
          </div>
          <Button label="Submit" @click="submitForm" />
        </div>
      </div>

      <div v-if="currentStep === 1" class="step-content">
        <!-- Carousel for Car Selection -->
        <div class="card car-selection">
            <div class="font-semibold text-xl mb-4">Choose Your Car</div>
            <Carousel :value="cars" :numVisible="3" :numScroll="1" :responsiveOptions="carouselResponsiveOptions">
                <template #item="slotProps">
                    <div
                        class="car-card"
                        :class="{ selected: selectedCar === slotProps.data }"
                        @click="selectCar(slotProps.data)"
                    >
                        <div class="image-container mb-4">
                            <div class="relative mx-auto">
                                <img
                                    :src="'/demo/images/cars/' + slotProps.data.image"
                                    :alt="slotProps.data.name"
                                    class="w-full h-full object-cover rounded"
                                />
                            </div>
                        </div>
                        <div class="mb-4 font-medium">{{ slotProps.data.name }}</div>
                        <div class="flex justify-between items-center">
                            <div class="mt-0 font-semibold text-xl">${{ slotProps.data.price }}</div>
                            <span>
                                <Button icon="pi pi-shopping-cart" class="ml-2" />
                            </span>
                        </div>
                    </div>
                </template>
            </Carousel>
            <Button label="Confirm" @click="Step2" />
        </div>
  
      </div>

 <!-- Step 3: Complete Details Form -->
 <div v-if="currentStep === 2" class="step-content">
        <!-- Using Advanced Layout Structure for the Form -->
        <div class="flex mt-8">
          <div class="card flex flex-col gap-4 w-full">
            <div class="font-semibold text-xl">Complete Your Details</div>

            <!-- First and Last Name fields in two columns -->
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex flex-wrap gap-2 w-full">
                <label for="fullName">Firstname</label>
                <InputText id="fullName" v-model="fullName" placeholder="Enter your full name" />
              </div>
              <div class="flex flex-wrap gap-2 w-full">
                <label for="surname">Lastname</label>
                <InputText id="surname" v-model="surname" placeholder="Enter your surname" />
              </div>
            </div>

            <!-- Address field -->
            <div class="flex flex-wrap">
              <label for="address">Address</label>
              <Textarea id="address" v-model="address" rows="4" placeholder="Enter your address" />
            </div>



            <!-- Additional optional fields (e.g., email, flight name) -->
            <div class="flex flex-wrap gap-2 w-full">
              <label for="email">Email</label>
              <InputText id="email" v-model="email" type="email" placeholder="Enter your email" />
            </div>

            <div class="flex flex-wrap gap-2 w-full">
              <label for="flightName">Flight Name (optional)</label>
              <InputText id="flightName" v-model="flightName" placeholder="Enter your flight name" />
            </div>

            <!-- Extra description field -->
            <div class="flex flex-wrap">
              <label for="extraDescription">Extra Description (optional)</label>
              <Textarea id="extraDescription" v-model="extraDescription" rows="4" placeholder="Enter any extra details" />
            </div>

            <!-- Submit Button -->
            <Button label="Confirm" @click="Step3" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import Carousel from 'primevue/carousel';
import Button from 'primevue/button';

// Route data to access reservation details
const route = useRoute();
const reservationData = route.query;

// Car options for the carousel
const cars = ref([
  { name: 'Normal car', image: 'polo_sedan.png', price: 40 },
  { name: 'High end car', image: 'Octavia.png', price: 45 },
  { name: '8-seater', image: 'transporter.png', price: 60 },
]);

// State for current step and selected car
const currentStep = ref(1);
const selectedCar = ref(null);

// New properties
const fullName = ref('');
const surname = ref('');
const address = ref('');
const email = ref('');
const flightName = ref('');
const extraDescription = ref(''); // Added this line

// Carousel responsive options
const carouselResponsiveOptions = [
  { breakpoint: '1024px', numVisible: 3, numScroll: 1 },
  { breakpoint: '768px', numVisible: 2, numScroll: 1 },
  { breakpoint: '560px', numVisible: 1, numScroll: 1 },
];

// Methods
const Step2 = () => {
  currentStep.value = 2;
  scrollToNextStep();
};
const Step3 = () => {
  currentStep.value = 3;
  scrollToNextStep();
};
const goToStep = (step) => {
  if (step < currentStep.value) {
      currentStep.value = step;
      scrollToNextStep();
  }
};

const selectCar = (car) => {
  selectedCar.value = car;
};

const submitForm = () => {
  // Handle form submission logic here
  alert(`You selected the ${selectedCar.value.name} car.`);
};

const scrollToNextStep = () => {
  const nextStepElement = document.querySelector('.step-content:nth-of-type(' + currentStep.value + ')');
  if (nextStepElement) {
      nextStepElement.scrollIntoView({ behavior: 'smooth' });
  }
};

</script>

<style scoped>
.multi-step-form {
  display: flex;
  flex-direction: column;
}

/* Grid layout for desktop, flexbox for mobile */
@media (min-width: 768px) {
  .multi-step-form {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 20px;
  }
}

/* Steps stay stacked on mobile */
.progress-indicator {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

/* Grid styles for desktop */
@media (min-width: 768px) {
  .progress-indicator {
    flex-direction: column;
    width: 100%;
  }
}

.step {
  padding: 10px 20px;
  margin: 5px;
  background-color: #f3f3f3;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
  cursor: pointer;
  text-align: center;
}

.step.active {
  background-color: #007bff;
  color: white;
  transform: scale(1.05);
}

.step.completed {
  background-color: #c3e6cb;
  color: #155724;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
/* Styles for car cards */
.car-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    transition: border 0.3s ease, transform 0.2s;
    cursor: pointer;
    margin: 0 10px; /* Add space between carousel items */
    height: 250px; /* Increased height for the car card */
}
  
  /* Highlight the selected car with a green border */
  .car-card.selected {
    border-color: green;
    box-shadow: 0 4px 12px rgba(0, 128, 0, 0.4); /* Green glow effect */
    transform: scale(1.00);
  }
  
  .image-container {
    height: 180px; /* Increased height for the image container */
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
  
/* Ensure the image fills the container without clipping */
img {
    max-height: 100%;
    width: auto;
}
</style>
