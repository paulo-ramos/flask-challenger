import { Environment } from '../../../enviroment';
import { Api } from '../axios-config';


export interface IListagemTodo {
  id: number;
  title: string;
  done:boolean;
}

export interface IDetalheTodo {
  id: number;
  title: string;
  done:boolean;
}

type TTodoComTotalCount = {
  data: IListagemTodo[];
  totalCount: number;
}

const getAll = async (): Promise<TTodoComTotalCount | Error> => {
  try {
    const urlRelativa = '/todos';
    const { data, headers } = await Api.get(urlRelativa);
    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
      };
    }

    console.log(data);
    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error); 
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};


const getById = async (id: number): Promise<IDetalheTodo | Error> => {
  try {
    const { data } = await Api.get(`/todo/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const getByStatus = async (done = ''): Promise<TTodoComTotalCount | Error> => {
  try {
    const urlRelativa = `/todo/status/${done}`;
    const { data } = await Api.get(urlRelativa);
    
    if (data) {
      return {
        data,
        totalCount: Object.keys(data).length,
      };
    } else{
      console.log(data);
      return{
        data : [],
        totalCount: 0,
      };
    }

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }

};

const create = async (dados: Omit<IDetalheTodo, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheTodo>('/todo', dados);

    if (data) {
      return data.id;
    }

    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dados: IDetalheTodo): Promise<void | Error> => {
  try {
    await Api.put(`/todo/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};

const SetAsDone = async (id: number): Promise<void | Error> => {
  try {
    await Api.put(`/todo/done/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};

const SetAsUndone = async (id: number): Promise<void | Error> => {
  try {
    await Api.put(`/todo/undone/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/todo/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao Deletar o registro.');
  }
};


export const TodoService = {
  getAll,
  create,
  getByStatus,
  getById,
  updateById,
  SetAsDone,
  SetAsUndone,
  deleteById,  
};