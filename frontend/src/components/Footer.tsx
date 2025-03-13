import React from 'react';
import { Box, Button, styled, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const FooterContainer = styled(Box)`
  background: #f0dacd;
  padding: 24px 32px;
  margin-top: 20px;
  width: calc(100% + 32px);
  margin-left: -16px;
  margin-right: -16px;
`;

const FooterSection = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-bottom: 40px;
`;

const FooterSection2 = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const FooterLinks = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  width: 100%;
  padding: 0px 32px;
`;

const Divider = styled(Box)`
  border-top: 6px solid #c9b079;
  width: 100%;
  margin: 40px 0;
`;

const NavList = styled('ul')`
  list-style-type: none;
  padding: 0;
  margin: 0;
  line-height: 1.8;
`;

const NavItem = styled('li')`
  margin-bottom: 8px;
`;

const FooterLink = styled('a')`
  color: #333;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const NewsletterSection = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
`;

const NewsletterInput = styled(TextField)`
  flex: 1;
  min-width: 250px;
`;

const PrivacyPolicyText = styled(Typography)`
  margin-top: 10px;
  text-align: center;
  color: #666;
`;

export const Footer = () => {
  return (
    <>
      <FooterContainer>
        {/* Newsletter Section */}
        <FooterSection>
          <NewsletterSection>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                TeddyShop Newsletter
              </Typography>
              <Typography variant="body1" marginTop={1}>
                Stay updated on the latest news, promotions, and special offers.
              </Typography>
            </Box>
          </NewsletterSection>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
            }}
          >
            <Box display="flex" gap={2} alignItems="center" width="100%">
              <NewsletterInput
                label="Enter your email"
                variant="outlined"
                size="small"
              />
              <Button variant="contained" color="primary">
                Subscribe now
              </Button>
            </Box>
            {/* Privacy Policy Text Below the Form */}
            <PrivacyPolicyText variant="body2">
              By subscribing, you accept our Privacy Policy
            </PrivacyPolicyText>
          </Box>
        </FooterSection>

        {/* Yellow Divider Line */}
        <Divider />

        {/* Footer Links Section */}
        <FooterSection2>
          <FooterLinks>
            <Box>
              <Typography variant="h6" fontWeight="bold" fontSize={18} mb={1}>
                Help
              </Typography>
              <NavList>
                <NavItem>
                  <FooterLink href="#">About Us</FooterLink>
                </NavItem>
                <NavItem>
                  <FooterLink href="#">Delivery</FooterLink>
                </NavItem>
                <NavItem>
                  <FooterLink href="#">Returns</FooterLink>
                </NavItem>
                <NavItem>
                  <FooterLink href="#">Frequently Asked Questions</FooterLink>
                </NavItem>
              </NavList>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight="bold" fontSize={18} mb={1}>
                Support
              </Typography>
              <NavList>
                <NavItem>
                  <FooterLink href="#">My Account</FooterLink>
                </NavItem>
                <NavItem>
                  <FooterLink href="#">Contact Us</FooterLink>
                </NavItem>
                <NavItem>
                  <FooterLink href="#">Shipping</FooterLink>
                </NavItem>
                <NavItem>
                  <FooterLink href="#">Summer Shipping</FooterLink>
                </NavItem>
              </NavList>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight="bold" fontSize={18} mb={1}>
                Commerce
              </Typography>
              <NavList>
                <NavItem>
                  <FooterLink href="#">Fairs and Conferences</FooterLink>
                </NavItem>
                <NavItem>
                  <FooterLink href="#">Terms and Conditions</FooterLink>
                </NavItem>
                <NavItem>
                  <FooterLink href="#">Public Relations</FooterLink>
                </NavItem>
              </NavList>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight="bold" fontSize={18} mb={1}>
                Follow us on
              </Typography>
              <NavList>
                <NavItem>
                  <FooterLink href="#">Instagram</FooterLink>
                </NavItem>
                <NavItem>
                  <FooterLink href="#">Facebook</FooterLink>
                </NavItem>
                <NavItem>
                  <FooterLink href="#">Twitter</FooterLink>
                </NavItem>
                <NavItem>
                  <FooterLink href="#">YouTube</FooterLink>
                </NavItem>
                <NavItem>
                  <FooterLink href="#">Pinterest</FooterLink>
                </NavItem>
              </NavList>
            </Box>
          </FooterLinks>
        </FooterSection2>
      </FooterContainer>

      {/* Footer Bottom Section */}
      <Box
        bgcolor={'white'}
        width={'calc(100% + 32px)'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        px={4}
        mx={-2}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <img
            src="/assets/logo.jpg"
            alt="logo"
            height="70px"
            style={{ objectFit: 'cover', borderRadius: '8px' }}
          />
        </Link>
        {/* Footer Copyright Section */}
        <Typography variant="body2" color="textSecondary">
          © 2023 TeddyShop. All rights reserved.
        </Typography>
      </Box>
    </>
  );
};
