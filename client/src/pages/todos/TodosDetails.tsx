import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { TodoService } from '../../shared/services/api/todos/TodoService';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';
import { DetailTools } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';


interface IFormData {
  title: string;
  done:boolean;
}
const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  title: yup.string().required().min(3),
  done: yup.boolean().default(false),
});

export const TodosDetails: React.FC = () => {
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();


  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);

      TodoService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/todo');
          } else {
            setTitle(result.title);
            formRef.current?.setData(result);
          }
        });
    } else {
      formRef.current?.setData({
        title: '',
      });
    }
  }, [id]);


  const handleSave = (dados: IFormData) => {
    formValidationSchema.
      validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        if (id === 'new') {
          TodoService
            .create(dadosValidados)
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/todos');
                } else {
                  navigate(`/todos/detalhe/${result}`);
                }
              }
            });
        } else {
          TodoService
            .updateById(Number(id), { id: Number(id), ...dadosValidados })
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/todos');
                }
              }
            });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach(error => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja Deletar?')) {
      TodoService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro deletado com sucesso!');
            navigate('/todos');
          }
        });
    }
  };


  return (
    <LayoutBaseDePagina
      titulo={id === 'new' ? 'New item' : title}
      barraDeFerramentas={
        <DetailTools
          textButtonNew='New'
          showButtonSaveClose
          showButtonNew={id !== 'new'}
          showButtonDelete={id !== 'new'}

          onClickButtonSave={save}
          onClickButtonSaveClose={saveAndClose}
          onClickButtonBack={() => navigate('/todos')}
          onClickButtonDelete={() => handleDelete(Number(id))}
          onClickButtonNew={() => navigate('/todo/detalhe/new')}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">

          <Grid container direction="column" padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

            <Grid item>
              <Typography variant='h6'>Title</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name='title'
                  label='Title'
                  disabled={isLoading}
                  onChange={e => setTitle(e.target.value)}
                />
              </Grid>
            </Grid>

          </Grid>

        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};