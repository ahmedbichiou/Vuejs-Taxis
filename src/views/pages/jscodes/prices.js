// src/prices.js
import { transfers } from './data';

export function getPrice4Seater(departure, destination) {
  let transfer = transfers.value.find(
    (t) => t.start === departure && t.destination === destination
  );

  if (!transfer) {
    transfer = transfers.value.find(
      (t) => t.start === destination && t.destination === departure
    );
  }

  return transfer ? transfer.price4Seater : 0;
}

export function getPrice8Seater(departure, destination) {
  let transfer = transfers.value.find(
    (t) => t.start === departure && t.destination === destination
  );

  if (!transfer) {
    transfer = transfers.value.find(
      (t) => t.start === destination && t.destination === departure
    );
  }

  return transfer ? transfer.price8Seater : 0;
}
