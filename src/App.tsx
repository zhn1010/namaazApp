/* eslint-disable no-extend-native */
import sorah from './sorah';
import _ from 'underscore';
import { Box, Link, Tooltip, Typography } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

const EnDigitToFa= function(str: string) {
  return str.replace(/\d/g, (d: any) => ['صفرم', 'اول', 'دوم', 'سوم', 'چهارم'][d])
}

function App() {  
  const zekr = [
    "سبحان ربي الاعلي و بحمده. اللهم صل علي محمد و آل محمد", 
    "سبحان ربي الاعلي و بحمده", 
    "سبحان الله، سبحان الله، سبحان الله", 
    "سبحان الله، سبحان الله، سبحان الله. اللهم صل علي محمد و آل محمد",
  ];
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height={1 / 1} flexDirection="column">
      {_.shuffle(sorah).slice(0, 2).map((item, i) => <Typography fontFamily="Almarai" margin={1} variant='h4' key={item.name}><Link href={`https://quran.com/${item.id}`}><LaunchIcon /></Link>ركعت {EnDigitToFa(`${i + 1}`)}: {item.name}</Typography>)}
      {_.shuffle([0, 1, 2, 3]).map((item, i) => <Tooltip title={zekr[i]}><Typography margin={1} fontFamily="Almarai" variant='h6' key={item}>
          ركعت {EnDigitToFa(`${i + 1}`)}: {(`${item + 1}`)}
        </Typography></Tooltip>)}
    </Box>
  );
}

export default App;
