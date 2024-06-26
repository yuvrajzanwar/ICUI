let i =0;
let placeholder = "";
const txt = "What kind of caption do you want?";
const speed =20;
function type(){
  placeholder = txt.charAt(i);
  document.getElementById("description").setAttribute("placeholder",placeholder);
  i++;
  setTimeout(type,speed);
}

export default type;