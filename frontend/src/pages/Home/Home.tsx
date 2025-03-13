import React from 'react';
import { Box, Button, Grid2, styled, Typography } from '@mui/material';
import ProductsList from '../../components/ProductsList';
import { Carousel } from 'react-responsive-carousel';
import { Footer } from '../../components/Footer';

const SectionButton = styled(Button)`
  /* Rectangle 2 */

  box-sizing: border-box;

  height: 50px;
  padding-left: 20px;
  padding-right: 20px;

  background: #ffffff;
  border: 3px solid #c9b079;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 62px;

  font-style: italic;
  font-weight: 500;
  font-size: 24px;
  line-height: 120%;
  /* or 43px */
  text-align: center;
  text-transform: capitalize;

  color: #29180f;

  margin-bottom: 10px;
`;

const ExploreButton = styled(Button)`
  /* Button */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  gap: 8px;

  background: #bf8b70;
  border: 2px solid #ffffff;
  box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.35);
  border-radius: 29px;

  color: white;
  text-transform: capitalize;
  margin-bottom: 40px;
`;

const HelpCard = styled(Box)`
  /* Column */

  box-sizing: border-box;

  width: 378px;
  height: 198px;

  background: #ffffff;
  border: 3px solid #c9b079;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 31px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-left: 50px;
  padding-right: 50px;
`;

const HelpIconWrapper = styled(Box)`
  /* Icon / Relume */

  box-sizing: border-box;

  width: 53px;
  height: 53px;

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;

  margin-bottom: 5px;

  img {
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
`;

const Home = () => {
  const images = [
    { original: '/assets/banner.jpg' },
    { original: '/assets/banner2.jpg' },
  ];
  return (
    <Box display="flex" flexDirection={'column'} alignItems="center">
      <Box
        mt={-2}
        ml={-2}
        mr={-2}
        sx={{
          userSelect: 'none', // Disable text/image selection
        }}
      >
        <Carousel
          showStatus={false}
          infiniteLoop
          useKeyboardArrows
          autoPlay
          emulateTouch
          swipeable
          dynamicHeight
          stopOnHover
          interval={5000}
          showThumbs={false}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                backgroundImage: "url('/assets/bg.jpg')",
              }}
            >
              <img
                src={image.original}
                alt={`Banner Image ${index + 1}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain', // Maintain image size and aspect ratio
                  maxHeight: '500px',
                  cursor: 'pointer', // Soft shadow for depth
                }}
              />
            </Box>
          ))}
        </Carousel>
      </Box>
      <Typography
        mt={7}
        mb={2}
        variant={'h4'}
        fontWeight={600}
        color={'primary'}
      >
        Explore and find your favorite on TeddyShop
      </Typography>
      <Typography
        mb={2}
        variant={'h6'}
        fontWeight={400}
        color={'primary'}
        textAlign={'center'}
      >
        "We are excited to introduce our variety of new plush characters!
        Discover the collection, <br />
        ready to be loved, given as a gift or become your new best friend"
      </Typography>
      <ProductsList infinite={false} limit={3} />
      <SectionButton>
        <img
          src="/assets/flower.png"
          alt="flower"
          style={{
            height: '100%',
            marginRight: 10,
          }}
        />
        Shop for spring
      </SectionButton>
      <ProductsList infinite={false} limit={4} itemsPerRow={4} />
      <ExploreButton>Explore now</ExploreButton>
      <Box
        bgcolor={'#E1EDE9'}
        width={`calc(100% + 32px)`}
        pb={11}
        pt={6}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
      >
        {' '}
        <Typography
          variant={'h4'}
          fontWeight={600}
          textAlign={'center'}
          mb={5}
          display={'flex'}
          alignItems={'center'}
          gap={2}
        >
          <img
            src="/assets/flower2.png"
            alt="flower2"
            style={{
              height: '100%',
              width: 45,
            }}
          />{' '}
          Here's what we can do for you{' '}
          <img
            src="/assets/flower2.png"
            alt="flower2"
            style={{
              height: '100%',
              width: 45,
            }}
          />
        </Typography>{' '}
        <Box display={'flex'} flexDirection={'row'} gap={4}>
          <Grid2 container spacing={4} justifyContent="center" width={'100%'}>
            <Grid2>
              <HelpCard>
                <HelpIconWrapper>
                  <img src="/assets/help/help1.png" alt="help1" />
                </HelpIconWrapper>
                <Typography variant={'h6'} fontWeight={600} mb={1}>
                  Safe shipping
                </Typography>
                <Typography fontSize={13}>
                  We offer fast delivery to ensure your stuffed animal arrives
                  in perfect condition.
                </Typography>
              </HelpCard>
            </Grid2>
            <Grid2>
              <HelpCard>
                <HelpIconWrapper>
                  <img src="/assets/help/help2.png" alt="help2" />
                </HelpIconWrapper>
                <Typography variant={'h6'} fontWeight={600} mb={1}>
                  Quality materials
                </Typography>
                <Typography fontSize={13}>
                  We are committed to using quality materials for our stuffed
                  animals, to ensure you have a product that will last over
                  time.
                </Typography>
              </HelpCard>{' '}
            </Grid2>{' '}
            <Grid2>
              <HelpCard>
                <HelpIconWrapper>
                  <img src="/assets/help/help3.png" alt="help3" />
                </HelpIconWrapper>
                <Typography variant={'h6'} fontWeight={600} mb={1}>
                  Excellent service
                </Typography>
                <Typography fontSize={13}>
                  Our customer service is at your disposal to answer all your
                  questions and solve any problem.
                </Typography>
              </HelpCard>{' '}
            </Grid2>
          </Grid2>
        </Box>
      </Box>{' '}
      <SectionButton sx={{ marginTop: -3 }}>
        <img
          src="/assets/bear.png"
          alt="bear"
          style={{
            height: '100%',
            marginRight: 10,
          }}
        />
        The most wanted stuffed toys
      </SectionButton>
      <ProductsList infinite={false} limit={4} itemsPerRow={4} />
      <ExploreButton>Explore now</ExploreButton>
      <Typography
        variant={'h4'}
        fontWeight={600}
        textAlign={'center'}
        mb={5}
        display={'flex'}
        alignItems={'center'}
        gap={2}
      >
        <img
          src="/assets/heart.png"
          alt="heart"
          style={{
            height: '100%',
            width: 45,
          }}
        />{' '}
        "Add a special touch to your stuffed animal"
      </Typography>{' '}
      <SectionButton sx={{ marginBottom: -3 }}>
        <img
          src="/assets/heart.png"
          alt="heart"
          style={{
            height: '100%',
            marginRight: 10,
          }}
        />
        Opinions of our customers
      </SectionButton>
      <Box
        bgcolor={'#E1EDE9'}
        width={`calc(100% + 32px)`}
        pb={6}
        pt={6}
        mb={-3}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
      >
        <Box display={'flex'} flexDirection={'row'} gap={4}>
          <Grid2 container spacing={4} justifyContent="center" width={'100%'}>
            <Grid2>
              <HelpCard sx={{ alignItems: 'start', gap: 1 }}>
                <Typography fontSize={17} textAlign={'left'}>
                  “This plush is amazing! The quality of the material is
                  exceptional and its softness makes it perfect for hugging”
                </Typography>
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  gap={2}
                >
                  <Box
                    sx={{
                      background: '#FFFFFF',
                      border: '1px solid #C9B079',
                      borderRadius: 99,
                      width: 50,
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography fontSize={32} fontWeight={'bold'}>
                      M
                    </Typography>
                  </Box>
                  <Box textAlign={'left'}>
                    <Typography fontSize={15} fontWeight={'bold'}>
                      Maria Cipollari
                    </Typography>
                    <Typography fontSize={13}>Housewife, mother</Typography>
                  </Box>
                </Box>
              </HelpCard>
            </Grid2>
            <Grid2>
              <HelpCard sx={{ alignItems: 'start', gap: 1 }}>
                <Typography fontSize={17} textAlign={'left'}>
                  "I am not satisfied with this plush toy. The material seems
                  cheap and the stitching is rather rough"
                </Typography>
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  gap={2}
                >
                  <Box
                    sx={{
                      background: '#FFFFFF',
                      border: '1px solid #C9B079',
                      borderRadius: 99,
                      width: 50,
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography fontSize={32} fontWeight={'bold'}>
                      C
                    </Typography>
                  </Box>
                  <Box textAlign={'left'}>
                    <Typography fontSize={15} fontWeight={'bold'}>
                      Claudio Boldi
                    </Typography>
                    <Typography fontSize={13}> Worker, parent</Typography>
                  </Box>
                </Box>
              </HelpCard>
            </Grid2>{' '}
            <Grid2>
              <HelpCard sx={{ alignItems: 'start', gap: 1 }}>
                <Typography fontSize={17} textAlign={'left'}>
                  “The plush itself is high quality, with nice details and a
                  soft, fluffy texture. I highly recommend this shop!”
                </Typography>
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  gap={2}
                >
                  <Box
                    sx={{
                      background: '#FFFFFF',
                      border: '1px solid #C9B079',
                      borderRadius: 99,
                      width: 50,
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography fontSize={32} fontWeight={'bold'}>
                      J
                    </Typography>
                  </Box>
                  <Box textAlign={'left'}>
                    <Typography fontSize={15} fontWeight={'bold'}>
                      Jessica Merla
                    </Typography>
                    <Typography fontSize={13}>Retired, grandmother</Typography>
                  </Box>
                </Box>
              </HelpCard>
            </Grid2>
          </Grid2>
        </Box>
      </Box>{' '}
    </Box>
  );
};

export default Home;
