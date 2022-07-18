import {Routes, Route, Navigate} from 'react-router-dom';

import { Dashboard } from '../pages/dashboard/Dashboard';
import { TodosDetails } from '../pages/todos/TodosDetails';
import { TodosListing } from '../pages/todos/TodosListing';

export const AppRoutes = () => {

  return (
    <Routes>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/todos' element={<TodosListing />} />
      <Route path='/todo/detalhe/new' element={<TodosDetails />} />
      <Route path='/todo/:id'  element={<TodosDetails />} />
      <Route path='*' element={<Navigate to='/dashboard' />} />
    </Routes>
  );
};
