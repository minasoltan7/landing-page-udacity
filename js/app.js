/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/



/* Creating sections dynamically by the createDynamicSection Function and 
 the myCounter variable which is incremented each time the function is revoked */
let myCounter = 0
let createDynamicSection = () => {
  myCounter++;
  //  I am using the ES6 template strings to wrap my myCounter inside it each time i need 
  const section = `<section id="section${myCounter}" data-nav="Section ${myCounter}" class="your-active-class">
    <div class="landing__container">
      <h2>Section ${myCounter}</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
      <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
    </div>
  </section>`
  document.querySelector("main").insertAdjacentHTML("beforeend", section)
}


// creating the fisrt 4  default sections by the createDynamicSection Function
for (var i = 1; i <= 4; i++) {
  createDynamicSection();
}






// build the nav
// accessing the ul element from the HTML file
let navBar = document.querySelector("#navbar__list");
// accesing all the "section" elements created by the createDynamicSection function
//  looping over each section
// accesing the id of each section to anchor and scroll to it
let createNavbar = () => {
  document.querySelectorAll("section").forEach(section => {
    // adding href=#section number to scroll to it
    const li = `<li><a href="#${section.id}" class="navbar__menu" data-nav="${section.id}">${section.dataset.nav}</a></li>`;
    navBar.insertAdjacentHTML("beforeend", li);
  });
}
createNavbar();

// adding section on click to the "Add Section" button  
let addSectionButton = document.getElementById("add-section")
addSectionButton.addEventListener("click", () => {
  // using the createDynamic Section to create the new added section
  createDynamicSection();
  // Deleting all "li" elements  in the "ul" to create a new updated navbar with the new "li" created 
  navBar.innerHTML = "";
  createNavbar();
  observingContent();
})




// Add class 'active' to section when near top of viewport
const observingContent = () => {
  let observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        let activeLink = navBar.querySelector(`[data-nav=${entry.target.id}]`);
        if (entry.isIntersecting) {
          entry.target.classList.add("your-active-class");
          activeLink.classList.add("active-link");
        } else {
          entry.target.classList.remove("your-active-class");
          activeLink.classList.remove("active-link")
        }
      })
    }, {
    // adding the option ,when 50% of the page is in the portview it get the active class
    threshold: 0.5,
  }
  );
  return document.querySelectorAll("section").forEach((section => {
    observer.observe(section);
  }))
}

observingContent();











