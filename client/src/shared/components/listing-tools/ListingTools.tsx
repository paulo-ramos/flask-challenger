import { Box, Button, Icon, Paper, useTheme } from '@mui/material';

interface IListingToolsProps {
  textButtonNew?: string;
  showButtonNew?: boolean;
  onClickButtonNew?: () => void;
}
export const ListingTools: React.FC<IListingToolsProps> = ({
  onClickButtonNew,
  textButtonNew = 'New',
  showButtonNew = true,
}) => {
  const theme = useTheme();

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >

      <Box flex={1} display="flex" justifyContent="end">
        {showButtonNew && (
          <Button
            color='primary'
            disableElevation
            variant='contained'
            onClick={onClickButtonNew}
            endIcon={<Icon>add</Icon>}
          >{textButtonNew}</Button>
        )}
      </Box>
    </Box>
  );
};