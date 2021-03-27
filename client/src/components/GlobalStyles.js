import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
*,::before,::after{
    color:white;
    margin:0;
    padding:0;
    box-sizing:border-box;
    
}
html{
     height:100%;
    &::-webkit-scrollbar{
        width:0.5rem;
    }
    &::-webkit-scrollbar-thumb{
        background:darkgray;
    }
}
body{

    font-family:"Electronic Arts Text", sans-serif;
    width:100%;
    height:100%;
    //color:white;
    background-color:#141414;
    display:flex;
    flex-direction:column;
}
button {
    border: none;
    outline: none;
    cursor: pointer;
}
h2 {
    font-weight:600;
    font-size:2.5rem;
    font-family:'Playfair Display', cursive;
    > span {
        color:#DD22CC;
    }
}
a{
    cursor: pointer;
    text-decoration:none;
    color:white!important;
}
p{
    margin:0;
}
#root{
    min-height:100%;
}
.App{
    display:flex;
    flex-direction:column;
    min-height:100%;
}
`;

export default GlobalStyles;