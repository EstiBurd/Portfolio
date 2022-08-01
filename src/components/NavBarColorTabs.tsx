import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {useRouter} from 'next/router';

export default function NavBarColorTabs() {
  const [value, setValue] = React.useState('0');
  const router=useRouter();
  const routes=['/','/blog','/comments','/portfolio','/about']

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    let index=Number(newValue);
    router.push(routes[index]);
  };

  return (
   // <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="0" label="Home" />
        <Tab value="1" label="Blog" />
        <Tab value="2" label="Comments" />
        <Tab value="3" label="Portfolio" />
        <Tab value="4" label="About" />


      </Tabs>
   // </Box>
  );
}
