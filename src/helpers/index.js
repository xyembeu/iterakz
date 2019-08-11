
export const STATUS_IDS = [
  {id: 0, name: 'Отменен'},
  {id: 10, name: 'Новый'},
  {id: 20, name: 'Принят'},
  {id: 30, name: 'Подготавливается'},
  {id: 50, name: 'Доставляется'},
  {id: 55, name: 'Доставлен'},
  {id: 60, name: 'Доступен'},
  {id: 100, name: 'Выполнен'}
];


export const timestampToDate = (timestamp) => {
  let date = new Date();
  date.setTime(timestamp * 1000);
  return date.getHours() + ':' + date.getMinutes() + ' ' + ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();
};
