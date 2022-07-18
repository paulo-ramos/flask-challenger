import { Box, Button, Divider, Icon, Paper, Skeleton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';


interface IDetailToolsProps {
  textButtonNew?: string;

  showButtonNew?: boolean;
  showButtonBack?: boolean;
  showButtonDelete?: boolean;
  showButtonSave?: boolean;
  showButtonSaveClose?: boolean;

  showButtonNewLoading?: boolean;
  showButtonBackLoading?: boolean;
  showButtonDeleteLoading?: boolean;
  showButtonSaveLoading?: boolean;
  showButtonSaveCloseLoading?: boolean;

  onClickButtonNew?: () => void;
  onClickButtonBack?: () => void;
  onClickButtonDelete?: () => void;
  onClickButtonSave?: () => void;
  onClickButtonSaveClose?: () => void;
}
export const DetailTools: React.FC<IDetailToolsProps> = ({
  textButtonNew = 'New',

  showButtonNew = true,
  showButtonBack = true,
  showButtonDelete = true,
  showButtonSave = true,
  showButtonSaveClose = false,

  showButtonNewLoading = false,
  showButtonBackLoading = false,
  showButtonDeleteLoading = false,
  showButtonSaveLoading = false,
  showButtonSaveCloseLoading = false,

  onClickButtonNew,
  onClickButtonBack,
  onClickButtonDelete,
  onClickButtonSave,
  onClickButtonSaveClose,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
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
      {(showButtonSave && !showButtonSaveLoading) && (
        <Button
          color='primary'
          disableElevation
          variant='contained'
          onClick={onClickButtonSave}
          startIcon={<Icon>save</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Save
          </Typography>
        </Button>
      )}

      {showButtonSaveLoading && (
        <Skeleton width={110} height={60} />
      )}

      {(showButtonSaveClose && !showButtonSaveCloseLoading && !smDown && !mdDown) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickButtonSaveClose}
          startIcon={<Icon>save</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Save and Close
          </Typography>
        </Button>
      )}

      {(showButtonSaveCloseLoading && !smDown && !mdDown) && (
        <Skeleton width={180} height={60} />
      )}

      {(showButtonDelete && !showButtonDeleteLoading) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickButtonDelete}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Deletar
          </Typography>
        </Button>
      )}

      {showButtonDeleteLoading && (
        <Skeleton width={110} height={60} />
      )}

      {(showButtonNew && !showButtonNewLoading && !smDown) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickButtonNew}
          startIcon={<Icon>add</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            {textButtonNew}
          </Typography>
        </Button>
      )}

      {(showButtonNewLoading && !smDown) && (
        <Skeleton width={110} height={60} />
      )}

      {
        (
          showButtonBack &&
          (showButtonNew || showButtonDelete || showButtonSave || showButtonSaveClose)
        ) && (
          <Divider variant='middle' orientation='vertical' />
        )
      }

      {(showButtonBack && !showButtonBackLoading) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickButtonBack}
          startIcon={<Icon>arrow_back</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Back
          </Typography>
        </Button>
      )}

      {showButtonBackLoading && (
        <Skeleton width={110} height={60} />
      )}
    </Box >
  );
};