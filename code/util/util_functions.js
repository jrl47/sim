function mod(number, modulus) {
    return ((number%modulus)+modulus)%modulus;
}
  
function randInt(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min;
}