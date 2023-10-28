import React from 'react';
import {
  Container,
  Divider,
  Flex,
  Stack,
  Title,
  Text,
  Tabs,
  Grid,
  Button,
  useMantineTheme
} from "@mantine/core";
import { IconBorderAll, IconLayoutDashboard, IconSearch } from "@tabler/icons-react";
import LandingNavBar from './components/LandingNavBar';

const NavigationBar = () => {

  return (
    <Grid justify="space-between" align="center">
      <Grid style={{ padding: '10px 0' }} >
        <Button style={{ margin: '0 10px' }} variant="outline">
          Button 1
        </Button>
        <Button style={{ margin: '0 10px' }} variant="outline">
          Button 2
        </Button>        
      </Grid>




      <Grid style={{ padding: '10px 0' }}>
        <Button style={{ margin: '0 10px' }} variant="outline">
          Button 3
        </Button>
        <Button style={{ margin: '0 10px' }} variant="outline">
          Button 4
        </Button>

      </Grid>
    </Grid>
  );
}

const LandingPage = (): JSX.Element => {
  return (
    <div>
      {/* <LandingNavBar /> */}
      {/* Other components and content for your landing page */}
    </div>
  );
  
};

export default LandingPage;
