import { useEffect, useState } from 'react';
import { Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { IListagemTodo, TodoService } from '../../shared/services/api/todos/TodoService';
import { ListingTools } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { Environment } from '../../shared/enviroment';


export const TodosListing: React.FC = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListagemTodo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);



  useEffect(() => {
    setIsLoading(true);

    TodoService.getAll()
      .then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);

          setTotalCount(result.totalCount);
          setRows(result.data);
        }
      });
  }, []);

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja Deletar?')) {
      TodoService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setRows(oldRows => [
              ...oldRows.filter(oldRow => oldRow.id !== id),
            ]);
            alert('Registro deletado com sucesso!');
          }
        });
    }
  };

  function handleStatus(id: number, status: boolean){
    if (status == true) {
      TodoService.SetAsUndone(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          }
        });
    } else {
      TodoService.SetAsDone(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          }
        });
    }
    navigate('/dashboard');
  }


  return (
    <LayoutBaseDePagina
      titulo='Todo List'
      barraDeFerramentas={
        <ListingTools
          textButtonNew='New'
          onClickButtonNew={() => navigate('/todo/detalhe/new')}
        />
      }
    >
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={80}>Actions</TableCell>
              <TableCell width={40}>Status</TableCell>
              <TableCell>Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/todo/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>
                  <input key={row.id} onChange={() => handleStatus(row.id, row.done)}type="checkbox" value={row.id} checked={row.done}/>                  
                </TableCell>
                <TableCell>{row.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}

          
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};