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
    background-color:#141414;
}
button {
    text-align:center;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: #9922ee;
    padding:7px 20px;
    border-radius:25px;
    /* color:white!important; */
}
h3,h4,h5,h6{
    margin:0!important;
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
input,textarea{
    color:black!important;
}

#root,.App, body{
    /* color:white!important; */
    min-height:100%;
    display:flex;
    flex-direction:column;
}
.active{
    display:none;
}

`;

export default GlobalStyles;
