import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

import { TodoService } from '../../shared/services/api/todos/TodoService';
import { ListingTools } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';


export const Dashboard = () => {
  const [isLoadingTodosEncerrados, setIsLoadingTodosEncerrados] = useState(true);
  const [isLoadingTodosPendentes, setIsLoadingTodosPendentes] = useState(true);
  const [totalCountTodosEncerrados, setTotalCountTodosEncerrados] = useState(0);
  const [totalCountTodosPendentes, setTotalCountTodosPendentes] = useState(0);

  useEffect(() => {
    setIsLoadingTodosEncerrados(true);
    setIsLoadingTodosPendentes(true);

    TodoService.getByStatus('true')
      .then((result) => {
        setIsLoadingTodosEncerrados(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCountTodosEncerrados(result.totalCount);
        }
      });

    TodoService.getByStatus('false')
      .then((result) => {
        setIsLoadingTodosPendentes(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCountTodosPendentes(result.totalCount);
        }
      });
      
  }, []);


  return (
    <LayoutBaseDePagina
      titulo='Dashboard - TODO'
      barraDeFerramentas={<ListingTools showButtonNew={false} />}
    >
      <Box width='100%' display='flex'>
        <Grid container margin={2}>
          <Grid item container spacing={2}>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>

              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total Open
                  </Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!isLoadingTodosPendentes && (
                      <Typography variant='h1'>
                        {totalCountTodosPendentes}
                      </Typography>
                    )}
                    {isLoadingTodosPendentes && (
                      <Typography variant='h6'>
                        Loading...
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>

            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>

              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total Close
                  </Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!isLoadingTodosEncerrados && (
                      <Typography variant='h1'>
                        {totalCountTodosEncerrados}
                      </Typography>
                    )}
                    {isLoadingTodosEncerrados && (
                      <Typography variant='h6'>
                        Loading...
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>

            </Grid>

          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};