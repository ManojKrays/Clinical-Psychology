export const getValueFromLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error getting value from localStorage:", error);
    return null;
  }
};

export const getValueFromLocalStorageKey = (key, field) => {
  const storedObject = localStorage.getItem(key);

  if (storedObject) {
    try {
      const parsedObject = JSON.parse(storedObject);
      // return parsedObject[field];
      return parsedObject?.[field] ?? null;
    } catch (error) {
      console.log("Error parsing JSON from localStorage:", error);
      return null;
    }
  } else {
    return null;
  }
};

// export const updateValueInLocalStorage = (key, newValue) => {
//     try {
//         const existingValue = JSON.parse(localStorage.getItem(key)) || {};
//         const updatedValue = { ...existingValue, ...newValue };
//         localStorage.setItem(key, JSON.stringify(updatedValue));
//     } catch (error) {
//         console.error("Error updating value in localStorage:", error);
//     }
// };

export const updateValueInLocalStorage = (key, newValue) => {
  try {
    const existingValue = JSON.parse(localStorage.getItem(key)) || {};

    // Only update keys that already exist in the current localStorage object
    const filteredNewValue = Object.keys(newValue).reduce((acc, currKey) => {
      if (existingValue.hasOwnProperty(currKey)) {
        acc[currKey] = newValue[currKey];
      }
      return acc;
    }, {});

    const updatedValue = { ...existingValue, ...filteredNewValue };
    localStorage.setItem(key, JSON.stringify(updatedValue));
  } catch (error) {
    console.error("Error updating value in localStorage:", error);
  }
};
