/* eslint-disable no-extend-native */
import _ from 'underscore';
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { useRecoilState } from 'recoil';
import RefreshIcon from '@mui/icons-material/Refresh';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Duration from 'duration-relativetimeformat';
import { selectedSorahState, selectedZekrState, sorahListState } from './atoms';

const EnDigitToFa = (str: string) =>
  str.replace(/\d/g, (d: any) => ['صفرم', 'اول', 'دوم', 'سوم', 'چهارم'][d]);
type wightedItemsType = {
  id: string;
  name: string;
  weight: number;
}[];

function weightedRandomSelection(items: wightedItemsType) {
  const totalWeight = items.reduce((prev, cur) => prev + cur.weight, 0);
  const randomNumber = Math.random() * totalWeight;
  let weightSum = 0;
  for (let i = 0; i < items.length; i++) {
    weightSum += items[i].weight;
    if (randomNumber < weightSum) {
      return items[i];
    }
  }
  return items[items.length - 1];
}

function selectTwoItemsWithoutRepetition(items: wightedItemsType) {
  let copy = [...items];
  const item1 = weightedRandomSelection(items);
  copy = copy.filter((i) => i.id !== item1.id);
  const item2 = weightedRandomSelection(copy);

  return [item1, item2];
}

function App() {
  const [selectedSorah, setSelectedSorah] = useRecoilState(selectedSorahState);
  const [selectedZekr, setSelectedZekr] = useRecoilState(selectedZekrState);
  const [sorahList, setSorahList] = useRecoilState(sorahListState);
  const duree = new Duration('en');

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Sorah',
      sortable: false,
      renderCell: (params) => (
        <Typography fontFamily="sura_names" variant="body1">
          {params.row.id}
        </Typography>
      ),
    },
    {
      field: 'lastRevised',
      headerName: 'Last revised',
      width: 170,
      valueGetter: (params: GridValueGetterParams) => {
        const currentTime = Date.now();
        const durationString = duree.format(
          params.row.lastRevised,
          currentTime,
        );
        return durationString;
      },
    },
  ];

  const handleClick = () => {
    const selectedTwoSorah = selectTwoItemsWithoutRepetition(
      sorahList.map((item) => ({
        id: item.id,
        name: item.name,
        weight: Date.now() - item.lastRevised,
      })),
    );
    setSelectedSorah(
      selectedTwoSorah.map((item) => ({ id: item.id, name: item.name })),
    );
    setSelectedZekr(_.shuffle([0, 1, 2, 3]));
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
        {selectedSorah.map((item, i) => (
          <Stack flexDirection="row-reverse" key={item.id} alignItems="center">
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
            <Link
              href={`https://quran.com/${Number(item.id)}`}
              onClick={() =>
                setSorahList([
                  ...sorahList.filter((itm) => itm.id !== item.id),
                  { id: item.id, name: item.name, lastRevised: Date.now() },
                ])
              }
            >
              <LaunchIcon />
            </Link>
          </Stack>
        ))}
      </Box>
      <Box marginY={2}>
        {selectedZekr.map((item, i) => (
          <Typography margin={1} fontFamily="Almarai" variant="h6" key={item}>
            ركعت {EnDigitToFa(`${i + 1}`)}: {`${item + 1}`}
          </Typography>
        ))}
      </Box>
      <Button
        sx={{ mt: 4 }}
        size="small"
        startIcon={<RefreshIcon />}
        onClick={handleClick}
      >
        Refresh
      </Button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={sorahList}
          columns={columns}
          pageSize={50}
          rowsPerPageOptions={[50]}
        />
      </div>
    </Box>
  );
}

export default App;
