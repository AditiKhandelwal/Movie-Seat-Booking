const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(occupied)');
const count = document.getElementById('count');
const total =  document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

//Save selected movie index and price in local storage
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


//Update total and count
function updateSelectedCount(){
    const selectedSeats =  document.querySelectorAll('.row .seat.selected');
    
    // storing index of selected seats
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    //saving selected seat index
   localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
   
    // updating price and no of seats
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//Get data from local storage and populate UI
function populateUI(){
    // get previous selected seats index
    const selectedSeats =  JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length>0)
    {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    // get previous selected movie index
    const selectedMovieIndex =  localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null)
    {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

}

//Seat click event
container.addEventListener("click", function (e){
    // if clicked on seat which is not occupied than toggle selected class
 if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
   e.target.classList.toggle('selected');
     //after selecting seats update count and price
   updateSelectedCount();
 }
});

// Movie select event
movieSelect.addEventListener('change', e => {
ticketPrice = +e.target.value;
setMovieData(e.target.selectedIndex,e.target.value);
updateSelectedCount();

});

//Initail count and total seat
updateSelectedCount();
