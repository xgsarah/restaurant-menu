import * as yup from 'yup'

const menuSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  category: yup.string().required('Category is required'),
  stock: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? 0 : value
    })
    .required('Stock is required')
    .positive()
    .integer()
    .default(0),
  price: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? 0 : value
    })
    .required('Price is required')
    .positive()
    .default(0),
  cost: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? 0 : value
    })
    .required('Cost is required')
    .positive()
    .default(0),
  options: yup.array().of(yup.string()),
})

export default menuSchema
