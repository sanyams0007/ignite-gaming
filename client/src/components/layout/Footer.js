import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <p>Ignite Gaming -&copy; 2020-2021, All Rights Reserved </p>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  padding: 12px 7.5%;
  margin-top: auto;
  /*  > p {
    margin: 0;
  } */
`;
