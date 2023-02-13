const buf = Buffer.from("ok")

console.log(buf.toJSON()) 
// <Buffer 6f 6b> => hexadecimal em que cada byte representa uma das letras "o" e "k"
// Com os dados armazenados de forma hexadecimal, o Node consegue trabalhar demaneira MUUUUITOmais performatica do que se tentasse salvar como texto que precisa de varias tratativas para ser salvana memoria
