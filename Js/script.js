const fullname = document.querySelector('#fullname');
const fullnameerror = document.querySelector('.fullname-error');
fullname.addEventListener('input',function(){
    let pattern = RegExp('^[A-Z ]{1}[a-zA-Z ]{2,}$');
    if(pattern.test(fullname.value)) fullnameerror.textContent='';
    else fullnameerror.textContent = 'Invalid Name';    
});

const phone = document.querySelector('#phone');
const phoneerror = document.querySelector('.phone-error');
phone.addEventListener('input',function(){
    let Pattern = RegExp('^[0-9]{10}$');
    if(Pattern.test(phone.value)) phoneerror.textContent = '';
    else phoneerror.textContent = 'Invalid Mobile Number';
});

function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

function Contact(fullName, address, state, city, zip, phone) {
  this.fullName = fullName;
  this.address = address;
  this.state = state;
  this.city = city;
  this.zip = zip;
  this.phone = phone;
}

Contact.prototype.fullName = function() {
  return this.fullName;
};

let addressBook = new AddressBook();

$(document).ready(function() {
  $("form#new-address").submit(function(event) {
    event.preventDefault();
    const fullName = $("input#fullname").val();
    const address = $("textarea#address").val();
    const state = $("select#state").val();
    const city = $("select#city").val();
    const zip = $("input#zip").val();
    const phone = $("input#phone").val();
    let newContact = new Contact(fullName, address, state, city, zip, phone);
    addressBook.addContact(newContact);
    console.log(addressBook.contacts);
    localStorage.setItem("contact", JSON.stringify(addressBook.contacts))
    window.location = '/pages/home.html'
  });
});