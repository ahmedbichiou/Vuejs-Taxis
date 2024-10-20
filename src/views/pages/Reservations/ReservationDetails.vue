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
    <div class="reservation-details">
      <div class="font-semibold text-xl mb-4">Reservation Details</div>

      <!-- Display reservation details -->
      <div class="mb-4">
        <p><strong>Date:</strong> {{ formattedDate  }}<strong>  Time:</strong> {{ reservationData.hours }}:{{ reservationData.minutes }}</p>
        <p>{{ reservationData.departure }} <strong>To</strong> {{ reservationData.destination }}</p>
        
        <div class="flex items-center mb-2">
    <span class="mr-2"><strong>Adults:</strong> 👤 {{ reservationData.inputNumberAdults }}</span>
    <span class="mr-2"><strong>Children:</strong> 👶 {{ reservationData.inputNumberChildren }}</span>
    <span><strong>Babies:</strong> 👶 {{ reservationData.inputNumberBabies }}</span>
  </div>
       
      </div>

      <!-- Display user details -->
      <div class="mb-4">
        <p><strong>Firstname:</strong> {{ fullName }}</p>
        <p><strong>Lastname:</strong> {{ surname }}</p>
        <p><strong>Phone Number:</strong> {{ number }}</p>
        <p><strong>Email:</strong> {{ email }}</p>
        <p v-if="flightName"><strong>Flight Name:</strong> {{ flightName }}</p>
        <p v-if="extraDescription"><strong>Extra Description:</strong> {{ extraDescription }}</p>
      </div>

  

      <!-- Submit button -->
      <Button label="Submit" @click="submitForm" class="w-full mt-4" />
    </div>
  </div>

      <div v-if="currentStep === 1" class="step-content">
        <!-- Carousel for Car Selection -->
        <div>
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
                           
                            <span>
                              <div class="mt-0 font-semibold text-xl">${{ slotProps.data.price }}</div>
                            </span>
                        </div>
                    </div>
                </template>
            </Carousel>
            <Button label="Confirm" class="confirm-button" @click="Step2" />
        </div>
  
      </div>

<!-- Step 2: Complete Details Form -->
<div v-if="currentStep === 2" class="step-content">
  <!-- Using Advanced Layout Structure for the Form -->
  <div>
    <div class="flex flex-col gap-4 w-full">
      <div class="font-semibold text-xl">Complete Your Details</div>

      <!-- First and Last Name fields in two columns -->
      <div class="flex flex-col md:flex-row gap-4">
        <div class="w-full">
          <label for="fullName">Firstname</label>
          <InputText id="fullName" v-model="fullName" placeholder="Enter your firstname" class="w-full" />
        </div>
        <div class="w-full">
          <label for="surname">Lastname</label>
          <InputText id="surname" v-model="surname" placeholder="Enter your lastname" class="w-full" />
        </div>
      </div>

      <!-- Phone Number field -->
      <div class="flex flex-col md:flex-row gap-4">
        <div class="w-full">
          <label for="number">Phone Number</label>
          <InputText id="number" v-model="number" type="number" placeholder="Enter your phone number" class="w-full" />
        </div>
      </div>

      <!-- Email and Flight Name fields in two columns -->
      <div class="flex flex-col md:flex-row gap-4">
        <div class="w-full">
          <label for="email">Email</label>
          <InputText id="email" v-model="email" type="email" placeholder="Enter your email" class="w-full" />
        </div>
        <div class="w-full">
          <label for="flightName">Flight Name (optional)</label>
          <InputText id="flightName" v-model="flightName" placeholder="Enter your flight name" class="w-full" />
        </div>
      </div>

      <!-- Extra description field -->
      <div class="flex flex-col gap-2 w-full">
        <label for="extraDescription">Extra Description (optional)</label>
        <Textarea id="extraDescription" v-model="extraDescription" rows="4" placeholder="Enter any extra details" class="w-full" />
      </div>

      <!-- Submit Button -->
      <Button label="Confirm" @click="Step3" class="confirm-button w-full" />
    </div>
  </div>
</div>

    </div>
  </div>
</template>

<script setup>


import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import Carousel from 'primevue/carousel';
import Button from 'primevue/button';
import { GraphQLClient, gql } from 'graphql-request';
// GraphQL mutation


// Car options for the carousel
const cars = ref([
  { name: 'Normal car', image: 'polo_sedan.png', price: 40 },
  { name: 'High end car', image: 'Octavia.png', price: 45 },
  { name: '8-seater', image: 'transporter.png', price: 60 },
]);

// Route data to access reservation details
const route = useRoute();
const reservationData = route.query;

// State for current step and selected car
const currentStep = ref(1);
const selectedCar = ref(null);

// New properties
const fullName = ref('');
const surname = ref('');
const number = ref('');
const email = ref('');
const flightName = ref('');
const extraDescription = ref(''); // Added this line

// Carousel responsive options
const carouselResponsiveOptions = [
  { breakpoint: '1024px', numVisible: 3, numScroll: 1 },
  { breakpoint: '768px', numVisible: 2, numScroll: 1 },
  { breakpoint: '560px', numVisible: 1, numScroll: 1 },
];

// Validation states
const errors = ref({
  fullName: '',
  surname: '',
  number: '',
  email: '',
});

const isValidStep2 = computed(() => {
  let valid = true;
  errors.value.fullName = '';
  errors.value.surname = '';
  errors.value.number = '';
  errors.value.email = '';

  if (!fullName.value) {
    errors.value.fullName = 'Firstname is required.';
    valid = false;
  }
  if (!surname.value) {
    errors.value.surname = 'Lastname is required.';
    valid = false;
  }
  
  if (email.value && !/\S+@\S+\.\S+/.test(email.value)) {
    errors.value.email = 'Email is invalid.';
    valid = false;
  }

  return valid;
});

const isValidStep1 = computed(() => selectedCar.value !== null);
const Step2 = () => {
  if (!isValidStep1.value) {
    alert('Please select a car.');
    return;
  }
  currentStep.value = 2;
  scrollToNextStep();
};
const Step3 = () => {
  if (!isValidStep2.value) {
    alert('Please fix the errors before proceeding.');
    return;
  }
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

// Mutate function from Apollo Composable


async function submitForm() {
    // Initialize the GraphQL client pointing to your GraphQL server endpoint
    const client = new GraphQLClient('https://localhost:5001/graphql');

    // Define the GraphQL mutation to insert a new transfer
    const INSERT_TRANSFER = gql`
      mutation {
        createTransfer(input: {
          id: "transfer-001",
          start: "Location A",
          end: "Location B",
          price: 200,
          clientId: "client-001",
          date: "2024-10-12",
          time: "09:00 AM",
          description: "Airport transfer"
        }) {
          id
          start
          end
          price
          clientId
          date
          time
          description
        }
      }
    `;

    console.log('Insert Mutation:', INSERT_TRANSFER);

    try {
      // Send the mutation request to the server
      const response = await client.request(INSERT_TRANSFER);
      
      // Extract the inserted transfer information from the response
      const newTransfer = response.createTransfer;

      // Optionally update local state or perform any action with the inserted transfer
      console.log('New transfer created successfully:', newTransfer);

    } catch (err) {
      // Handle any errors that occur during the request
      console.error('Error creating new transfer:', err);
    }
}

const scrollToNextStep = () => {
  const nextStepElement = document.querySelector('.step-content:nth-of-type(' + currentStep.value + ')');
  if (nextStepElement) {
    nextStepElement.scrollIntoView({ behavior: 'smooth' });
  }
};

const formattedDate = computed(() => {
  const date = new Date(reservationData.calendarValue); // Convert to Date object
  return date.toLocaleDateString(); // Format as 'MM/DD/YYYY' or your preferred format
});

</script>

<style scoped>



/* Mobile Layout (Below 768px) */
@media (max-width: 767px) {

  .multi-step-form {
  display: flex;
  flex-direction: column;
}


  .progress-indicator {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 16px; /* More rounded corners */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* More elevated shadow for a stronger effect */
}
.confirm-button {
  width: 100%;
  display: block;
  margin-top: 20px;
}
  .step {
    padding: 10px 20px;
    margin: 5px;
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

  .step.inactive {
    opacity: 0.3; /* Grayed out for inactive steps */
    cursor: default;
  }
  
}


/* Grid styles for desktop */
@media (min-width: 768px) {

  .multi-step-form {
  display: flex;
  flex-direction: column;
  margin-left: 25vh;
  margin-right: 25vh;
}
  .progress-indicator {
    flex-direction: column;
    width: 100%;
  }
  .multi-step-form {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 20px;
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
}

.reservation-details .font-semibold {
  color: #2c3e50; /* Darker color for the heading */
  font-size: 1.5rem; /* Larger font size */
}

.reservation-details p {
  margin: 10px 0; /* Space between paragraphs */
  font-size: 1rem; /* Base font size */
  color: #34495e; /* Grayish color for text */
}

.reservation-details strong {
  color: #2980b9; /* Color for bold labels */
}

.reservation-details .mb-4 {
  margin-bottom: 20px; /* Extra spacing for bottom margin */
}

.reservation-details Button {
  
  color: white; /* Button text color */
  padding: 10px 15px; /* Padding for the button */
  border: none; /* Remove default border */
  border-radius: 8px; /* Rounded corners for the button */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.3s; /* Smooth background transition */
}

.reservation-details Button:hover {
  background-color: #3498db; /* Lighter blue on hover */
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
  padding: 20px;
  border-radius: 16px; /* More rounded corners */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* More elevated shadow for a stronger effect */
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
