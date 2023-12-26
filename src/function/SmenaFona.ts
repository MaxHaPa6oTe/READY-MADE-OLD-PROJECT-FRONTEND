export const SmenaFona = 
(fon:string,ottenok:string,posit:string) => {
    document.body.style.cssText=`
    background: url('${fon}') ${ottenok};
    background-blend-mode: multiply;
    background-position: ${posit};
    background-size: cover;
    background-repeat: no-repeat;
    transition: background 0.6s ease;
        background-attachment: fixed;
        
        `;
  }

//   perspective:1000px;