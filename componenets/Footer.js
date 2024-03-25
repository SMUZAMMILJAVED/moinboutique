import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 5px;
  text-align: center;
  margin-top: 30px;
`;

const ContactInfo = styled.p`
  margin-bottom: 10px;
`;

const Quote = styled.blockquote`
  font-style: italic;
`;

function Footer() {
  return (
    <StyledFooter>
      <ContactInfo>Contact: +92 345 3436415 (Moinuddin)
      


      </ContactInfo>
      <Quote>Contact us for tailored wedding suits and party wear, with customized materials and fabrics to suit your preferences.</Quote>
    </StyledFooter>
  );
}

export default Footer;