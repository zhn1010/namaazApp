/* eslint-disable no-extend-native */
import _ from 'underscore';
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { useRecoilState } from 'recoil';
import RefreshIcon from '@mui/icons-material/Refresh';
import { sorahState, zekrState } from './atoms';
import sorahList from './sorah';

const EnDigitToFa = function (str: string) {
  return str.replace(
    /\d/g,
    (d: any) => ['صفرم', 'اول', 'دوم', 'سوم', 'چهارم'][d],
  );
};

// export const themes = [
//   'گوش دادن به صدای خودم',
//   'نوشتن اذکار',
//   'ترجمه اذکار',
//   'همراهی قلب و زبان',
//   'اذعان کردن اذکار',
// ];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function App() {
  const [sorah, setSorah] = useRecoilState(sorahState);
  const [zekr, setZekr] = useRecoilState(zekrState);
  // const [theme, setTheme] = useRecoilState(themeState);

  const handleClick = () => {
    setSorah(_.shuffle(sorahList).slice(0, 2));
    setZekr(_.shuffle([0, 1, 2, 3]));
    // setTheme(getRandomInt(themes.length));
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={1 / 1}
      flexDirection="column"
    >
      <Box borderBottom="1px solid black" paddingBottom={2}>
        {sorah.map((item, i) => (
          <Stack
            flexDirection="row-reverse"
            key={item.name}
            alignItems="center"
          >
            <Typography fontFamily="Almarai" margin={1} variant="h5">
              ركعت {EnDigitToFa(`${i + 1}`)}
            </Typography>
            <Typography fontFamily="Almarai" margin={1} variant="h5">
              :
            </Typography>
            <Typography fontFamily="sura_names" variant="h3">
              surah
            </Typography>
            <Typography fontFamily="sura_names" variant="h3">
              {item.id}
            </Typography>
            <Link href={`https://quran.com/${Number(item.id)}`}>
              <LaunchIcon />
            </Link>
          </Stack>
        ))}
      </Box>
      <Box marginY={2}>
        {zekr.map((item, i) => (
          <Typography margin={1} fontFamily="Almarai" variant="h6" key={item}>
            ركعت {EnDigitToFa(`${i + 1}`)}: {`${item + 1}`}
          </Typography>
        ))}
      </Box>
      {/* <Typography
        margin={1}
        fontFamily="Almarai"
        variant="h6"
        borderTop="1px solid black"
        sx={{ paddingTop: 2 }}
      >
        {themes[theme]}
      </Typography> */}
      <Button
        sx={{ mt: 4 }}
        size="small"
        startIcon={<RefreshIcon />}
        onClick={handleClick}
      >
        Refresh
      </Button>
    </Box>
  );
}

export default App;
