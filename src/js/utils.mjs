// utils.mjs

// Query selector helper
export const qs = (selector, parent = document) => parent.querySelector(selector);

// Get data from localStorage
export const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

// Save data to localStorage
export const setLocalStorage = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));

// Helper to get URL parameter
export const getParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};
