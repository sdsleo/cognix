const useFormatDate = (dateTime: string) => {
  if (dateTime === '') {
    return '';
  }
  const dateTo: any = new Date(`${dateTime}`);
  if (String(dateTo) === 'Invalid Date') {
    return dateTime;
  }
  return `${dateTo.toLocaleDateString()} ${dateTo.toLocaleTimeString()}` ===
    '01/01/1 - 00:00:00'
    ? ''
    : `${dateTo.toLocaleDateString()} - ${dateTo.toLocaleTimeString()}`;
};

export default useFormatDate;
