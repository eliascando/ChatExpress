import styled from 'styled-components';

const ULMensajes = styled.ul `
    max-width: 800px;
    margin: 10px auto;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const LiMensaje = styled.li `
    background-color: #fff;
    padding: 10px 20px;
    color: black;
    border-radius: 15px;
`
export{
    ULMensajes, LiMensaje
}