const submitHandler = (event) => {
  event.preventDefault();

  const form = document.querySelector("#park-form");
  const formData = new FormData(form);

  // Keep track of if any errors are found
  let hasErrors = false;

  formData.forEach((value, key) => {
    let errorId = `#${key}-error`;
    if (value.trim() === "") {
      document.querySelector(errorId).style.display = "block";
      hasErrors = true;
    } else {
      document.querySelector(errorId).style.display = "none";
    }
  });

  // if there are no errors
  if (!hasErrors) {
    // Create an empty object
    const park = {
      name: formData.get("name"),
      location: formData.get("location"),
      description: formData.get("description"),
      established: formData.get("established"),
      area: formData.get("area"),
      rating: formData.get("rating"),
    };

    parks.push(park);

    render();
  }
};

// function to handler favorite button clicks
const favoriteButtonClickHandler = (event) => {
  if (event.target && event.target.nodeName === "BUTTON") {
    const park = event.target.parentNode;
    park.style.backgroundColor = "#c8e6c9";
  }
};

// function for sorting by name
const sortByName = (parkA, parkB) => {
  const parkAName = parkA.name;
  const parkBName = parkB.name;
  if (parkAName < parkBName) {
    return -1;
  } else if (parkAName > parkBName) {
    return 1;
  } else {
    return 0;
  }
};

// function for sorting by rating
const sortByRating = (parkA, parkB) => {
  const parkARating = parseFloat(parkA.rating);
  const parkBRating = parseFloat(parkB.rating);
  if (parkARating < parkBRating) {
    return 1;
  } else if (parkARating > parkBRating) {
    return -1;
  } else {
    return 0;
  }
};

// function for handling the nameSorter click
const nameSorterClickHandler = (event) => {
  event.preventDefault();

  parks.sort(sortByName);

  render();
};

// function to handle the ratingSorter click
const ratingSorterClickHandler = (event) => {
  event.preventDefault();

  parks.sort(sortByRating);

  render();
};

const renderOnePark = (park) => {
  // Get the individual properties of the park
  const { name, location, description, established, area, rating } = park;

  const content = `
      <section class="park-display">
        <h2>${name}</h2>
        <div class="location-display">${location}</div>
        <div class="description-display">${description}</div>
        <button class="rate-button" title="Add to Favourites">&#9734;</button>
        <div class="stats">
          <div class="established-display stat">
            <h3>Established</h3>
            <div class="value">${established}</div>
          </div>
          <div class="area-display stat">
            <h3>Area</h3>
            <div class="value">${area}</div>
          </div>
          <div class="rating-display stat">
            <h3>Rating</h3>
            <div class="value">${rating}</div>
          </div>
        </div>
      </section>
  `;
  return content;
};

const render = () => {
  // Get the parent element
  const main = document.querySelector("main");

  // Empty the parent element
  main.innerHTML = "";

  // Get the parks HTML
  const content = parks.map(renderOnePark).join("");

  // Set the `innerHTML` of parent element
  main.innerHTML = content;
};


// the point where all the code starts
const main = () => {
  // select the nameSorter link
  const nameSorter = document.querySelector("#name-sorter");

  // add an event listener
  nameSorter.addEventListener("click", nameSorterClickHandler);

  // select the ratingSorter link
  const ratingSorter = document.querySelector("#rating-sorter");

  // add an event listener
  ratingSorter.addEventListener("click", ratingSorterClickHandler);

  // select all the buttons for all the parks
  const allBtns = document.querySelectorAll(".rate-button");

  // iterate the list of buttons and add an event handler to each
  // allBtns.forEach((btn) => {
  //   btn.addEventListener("click", favoriteButtonClickHandler);
  // });

  // Select all the buttons for all the parks
  const main = document.querySelector("main");

  // Add event handler to the main
  main.addEventListener("click", favoriteButtonClickHandler);

  // get the form element
  const form = document.querySelector("#park-form");

  // attach the submit handler
  form.addEventListener("submit", submitHandler);

  // call the render function
  render();
};

// Add event listener for DOMContentLoaded
// Check data exists for each field.  Return error if not...
function validateExists(value) {
    return value && value.trim();
}

// Validate specific form field number data entered makes sense.
function validateNumber(value) {
    return !isNaN(value);
}

// Make sure number is within a range
function validateRange(value, min, max) {
    return value >= min && value <= max;
}

// Validate form data
function validateForm(formData) {
    const errors = {};

    // Check if name was entered
    if (!validateExists(formData.get("name"))) {
        errors.name = "Please enter a name";
    }

    // Check if rating was entered
    if (!validateExists(formData.get("rating"))) {
        errors.rating = "Please enter a rating";
    } else {
        // Check if the rating is a number
        if (!validateNumber(formData.get("rating"))) {
            errors.rating = "Rating must be a number";
        } else {
            // Because it is a number, convert it
            const rating = Number.parseFloat(formData.get("rating"));
            // Check that the rating is between 1 and 5, inclusive
            if (!validateRange(rating, 1, 5)) {
                errors.rating = "Rating must be between 1 and 5 inclusive.";
            }
        }
    }

    // Check if description was entered
    if (!validateExists(formData.get("description"))) {
        errors.description = "Please enter short description";
    }

    // Check if established date was entered
    if (!validateExists(formData.get("established"))) {
        errors.established = "Please enter date";
    }

    // Check if area was entered
    if (!validateExists(formData.get("area"))) {
        errors.area = "Please enter the area of the park";
    }

    // Check if location date was entered
    if (!validateExists(formData.get("location"))) {
        errors.location = "Please enter the location of the park";
    }

    return errors;
}

// Form submit eventHandler(event) function to capture and submit form data
const submitHandler = (event) => {
    event.preventDefault();
    // Get the name input
    // const parkName = document.querySelector("#name-input").value;
    // console.log(parkName);

    const form = event.target;
    const formData = new FormData(form);

    const errors = validateForm(formData);

    // Clear all previous errors
    const errorElements = document.querySelectorAll('.error');
    for (let element of form.elements) {
        element.style.display = "none";
    }

    // Display any new errors
    Object.keys(errors).forEach((key) => {
        //Find the specific error element
        const errorElement = document.querySelector(`#${key}-form .error`);
        errorElement.innerHTML = errors[key];
        errorElement.style.display = "block";
    });

    // const formData = new FormData(event.target);
    const name = formData.get("name");
    const location = formData.get("location");
    const description = formData.get("description");
    const established = formData.get("established");
    const area = formData.get("area");
    const rating = formData.get("rating");

    console.log(name);
    console.log(location);
    console.log(description);
    console.log(established);
    console.log(area);
    console.log(rating);

    // If there are no errors
    if (!Object.keys(errors).length) {
        // Create a new element
        const parkSection = document.createElement("section");

        // Add the park class
        parkSection.classList.add("park-display");

        // Construct the HTML for this element
        const content = `
    <h2>${formData.get("name")}</h2>
    <div class="location-display">${formData.get("location")}</div>
    <div class="description-display">${formData.get("description")}</div>
    <button class="rate-button" title="Add to Favourites">&#9734;</button>
    <div class="stats">
      <div class="established-display stat">
        <h3>Established</h3>
        <div class="value">${moment(formData.get("established")).format(
            "MMMM D, YYYY"
        )}</div>
      </div>
      <div class="area-display stat">
        <h3>Area</h3>
        <div class="value">${formData.get("area")}</div>
      </div>
      <div class="rating-display stat">
        <h3>Rating</h3>
        <div class="value">${formData.get("rating")}</div>
      </div>
    </div>
    `;

        // Set the innerHTML
        parkSection.innerHTML = content;

        // Append to the main element
        document.querySelector("main").appendChild(parkSection);
    }
};

// Get the form data
const main = () => {
    // Get the form element
    const form = document.querySelector("#park-form");

    // Attach the submit handler
    form.addEventListener("submit", submitHandler);

};

// Make sure page completely loads before doing any actions
window.addEventListener("DOMContentLoaded", main);
