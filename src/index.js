import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//data

//render list: we have an array of data and for each pieve of object we want to automatically create a pizza
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

//create app component
function App() {
  //use div for nesting 2 elements
  return (
    <div className="container">
      {/*classname correspond to css class styling container*/}
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}
function Header() {
  //const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  const style = {};
  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;
  // we can pass props from menu to pizza, from parent to child
  return (
    <main className="menu">
      <h2>Our menu</h2>
      {numPizzas > 0 ? ( //conditional rendering if there 0 on the left side of && then react will render the 0 of num pizzas and not the ul. React does not render true or false but will render 0
        <>
          {/*react fragment use react fragment when we want two elements without parent element in React */}
          <p>Authentic Italian cuisine. 6 creative dishes to choose from.</p>
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              //we should add key for each object as props
              <Pizza pizzaObj={pizza} key={pizza.name} /> //we can pass the current pizza object as props and then use it instead of individual props
            ))}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu, Please come back later</p>
      )}

      {/* <Pizza
        name="Pizza Spinaci"
        ingredient="Tomato, mozarella, spinach, and ricotta cheese"
        photoName="pizzas/spinaci.jpg"
        price={10}
      />

      <Pizza
        name="Pizza Funghi"
        ingredient="Tomato, mushrooms, spinach, and ricotta cheese"
        photoName="pizzas/funghi.jpg"
        price={11}
      />

      <Pizza
        name="Pizza Spinaci"
        ingredient="Tomato, mozarella, spinach, and ricotta cheese"
        photoName="pizzas/spinaci.jpg"
        price={10} //number instead of string, pass in aanything like array oir obj using {}
      /> */}
    </main>
  );
}

function Pizza({ pizzaObj }) {
  //pass pizaobj as props directly
  console.log(pizzaObj);
  //write comp as pizza -> need to return some markup

  //we use early return with if when we want to return null
  //if (pizzaObj.soldOut) return null; //pizza with sold out prop will not be rendered like other
  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      {/*class name is pizza when soldout is false and class name is pizza sold-out if true */}
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price + 1}</span>{" "}
        {/* first way of
        doing the conditional redering with ternary, we know it will be a span second way below*/}
        {/* {pizzaObj.soldOut ? (
          <span>SOLD OUT</span>
        ) : (
          <span>{pizzaObj.price}</span>
        )} */}
      </div>
    </li>
  );
}

const Footer = () => {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  //   if (hour >= openHour && hour <= closeHour) {
  //     alert("We're currently open!");
  //   } else {
  //     alert("Sorry we're closed!");
  //   }

  // if (!isOpen) {
  //   return <p>We are happy to welcome you during opening time</p>; //we are no longer render the footer element around this
  // }
  return (
    <footer className="footer">
      {isOpen ? (
        <Order openHour={openHour} closeHour={closeHour} /> //need to send the close hours down
      ) : (
        <p>We are happy to welcome you during opening time</p>
      )}
    </footer>
  ); //ig isOpen is falsy or one value is falsy js will not look at the operation
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); //strict mode render comp twice to find bug

function Order({ openHour, closeHour }) {
  return (
    <div className="order">
      <p>
        We're open from {openHour}:00 pm to {closeHour}:00 pm. Come visit us or
        order online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}
