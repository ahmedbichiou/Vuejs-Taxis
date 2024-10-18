<template>
    <div class="multi-step-form">
      <div class="progress-indicator">
        <div
          class="step"
          :class="{ active: currentStep === 1, completed: currentStep > 1 }"
          @click="goToStep(1)"
        >
          Step 1: Confirm Reservation
        </div>
        <div
          class="step"
          :class="{ active: currentStep === 2, completed: currentStep > 2 }"
          @click="goToStep(2)"
        >
          Step 2: Choose Your Car
        </div>
      </div>
  
      <div class="form-content">
        <div v-if="currentStep === 1" class="step-content">
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
            <Button label="Confirm" @click="confirmReservation" />
          </div>
        </div>
  
        <div v-if="currentStep === 2" class="step-content">
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
            <Button label="Submit" @click="submitForm" />
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
    { name: 'Polo Sedan', image: 'polo_sedan.png', price: 40 },
    { name: 'Octavia', image: 'Octavia.png', price: 45 },
    { name: '8-seater', image: 'transporter.png', price: 60 },
  ]);
  
  // State for current step and selected car
  const currentStep = ref(1);
  const selectedCar = ref(null);
  
  // Carousel responsive options
  const carouselResponsiveOptions = [
    { breakpoint: '1024px', numVisible: 3, numScroll: 1 },
    { breakpoint: '768px', numVisible: 2, numScroll: 1 },
    { breakpoint: '560px', numVisible: 1, numScroll: 1 },
  ];
  
  // Methods
  const confirmReservation = () => {
    currentStep.value = 2;
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
  
  .progress-indicator {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .step {
    padding: 10px 20px;
    margin: 5px;
    background-color: #f3f3f3;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s, transform 0.3s;
    cursor: pointer;
    flex-grow: 1;
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
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .step-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .card {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
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
    transform: scale(1.05);
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
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .progress-indicator {
      flex-direction: column;
    }
  
    .step {
      width: 100%; /* Make steps take full width on mobile */
    }
  }
  </style>
  