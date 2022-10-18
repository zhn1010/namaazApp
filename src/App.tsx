/* eslint-disable no-extend-native */
import sorahList from './sorah';
import _ from 'underscore';
import { Box, Button, Link, Tooltip, Typography } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { useRecoilState } from 'recoil';
import { sorahState, zekrState } from './atoms';
import RefreshIcon from '@mui/icons-material/Refresh';

const EnDigitToFa= function(str: string) {
  return str.replace(/\d/g, (d: any) => ['صفرم', 'اول', 'دوم', 'سوم', 'چهارم'][d])
}

function App() {  
  const zekrList = [
    "سبحان ربي الاعلي و بحمده. اللهم صل علي محمد و آل محمد", 
    "سبحان ربي الاعلي و بحمده", 
    "سبحان الله، سبحان الله، سبحان الله", 
    "سبحان الله، سبحان الله، سبحان الله. اللهم صل علي محمد و آل محمد",
  ];

  const [sorah, setSorah] = useRecoilState(sorahState);
  const [zekr, setZekr] = useRecoilState(zekrState);

  const handleClick = () => {
    setSorah(_.shuffle(sorahList).slice(0, 2));
    setZekr(_.shuffle([0, 1, 2, 3]));
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height={1 / 1} flexDirection="column">
      {sorah.map(
        (item, i) => <Typography fontFamily="Almarai" margin={1} variant='h4' key={item.name}><Link href={`https://quran.com/${item.id}`}><LaunchIcon /></Link>ركعت {EnDigitToFa(`${i + 1}`)}: {item.name}</Typography>)}
      {zekr.map((item, i) => <Tooltip title={zekrList[item]}><Typography margin={1} fontFamily="Almarai" variant='h6' key={item}>
          ركعت {EnDigitToFa(`${i + 1}`)}: {(`${item + 1}`)}
        </Typography></Tooltip>)}
      <Button sx={{mt: 4}} size='small' startIcon={<RefreshIcon />} onClick={handleClick}>Refresh</Button>
    </Box>
  );
}

export default App;
