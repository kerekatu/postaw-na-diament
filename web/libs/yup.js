import * as yup from 'yup'

export const joinSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .max(20, 'Nazwa nie może być dłuższa niż 20 znaków')
    .min(2, 'Nazwa nie może być krótsza niż 2 znaki')
    .required('Pole jest obowiązkowe'),
  roomId: yup
    .string()
    .length(4, 'Numer pokoju składa się z 4 znaków')
    .required('Pole jest obowiązkowe'),
})
