type Props = {
  startDate: string
}

type TodoList = 
  [{
    date: string,
    done: boolean,
    strikes: number
  }];

export const GetInitialTodo = ({startDate}: Props) => {
  let todo: TodoList;  
  const today = new Date();
  const startDay = new Date();
  return ;
}